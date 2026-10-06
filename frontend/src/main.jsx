import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary><BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <SocketProvider>
            <App />
            <Toaster />
          </SocketProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter></ErrorBoundary>
  </StrictMode>
);
