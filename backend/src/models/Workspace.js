import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },
    type: {
      type: String,
      enum: ["personal", "team"],
      default: "personal"
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Admin", "Editor", "Viewer"],
          default: "Viewer",
        },
      },
    ],
    integrations: {
      slack: { type: Boolean, default: false },
      googleCalendar: { type: Boolean, default: false }
    }
  },
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

schemaPolicy(workspaceSchema);

workspaceSchema.index({'members.user':1}); workspaceSchema.index({owner:1});
  workspaceSchema.pre('validate',function(){const ids=this.members.map(m=>String(m.user)); if(new Set(ids).size!==ids.length)this.invalidate('members','Duplicate workspace members');});
  const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
