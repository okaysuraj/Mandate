const FeatureScreen = () => require('./src/components/features/FeatureScreen').default;
const FeatureIndexScreen = () => require('./src/components/features/FeatureScreen').FeatureIndexScreen;
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import * as Device from 'expo-device';
import api from './src/services/api';
import { API_URL } from "./src/config";

// expo-notifications native module is NOT available inside Expo Go (SDK 53+).
// We lazily require() the module only when running in a development/production build.
let Notifications = null;
if (!isRunningInExpoGo()) {
  try {
    Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (err) {
    console.warn('[Notifications] Setup failed:', err.name);
  }
} else {
  console.log('[Notifications] Skipped: expo-notifications is not available in Expo Go. Use a development build for push notifications.');
}

// Fonts
const HankenGrotesk_400Regular = require("@expo-google-fonts/hanken-grotesk/400Regular/HankenGrotesk_400Regular.ttf");
const HankenGrotesk_500Medium = require("@expo-google-fonts/hanken-grotesk/500Medium/HankenGrotesk_500Medium.ttf");
const HankenGrotesk_600SemiBold = require("@expo-google-fonts/hanken-grotesk/600SemiBold/HankenGrotesk_600SemiBold.ttf");
const HankenGrotesk_700Bold = require("@expo-google-fonts/hanken-grotesk/700Bold/HankenGrotesk_700Bold.ttf");
const HankenGrotesk_800ExtraBold = require("@expo-google-fonts/hanken-grotesk/800ExtraBold/HankenGrotesk_800ExtraBold.ttf");
const JetBrainsMono_400Regular = require("@expo-google-fonts/jetbrains-mono/400Regular/JetBrainsMono_400Regular.ttf");
const JetBrainsMono_500Medium = require("@expo-google-fonts/jetbrains-mono/500Medium/JetBrainsMono_500Medium.ttf");
const JetBrainsMono_600SemiBold = require("@expo-google-fonts/jetbrains-mono/600SemiBold/JetBrainsMono_600SemiBold.ttf");
const JetBrainsMono_700Bold = require("@expo-google-fonts/jetbrains-mono/700Bold/JetBrainsMono_700Bold.ttf");

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { WorkspaceProvider } from "./src/context/WorkspaceContext";
import { SocketProvider } from "./src/context/SocketContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { DrawerProvider, useDrawerActions } from "./src/context/DrawerContext";
import SidebarOverlay from "./src/components/layout/SidebarOverlay";
import { navigationRef } from "./src/navigation/navigationRef";

const LandingScreen = () => require("./src/screens/core/LandingScreen").default;
const AiSmartReschedulingScreen = () => require("./src/screens/automation/AiSmartReschedulingScreen").default;
const AiTaskBreakdownScreen = () => require("./src/screens/tasks/AiTaskBreakdownScreen").default;
const AssignedToMeScreen = () => require("./src/screens/tasks/AssignedToMeScreen").default;
const BacklogScreen = () => require("./src/screens/tasks/BacklogScreen").default;
const BurnoutInsightsScreen = () => require("./src/screens/analytics/BurnoutInsightsScreen").default;
const CapacityViewScreen = () => require("./src/screens/projects/CapacityViewScreen").default;
const CommitmentHistoryScreen = () => require("./src/screens/core/CommitmentHistoryScreen").default;
const CreateGoalScreen = () => require("./src/screens/core/CreateGoalScreen").default;
const CreateProjectScreen = () => require("./src/screens/projects/CreateProjectScreen").default;
const CreateTaskScreen = () => require("./src/screens/tasks/CreateTaskScreen").default;
const CriticalAlertsScreen = () => require("./src/screens/core/CriticalAlertsScreen").default;
const DailyReviewScreen = () => require("./src/screens/core/DailyReviewScreen").default;
const DangerZoneScreen = () => require("./src/screens/core/DangerZoneScreen").default;
const DataExportScreen = () => require("./src/screens/core/DataExportScreen").default;
const DeviationReportScreen = () => require("./src/screens/analytics/DeviationReportScreen").default;
const DigestPreviewScreen = () => require("./src/screens/core/DigestPreviewScreen").default;
const EditTaskScreen = () => require("./src/screens/tasks/EditTaskScreen").default;
const EmailVerificationScreen = () => require("./src/screens/core/EmailVerificationScreen").default;
const EmptyStateNoMandatesScreen = () => require("./src/screens/core/EmptyStateNoMandatesScreen").default;
const EmptyStateNoTasksScreen = () => require("./src/screens/core/EmptyStateNoTasksScreen").default;
const ErrorScreen = () => require("./src/screens/core/ErrorScreen").default;
const FilterBuilderScreen = () => require("./src/screens/core/FilterBuilderScreen").default;
const FirstMandateCreationScreen = () => require("./src/screens/auth/FirstMandateCreationScreen").default;
const FocusNotesLogsScreen = () => require("./src/screens/core/FocusNotesLogsScreen").default;
const FocusSummaryScreen = () => require("./src/screens/core/FocusSummaryScreen").default;
const FocusTimerLogsScreen = () => require("./src/screens/core/FocusTimerLogsScreen").default;
const GlobalSearchScreen = () => require("./src/screens/core/GlobalSearchScreen").default;
const GoalProgressTrackingScreen = () => require("./src/screens/core/GoalProgressTrackingScreen").default;
const HomeDashboardScreen = () => require("./src/screens/dashboard/HomeDashboardScreen").default;
const InitialConfigurationScreen = () => require("./src/screens/settings/InitialConfigurationScreen").default;
const InviteMembersScreen = () => require("./src/screens/core/InviteMembersScreen").default;
const KeyboardShortcutsScreen = () => require("./src/screens/core/KeyboardShortcutsScreen").default;
const MaintenanceScreen = () => require("./src/screens/core/MaintenanceScreen").default;
const MonthlyReviewScreen = () => require("./src/screens/planning/MonthlyReviewScreen").default;
const NaturalLanguageInputScreen = () => require("./src/screens/core/NaturalLanguageInputScreen").default;
const NotificationPreferencesScreen = () => require("./src/screens/settings/NotificationPreferencesScreen").default;
const OfflineModeScreen = () => require("./src/screens/core/OfflineModeScreen").default;
const OwnershipTransferScreen = () => require("./src/screens/core/OwnershipTransferScreen").default;
const PreferencesBehaviorScreen = () => require("./src/screens/settings/PreferencesBehaviorScreen").default;
const PriorityStatusScreen = () => require("./src/screens/core/PriorityStatusScreen").default;
const ProjectTimelineScreen = () => require("./src/screens/projects/ProjectTimelineScreen").default;
const ProtocolPausedScreen = () => require("./src/screens/core/ProtocolPausedScreen").default;
const QuickCreateScreen = () => require("./src/screens/core/QuickCreateScreen").default;
const ReflectionHistoryScreen = () => require("./src/screens/core/ReflectionHistoryScreen").default;
const SavedViewsScreen = () => require("./src/screens/core/SavedViewsScreen").default;
const SelectionProtocolScreen = () => require("./src/screens/core/SelectionProtocolScreen").default;
const SmartViewsScreen = () => require("./src/screens/automation/SmartViewsScreen").default;
const SplashScreen = () => require("./src/screens/auth/SplashScreen").default;
const SubtaskManagementScreen = () => require("./src/screens/tasks/SubtaskManagementScreen").default;
const SyncConflictResolutionScreen = () => require("./src/screens/core/SyncConflictResolutionScreen").default;
const TableViewScreen = () => require("./src/screens/core/TableViewScreen").default;
const TagsManagementScreen = () => require("./src/screens/core/TagsManagementScreen").default;
const TaskActivityHistoryScreen = () => require("./src/screens/tasks/TaskActivityHistoryScreen").default;
const TaskAssignmentScreen = () => require("./src/screens/tasks/TaskAssignmentScreen").default;
const TaskAttachmentsScreen = () => require("./src/screens/tasks/TaskAttachmentsScreen").default;
const TaskCommentsScreen = () => require("./src/screens/tasks/TaskCommentsScreen").default;
const TaskCompletionTrendsScreen = () => require("./src/screens/tasks/TaskCompletionTrendsScreen").default;
const TaskRecurrenceScreen = () => require("./src/screens/tasks/TaskRecurrenceScreen").default;
const TaskReflectionScreen = () => require("./src/screens/tasks/TaskReflectionScreen").default;
const TaskToGoalLinkingScreen = () => require("./src/screens/tasks/TaskToGoalLinkingScreen").default;
const TeamActivityScreen = () => require("./src/screens/core/TeamActivityScreen").default;
const WeeklyReviewScreen = () => require("./src/screens/planning/WeeklyReviewScreen").default;
const WelcomeScreen = () => require("./src/screens/auth/WelcomeScreen").default;
const LoginScreen = () => require("./src/screens/auth/LoginScreen").default;
const RegisterScreen = () => require("./src/screens/auth/RegisterScreen").default;
const ForgotPasswordScreen = () => require("./src/screens/auth/ForgotPasswordScreen").default;
const TodayScreen = () => require("./src/screens/tasks/TodayScreen").default;
const KanbanScreen = () => require("./src/screens/tasks/KanbanScreen").default;
const TaskDetailScreen = () => require("./src/screens/tasks/TaskDetailScreen").default;
const CalendarScreen = () => require("./src/screens/planning/CalendarScreen").default;
const SettingsScreen = () => require("./src/screens/settings/SettingsScreen").default;
const TeamSettingsScreen = () => require("./src/screens/settings/TeamSettingsScreen").default;
const PricingScreen = () => require("./src/screens/core/PricingScreen").default;
const DocsScreen = () => require("./src/screens/core/DocsScreen").default;
const GoalsScreen = () => require("./src/screens/core/GoalsScreen").default;
const GoalDetailScreen = () => require("./src/screens/core/GoalDetailScreen").default;
const AdminScreen = () => require("./src/screens/core/AdminScreen").default;
const AutomationsScreen = () => require("./src/screens/automation/AutomationsScreen").default;
const IntegrationsScreen = () => require("./src/screens/core/IntegrationsScreen").default;
const ProjectsScreen = () => require("./src/screens/projects/ProjectsScreen").default;
const ProjectDetailScreen = () => require("./src/screens/projects/ProjectDetailScreen").default;
const AnalyticsScreen = () => require("./src/screens/analytics/AnalyticsScreen").default;
const InboxScreen = () => require("./src/screens/tasks/InboxScreen").default;
const FocusModeScreen = () => require("./src/screens/core/FocusModeScreen").default;
const LockInScreen = () => require("./src/screens/auth/LockInScreen").default;
const DailyPlanningScreen = () => require("./src/screens/planning/DailyPlanningScreen").default;
const EndOfDayReviewScreen = () => require("./src/screens/planning/EndOfDayReviewScreen").default;
const ProjectCalendarScreen = () => require("./src/screens/projects/ProjectCalendarScreen").default;
const TimelineViewScreen = () => require("./src/screens/planning/TimelineViewScreen").default;
const ListViewScreen = () => require("./src/screens/core/ListViewScreen").default;
const TeamDashboardScreen = () => require("./src/screens/core/TeamDashboardScreen").default;
const PersonnelLedgerScreen = () => require("./src/screens/analytics/PersonnelLedgerScreen").default;
const AiInsightsScreen = () => require("./src/screens/automation/AiInsightsScreen").default;
const AiPriorityScreen = () => require("./src/screens/automation/AiPriorityScreen").default;
const AutomationRulesScreen = () => require("./src/screens/automation/AutomationRulesScreen").default;
const RuleBuilderScreen = () => require("./src/screens/automation/RuleBuilderScreen").default;
const ProfileSettingsScreen = () => require("./src/screens/settings/ProfileSettingsScreen").default;
const AccountSettingsScreen = () => require("./src/screens/settings/AccountSettingsScreen").default;
const ThemeAppearanceScreen = () => require("./src/screens/settings/ThemeAppearanceScreen").default;
const SecurityProtocolsScreen = () => require("./src/screens/settings/SecurityProtocolsScreen").default;
const AutomationLogsScreen = () => require("./src/screens/automation/AutomationLogsScreen").default;
const BillingScreen = () => require("./src/screens/settings/BillingScreen").default;
const PermissionsScreen = () => require("./src/screens/settings/PermissionsScreen").default;
const AccountabilityMatrixScreen = () => require("./src/screens/core/AccountabilityMatrixScreen").default;
const DeviceManagementScreen = () => require("./src/screens/core/DeviceManagementScreen").default;
const NotificationPrefsScreen = () => require("./src/screens/settings/NotificationPrefsScreen").default;
const NotificationCenterScreen = () => require("./src/screens/settings/NotificationCenterScreen").default;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainAppStack = createNativeStackNavigator();

// Tab configuration for bottom navigation
const TAB_CONFIG = {
  Dashboard: { label: "DASHBOARD", icon: "dashboard" },
  Today: { label: "TODAY", icon: "event-available" },
  Kanban: { label: "KANBAN", icon: "view-kanban" },
  Calendar: { label: "CALENDAR", icon: "calendar-today" },
};

// Custom bottom tab bar showing complete labels without truncation, and no active indicator bar
const CustomBottomTabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom > 0 ? insets.bottom : (Platform.OS === "android" ? 12 : 8);

  return (
    <View
      style={[
        styles.customTabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant,
          paddingBottom: bottomInset,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || { label: route.name, icon: "circle" };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.customTabItem}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={config.icon}
              size={24}
              color={isFocused ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.customTabLabel,
                { color: isFocused ? colors.primary : colors.secondary },
              ]}
              numberOfLines={1}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// 4 Bottom Navigation Tabs matching Web BottomNav.jsx (Command/Dashboard, Today, Kanban, Calendar)
const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        lazy: true,
      }}
    >
      <Tab.Screen name="Dashboard" getComponent={HomeDashboardScreen} />
      <Tab.Screen name="Today" getComponent={TodayScreen} />
      <Tab.Screen name="Kanban" getComponent={KanbanScreen} />
      <Tab.Screen name="Calendar" getComponent={CalendarScreen} />
    </Tab.Navigator>
  );
};

