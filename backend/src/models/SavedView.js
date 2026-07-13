import mongoose from "mongoose";

const savedViewSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    filters: {
      type: mongoose.Schema.Types.Mixed, // e.g. { status: "pending", priority: "high" }
      default: {},
    },
    sort: {
      type: mongoose.Schema.Types.Mixed, // e.g. { dueDate: 1 }
      default: {},
    },
    viewType: {
      type: String,
      enum: ["list", "kanban", "calendar", "timeline", "table"],
      default: "list",
    },
  },
  { timestamps: true }
);

savedViewSchema.index({ workspaceId: 1 });

const SavedView = mongoose.model("SavedView", savedViewSchema);
export default SavedView;
