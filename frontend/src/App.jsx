import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import TeamSettingsPage from "./pages/TeamSettingsPage";
import WelcomePage from "./pages/WelcomePage";
import FocusPage from "./pages/FocusPage";
import ReviewPage from "./pages/ReviewPage";
import DocsPage from "./pages/DocsPage";
import GoalsPage from "./pages/GoalsPage";
import AutomationsPage from "./pages/AutomationsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import AdminDashboard from "./pages/AdminDashboard";

// New Pages
import TodayPage from "./pages/TodayPage";
import BacklogPage from "./pages/BacklogPage";
import ProjectsPage from "./pages/ProjectsPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Initialize dark mode from local storage
    if (localStorage.getItem("theme") === "dark" || 
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-on-surface transition-colors duration-300 antialiased font-body-md">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected Core Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/today" element={<ProtectedRoute><TodayPage /></ProtectedRoute>} />
        <Route path="/backlog" element={<ProtectedRoute><BacklogPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/focus/:id" element={<ProtectedRoute><FocusPage /></ProtectedRoute>} />

        {/* Existing Routes */}
        <Route path="/team" element={<ProtectedRoute><TeamSettingsPage /></ProtectedRoute>} />
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        <Route path="/docs" element={<ProtectedRoute><DocsPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
        <Route path="/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
        <Route path="/integrations" element={<ProtectedRoute><IntegrationsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};
export default App;
