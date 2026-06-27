import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useWorkspace } from "./WorkspaceContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();

  useEffect(() => {
    if (user) {
      const socketUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === "development" ? "http://localhost:5001" : window.location.origin);
      const newSocket = io(socketUrl, {
        path: "/socket.io",
      });
      
      setSocket(newSocket);

      return () => newSocket.close();
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [user]);

  useEffect(() => {
    if (socket && activeWorkspace) {
      socket.emit("joinWorkspace", activeWorkspace._id);

      return () => {
        socket.emit("leaveWorkspace", activeWorkspace._id);
      };
    }
  }, [socket, activeWorkspace]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
