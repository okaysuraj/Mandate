import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Workspace ID is required"],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator ID is required"],
    },
    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    intent: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "validation", "completed", "archived"],
        message: "Status must be pending, in-progress, validation, completed, or archived",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high", "urgent"],
        message: "Priority must be low, medium, high, or urgent",
      },
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    recurrenceRule: {
      type: String,
      default: "",
    },
    timeEstimate: {
      type: Number, // in minutes
      default: 0,
      min: 0,
    },
    energyLevel: {
      type: String,
      enum: ["low", "medium", "high", null],
      default: null,
    },
    orderIndex: {
      type: Number,
      default: 0,
    },
    snoozedUntil: {
      type: Date,
      default: null,
    },
    subtasks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
        type: String,
        size: Number,
      },
    ],
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
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
      default: null,
    },
  },
  { timestamps: true }
);

taskSchema.index({ creatorId: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ workspaceId: 1, status: 1 });
taskSchema.index({ parentTaskId: 1 });
taskSchema.index({ assigneeId: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
