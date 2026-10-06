# Web and mobile parity status

The [shared catalog](../shared/featureCatalog.json) contains 153 feature entries. Both clients use the same field definitions, validation conversions and endpoint selection. The former API test suite loaded every entry against the actual Express application and an isolated MongoDB replica set; that suite was removed during repository cleanup. The table below preserves the development gaps recorded at the time of the audit.

This establishes a real-data baseline. It does not certify full 1:1 feature/component parity. Several former static mock screens now use shared CRUD or task-list interfaces. Their original charts, advanced workflows and specialized layouts have not been recreated or acceptance-tested. Generic records alone do not implement forecasting, invoicing/accounting, procurement workflows, compliance certification, customer journeys or vendor integrations.

The universal mobile Feature route resolves by catalog key. Several historical mobile names are aliases; the catalog key is the unambiguous identifier.

Public login, registration and password recovery use Firebase. Privacy, terms, legal and security content use the published PublicContent API; native displays these in its public content modal. Static navigation labels, product copy, icons and form defaults remain presentation content rather than fabricated business records.

| Feature key | Web path | Mobile name | Data source | Implementation status |
| --- | --- | --- | --- | --- |
| dashboard | /dashboard | HomeDashboard | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| today | /today | Today | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| backlog | /backlog | Backlog | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| kanban | /kanban | Kanban | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| projects | /projects | Projects | /projects | Real data; advanced views/analysis semantics require acceptance tests |
| calendar | /calendar | Calendar | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| analytics | /analytics | Analytics | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| settings | /settings | Settings | /auth/me | Shared API baseline; UI interaction/device verification pending |
| focus-detail | /focus/:id | Focus | /productivity/focus | Shared API baseline; UI interaction/device verification pending |
| team | /team | TeamSettings | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| welcome | /welcome | Welcome | /auth/me | Shared API baseline; UI interaction/device verification pending |
| first-mandate | /first-mandate | FirstMandate | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| splash | /splash | Splash | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| review | /review | Review | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| docs | /docs | Docs | /documents | Real data; advanced views/analysis semantics require acceptance tests |
| goals | /goals | Goals | /goals | Real data; advanced views/analysis semantics require acceptance tests |
| automations | /automations | Automations | /automations | Shared API baseline; UI interaction/device verification pending |
| integrations | /integrations | Integrations | /workspaces/:id (status only) | Unavailable: provider adapters not implemented |
| admin | /admin | Admin | /stripe/plans | Implemented; credentials and provider verification pending |
| tasks-detail | /tasks/:id | TaskDetail | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| inbox | /inbox | Inbox | /notifications | Shared API baseline; UI interaction/device verification pending |
| billing | /billing | Billing | /stripe/plans | Implemented; credentials and provider verification pending |
| command-palette | /command-palette | CommandPalette | /search | Shared API baseline; UI interaction/device verification pending |
| profile-settings | /profile-settings | ProfileSettings | /auth/me | Shared API baseline; UI interaction/device verification pending |
| security-settings | /security-settings | SecurityProtocols | /auth/me | Shared API baseline; UI interaction/device verification pending |
| notifications-settings | /notifications-settings | NotificationPrefs | /auth/me | Shared API baseline; UI interaction/device verification pending |
| projects-detail | /projects/:id | ProjectDetail | /projects/:id | Shared API baseline; UI interaction/device verification pending |
| team-workspace | /team-workspace | TeamDashboard | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| daily-planning | /daily-planning | DailyPlanning | /planning/daily | Shared API baseline; UI interaction/device verification pending |
| end-of-day-review | /end-of-day-review | EndOfDayReview | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| focus-summary | /focus-summary | FocusSummary | /productivity/focus | Shared API baseline; UI interaction/device verification pending |
| lock-in | /lock-in | LockIn | /planning/daily | Shared API baseline; UI interaction/device verification pending |
| goals-detail | /goals/:id | GoalDetail | /goals/:id | Shared API baseline; UI interaction/device verification pending |
| automation-rules | /automation-rules | AutomationRules | /automations | Shared API baseline; UI interaction/device verification pending |
| automation-logs | /automation-logs | AutomationLogs | /activities | Shared API baseline; UI interaction/device verification pending |
| device-management | /device-management | DeviceManagement | /account/sessions | Shared API baseline; UI interaction/device verification pending |
| permissions | /permissions | Permissions | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| theme-appearance | /theme-appearance | ThemeAppearance | /auth/me | Shared API baseline; UI interaction/device verification pending |
| accountability-matrix | /accountability-matrix | AccountabilityMatrix | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| data-export | /data-export | DataExport | /account/export | Shared API baseline; UI interaction/device verification pending |
| notification-preferences | /notification-preferences | NotificationPreferences | /auth/me | Shared API baseline; UI interaction/device verification pending |
| personalized-insights | /personalized-insights | AiInsights | /ai/burnout | Real data; advanced views/analysis semantics require acceptance tests |
| priority-recommendations | /priority-recommendations | AiPriority | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| smart-rescheduling | /smart-rescheduling | AiSmartRescheduling | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| task-breakdown | /task-breakdown | AiTaskBreakdown | /tasks | Implemented; Gemini credentials and verification pending |
| global-search | /global-search | GlobalSearch | /search | Shared API baseline; UI interaction/device verification pending |
| keyboard-shortcuts | /keyboard-shortcuts | KeyboardShortcuts | /tasks | Navigation help; shortcut configuration not implemented |
| saved-views | /saved-views | SavedViews | /productivity/saved-views | Shared API baseline; UI interaction/device verification pending |
| reminder-settings | /reminder-settings | ReminderSettings | /auth/me | Shared API baseline; UI interaction/device verification pending |
| offline-mode | /offline-mode | OfflineMode | /status | Connectivity/status only; offline recovery not implemented |
| maintenance-downtime | /maintenance-downtime | Maintenance | /status | Connectivity/status only; offline recovery not implemented |
| monthly-review | /monthly-review | MonthlyReview | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| goal-timeline | /goal-timeline | ProjectTimeline | /goals | Real data; advanced views/analysis semantics require acceptance tests |
| task-templates | /task-templates | TaskTemplates | /features/task-templates | Persisted CRUD baseline; advanced domain semantics not certified |
| focus-mode | /focus-mode | FocusMode | /productivity/focus | Shared API baseline; UI interaction/device verification pending |
| team-health | /team-health | TeamHealth | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| workspace-audit | /workspace-audit | WorkspaceAudit | /activities | Shared API baseline; UI interaction/device verification pending |
| custom-reports | /custom-reports | CustomReports | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| decision-log | /decision-log | DecisionLog | /features/decision-log | Persisted CRUD baseline; advanced domain semantics not certified |
| automation-playbooks | /automation-playbooks | AutomationPlaybooks | /automations | Shared API baseline; UI interaction/device verification pending |
| knowledge-base | /knowledge-base | KnowledgeBase | /documents | Real data; advanced views/analysis semantics require acceptance tests |
| release-notes | /release-notes | ReleaseNotes | /features/release-notes | Persisted CRUD baseline; advanced domain semantics not certified |
| status-center | /status-center | StatusCenter | /status | Connectivity/status only; offline recovery not implemented |
| meeting-notes | /meeting-notes | MeetingNotes | /features/meeting-notes | Persisted CRUD baseline; advanced domain semantics not certified |
| stakeholder-map | /stakeholder-map | StakeholderMap | /features/stakeholder-map | Persisted CRUD baseline; advanced domain semantics not certified |
| sprint-board | /sprint-board | SprintBoard | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| roadmap | /roadmap | Roadmap | /projects | Real data; advanced views/analysis semantics require acceptance tests |
| change-requests | /change-requests | ChangeRequests | /features/change-requests | Persisted CRUD baseline; advanced domain semantics not certified |
| escalations | /escalations | Escalations | /features/escalations | Persisted CRUD baseline; advanced domain semantics not certified |
| risk-register | /risk-register | RiskRegister | /features/risk-register | Persisted CRUD baseline; advanced domain semantics not certified |
| capacity-planning | /capacity-planning | CapacityView | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| signal-center | /signal-center | SignalCenter | /notifications | Shared API baseline; UI interaction/device verification pending |
| workstreams | /workstreams | Workstreams | /projects | Real data; advanced views/analysis semantics require acceptance tests |
| milestone-tracker | /milestone-tracker | MilestoneTracker | /features/milestone-tracker | Persisted CRUD baseline; advanced domain semantics not certified |
| dependency-map | /dependency-map | DependencyMap | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| incident-log | /incident-log | IncidentLog | /features/incident-log | Persisted CRUD baseline; advanced domain semantics not certified |
| people-directory | /people-directory | PeopleDirectory | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| workload-balancer | /workload-balancer | WorkloadBalancer | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| retention-insights | /retention-insights | RetentionInsights | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| customer-journey | /customer-journey | CustomerJourney | /features/customer-journey | Persisted CRUD baseline; advanced domain semantics not certified |
| partner-portal | /partner-portal | PartnerPortal | /features/partner-portal | Persisted CRUD baseline; advanced domain semantics not certified |
| vendor-management | /vendor-management | VendorManagement | /features/vendor-management | Persisted CRUD baseline; advanced domain semantics not certified |
| compliance-center | /compliance-center | ComplianceCenter | /features/compliance-center | Persisted CRUD baseline; advanced domain semantics not certified |
| procurement-hub | /procurement-hub | ProcurementHub | /features/procurement-hub | Persisted CRUD baseline; advanced domain semantics not certified |
| support-desk | /support-desk | SupportDesk | /features/support-desk | Persisted CRUD baseline; advanced domain semantics not certified |
| knowledge-share | /knowledge-share | KnowledgeShare | /documents | Real data; advanced views/analysis semantics require acceptance tests |
| finance-overview | /finance-overview | FinanceOverview | /features/finance-overview | Persisted CRUD baseline; advanced domain semantics not certified |
| budget-planning | /budget-planning | BudgetPlanning | /features/budget-planning | Persisted CRUD baseline; advanced domain semantics not certified |
| invoice-tracker | /invoice-tracker | InvoiceTracker | /features/invoice-tracker | Persisted CRUD baseline; advanced domain semantics not certified |
| forecasting | /forecasting | Forecasting | /features/forecasting | Persisted CRUD baseline; advanced domain semantics not certified |
| executive-summary | /executive-summary | ExecutiveSummary | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| impact-report | /impact-report | ImpactReport | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| board-view | /board-view | BoardView | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| workspace-overview | /workspace-overview | WorkspaceOverview | /projects | Real data; advanced views/analysis semantics require acceptance tests |
| mobile-workspace | /mobile-workspace | MobileWorkspace | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| quick-actions | /quick-actions | QuickActions | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| activity-stream | /activity-stream | ActivityStream | /activities | Shared API baseline; UI interaction/device verification pending |
| automation-center | /automation-center | AutomationCenter | /automations | Shared API baseline; UI interaction/device verification pending |
| workspace-templates | /workspace-templates | WorkspaceTemplates | /features/workspace-templates | Persisted CRUD baseline; advanced domain semantics not certified |
| burnout-insights | /burnout-insights | BurnoutInsights | /ai/burnout | Real data; advanced views/analysis semantics require acceptance tests |
| deviation-report | /deviation-report | DeviationReport | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| personnel-ledger | /personnel-ledger | PersonnelLedger | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| rule-builder | /rule-builder | RuleBuilder | /automations | Shared API baseline; UI interaction/device verification pending |
| smart-views | /smart-views | SmartViews | /productivity/saved-views | Shared API baseline; UI interaction/device verification pending |
| commitment-history | /commitment-history | CommitmentHistory | /planning/history | Shared API baseline; UI interaction/device verification pending |
| create-goal | /create-goal | CreateGoal | /goals | Real data; advanced views/analysis semantics require acceptance tests |
| critical-alerts | /critical-alerts | CriticalAlerts | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| daily-review | /daily-review | DailyReview | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| danger-zone | /danger-zone | DangerZone | /auth/me | Shared API baseline; UI interaction/device verification pending |
| digest-preview | /digest-preview | DigestPreview | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| filter-builder | /filter-builder | FilterBuilder | /productivity/saved-views | Shared API baseline; UI interaction/device verification pending |
| focus-notes-logs | /focus-notes-logs | FocusNotesLogs | /productivity/focus | Shared API baseline; UI interaction/device verification pending |
| focus-timer-logs | /focus-timer-logs | FocusTimerLogs | /productivity/focus | Shared API baseline; UI interaction/device verification pending |
| goal-detail | /goal-detail | GoalDetail | /goals/:id | Shared API baseline; UI interaction/device verification pending |
| goal-progress-tracking | /goal-progress-tracking | GoalProgressTracking | /goals | Real data; advanced views/analysis semantics require acceptance tests |
| invite-members | /invite-members | InviteMembers | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| list-view | /list-view | ListView | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| maintenance | /maintenance | Maintenance | /status | Connectivity/status only; offline recovery not implemented |
| natural-language-input | /natural-language-input | NaturalLanguageInput | /tasks | Shared API baseline; UI interaction/device verification pending |
| ownership-transfer | /ownership-transfer | OwnershipTransfer | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| priority-status | /priority-status | PriorityStatus | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| protocol-paused | /protocol-paused | ProtocolPaused | /status | Connectivity/status only; offline recovery not implemented |
| quick-create | /quick-create | QuickCreate | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| reflection-history | /reflection-history | ReflectionHistory | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| selection-protocol | /selection-protocol | SelectionProtocol | /planning/daily | Shared API baseline; UI interaction/device verification pending |
| sync-conflict-resolution | /sync-conflict-resolution | SyncConflictResolution | /status | Connectivity/status only; offline recovery not implemented |
| table-view | /table-view | TableView | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| tags-management | /tags-management | TagsManagement | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| team-activity | /team-activity | TeamActivity | /activities | Shared API baseline; UI interaction/device verification pending |
| home-dashboard | /home-dashboard | HomeDashboard | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| timeline-view | /timeline-view | TimelineView | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| weekly-review | /weekly-review | WeeklyReview | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| create-project | /create-project | CreateProject | /projects | Real data; advanced views/analysis semantics require acceptance tests |
| project-calendar | /project-calendar | ProjectCalendar | /events | Shared API baseline; UI interaction/device verification pending |
| project-detail | /project-detail | ProjectDetail | /projects/:id | Shared API baseline; UI interaction/device verification pending |
| account-settings | /account-settings | AccountSettings | /auth/me | Shared API baseline; UI interaction/device verification pending |
| initial-configuration | /initial-configuration | InitialConfiguration | /auth/me | Shared API baseline; UI interaction/device verification pending |
| notification-center | /notification-center | NotificationCenter | /notifications | Shared API baseline; UI interaction/device verification pending |
| preferences-behavior | /preferences-behavior | PreferencesBehavior | /auth/me | Shared API baseline; UI interaction/device verification pending |
| team-settings | /team-settings | TeamSettings | /workspaces/:id/members | Shared API baseline; UI interaction/device verification pending |
| assigned-to-me | /assigned-to-me | AssignedToMe | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| create-task | /create-task | CreateTask | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| edit-task | /edit-task | EditTask | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| subtask-management | /subtask-management | SubtaskManagement | /tasks | Real data; advanced views/analysis semantics require acceptance tests |
| task-activity-history | /task-activity-history | TaskActivityHistory | /activities | Shared API baseline; UI interaction/device verification pending |
| task-assignment | /task-assignment | TaskAssignment | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| task-attachments | /task-attachments | TaskAttachments | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| task-comments | /task-comments | TaskComments | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| task-completion-trends | /task-completion-trends | TaskCompletionTrends | /tasks/analytics | Real data; advanced views/analysis semantics require acceptance tests |
| task-detail | /task-detail | TaskDetail | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| task-recurrence | /task-recurrence | TaskRecurrence | /tasks/:id | Shared API baseline; UI interaction/device verification pending |
| task-reflection | /task-reflection | TaskReflection | /productivity/reviews | Shared API baseline; UI interaction/device verification pending |
| task-to-goal-linking | /task-to-goal-linking | TaskToGoalLinking | /goals | Real data; advanced views/analysis semantics require acceptance tests |
