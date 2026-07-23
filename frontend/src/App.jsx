import { Route, Routes } from "react-router";

import PrivacyPage from "./pages/core/PrivacyPage";
import TermsPage from "./pages/core/TermsPage";
import LegalPage from "./pages/core/LegalPage";
import SecurityPage from "./pages/settings/SecurityPage";

import HomePage from "./pages/dashboard/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LandingPage from "./pages/core/LandingPage";
import PricingPage from "./pages/core/PricingPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SettingsPage from "./pages/settings/SettingsPage";
import TeamSettingsPage from "./pages/settings/TeamSettingsPage";
import WelcomePage from "./pages/auth/WelcomePage";
import FocusPage from "./pages/core/FocusPage";
import ReviewPage from "./pages/core/ReviewPage";
import DocsPage from "./pages/core/DocsPage";
import GoalsPage from "./pages/core/GoalsPage";
import AutomationsPage from "./pages/automation/AutomationsPage";
import IntegrationsPage from "./pages/core/IntegrationsPage";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// New Pages
import TodayPage from "./pages/tasks/TodayPage";
import BacklogPage from "./pages/tasks/BacklogPage";
import KanbanPage from "./pages/tasks/KanbanPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import CalendarPage from "./pages/planning/CalendarPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import FirstMandatePage from "./pages/auth/FirstMandatePage";
import SplashPage from "./pages/auth/SplashPage";
import TaskDetailPage from "./pages/tasks/TaskDetailPage";
import InboxPage from "./pages/tasks/InboxPage";
import BillingPage from "./pages/settings/BillingPage";
import CommandPalettePage from "./pages/core/CommandPalettePage";
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/settings/SecuritySettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import TeamWorkspacePage from "./pages/dashboard/TeamWorkspacePage";
import DailyPlanningPage from "./pages/planning/DailyPlanningPage";
import EndOfDayReviewPage from "./pages/planning/EndOfDayReviewPage";
import FocusSummaryPage from "./pages/core/FocusSummaryPage";
import LockInPage from "./pages/auth/LockInPage";
import GoalDetailPage from "./pages/core/GoalDetailPage";
import AutomationRulesPage from "./pages/automation/AutomationRulesPage";
import AutomationLogsPage from "./pages/automation/AutomationLogsPage";
import DeviceManagementPage from "./pages/core/DeviceManagementPage";
import PermissionsPage from "./pages/settings/PermissionsPage";
import ThemeAppearancePage from "./pages/settings/ThemeAppearancePage";
import AccountabilityMatrixPage from "./pages/core/AccountabilityMatrixPage";
import DataExportPage from "./pages/core/DataExportPage";
import NotificationPreferencesPage from "./pages/settings/NotificationPreferencesPage";
import PersonalizedInsightsPage from "./pages/core/PersonalizedInsightsPage";
import PriorityRecommendationsPage from "./pages/core/PriorityRecommendationsPage";
import SmartReschedulingPage from "./pages/automation/SmartReschedulingPage";
import TaskBreakdownPage from "./pages/tasks/TaskBreakdownPage";
import GlobalSearchPage from "./pages/core/GlobalSearchPage";
import KeyboardShortcutsPage from "./pages/core/KeyboardShortcutsPage";
import SavedViewsPage from "./pages/core/SavedViewsPage";
import GoalTimelinePage from "./pages/planning/GoalTimelinePage";
import TaskTemplatesPage from "./pages/core/TaskTemplatesPage";
import FocusModePage from "./pages/core/FocusModePage";
import TeamHealthPage from "./pages/dashboard/TeamHealthPage";
import WorkspaceAuditPage from "./pages/core/WorkspaceAuditPage";
import CustomReportsPage from "./pages/analytics/CustomReportsPage";
import DecisionLogPage from "./pages/core/DecisionLogPage";
import AutomationPlaybooksPage from "./pages/automation/AutomationPlaybooksPage";
import KnowledgeBasePage from "./pages/core/KnowledgeBasePage";
import ReleaseNotesPage from "./pages/core/ReleaseNotesPage";
import StatusCenterPage from "./pages/core/StatusCenterPage";
import ReminderSettingsPage from "./pages/settings/ReminderSettingsPage";
import OfflineModePage from "./pages/core/OfflineModePage";
import MaintenanceDowntimePage from "./pages/core/MaintenanceDowntimePage";
import MonthlyReviewPage from "./pages/planning/MonthlyReviewPage";
import WorkstreamsPage from "./pages/projects/WorkstreamsPage";
import MilestoneTrackerPage from "./pages/core/MilestoneTrackerPage";
import DependencyMapPage from "./pages/core/DependencyMapPage";
import IncidentLogPage from "./pages/core/IncidentLogPage";
import PeopleDirectoryPage from "./pages/core/PeopleDirectoryPage";
import WorkloadBalancerPage from "./pages/core/WorkloadBalancerPage";
import RetentionInsightsPage from "./pages/analytics/RetentionInsightsPage";
import CustomerJourneyPage from "./pages/core/CustomerJourneyPage";
import PartnerPortalPage from "./pages/core/PartnerPortalPage";
import VendorManagementPage from "./pages/core/VendorManagementPage";
import ComplianceCenterPage from "./pages/core/ComplianceCenterPage";
import ProcurementHubPage from "./pages/core/ProcurementHubPage";
import SupportDeskPage from "./pages/core/SupportDeskPage";
import KnowledgeSharePage from "./pages/core/KnowledgeSharePage";
import FinanceOverviewPage from "./pages/core/FinanceOverviewPage";
import BudgetPlanningPage from "./pages/core/BudgetPlanningPage";
import InvoiceTrackerPage from "./pages/core/InvoiceTrackerPage";
import ForecastingPage from "./pages/core/ForecastingPage";
import ExecutiveSummaryPage from "./pages/dashboard/ExecutiveSummaryPage";
import ImpactReportPage from "./pages/analytics/ImpactReportPage";
import BoardViewPage from "./pages/tasks/BoardViewPage";
import WorkspaceOverviewPage from "./pages/projects/WorkspaceOverviewPage";
import MobileWorkspacePage from "./pages/core/MobileWorkspacePage";
import QuickActionsPage from "./pages/core/QuickActionsPage";
import ActivityStreamPage from "./pages/core/ActivityStreamPage";
import AutomationCenterPage from "./pages/automation/AutomationCenterPage";
import WorkspaceTemplatesPage from "./pages/core/WorkspaceTemplatesPage";

import MeetingNotesPage from './pages/core/MeetingNotesPage';
import StakeholderMapPage from './pages/core/StakeholderMapPage';
import SprintBoardPage from './pages/tasks/SprintBoardPage';
import RoadmapPage from './pages/projects/RoadmapPage';
import ChangeRequestsPage from './pages/core/ChangeRequestsPage';
import EscalationsPage from './pages/core/EscalationsPage';
import RiskRegisterPage from './pages/auth/RiskRegisterPage';
import CapacityPlanningPage from './pages/projects/CapacityPlanningPage';
import SignalCenterPage from './pages/core/SignalCenterPage';
import ProtectedRoute from "./components/common/ProtectedRoute";
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
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/security" element={<SecurityPage />} />
        
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
