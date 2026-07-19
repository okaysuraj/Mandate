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
import KanbanPage from "./pages/KanbanPage";
import ProjectsPage from "./pages/ProjectsPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FirstMandatePage from "./pages/FirstMandatePage";
import SplashPage from "./pages/SplashPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import InboxPage from "./pages/InboxPage";
import BillingPage from "./pages/BillingPage";
import CommandPalettePage from "./pages/CommandPalettePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/SecuritySettingsPage";
import NotificationsSettingsPage from "./pages/NotificationsSettingsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TeamWorkspacePage from "./pages/TeamWorkspacePage";
import DailyPlanningPage from "./pages/DailyPlanningPage";
import EndOfDayReviewPage from "./pages/EndOfDayReviewPage";
import FocusSummaryPage from "./pages/FocusSummaryPage";
import LockInPage from "./pages/LockInPage";
import GoalDetailPage from "./pages/GoalDetailPage";
import AutomationRulesPage from "./pages/AutomationRulesPage";
import AutomationLogsPage from "./pages/AutomationLogsPage";
import DeviceManagementPage from "./pages/DeviceManagementPage";
import PermissionsPage from "./pages/PermissionsPage";
import ThemeAppearancePage from "./pages/ThemeAppearancePage";
import AccountabilityMatrixPage from "./pages/AccountabilityMatrixPage";
import DataExportPage from "./pages/DataExportPage";
import NotificationPreferencesPage from "./pages/NotificationPreferencesPage";
import PersonalizedInsightsPage from "./pages/PersonalizedInsightsPage";
import PriorityRecommendationsPage from "./pages/PriorityRecommendationsPage";
import SmartReschedulingPage from "./pages/SmartReschedulingPage";
import TaskBreakdownPage from "./pages/TaskBreakdownPage";
import GlobalSearchPage from "./pages/GlobalSearchPage";
import KeyboardShortcutsPage from "./pages/KeyboardShortcutsPage";
import SavedViewsPage from "./pages/SavedViewsPage";
import GoalTimelinePage from "./pages/GoalTimelinePage";
import TaskTemplatesPage from "./pages/TaskTemplatesPage";
import FocusModePage from "./pages/FocusModePage";
import TeamHealthPage from "./pages/TeamHealthPage";
import WorkspaceAuditPage from "./pages/WorkspaceAuditPage";
import CustomReportsPage from "./pages/CustomReportsPage";
import DecisionLogPage from "./pages/DecisionLogPage";
import AutomationPlaybooksPage from "./pages/AutomationPlaybooksPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import ReleaseNotesPage from "./pages/ReleaseNotesPage";
import StatusCenterPage from "./pages/StatusCenterPage";
import ReminderSettingsPage from "./pages/ReminderSettingsPage";
import OfflineModePage from "./pages/OfflineModePage";
import MaintenanceDowntimePage from "./pages/MaintenanceDowntimePage";
import MonthlyReviewPage from "./pages/MonthlyReviewPage";
import WorkstreamsPage from "./pages/WorkstreamsPage";
import MilestoneTrackerPage from "./pages/MilestoneTrackerPage";
import DependencyMapPage from "./pages/DependencyMapPage";
import IncidentLogPage from "./pages/IncidentLogPage";
import PeopleDirectoryPage from "./pages/PeopleDirectoryPage";
import WorkloadBalancerPage from "./pages/WorkloadBalancerPage";
import RetentionInsightsPage from "./pages/RetentionInsightsPage";
import CustomerJourneyPage from "./pages/CustomerJourneyPage";
import PartnerPortalPage from "./pages/PartnerPortalPage";
import VendorManagementPage from "./pages/VendorManagementPage";
import ComplianceCenterPage from "./pages/ComplianceCenterPage";
import ProcurementHubPage from "./pages/ProcurementHubPage";
import SupportDeskPage from "./pages/SupportDeskPage";
import KnowledgeSharePage from "./pages/KnowledgeSharePage";
import FinanceOverviewPage from "./pages/FinanceOverviewPage";
import BudgetPlanningPage from "./pages/BudgetPlanningPage";
import InvoiceTrackerPage from "./pages/InvoiceTrackerPage";
import ForecastingPage from "./pages/ForecastingPage";
import ExecutiveSummaryPage from "./pages/ExecutiveSummaryPage";
import ImpactReportPage from "./pages/ImpactReportPage";
import BoardViewPage from "./pages/BoardViewPage";
import WorkspaceOverviewPage from "./pages/WorkspaceOverviewPage";
import MobileWorkspacePage from "./pages/MobileWorkspacePage";
import QuickActionsPage from "./pages/QuickActionsPage";
import ActivityStreamPage from "./pages/ActivityStreamPage";
import AutomationCenterPage from "./pages/AutomationCenterPage";
import WorkspaceTemplatesPage from "./pages/WorkspaceTemplatesPage";

