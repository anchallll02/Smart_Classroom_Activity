import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    sessionName: String,
    qrToken: String,
    tokenIssuedAt: Date,
    marked: [
      {
        roll: String,
        name: String,
        markedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
