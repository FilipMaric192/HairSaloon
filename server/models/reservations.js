import mongoose from "mongoose";

const reservationsSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true },
);

reservationsSchema.index({ date: 1, time: 1 }, { unique: true });
export default mongoose.model("Reservation", reservationsSchema);
