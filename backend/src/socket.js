// Authenticate connections once, then authorize every workspace room join.
import { Server } from "socket.io";
import { corsOptions, allowedOrigins } from "./config/http.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { checkSession } from "./utils/apiSession.js";
import { workspaceAccess } from "./utils/access.js";
import User from "./models/User.js";

export function createSocketServer(server) {
  const io = new Server(server, {
    cors: corsOptions,
    maxHttpBufferSize: 65536,
    allowRequest: (req, callback) =>
      callback(
        null,
        !req.headers.origin || allowedOrigins.includes(req.headers.origin),
      ),
  });
  io.use(async (socket, next) => {
    try {
      const decoded = await authenticateToken(socket.handshake.auth?.token);
      const user = await User.findOne({ firebaseUid: decoded.uid });
      if (!user) throw new Error("User profile unavailable");
      await checkSession(
        user,
        decoded,
        socket.handshake.headers["user-agent"] || "",
      );
      socket.data.user = user;
      socket.data.expiresAt = decoded.exp * 1000;
      next();
    } catch {
      next(new Error("Authentication required"));
    }
  });
  io.on("connection", (socket) => {
    socket.join("user:" + socket.data.user._id);
    const expiry = setTimeout(
      () => socket.disconnect(true),
      Math.max(0, socket.data.expiresAt - Date.now()),
    );
    socket.on("disconnect", () => clearTimeout(expiry));
    socket.on("joinWorkspace", async (workspaceId, acknowledgement) => {
      try {
        if (typeof workspaceId !== "string")
          throw new Error("Invalid workspace");
        const workspace = await workspaceAccess(socket.data.user, workspaceId);
        await socket.join(String(workspace._id));
        if (typeof acknowledgement === "function")
          acknowledgement({ ok: true });
      } catch {
        if (typeof acknowledgement === "function")
          acknowledgement({
            ok: false,
            message: "Workspace permission denied",
          });
      }
    });
    socket.on("leaveWorkspace", (workspaceId) => {
      if (typeof workspaceId === "string" && /^[a-f\d]{24}$/i.test(workspaceId))
        socket.leave(workspaceId);
    });
  });

  return io;
}
