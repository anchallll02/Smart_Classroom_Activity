import { Router } from "express";
import crypto from "crypto";
import Attendance from "../models/Attendance.js";

const router = Router();
const WINDOW = Number(process.env.QR_WINDOW_MS || 8500);

const makeToken = (sessionId) =>
  `EDU|${sessionId}|${Date.now()}|${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

// Create a new attendance session
router.post("/session", async (req, res) => {
  const { sessionName } = req.body;
  const sessionId = crypto.randomBytes(6).toString("hex");
  const qrToken = makeToken(sessionId);
  const session = await Attendance.create({
    sessionId,
    sessionName: sessionName || "Untitled session",
    qrToken,
    tokenIssuedAt: new Date(),
    marked: [],
  });
  res.json({ sessionId, qrToken, expiresAt: Date.now() + WINDOW, sessionName: session.sessionName });
});

// Rotate the QR token (call every 8s from teacher screen)
router.post("/rotate/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const qrToken = makeToken(sessionId);
  const session = await Attendance.findOneAndUpdate(
    { sessionId },
    { qrToken, tokenIssuedAt: new Date() },
    { new: true }
  );
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json({ sessionId, qrToken, expiresAt: Date.now() + WINDOW });
});

// Student marks attendance by submitting the scanned token
router.post("/mark", async (req, res) => {
  const { qrToken, roll, name } = req.body;
  if (!qrToken || !roll || !name) return res.status(400).json({ error: "Missing fields" });

  const parts = String(qrToken).split("|");
  if (parts[0] !== "EDU") return res.status(400).json({ error: "Invalid QR" });
  const sessionId = parts[1];
  const issuedAt = Number(parts[2]);

  if (Date.now() - issuedAt > WINDOW) return res.status(410).json({ error: "QR expired" });

  const session = await Attendance.findOne({ sessionId });
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (session.qrToken !== qrToken) return res.status(409).json({ error: "Token rotated, scan latest" });

  if (session.marked.find((m) => m.roll === roll))
    return res.status(409).json({ error: "Already marked" });

  session.marked.push({ roll, name, markedAt: new Date() });
  await session.save();
  res.json({ ok: true, marked: session.marked.length });
});

router.get("/:sessionId", async (req, res) => {
  const session = await Attendance.findOne({ sessionId: req.params.sessionId });
  if (!session) return res.status(404).json({ error: "Not found" });
  res.json(session);
});

export default router;