// Main Logged-In Stack Navigator: Root is MainTabs, with all screens accessible
const MainStackNavigator = () => (
  <MainAppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Tabs">
    <MainAppStack.Screen name="Feature" getComponent={FeatureScreen}/>
    <MainAppStack.Screen name="FeatureIndex" getComponent={FeatureIndexScreen}/>
    <MainAppStack.Screen name="Tabs" component={MainTabs} />
    <MainAppStack.Screen name="Dashboard" getComponent={HomeDashboardScreen} />
    <MainAppStack.Screen name="Today" getComponent={TodayScreen} />
    <MainAppStack.Screen name="Kanban" getComponent={KanbanScreen} />
    <MainAppStack.Screen name="Calendar" getComponent={CalendarScreen} />
    <MainAppStack.Screen name="Backlog" getComponent={BacklogScreen} />
    <MainAppStack.Screen name="ProjectsMain" getComponent={ProjectsScreen} />
    <MainAppStack.Screen name="Projects" getComponent={ProjectsScreen} />
    <MainAppStack.Screen name="ProjectDetail" getComponent={ProjectDetailScreen} />
    <MainAppStack.Screen name="TaskDetail" getComponent={TaskDetailScreen} />
    <MainAppStack.Screen name="CreateTask" getComponent={CreateTaskScreen} />
    <MainAppStack.Screen name="EditTask" getComponent={EditTaskScreen} />
    <MainAppStack.Screen name="Analytics" getComponent={AnalyticsScreen} />
    <MainAppStack.Screen name="Inbox" getComponent={InboxScreen} />
    <MainAppStack.Screen name="TeamDashboard" getComponent={TeamDashboardScreen} />
    <MainAppStack.Screen name="DailyPlanning" getComponent={DailyPlanningScreen} />
    <MainAppStack.Screen name="FocusMode" getComponent={FocusModeScreen} />
    <MainAppStack.Screen name="FocusSummary" getComponent={FocusSummaryScreen} />
    <MainAppStack.Screen name="AutomationRules" getComponent={AutomationRulesScreen} />
    <MainAppStack.Screen name="RuleBuilder" getComponent={RuleBuilderScreen} />
    <MainAppStack.Screen name="AutomationLogs" getComponent={AutomationLogsScreen} />
    <MainAppStack.Screen name="Billing" getComponent={BillingScreen} />
    <MainAppStack.Screen name="Settings" getComponent={SettingsScreen} />
    <MainAppStack.Screen name="SettingsMain" getComponent={SettingsScreen} />
    <MainAppStack.Screen name="GlobalSearch" getComponent={GlobalSearchScreen} />
    <MainAppStack.Screen name="KeyboardShortcuts" getComponent={KeyboardShortcutsScreen} />
    <MainAppStack.Screen name="SavedViews" getComponent={SavedViewsScreen} />
    <MainAppStack.Screen name="MonthlyReview" getComponent={MonthlyReviewScreen} />
    <MainAppStack.Screen name="GoalProgressTracking" getComponent={GoalProgressTrackingScreen} />
    <MainAppStack.Screen name="ProjectTimeline" getComponent={ProjectTimelineScreen} />
    <MainAppStack.Screen name="CapacityView" getComponent={CapacityViewScreen} />
    <MainAppStack.Screen name="TeamActivity" getComponent={TeamActivityScreen} />
    <MainAppStack.Screen name="DeviationReport" getComponent={DeviationReportScreen} />
    <MainAppStack.Screen name="BurnoutInsights" getComponent={BurnoutInsightsScreen} />
    <MainAppStack.Screen name="PersonnelLedger" getComponent={PersonnelLedgerScreen} />
    <MainAppStack.Screen name="TableView" getComponent={TableViewScreen} />
    <MainAppStack.Screen name="CriticalAlerts" getComponent={CriticalAlertsScreen} />
    <MainAppStack.Screen name="LockIn" getComponent={LockInScreen} />
    <MainAppStack.Screen name="EndOfDayReview" getComponent={EndOfDayReviewScreen} />
    <MainAppStack.Screen name="TeamSettings" getComponent={TeamSettingsScreen} />
    <MainAppStack.Screen name="Pricing" getComponent={PricingScreen} />
    <MainAppStack.Screen name="Admin" getComponent={AdminScreen} />
    <MainAppStack.Screen name="Automations" getComponent={AutomationsScreen} />
    <MainAppStack.Screen name="Integrations" getComponent={IntegrationsScreen} />
    <MainAppStack.Screen name="AiInsights" getComponent={AiInsightsScreen} />
    <MainAppStack.Screen name="AiPriority" getComponent={AiPriorityScreen} />
    <MainAppStack.Screen name="ProfileSettings" getComponent={ProfileSettingsScreen} />
    <MainAppStack.Screen name="AccountSettings" getComponent={AccountSettingsScreen} />
    <MainAppStack.Screen name="ThemeAppearance" getComponent={ThemeAppearanceScreen} />
    <MainAppStack.Screen name="SecurityProtocols" getComponent={SecurityProtocolsScreen} />
    <MainAppStack.Screen name="Permissions" getComponent={PermissionsScreen} />
    <MainAppStack.Screen name="AccountabilityMatrix" getComponent={AccountabilityMatrixScreen} />
    <MainAppStack.Screen name="DeviceManagement" getComponent={DeviceManagementScreen} />
    <MainAppStack.Screen name="NotificationPrefs" getComponent={NotificationPrefsScreen} />
    <MainAppStack.Screen name="NotificationCenter" getComponent={NotificationCenterScreen} />
    <MainAppStack.Screen name="Docs" getComponent={DocsScreen} />
    <MainAppStack.Screen name="KnowledgeMain" getComponent={DocsScreen} />
    <MainAppStack.Screen name="Goals" getComponent={GoalsScreen} />
    <MainAppStack.Screen name="GoalDetail" getComponent={GoalDetailScreen} />
    <MainAppStack.Screen name="CreateProject" getComponent={CreateProjectScreen} />
    <MainAppStack.Screen name="CreateGoal" getComponent={CreateGoalScreen} />
    <MainAppStack.Screen name="AiSmartRescheduling" getComponent={AiSmartReschedulingScreen} />
    <MainAppStack.Screen name="AiTaskBreakdown" getComponent={AiTaskBreakdownScreen} />
    <MainAppStack.Screen name="AssignedToMe" getComponent={AssignedToMeScreen} />
    <MainAppStack.Screen name="ProjectCalendar" getComponent={ProjectCalendarScreen} />
    <MainAppStack.Screen name="TimelineView" getComponent={TimelineViewScreen} />
    <MainAppStack.Screen name="ListView" getComponent={ListViewScreen} />
    <MainAppStack.Screen name="CommitmentHistory" getComponent={CommitmentHistoryScreen} />
    <MainAppStack.Screen name="DailyReview" getComponent={DailyReviewScreen} />
    <MainAppStack.Screen name="DangerZone" getComponent={DangerZoneScreen} />
    <MainAppStack.Screen name="DataExport" getComponent={DataExportScreen} />
    <MainAppStack.Screen name="DigestPreview" getComponent={DigestPreviewScreen} />
    <MainAppStack.Screen name="EmailVerification" getComponent={EmailVerificationScreen} />
    <MainAppStack.Screen name="FilterBuilder" getComponent={FilterBuilderScreen} />
    <MainAppStack.Screen name="FocusNotesLogs" getComponent={FocusNotesLogsScreen} />
    <MainAppStack.Screen name="FocusTimerLogs" getComponent={FocusTimerLogsScreen} />
    <MainAppStack.Screen name="InitialConfiguration" getComponent={InitialConfigurationScreen} />
    <MainAppStack.Screen name="InviteMembers" getComponent={InviteMembersScreen} />
    <MainAppStack.Screen name="Maintenance" getComponent={MaintenanceScreen} />
    <MainAppStack.Screen name="NaturalLanguageInput" getComponent={NaturalLanguageInputScreen} />
    <MainAppStack.Screen name="NotificationPreferences" getComponent={NotificationPreferencesScreen} />
    <MainAppStack.Screen name="OfflineMode" getComponent={OfflineModeScreen} />
    <MainAppStack.Screen name="OwnershipTransfer" getComponent={OwnershipTransferScreen} />
    <MainAppStack.Screen name="PreferencesBehavior" getComponent={PreferencesBehaviorScreen} />
    <MainAppStack.Screen name="PriorityStatus" getComponent={PriorityStatusScreen} />
    <MainAppStack.Screen name="ProtocolPaused" getComponent={ProtocolPausedScreen} />
    <MainAppStack.Screen name="QuickCreate" getComponent={QuickCreateScreen} />
    <MainAppStack.Screen name="ReflectionHistory" getComponent={ReflectionHistoryScreen} />
    <MainAppStack.Screen name="SelectionProtocol" getComponent={SelectionProtocolScreen} />
    <MainAppStack.Screen name="SmartViews" getComponent={SmartViewsScreen} />
    <MainAppStack.Screen name="SubtaskManagement" getComponent={SubtaskManagementScreen} />
    <MainAppStack.Screen name="SyncConflictResolution" getComponent={SyncConflictResolutionScreen} />
    <MainAppStack.Screen name="TagsManagement" getComponent={TagsManagementScreen} />
    <MainAppStack.Screen name="TaskActivityHistory" getComponent={TaskActivityHistoryScreen} />
    <MainAppStack.Screen name="TaskAssignment" getComponent={TaskAssignmentScreen} />
    <MainAppStack.Screen name="TaskAttachments" getComponent={TaskAttachmentsScreen} />
    <MainAppStack.Screen name="TaskComments" getComponent={TaskCommentsScreen} />
    <MainAppStack.Screen name="TaskCompletionTrends" getComponent={TaskCompletionTrendsScreen} />
    <MainAppStack.Screen name="TaskRecurrence" getComponent={TaskRecurrenceScreen} />
    <MainAppStack.Screen name="TaskReflection" getComponent={TaskReflectionScreen} />
    <MainAppStack.Screen name="TaskToGoalLinking" getComponent={TaskToGoalLinkingScreen} />
    <MainAppStack.Screen name="WeeklyReview" getComponent={WeeklyReviewScreen} />
    <MainAppStack.Screen name="EmptyStateNoMandates" getComponent={EmptyStateNoMandatesScreen} />
    <MainAppStack.Screen name="EmptyStateNoTasks" getComponent={EmptyStateNoTasksScreen} />
    <MainAppStack.Screen name="Error" getComponent={ErrorScreen} />
  </MainAppStack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
    <Stack.Screen name="Landing" getComponent={LandingScreen} />
    <Stack.Screen name="Login" getComponent={LoginScreen} />
    <Stack.Screen name="Register" getComponent={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" getComponent={ForgotPasswordScreen} />
    <Stack.Screen name="Pricing" getComponent={PricingScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();
  const { isDark, colors } = useTheme();
  const {closeDrawer} = useDrawerActions();
  useEffect(()=>{if(!user)closeDrawer();},[user,closeDrawer]);
  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync()
        .then(token => {
          if (token) {
            api.post(`/users/push-token`, { expoPushToken: token })
              .catch(err => console.error('Failed to register push token', err.name));
          }
        })
        .catch(err => console.warn('[Notifications] Token registration failed:', err.name));
    }
  }, [user]);

  async function registerForPushNotificationsAsync() {
    // expo-notifications native module is not available in Expo Go (SDK 53+).
    if (!Notifications || isRunningInExpoGo()) {
      return null;
    }

    try {
      let token;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return null;
        }

        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        token = (await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined)).data;
      }

      return token;
    } catch (error) {
      console.warn('[Notifications] Push notification registration error:', error?.message || error);
      return null;
    }
  }

  // Prevent flash of LandingScreen when restoring cached session
  if (loading && !user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <MaterialIcons name="terminal" size={24} color={colors.onPrimary} />
        </View>
        <Text style={{ fontFamily: "HankenGrotesk-Bold", fontSize: 16, color: colors.primary, letterSpacing: 2 }}>MANDATE</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <AuthStack />
      </View>
    );
  }

  return (
    <View style={{flex:1,backgroundColor:colors.background}}>
      <StatusBar style={isDark ? "light" : "dark"}/>
      <MainStackNavigator/>
      <SidebarOverlay/>
    </View>
  );
};

