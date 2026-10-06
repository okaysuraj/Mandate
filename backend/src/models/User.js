import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 10000,
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
      maxlength: 10000,
    },
    avatar: {
      type: String,
      default: "",
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
      default: [],
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
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
    },
    stripeCustomerId: {
      type: String,
      sparse: true,
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "incomplete", "incomplete_expired", "trialing", "unpaid", "none"],
      default: "none",
    },
    subscriptionPlan: {
      type: String,
      default: "free",
    },
    expoPushToken: {
      type: String,
    }
  },
  { timestamps: true, strict: "throw", optimisticConcurrency: true }
);

schemaPolicy(userSchema);

userSchema.path('email').validate(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email');
  userSchema.path('avatar').validate(safeUrl, 'Avatar must be an HTTPS URL');
  userSchema.path('timezone').validate(value => { try { new Intl.DateTimeFormat('en', {timeZone:value}); return true; } catch { return false; } }, 'Invalid timezone');
  for(const field of ['preferences.workHours.start','preferences.workHours.end']) userSchema.path(field).validate(value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), 'Time must be HH:mm');
  userSchema.path('subscriptionPlan').enum(...['free','pro','team']);
  userSchema.path('subscriptionStatus').enum(...['active','past_due','canceled','incomplete','incomplete_expired','trialing','unpaid','paused','none']);
  userSchema.add({sessionsRevokedBefore:{type:Date,default:null}});
const User = mongoose.model("User", userSchema);

export default User;
