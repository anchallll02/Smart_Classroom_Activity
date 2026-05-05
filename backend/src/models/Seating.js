import mongoose from "mongoose";

const seatingSchema = new mongoose.Schema(
  {
    lab: { type: String, required: true, unique: true },
    rows: Number,
    cols: Number,
    seats: [{ seat: String, roll: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Seating", seatingSchema);
