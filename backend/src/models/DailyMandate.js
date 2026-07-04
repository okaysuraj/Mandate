import mongoose from "mongoose";

const dailyMandateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    lockedAt: {
      type: Date,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      }
    ]
  },
  { timestamps: true }
);

dailyMandateSchema.index({ userId: 1, date: 1 }, { unique: true });

const DailyMandate = mongoose.model("DailyMandate", dailyMandateSchema);
export default DailyMandate;
