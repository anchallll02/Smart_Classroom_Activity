import { Router } from "express";
import Student from "../models/Student.js";

const router = Router();

router.get("/", async (_, res) => {
  const list = await Student.find().sort({ roll: 1 });
  res.json(list);
});

router.post("/", async (req, res) => {
  try {
    const created = await Student.create(req.body);
    res.json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