const NavigationRoot = () => {
  const { colors, isDark } = useTheme();

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onSurface,
      border: colors.outlineVariant,
      notification: colors.primary,
    },
    fonts: baseTheme?.fonts || {
      regular: {
        fontFamily: "HankenGrotesk-Regular",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "HankenGrotesk-Medium",
        fontWeight: "normal",
      },
      bold: {
        fontFamily: "HankenGrotesk-Bold",
        fontWeight: "600",
      },
      heavy: {
        fontFamily: "HankenGrotesk-ExtraBold",
        fontWeight: "700",
      },
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "HankenGrotesk-Regular": HankenGrotesk_400Regular,
        "HankenGrotesk-Medium": HankenGrotesk_500Medium,
        "HankenGrotesk-SemiBold": HankenGrotesk_600SemiBold,
        "HankenGrotesk-Bold": HankenGrotesk_700Bold,
        "HankenGrotesk-ExtraBold": HankenGrotesk_800ExtraBold,
        "JetBrainsMono-Regular": JetBrainsMono_400Regular,
        "JetBrainsMono-Medium": JetBrainsMono_500Medium,
        "JetBrainsMono-SemiBold": JetBrainsMono_600SemiBold,
        "JetBrainsMono-Bold": JetBrainsMono_700Bold,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <SocketProvider>
              <DrawerProvider>
                <NavigationRoot />
              </DrawerProvider>
            </SocketProvider>
          </WorkspaceProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  customTabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  customTabLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.2,
    marginTop: 3,
    textTransform: "uppercase",
  },
});
