import { Router } from "express";
import Seating from "../models/Seating.js";

const router = Router();

// Auto-allocate seats by roll number (sequential, row-major)
router.post("/allocate", async (req, res) => {
  const { lab, rows = 6, cols = 10, prefix = "R", startRoll = 1001, count = 50 } = req.body;
  if (!lab) return res.status(400).json({ error: "lab required" });

  const seats = [];
  const total = rows * cols;
  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols) + 1;
    const c = (i % cols) + 1;
    const seat = `${String.fromCharCode(64 + r)}${c}`;
    seats.push({ seat, roll: i < count ? `${prefix}${startRoll + i}` : null });
  }

  const doc = await Seating.findOneAndUpdate(
    { lab },
    { lab, rows, cols, seats },
    { upsert: true, new: true }
  );
  res.json(doc);
});

router.get("/:lab", async (req, res) => {
  const doc = await Seating.findOne({ lab: req.params.lab });
  if (!doc) return res.status(404).json({ error: "No plan for this lab" });
  res.json(doc);
});

export default router;
