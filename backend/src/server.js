// Process lifecycle: connect storage, start HTTP/socket traffic, and stop scheduled jobs on exit.
import "dotenv/config";
import http from "node:http";
import mongoose from "mongoose";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { createSocketServer } from "./socket.js";
import { initReminderService } from "./services/reminderService.js";
import { initCronJobs } from "./services/recurrenceService.js";

const server = http.createServer(app);
const io = createSocketServer(server);
app.set("io", io);
const port = process.env.PORT || 5001;

async function startServer() {
  await connectDB();
  server.listen(port, () => console.log("Mandate API listening on", port));
  const jobs = [initReminderService(io), initCronJobs(io)];
  let closing = false;

  function shutdown() {
    if (closing) return;
    closing = true;
    for (const job of jobs) job.stop();
    io.close();
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
    // Give active requests a short grace period before forcing the process to stop.
    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
}

startServer().catch((error) => {
  console.error("Backend startup failed:", error.name);
  process.exitCode = 1;
});
