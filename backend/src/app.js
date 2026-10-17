// HTTP middleware and routes. Importing the app does not connect to the database or listen.
import "dotenv/config";
import publicRoutes from "./routes/publicRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import productivityRoutes from "./routes/productivityRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import express from "express";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import planningRoutes from "./routes/planningRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import automationRoutes from "./routes/automationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import mongoose from "mongoose";
import { requestSafety, errorHandler } from "./middleware/requestSafety.js";

import { corsOptions } from "./config/http.js";

const app = express();
app.disable("x-powered-by");
app.set("query parser", "simple");
if (process.env.TRUST_PROXY_HOPS) {
  const hops = Number(process.env.TRUST_PROXY_HOPS);
  if (!Number.isSafeInteger(hops) || hops < 1 || hops > 10)
    throw new Error("TRUST_PROXY_HOPS must be 1 to 10");
  app.set("trust proxy", hops);
}

app.use((req, res, next) => {
  req.io = app.get("io");
  next();
});
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none'",
  );
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  res.setHeader("Cache-Control", "no-store");
  next();
});
// Stripe verifies the original bytes, so its raw parser must run before JSON parsing.
app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json", limit: "256kb" }),
);
app.use(express.json({ limit: "256kb" }));
app.use(requestSafety);
app.use(rateLimiter);
app.get("/health/live", (req, res) => res.json({ status: "ok" }));
app.get("/health/ready", (req, res) =>
  res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
    status: mongoose.connection.readyState === 1 ? "ready" : "unavailable",
  }),
);

app.use("/api/public", publicRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/productivity", productivityRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/automations", automationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/activities", activityRoutes);

app.get("/api/status", (req, res) =>
  res.json({
    database:
      mongoose.connection.readyState === 1 ? "connected" : "unavailable",
    billingConfigured: !!(
      process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET
    ),
    uploadsConfigured: !!(
      process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
    ),
    aiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_MODEL),
  }),
);
app.get("/", (req, res) => {
  res.send("Mandate API is running...");
});

app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));
app.use(errorHandler);

export default app;
