import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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
    description: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    status: {
      type: String,
      enum: ["active", "archived", "completed"],
      default: "active",
    },
  },
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

projectSchema.index({workspaceId:1,createdAt:-1});
schemaPolicy(projectSchema);

const Project = mongoose.model("Project", projectSchema);
export default Project;
