import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["reminder", "assignment", "comment", "system"],
      default: "system",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedEntityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
  },
  { timestamps: true, strict: "throw" }
);

notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({user:1,createdAt:-1,_id:-1});

schemaPolicy(notificationSchema);

notificationSchema.add({ dedupeKey: { type: String } });
  notificationSchema.index({dedupeKey:1},{unique:true,sparse:true});
  const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
