import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import taskRoutes from "./routes/taskRoutes.js";
import planningRoutes from "./routes/planningRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import automationRoutes from "./routes/automationRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { initReminderService } from "./services/reminderService.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || (process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "*"),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Attach socket.io instance to request object so controllers can use it
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("joinWorkspace", (workspaceId) => {
    socket.join(workspaceId);
    console.log(`Socket ${socket.id} joined workspace ${workspaceId}`);
  });

  socket.on("leaveWorkspace", (workspaceId) => {
    socket.leave(workspaceId);
    console.log(`Socket ${socket.id} left workspace ${workspaceId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "*"),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/tasks", taskRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/automations", automationRoutes);

app.get("/", (req, res) => {
  res.send("Mandate API is running...");
});

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    server.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
      initReminderService(io);
    });
  });
}

export { app, server };
