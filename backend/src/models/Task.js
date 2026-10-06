import { schemaPolicy, safeUrl } from './schemaPolicy.js';
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
      maxlength: 10000,
      default: "",
    },
    intent: {
      type: String,
      trim: true,
      maxlength: 10000,
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
      maxlength: 10000,
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
        assetId: {type:mongoose.Schema.Types.ObjectId,ref:"FileAsset"},
        name: String,
        url: String,
        type: {type: String},
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
      maxlength: 10000,
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
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

taskSchema.index({ creatorId: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ workspaceId: 1, status: 1 });
taskSchema.index({ parentTaskId: 1 });
taskSchema.index({ assigneeId: 1 });

schemaPolicy(taskSchema);

taskSchema.path('timeSpent').min(0).max(525600);
  taskSchema.path('timeEstimate').max(525600);
  taskSchema.path('orderIndex').min(0).validate(Number.isSafeInteger);
  taskSchema.path('recurrenceRule').enum(...['', 'daily', 'weekly', 'monthly']);
  taskSchema.path('attachments').schema.path('url').validate(safeUrl, 'Attachment URL must use HTTPS');
  taskSchema.path('attachments').schema.path('size').min(0).max(10485760);
  taskSchema.add({ recurrenceSourceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'} });
  taskSchema.index({ recurrenceSourceId: 1 }, {unique: true, sparse: true});
  taskSchema.index({ workspaceId: 1, orderIndex: 1, createdAt: -1 });
  taskSchema.index({ workspaceId: 1, orderIndex: 1, createdAt: -1, _id: -1 });
  const Task = mongoose.model("Task", taskSchema);
export default Task;
