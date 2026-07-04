import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    intent: {
      type: String,
      trim: true,
      // "why" - highly encouraged but technically nullable
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "archived"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    recurrenceRule: {
      type: String,
    },
    timeEstimate: {
      type: Number, // in minutes
    },
    energyLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    timeSpent: {
      type: Number,
      default: 0, // in minutes
    },
    completedAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

taskSchema.index({ creatorId: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ workspaceId: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
