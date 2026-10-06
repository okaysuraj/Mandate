import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const automationSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },
    trigger: {
      type: String,
      required: true,
      enum: ["task_created", "status_changed", "priority_changed"],
    },
    condition: {
      field: String,
      operator: { type: String, enum: ["equals", "not_equals", "contains"] },
      value: String,
    },
    action: {
      type: String,
      required: true,
      enum: ["change_status", "change_priority", "add_tag", "assign_user"],
    },
    actionValue: {
      type: String, // e.g. 'high' or 'done' or 'urgent_tag'
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

automationSchema.index({workspaceId:1,createdAt:-1});
schemaPolicy(automationSchema);

const Automation = mongoose.model("Automation", automationSchema);
export default Automation;
