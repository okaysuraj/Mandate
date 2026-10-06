const FeaturePage = lazy(() => import('./components/features/FeaturePage'));
const FeatureIndexPage = lazy(() => import('./components/features/FeaturePage').then(module => ({default: module.FeatureIndexPage})));
import { Route, Routes } from "react-router";

const PrivacyPage = lazy(() => import("./pages/core/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/core/TermsPage"));
const LegalPage = lazy(() => import("./pages/core/LegalPage"));
const SecurityPage = lazy(() => import("./pages/settings/SecurityPage"));

const HomePage = lazy(() => import("./pages/dashboard/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const LandingPage = lazy(() => import("./pages/core/LandingPage"));
const PricingPage = lazy(() => import("./pages/core/PricingPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));
const TeamSettingsPage = lazy(() => import("./pages/settings/TeamSettingsPage"));
const WelcomePage = lazy(() => import("./pages/auth/WelcomePage"));
const FocusPage = lazy(() => import("./pages/core/FocusPage"));
const ReviewPage = lazy(() => import("./pages/core/ReviewPage"));
const DocsPage = lazy(() => import("./pages/core/DocsPage"));
const GoalsPage = lazy(() => import("./pages/core/GoalsPage"));
const AutomationsPage = lazy(() => import("./pages/automation/AutomationsPage"));
const IntegrationsPage = lazy(() => import("./pages/core/IntegrationsPage"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));

// New Pages
const TodayPage = lazy(() => import("./pages/tasks/TodayPage"));
const BacklogPage = lazy(() => import("./pages/tasks/BacklogPage"));
const KanbanPage = lazy(() => import("./pages/tasks/KanbanPage"));
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const CalendarPage = lazy(() => import("./pages/planning/CalendarPage"));
const AnalyticsPage = lazy(() => import("./pages/analytics/AnalyticsPage"));
const FirstMandatePage = lazy(() => import("./pages/auth/FirstMandatePage"));
const SplashPage = lazy(() => import("./pages/auth/SplashPage"));
const TaskDetailPage = lazy(() => import("./pages/tasks/TaskDetailPage"));
const InboxPage = lazy(() => import("./pages/tasks/InboxPage"));
const BillingPage = lazy(() => import("./pages/settings/BillingPage"));
const CommandPalettePage = lazy(() => import("./pages/core/CommandPalettePage"));
const ProfileSettingsPage = lazy(() => import("./pages/settings/ProfileSettingsPage"));
const SecuritySettingsPage = lazy(() => import("./pages/settings/SecuritySettingsPage"));
const NotificationsSettingsPage = lazy(() => import("./pages/settings/NotificationsSettingsPage"));
const ProjectDetailPage = lazy(() => import("./pages/projects/ProjectDetailPage"));
const TeamWorkspacePage = lazy(() => import("./pages/dashboard/TeamWorkspacePage"));
const DailyPlanningPage = lazy(() => import("./pages/planning/DailyPlanningPage"));
const EndOfDayReviewPage = lazy(() => import("./pages/planning/EndOfDayReviewPage"));
const FocusSummaryPage = lazy(() => import("./pages/core/FocusSummaryPage"));
const LockInPage = lazy(() => import("./pages/auth/LockInPage"));
const GoalDetailPage = lazy(() => import("./pages/core/GoalDetailPage"));
const AutomationRulesPage = lazy(() => import("./pages/automation/AutomationRulesPage"));
const AutomationLogsPage = lazy(() => import("./pages/automation/AutomationLogsPage"));
const DeviceManagementPage = lazy(() => import("./pages/core/DeviceManagementPage"));
const PermissionsPage = lazy(() => import("./pages/settings/PermissionsPage"));
const ThemeAppearancePage = lazy(() => import("./pages/settings/ThemeAppearancePage"));
const AccountabilityMatrixPage = lazy(() => import("./pages/core/AccountabilityMatrixPage"));
const DataExportPage = lazy(() => import("./pages/core/DataExportPage"));
const NotificationPreferencesPage = lazy(() => import("./pages/settings/NotificationPreferencesPage"));
const PersonalizedInsightsPage = lazy(() => import("./pages/core/PersonalizedInsightsPage"));
const PriorityRecommendationsPage = lazy(() => import("./pages/core/PriorityRecommendationsPage"));
const SmartReschedulingPage = lazy(() => import("./pages/automation/SmartReschedulingPage"));
const TaskBreakdownPage = lazy(() => import("./pages/tasks/TaskBreakdownPage"));
const GlobalSearchPage = lazy(() => import("./pages/core/GlobalSearchPage"));
const KeyboardShortcutsPage = lazy(() => import("./pages/core/KeyboardShortcutsPage"));
const SavedViewsPage = lazy(() => import("./pages/core/SavedViewsPage"));
const GoalTimelinePage = lazy(() => import("./pages/planning/GoalTimelinePage"));
const TaskTemplatesPage = lazy(() => import("./pages/core/TaskTemplatesPage"));
const FocusModePage = lazy(() => import("./pages/core/FocusModePage"));
const TeamHealthPage = lazy(() => import("./pages/dashboard/TeamHealthPage"));
const WorkspaceAuditPage = lazy(() => import("./pages/core/WorkspaceAuditPage"));
const CustomReportsPage = lazy(() => import("./pages/analytics/CustomReportsPage"));
const DecisionLogPage = lazy(() => import("./pages/core/DecisionLogPage"));
const AutomationPlaybooksPage = lazy(() => import("./pages/automation/AutomationPlaybooksPage"));
const KnowledgeBasePage = lazy(() => import("./pages/core/KnowledgeBasePage"));
const ReleaseNotesPage = lazy(() => import("./pages/core/ReleaseNotesPage"));
const StatusCenterPage = lazy(() => import("./pages/core/StatusCenterPage"));
const ReminderSettingsPage = lazy(() => import("./pages/settings/ReminderSettingsPage"));
const OfflineModePage = lazy(() => import("./pages/core/OfflineModePage"));
const MaintenanceDowntimePage = lazy(() => import("./pages/core/MaintenanceDowntimePage"));
const MonthlyReviewPage = lazy(() => import("./pages/planning/MonthlyReviewPage"));
const WorkstreamsPage = lazy(() => import("./pages/projects/WorkstreamsPage"));
const MilestoneTrackerPage = lazy(() => import("./pages/core/MilestoneTrackerPage"));
const DependencyMapPage = lazy(() => import("./pages/core/DependencyMapPage"));
const IncidentLogPage = lazy(() => import("./pages/core/IncidentLogPage"));
const PeopleDirectoryPage = lazy(() => import("./pages/core/PeopleDirectoryPage"));
const WorkloadBalancerPage = lazy(() => import("./pages/core/WorkloadBalancerPage"));
const RetentionInsightsPage = lazy(() => import("./pages/analytics/RetentionInsightsPage"));
const CustomerJourneyPage = lazy(() => import("./pages/core/CustomerJourneyPage"));
const PartnerPortalPage = lazy(() => import("./pages/core/PartnerPortalPage"));
const VendorManagementPage = lazy(() => import("./pages/core/VendorManagementPage"));
const ComplianceCenterPage = lazy(() => import("./pages/core/ComplianceCenterPage"));
const ProcurementHubPage = lazy(() => import("./pages/core/ProcurementHubPage"));
const SupportDeskPage = lazy(() => import("./pages/core/SupportDeskPage"));
const KnowledgeSharePage = lazy(() => import("./pages/core/KnowledgeSharePage"));
const FinanceOverviewPage = lazy(() => import("./pages/core/FinanceOverviewPage"));
const BudgetPlanningPage = lazy(() => import("./pages/core/BudgetPlanningPage"));
const InvoiceTrackerPage = lazy(() => import("./pages/core/InvoiceTrackerPage"));
const ForecastingPage = lazy(() => import("./pages/core/ForecastingPage"));
const ExecutiveSummaryPage = lazy(() => import("./pages/dashboard/ExecutiveSummaryPage"));
const ImpactReportPage = lazy(() => import("./pages/analytics/ImpactReportPage"));
const BoardViewPage = lazy(() => import("./pages/tasks/BoardViewPage"));
const WorkspaceOverviewPage = lazy(() => import("./pages/projects/WorkspaceOverviewPage"));
const MobileWorkspacePage = lazy(() => import("./pages/core/MobileWorkspacePage"));
const QuickActionsPage = lazy(() => import("./pages/core/QuickActionsPage"));
const ActivityStreamPage = lazy(() => import("./pages/core/ActivityStreamPage"));
const AutomationCenterPage = lazy(() => import("./pages/automation/AutomationCenterPage"));
const WorkspaceTemplatesPage = lazy(() => import("./pages/core/WorkspaceTemplatesPage"));

const MeetingNotesPage = lazy(() => import('./pages/core/MeetingNotesPage'));
const StakeholderMapPage = lazy(() => import('./pages/core/StakeholderMapPage'));
const SprintBoardPage = lazy(() => import('./pages/tasks/SprintBoardPage'));
const RoadmapPage = lazy(() => import('./pages/projects/RoadmapPage'));
const ChangeRequestsPage = lazy(() => import('./pages/core/ChangeRequestsPage'));
const EscalationsPage = lazy(() => import('./pages/core/EscalationsPage'));
const RiskRegisterPage = lazy(() => import('./pages/auth/RiskRegisterPage'));
const CapacityPlanningPage = lazy(() => import('./pages/projects/CapacityPlanningPage'));
const SignalCenterPage = lazy(() => import('./pages/core/SignalCenterPage'));
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useEffect, lazy, Suspense } from "react";

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
      <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center text-on-surface-variant">Loading page?</div>}>
      <Routes>
        <Route path="/features" element={<ProtectedRoute><FeatureIndexPage/></ProtectedRoute>}/>
        <Route path="/features/:featureKey" element={<ProtectedRoute><FeaturePage/></ProtectedRoute>}/>
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
              <Route path="/burnout-insights" element={<ProtectedRoute><FeaturePage featureKey="burnout-insights"/></ProtectedRoute>}/>
        <Route path="/deviation-report" element={<ProtectedRoute><FeaturePage featureKey="deviation-report"/></ProtectedRoute>}/>
        <Route path="/personnel-ledger" element={<ProtectedRoute><FeaturePage featureKey="personnel-ledger"/></ProtectedRoute>}/>
        <Route path="/rule-builder" element={<ProtectedRoute><FeaturePage featureKey="rule-builder"/></ProtectedRoute>}/>
        <Route path="/smart-views" element={<ProtectedRoute><FeaturePage featureKey="smart-views"/></ProtectedRoute>}/>
        <Route path="/commitment-history" element={<ProtectedRoute><FeaturePage featureKey="commitment-history"/></ProtectedRoute>}/>
        <Route path="/create-goal" element={<ProtectedRoute><FeaturePage featureKey="create-goal"/></ProtectedRoute>}/>
        <Route path="/critical-alerts" element={<ProtectedRoute><FeaturePage featureKey="critical-alerts"/></ProtectedRoute>}/>
        <Route path="/daily-review" element={<ProtectedRoute><FeaturePage featureKey="daily-review"/></ProtectedRoute>}/>
        <Route path="/danger-zone" element={<ProtectedRoute><FeaturePage featureKey="danger-zone"/></ProtectedRoute>}/>
        <Route path="/digest-preview" element={<ProtectedRoute><FeaturePage featureKey="digest-preview"/></ProtectedRoute>}/>
        <Route path="/filter-builder" element={<ProtectedRoute><FeaturePage featureKey="filter-builder"/></ProtectedRoute>}/>
        <Route path="/focus-notes-logs" element={<ProtectedRoute><FeaturePage featureKey="focus-notes-logs"/></ProtectedRoute>}/>
        <Route path="/focus-timer-logs" element={<ProtectedRoute><FeaturePage featureKey="focus-timer-logs"/></ProtectedRoute>}/>
        <Route path="/goal-detail" element={<ProtectedRoute><FeaturePage featureKey="goal-detail"/></ProtectedRoute>}/>
        <Route path="/goal-progress-tracking" element={<ProtectedRoute><FeaturePage featureKey="goal-progress-tracking"/></ProtectedRoute>}/>
        <Route path="/invite-members" element={<ProtectedRoute><FeaturePage featureKey="invite-members"/></ProtectedRoute>}/>
        <Route path="/list-view" element={<ProtectedRoute><FeaturePage featureKey="list-view"/></ProtectedRoute>}/>
        <Route path="/maintenance" element={<ProtectedRoute><FeaturePage featureKey="maintenance"/></ProtectedRoute>}/>
        <Route path="/natural-language-input" element={<ProtectedRoute><FeaturePage featureKey="natural-language-input"/></ProtectedRoute>}/>
        <Route path="/ownership-transfer" element={<ProtectedRoute><FeaturePage featureKey="ownership-transfer"/></ProtectedRoute>}/>
        <Route path="/priority-status" element={<ProtectedRoute><FeaturePage featureKey="priority-status"/></ProtectedRoute>}/>
        <Route path="/protocol-paused" element={<ProtectedRoute><FeaturePage featureKey="protocol-paused"/></ProtectedRoute>}/>
        <Route path="/quick-create" element={<ProtectedRoute><FeaturePage featureKey="quick-create"/></ProtectedRoute>}/>
        <Route path="/reflection-history" element={<ProtectedRoute><FeaturePage featureKey="reflection-history"/></ProtectedRoute>}/>
        <Route path="/selection-protocol" element={<ProtectedRoute><FeaturePage featureKey="selection-protocol"/></ProtectedRoute>}/>
        <Route path="/sync-conflict-resolution" element={<ProtectedRoute><FeaturePage featureKey="sync-conflict-resolution"/></ProtectedRoute>}/>
        <Route path="/table-view" element={<ProtectedRoute><FeaturePage featureKey="table-view"/></ProtectedRoute>}/>
        <Route path="/tags-management" element={<ProtectedRoute><FeaturePage featureKey="tags-management"/></ProtectedRoute>}/>
        <Route path="/team-activity" element={<ProtectedRoute><FeaturePage featureKey="team-activity"/></ProtectedRoute>}/>
        <Route path="/home-dashboard" element={<ProtectedRoute><FeaturePage featureKey="home-dashboard"/></ProtectedRoute>}/>
        <Route path="/timeline-view" element={<ProtectedRoute><FeaturePage featureKey="timeline-view"/></ProtectedRoute>}/>
        <Route path="/weekly-review" element={<ProtectedRoute><FeaturePage featureKey="weekly-review"/></ProtectedRoute>}/>
        <Route path="/create-project" element={<ProtectedRoute><FeaturePage featureKey="create-project"/></ProtectedRoute>}/>
        <Route path="/project-calendar" element={<ProtectedRoute><FeaturePage featureKey="project-calendar"/></ProtectedRoute>}/>
        <Route path="/project-detail" element={<ProtectedRoute><FeaturePage featureKey="project-detail"/></ProtectedRoute>}/>
        <Route path="/account-settings" element={<ProtectedRoute><FeaturePage featureKey="account-settings"/></ProtectedRoute>}/>
        <Route path="/initial-configuration" element={<ProtectedRoute><FeaturePage featureKey="initial-configuration"/></ProtectedRoute>}/>
        <Route path="/notification-center" element={<ProtectedRoute><FeaturePage featureKey="notification-center"/></ProtectedRoute>}/>
        <Route path="/preferences-behavior" element={<ProtectedRoute><FeaturePage featureKey="preferences-behavior"/></ProtectedRoute>}/>
        <Route path="/team-settings" element={<ProtectedRoute><FeaturePage featureKey="team-settings"/></ProtectedRoute>}/>
        <Route path="/assigned-to-me" element={<ProtectedRoute><FeaturePage featureKey="assigned-to-me"/></ProtectedRoute>}/>
        <Route path="/create-task" element={<ProtectedRoute><FeaturePage featureKey="create-task"/></ProtectedRoute>}/>
        <Route path="/edit-task" element={<ProtectedRoute><FeaturePage featureKey="edit-task"/></ProtectedRoute>}/>
        <Route path="/subtask-management" element={<ProtectedRoute><FeaturePage featureKey="subtask-management"/></ProtectedRoute>}/>
        <Route path="/task-activity-history" element={<ProtectedRoute><FeaturePage featureKey="task-activity-history"/></ProtectedRoute>}/>
        <Route path="/task-assignment" element={<ProtectedRoute><FeaturePage featureKey="task-assignment"/></ProtectedRoute>}/>
        <Route path="/task-attachments" element={<ProtectedRoute><FeaturePage featureKey="task-attachments"/></ProtectedRoute>}/>
        <Route path="/task-comments" element={<ProtectedRoute><FeaturePage featureKey="task-comments"/></ProtectedRoute>}/>
        <Route path="/task-completion-trends" element={<ProtectedRoute><FeaturePage featureKey="task-completion-trends"/></ProtectedRoute>}/>
        <Route path="/task-detail" element={<ProtectedRoute><FeaturePage featureKey="task-detail"/></ProtectedRoute>}/>
        <Route path="/task-recurrence" element={<ProtectedRoute><FeaturePage featureKey="task-recurrence"/></ProtectedRoute>}/>
        <Route path="/task-reflection" element={<ProtectedRoute><FeaturePage featureKey="task-reflection"/></ProtectedRoute>}/>
        <Route path="/task-to-goal-linking" element={<ProtectedRoute><FeaturePage featureKey="task-to-goal-linking"/></ProtectedRoute>}/>
        <Route path="*" element={<div className="p-8">Page not found. <a href="/features">Open all features</a></div>}/>
      </Routes>
      </Suspense>
    </div>
  );
};
export default App;
