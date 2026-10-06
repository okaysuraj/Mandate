import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
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
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    meetingLink: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
  },
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

eventSchema.index({ workspaceId: 1, startTime: 1 });

schemaPolicy(eventSchema);

eventSchema.path('meetingLink').validate(safeUrl, 'Meeting link must use HTTPS');
  eventSchema.pre('validate', function() { if (this.endTime <= this.startTime) this.invalidate('endTime', 'Event end must be after start'); });
  const Event = mongoose.model("Event", eventSchema);

export default Event;
