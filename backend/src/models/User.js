import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    preferences: {
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
      notifications: { type: String, enum: ["light", "normal", "strict"], default: "normal" },
      workHours: {
        start: { type: String, default: "09:00" },
        end: { type: String, default: "17:00" }
      }
    },
    projects: {
      type: [String],
      default: ["Work", "Personal"],
    },
    activeWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
