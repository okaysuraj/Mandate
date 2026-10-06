import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const dailyMandateSchema = new mongoose.Schema(
  {
    workspaceId: {type:mongoose.Schema.Types.ObjectId,ref:"Workspace",required:true},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      match: /^\d{4}-\d{2}-\d{2}$/,
      type: String, // YYYY-MM-DD
      required: true,
    },
    lockedAt: {
      type: Date,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      }
    ]
  },
  { timestamps: true, strict: "throw" }
);

dailyMandateSchema.index({ userId: 1, workspaceId: 1, date: 1 }, { unique: true });

schemaPolicy(dailyMandateSchema);

const DailyMandate = mongoose.model("DailyMandate", dailyMandateSchema);
export default DailyMandate;
