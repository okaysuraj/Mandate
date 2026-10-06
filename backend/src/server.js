import publicRoutes from './routes/publicRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import productivityRoutes from './routes/productivityRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import {checkSession} from './utils/apiSession.js';
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
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { initReminderService } from "./services/reminderService.js";
import { initCronJobs } from './scripts/cronJobs.js';
import mongoose from 'mongoose';
import { authenticateToken } from './middleware/authMiddleware.js';
import User from './models/User.js';
import { workspaceAccess } from './utils/access.js';
import { requestSafety, errorHandler } from './middleware/requestSafety.js';

dotenv.config();

const app = express();
app.disable('x-powered-by');
app.set('query parser', 'simple');
if (process.env.TRUST_PROXY_HOPS) {const hops=Number(process.env.TRUST_PROXY_HOPS);if(!Number.isSafeInteger(hops)||hops<1||hops>10)throw new Error('TRUST_PROXY_HOPS must be 1 to 10');app.set('trust proxy',hops);}
const configuredOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173,http://localhost:3000')).split(',').map(s=>s.trim()).filter(Boolean);
const allowedOrigins=[...new Set([...configuredOrigins,...(process.env.NODE_ENV!=='production'?['http://localhost:5173','http://localhost:3000']:[])])];
const corsOptions = { origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)), credentials: false };
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions, maxHttpBufferSize: 65536, allowRequest:(req,callback)=>callback(null,!req.headers.origin||allowedOrigins.includes(req.headers.origin)) });
io.use(async (socket, next) => {
  try {
    const decoded = await authenticateToken(socket.handshake.auth?.token);
    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) throw new Error('User profile unavailable');
    await checkSession(user,decoded,socket.handshake.headers['user-agent']||'');
    socket.data.user = user;
    socket.data.expiresAt = decoded.exp * 1000;
    next();
  } catch { next(new Error('Authentication required')); }
});
io.on('connection', socket => {
  socket.join('user:' + socket.data.user._id);
  const expiry = setTimeout(() => socket.disconnect(true), Math.max(0, socket.data.expiresAt - Date.now()));
  socket.on('disconnect', () => clearTimeout(expiry));
  socket.on('joinWorkspace', async (workspaceId, acknowledgement) => {
    try {
      if (typeof workspaceId !== 'string') throw new Error('Invalid workspace');
      const workspace = await workspaceAccess(socket.data.user, workspaceId);
      await socket.join(String(workspace._id));
      if (typeof acknowledgement === 'function') acknowledgement({ ok: true });
    } catch { if (typeof acknowledgement === 'function') acknowledgement({ ok: false, message: 'Workspace permission denied' }); }
  });
  socket.on('leaveWorkspace', workspaceId => { if (typeof workspaceId === 'string' && /^[a-f\d]{24}$/i.test(workspaceId)) socket.leave(workspaceId); });
});
app.use((req,res,next)=>{req.io=io;next();});
app.use(cors(corsOptions));
app.use((req,res,next)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  if(process.env.NODE_ENV==='production') res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
  res.setHeader('Cache-Control','no-store');
  next();
});
app.use('/api/stripe/webhook', express.raw({ type: 'application/json', limit: '256kb' }));
app.use(express.json({ limit: '256kb' }));
app.use(requestSafety);
app.use(rateLimiter);
app.get('/health/live',(req,res)=>res.json({status:'ok'}));
app.get('/health/ready',(req,res)=>res.status(mongoose.connection.readyState===1?200:503).json({status:mongoose.connection.readyState===1?'ready':'unavailable'}));
const PORT = process.env.PORT || 5001;

app.use('/api/public',publicRoutes);
app.use('/api/features',featureRoutes);
app.use('/api/productivity',productivityRoutes);
app.use('/api/account',accountRoutes);
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

app.get('/api/status',(req,res)=>res.json({database:mongoose.connection.readyState===1?'connected':'unavailable',billingConfigured:!!(process.env.STRIPE_SECRET_KEY&&process.env.STRIPE_WEBHOOK_SECRET),uploadsConfigured:!!(process.env.CLOUDINARY_API_KEY&&process.env.CLOUDINARY_API_SECRET),aiConfigured:!!(process.env.GEMINI_API_KEY&&process.env.GEMINI_MODEL)}));
app.get("/", (req, res) => {
  res.send("Mandate API is running...");
});

app.use((req,res)=>res.status(404).json({message:'Endpoint not found'}));
app.use(errorHandler);
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    server.listen(PORT, () => console.log('Mandate API listening on', PORT));
    const reminderJob = initReminderService(io);
    const dailyJob = initCronJobs(io);
    const shutdown = () => {
      reminderJob.stop(); dailyJob.stop(); io.close();
      server.close(async () => { await mongoose.disconnect(); process.exit(0); });
      setTimeout(() => process.exit(1), 10000).unref();
    };
    process.once('SIGTERM', shutdown); process.once('SIGINT', shutdown);
  }).catch(() => { console.error('Backend startup failed'); process.exitCode = 1; });
}
export { app, server, io };
