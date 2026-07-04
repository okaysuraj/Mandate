import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    entityType: {
      type: String, // "task", "project", "workspace"
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

activitySchema.index({ entityId: 1, entityType: 1 });
activitySchema.index({ userId: 1 });

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
