import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", index: true },
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
  { timestamps: true, strict: "throw" }
);

activitySchema.index({ entityId: 1, entityType: 1 });
activitySchema.index({ userId: 1 });
activitySchema.index({workspaceId:1,createdAt:-1,_id:-1});
activitySchema.index({workspaceId:1,entityType:1,createdAt:-1,_id:-1});

schemaPolicy(activitySchema);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
