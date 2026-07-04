import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === "development" ? "http://localhost:5001" : "https://mandate-ry4d.onrender.com");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <SocketProvider>
            <App />
            <Toaster />
          </SocketProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
