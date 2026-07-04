import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    targetDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "achieved", "abandoned"],
      default: "active",
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    linkedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;