import MeetingNotesPage from './pages/MeetingNotesPage';
import StakeholderMapPage from './pages/StakeholderMapPage';
import SprintBoardPage from './pages/SprintBoardPage';
import RoadmapPage from './pages/RoadmapPage';
import ChangeRequestsPage from './pages/ChangeRequestsPage';
import EscalationsPage from './pages/EscalationsPage';
import RiskRegisterPage from './pages/RiskRegisterPage';
import CapacityPlanningPage from './pages/CapacityPlanningPage';
import SignalCenterPage from './pages/SignalCenterPage';
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
        <Route path="/kanban" element={<ProtectedRoute><KanbanPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/focus/:id" element={<ProtectedRoute><FocusPage /></ProtectedRoute>} />

        {/* Existing Routes */}
        <Route path="/team" element={<ProtectedRoute><TeamSettingsPage /></ProtectedRoute>} />
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="/first-mandate" element={<ProtectedRoute><FirstMandatePage /></ProtectedRoute>} />
        <Route path="/splash" element={<ProtectedRoute><SplashPage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        <Route path="/docs" element={<ProtectedRoute><DocsPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
        <Route path="/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
        <Route path="/integrations" element={<ProtectedRoute><IntegrationsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailPage /></ProtectedRoute>} />
        <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
        <Route path="/command-palette" element={<ProtectedRoute><CommandPalettePage /></ProtectedRoute>} />
        <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        <Route path="/security-settings" element={<ProtectedRoute><SecuritySettingsPage /></ProtectedRoute>} />
        <Route path="/notifications-settings" element={<ProtectedRoute><NotificationsSettingsPage /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} />
        <Route path="/team-workspace" element={<ProtectedRoute><TeamWorkspacePage /></ProtectedRoute>} />
        <Route path="/daily-planning" element={<ProtectedRoute><DailyPlanningPage /></ProtectedRoute>} />
        <Route path="/end-of-day-review" element={<ProtectedRoute><EndOfDayReviewPage /></ProtectedRoute>} />
        <Route path="/focus-summary" element={<ProtectedRoute><FocusSummaryPage /></ProtectedRoute>} />
        <Route path="/lock-in" element={<ProtectedRoute><LockInPage /></ProtectedRoute>} />
        <Route path="/goals/:id" element={<ProtectedRoute><GoalDetailPage /></ProtectedRoute>} />
        <Route path="/automation-rules" element={<ProtectedRoute><AutomationRulesPage /></ProtectedRoute>} />
        <Route path="/automation-logs" element={<ProtectedRoute><AutomationLogsPage /></ProtectedRoute>} />
        <Route path="/device-management" element={<ProtectedRoute><DeviceManagementPage /></ProtectedRoute>} />
        <Route path="/permissions" element={<ProtectedRoute><PermissionsPage /></ProtectedRoute>} />
        <Route path="/theme-appearance" element={<ProtectedRoute><ThemeAppearancePage /></ProtectedRoute>} />
        <Route path="/accountability-matrix" element={<ProtectedRoute><AccountabilityMatrixPage /></ProtectedRoute>} />
        <Route path="/data-export" element={<ProtectedRoute><DataExportPage /></ProtectedRoute>} />
        <Route path="/notification-preferences" element={<ProtectedRoute><NotificationPreferencesPage /></ProtectedRoute>} />
        <Route path="/personalized-insights" element={<ProtectedRoute><PersonalizedInsightsPage /></ProtectedRoute>} />
        <Route path="/priority-recommendations" element={<ProtectedRoute><PriorityRecommendationsPage /></ProtectedRoute>} />
        <Route path="/smart-rescheduling" element={<ProtectedRoute><SmartReschedulingPage /></ProtectedRoute>} />
        <Route path="/task-breakdown" element={<ProtectedRoute><TaskBreakdownPage /></ProtectedRoute>} />
        <Route path="/global-search" element={<ProtectedRoute><GlobalSearchPage /></ProtectedRoute>} />
        <Route path="/keyboard-shortcuts" element={<ProtectedRoute><KeyboardShortcutsPage /></ProtectedRoute>} />
        <Route path="/saved-views" element={<ProtectedRoute><SavedViewsPage /></ProtectedRoute>} />
        <Route path="/reminder-settings" element={<ProtectedRoute><ReminderSettingsPage /></ProtectedRoute>} />
        <Route path="/offline-mode" element={<ProtectedRoute><OfflineModePage /></ProtectedRoute>} />
        <Route path="/maintenance-downtime" element={<ProtectedRoute><MaintenanceDowntimePage /></ProtectedRoute>} />
        <Route path="/monthly-review" element={<ProtectedRoute><MonthlyReviewPage /></ProtectedRoute>} />
        <Route path="/goal-timeline" element={<ProtectedRoute><GoalTimelinePage /></ProtectedRoute>} />
        <Route path="/task-templates" element={<ProtectedRoute><TaskTemplatesPage /></ProtectedRoute>} />
        <Route path="/focus-mode" element={<ProtectedRoute><FocusModePage /></ProtectedRoute>} />
        <Route path="/team-health" element={<ProtectedRoute><TeamHealthPage /></ProtectedRoute>} />
        <Route path="/workspace-audit" element={<ProtectedRoute><WorkspaceAuditPage /></ProtectedRoute>} />
        <Route path="/custom-reports" element={<ProtectedRoute><CustomReportsPage /></ProtectedRoute>} />
        <Route path="/decision-log" element={<ProtectedRoute><DecisionLogPage /></ProtectedRoute>} />
        <Route path="/automation-playbooks" element={<ProtectedRoute><AutomationPlaybooksPage /></ProtectedRoute>} />
        <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBasePage /></ProtectedRoute>} />
        <Route path="/release-notes" element={<ProtectedRoute><ReleaseNotesPage /></ProtectedRoute>} />
        <Route path="/status-center" element={<ProtectedRoute><StatusCenterPage /></ProtectedRoute>} />
        <Route path="/meeting-notes" element={<ProtectedRoute><MeetingNotesPage /></ProtectedRoute>} />
        <Route path="/stakeholder-map" element={<ProtectedRoute><StakeholderMapPage /></ProtectedRoute>} />
        <Route path="/sprint-board" element={<ProtectedRoute><SprintBoardPage /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
        <Route path="/change-requests" element={<ProtectedRoute><ChangeRequestsPage /></ProtectedRoute>} />
        <Route path="/escalations" element={<ProtectedRoute><EscalationsPage /></ProtectedRoute>} />
        <Route path="/risk-register" element={<ProtectedRoute><RiskRegisterPage /></ProtectedRoute>} />
        <Route path="/capacity-planning" element={<ProtectedRoute><CapacityPlanningPage /></ProtectedRoute>} />
        <Route path="/signal-center" element={<ProtectedRoute><SignalCenterPage /></ProtectedRoute>} />
        <Route path="/workstreams" element={<ProtectedRoute><WorkstreamsPage /></ProtectedRoute>} />
        <Route path="/milestone-tracker" element={<ProtectedRoute><MilestoneTrackerPage /></ProtectedRoute>} />
        <Route path="/dependency-map" element={<ProtectedRoute><DependencyMapPage /></ProtectedRoute>} />
        <Route path="/incident-log" element={<ProtectedRoute><IncidentLogPage /></ProtectedRoute>} />
        <Route path="/people-directory" element={<ProtectedRoute><PeopleDirectoryPage /></ProtectedRoute>} />
        <Route path="/workload-balancer" element={<ProtectedRoute><WorkloadBalancerPage /></ProtectedRoute>} />
        <Route path="/retention-insights" element={<ProtectedRoute><RetentionInsightsPage /></ProtectedRoute>} />
        <Route path="/customer-journey" element={<ProtectedRoute><CustomerJourneyPage /></ProtectedRoute>} />
        <Route path="/partner-portal" element={<ProtectedRoute><PartnerPortalPage /></ProtectedRoute>} />
        <Route path="/vendor-management" element={<ProtectedRoute><VendorManagementPage /></ProtectedRoute>} />
        <Route path="/compliance-center" element={<ProtectedRoute><ComplianceCenterPage /></ProtectedRoute>} />
        <Route path="/procurement-hub" element={<ProtectedRoute><ProcurementHubPage /></ProtectedRoute>} />
        <Route path="/support-desk" element={<ProtectedRoute><SupportDeskPage /></ProtectedRoute>} />
        <Route path="/knowledge-share" element={<ProtectedRoute><KnowledgeSharePage /></ProtectedRoute>} />
        <Route path="/finance-overview" element={<ProtectedRoute><FinanceOverviewPage /></ProtectedRoute>} />
        <Route path="/budget-planning" element={<ProtectedRoute><BudgetPlanningPage /></ProtectedRoute>} />
        <Route path="/invoice-tracker" element={<ProtectedRoute><InvoiceTrackerPage /></ProtectedRoute>} />
        <Route path="/forecasting" element={<ProtectedRoute><ForecastingPage /></ProtectedRoute>} />
        <Route path="/executive-summary" element={<ProtectedRoute><ExecutiveSummaryPage /></ProtectedRoute>} />
        <Route path="/impact-report" element={<ProtectedRoute><ImpactReportPage /></ProtectedRoute>} />
        <Route path="/board-view" element={<ProtectedRoute><BoardViewPage /></ProtectedRoute>} />
        <Route path="/workspace-overview" element={<ProtectedRoute><WorkspaceOverviewPage /></ProtectedRoute>} />
        <Route path="/mobile-workspace" element={<ProtectedRoute><MobileWorkspacePage /></ProtectedRoute>} />
        <Route path="/quick-actions" element={<ProtectedRoute><QuickActionsPage /></ProtectedRoute>} />
        <Route path="/activity-stream" element={<ProtectedRoute><ActivityStreamPage /></ProtectedRoute>} />
        <Route path="/automation-center" element={<ProtectedRoute><AutomationCenterPage /></ProtectedRoute>} />
        <Route path="/workspace-templates" element={<ProtectedRoute><WorkspaceTemplatesPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};
export default App;
