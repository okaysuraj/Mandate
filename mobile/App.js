import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Platform } from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import { API_URL } from "./src/config";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Fonts
import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
} from "@expo-google-fonts/hanken-grotesk";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { WorkspaceProvider } from "./src/context/WorkspaceContext";
import { SocketProvider } from "./src/context/SocketContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

import LandingScreen from "./src/screens/core/LandingScreen";
import AiSmartReschedulingScreen from "./src/screens/automation/AiSmartReschedulingScreen";
import AiTaskBreakdownScreen from "./src/screens/tasks/AiTaskBreakdownScreen";
import AssignedToMeScreen from "./src/screens/tasks/AssignedToMeScreen";
import BacklogScreen from "./src/screens/tasks/BacklogScreen";
import BurnoutInsightsScreen from "./src/screens/analytics/BurnoutInsightsScreen";
import CapacityViewScreen from "./src/screens/projects/CapacityViewScreen";
import CommitmentHistoryScreen from "./src/screens/core/CommitmentHistoryScreen";
import CreateGoalScreen from "./src/screens/core/CreateGoalScreen";
import CreateProjectScreen from "./src/screens/projects/CreateProjectScreen";
import CreateTaskScreen from "./src/screens/tasks/CreateTaskScreen";
import CriticalAlertsScreen from "./src/screens/core/CriticalAlertsScreen";
import DailyReviewScreen from "./src/screens/core/DailyReviewScreen";
import DangerZoneScreen from "./src/screens/core/DangerZoneScreen";
import DataExportScreen from "./src/screens/core/DataExportScreen";
import DeviationReportScreen from "./src/screens/analytics/DeviationReportScreen";
import DigestPreviewScreen from "./src/screens/core/DigestPreviewScreen";
import EditTaskScreen from "./src/screens/tasks/EditTaskScreen";
import EmailVerificationScreen from "./src/screens/core/EmailVerificationScreen";
import EmptyStateNoMandatesScreen from "./src/screens/core/EmptyStateNoMandatesScreen";
import EmptyStateNoTasksScreen from "./src/screens/core/EmptyStateNoTasksScreen";
import ErrorScreen from "./src/screens/core/ErrorScreen";
import FilterBuilderScreen from "./src/screens/core/FilterBuilderScreen";
import FirstMandateCreationScreen from "./src/screens/auth/FirstMandateCreationScreen";
import FocusNotesLogsScreen from "./src/screens/core/FocusNotesLogsScreen";
import FocusSummaryScreen from "./src/screens/core/FocusSummaryScreen";
import FocusTimerLogsScreen from "./src/screens/core/FocusTimerLogsScreen";
import GlobalSearchScreen from "./src/screens/core/GlobalSearchScreen";
import GoalProgressTrackingScreen from "./src/screens/core/GoalProgressTrackingScreen";
import HomeDashboardScreen from "./src/screens/dashboard/HomeDashboardScreen";
import InitialConfigurationScreen from "./src/screens/settings/InitialConfigurationScreen";
import InviteMembersScreen from "./src/screens/core/InviteMembersScreen";
import KeyboardShortcutsScreen from "./src/screens/core/KeyboardShortcutsScreen";
import MaintenanceScreen from "./src/screens/core/MaintenanceScreen";
import MonthlyReviewScreen from "./src/screens/planning/MonthlyReviewScreen";
import NaturalLanguageInputScreen from "./src/screens/core/NaturalLanguageInputScreen";
import NotificationPreferencesScreen from "./src/screens/settings/NotificationPreferencesScreen";
import OfflineModeScreen from "./src/screens/core/OfflineModeScreen";
import OwnershipTransferScreen from "./src/screens/core/OwnershipTransferScreen";
import PreferencesBehaviorScreen from "./src/screens/settings/PreferencesBehaviorScreen";
import PriorityStatusScreen from "./src/screens/core/PriorityStatusScreen";
import ProjectTimelineScreen from "./src/screens/projects/ProjectTimelineScreen";
import ProtocolPausedScreen from "./src/screens/core/ProtocolPausedScreen";
import QuickCreateScreen from "./src/screens/core/QuickCreateScreen";
import ReflectionHistoryScreen from "./src/screens/core/ReflectionHistoryScreen";
import SavedViewsScreen from "./src/screens/core/SavedViewsScreen";
import SelectionProtocolScreen from "./src/screens/core/SelectionProtocolScreen";
import SmartViewsScreen from "./src/screens/automation/SmartViewsScreen";
import SplashScreen from "./src/screens/auth/SplashScreen";
import SubtaskManagementScreen from "./src/screens/tasks/SubtaskManagementScreen";
import SyncConflictResolutionScreen from "./src/screens/core/SyncConflictResolutionScreen";
import TableViewScreen from "./src/screens/core/TableViewScreen";
import TagsManagementScreen from "./src/screens/core/TagsManagementScreen";
import TaskActivityHistoryScreen from "./src/screens/tasks/TaskActivityHistoryScreen";
import TaskAssignmentScreen from "./src/screens/tasks/TaskAssignmentScreen";
import TaskAttachmentsScreen from "./src/screens/tasks/TaskAttachmentsScreen";
import TaskCommentsScreen from "./src/screens/tasks/TaskCommentsScreen";
import TaskCompletionTrendsScreen from "./src/screens/tasks/TaskCompletionTrendsScreen";
import TaskRecurrenceScreen from "./src/screens/tasks/TaskRecurrenceScreen";
import TaskReflectionScreen from "./src/screens/tasks/TaskReflectionScreen";
import TaskToGoalLinkingScreen from "./src/screens/tasks/TaskToGoalLinkingScreen";
import TeamActivityScreen from "./src/screens/core/TeamActivityScreen";
import WeeklyReviewScreen from "./src/screens/planning/WeeklyReviewScreen";
import WelcomeScreen from "./src/screens/auth/WelcomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";
import TodayScreen from "./src/screens/tasks/TodayScreen";
import KanbanScreen from "./src/screens/tasks/KanbanScreen";
import TaskDetailScreen from "./src/screens/tasks/TaskDetailScreen";
import CalendarScreen from "./src/screens/planning/CalendarScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import TeamSettingsScreen from "./src/screens/settings/TeamSettingsScreen";
import PricingScreen from "./src/screens/core/PricingScreen";
import DocsScreen from "./src/screens/core/DocsScreen";
import GoalsScreen from "./src/screens/core/GoalsScreen";
import GoalDetailScreen from "./src/screens/core/GoalDetailScreen";
import AdminScreen from "./src/screens/core/AdminScreen";
import AutomationsScreen from "./src/screens/automation/AutomationsScreen";
import IntegrationsScreen from "./src/screens/core/IntegrationsScreen";
import ProjectsScreen from "./src/screens/projects/ProjectsScreen";
import ProjectDetailScreen from "./src/screens/projects/ProjectDetailScreen";
import AnalyticsScreen from "./src/screens/analytics/AnalyticsScreen";
import InboxScreen from "./src/screens/tasks/InboxScreen";
import FocusModeScreen from "./src/screens/core/FocusModeScreen";
import LockInScreen from "./src/screens/auth/LockInScreen";
import DailyPlanningScreen from "./src/screens/planning/DailyPlanningScreen";
import EndOfDayReviewScreen from "./src/screens/planning/EndOfDayReviewScreen";
import ProjectCalendarScreen from "./src/screens/projects/ProjectCalendarScreen";
import TimelineViewScreen from "./src/screens/planning/TimelineViewScreen";
import ListViewScreen from "./src/screens/core/ListViewScreen";
import TeamDashboardScreen from "./src/screens/core/TeamDashboardScreen";
import PersonnelLedgerScreen from "./src/screens/analytics/PersonnelLedgerScreen";
import AiInsightsScreen from "./src/screens/automation/AiInsightsScreen";
import AiPriorityScreen from "./src/screens/automation/AiPriorityScreen";
import AutomationRulesScreen from "./src/screens/automation/AutomationRulesScreen";
import RuleBuilderScreen from "./src/screens/automation/RuleBuilderScreen";
import ProfileSettingsScreen from "./src/screens/settings/ProfileSettingsScreen";
import AccountSettingsScreen from "./src/screens/settings/AccountSettingsScreen";
import ThemeAppearanceScreen from "./src/screens/settings/ThemeAppearanceScreen";
import SecurityProtocolsScreen from "./src/screens/settings/SecurityProtocolsScreen";
import AutomationLogsScreen from "./src/screens/automation/AutomationLogsScreen";
import BillingScreen from "./src/screens/settings/BillingScreen";
import PermissionsScreen from "./src/screens/settings/PermissionsScreen";
import AccountabilityMatrixScreen from "./src/screens/core/AccountabilityMatrixScreen";
import DeviceManagementScreen from "./src/screens/core/DeviceManagementScreen";
import NotificationPrefsScreen from "./src/screens/settings/NotificationPrefsScreen";
import NotificationCenterScreen from "./src/screens/settings/NotificationCenterScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const KanbanStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const KnowledgeStack = createNativeStackNavigator();
const ProjectsStack = createNativeStackNavigator();
const ProductivityStack = createNativeStackNavigator();

// Custom minimal tab bar icon matching BottomNavBar design
const TabIcon = ({ label, focused, iconName, colors }) => (
  <View style={[styles.tabIconContainer, focused && { borderTopColor: colors.primary, borderTopWidth: 2 }]}>
    <MaterialIcons
      name={iconName}
      size={24}
      color={focused ? colors.primary : colors.secondary}
    />
    <Text style={[styles.tabLabel, { color: focused ? colors.primary : colors.secondary }]}>
      {label}
    </Text>
  </View>
);

const KanbanStackScreen = () => (
  <KanbanStack.Navigator screenOptions={{ headerShown: false }}>
    <KanbanStack.Screen name="KanbanMain" component={KanbanScreen} />
    <KanbanStack.Screen name="TaskDetail" component={TaskDetailScreen} />
  </KanbanStack.Navigator>
);

const ProjectsStackScreen = () => (
  <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
    <ProjectsStack.Screen name="ProjectsMain" component={ProjectsScreen} />
    <ProjectsStack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <ProjectsStack.Screen name="ProjectCalendar" component={ProjectCalendarScreen} />
    <ProjectsStack.Screen name="TimelineView" component={TimelineViewScreen} />
    <ProjectsStack.Screen name="ListView" component={ListViewScreen} />
    <ProjectsStack.Screen name="AiSmartRescheduling" component={AiSmartReschedulingScreen} />
    <ProjectsStack.Screen name="AiTaskBreakdown" component={AiTaskBreakdownScreen} />
    <ProjectsStack.Screen name="AssignedToMe" component={AssignedToMeScreen} />
    <ProjectsStack.Screen name="Backlog" component={BacklogScreen} />
    <ProjectsStack.Screen name="BurnoutInsights" component={BurnoutInsightsScreen} />
    <ProjectsStack.Screen name="CapacityView" component={CapacityViewScreen} />
    <ProjectsStack.Screen name="CommitmentHistory" component={CommitmentHistoryScreen} />
    <ProjectsStack.Screen name="CreateGoal" component={CreateGoalScreen} />
    <ProjectsStack.Screen name="CreateProject" component={CreateProjectScreen} />
    <ProjectsStack.Screen name="CreateTask" component={CreateTaskScreen} />
    <ProjectsStack.Screen name="CriticalAlerts" component={CriticalAlertsScreen} />
    <ProjectsStack.Screen name="DailyReview" component={DailyReviewScreen} />
    <ProjectsStack.Screen name="DangerZone" component={DangerZoneScreen} />
    <ProjectsStack.Screen name="DataExport" component={DataExportScreen} />
    <ProjectsStack.Screen name="DeviationReport" component={DeviationReportScreen} />
    <ProjectsStack.Screen name="DigestPreview" component={DigestPreviewScreen} />
    <ProjectsStack.Screen name="EditTask" component={EditTaskScreen} />
    <ProjectsStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
    <ProjectsStack.Screen name="EmptyStateNoMandates" component={EmptyStateNoMandatesScreen} />
    <ProjectsStack.Screen name="EmptyStateNoTasks" component={EmptyStateNoTasksScreen} />
    <ProjectsStack.Screen name="Error" component={ErrorScreen} />
    <ProjectsStack.Screen name="FilterBuilder" component={FilterBuilderScreen} />
    <ProjectsStack.Screen name="FirstMandateCreation" component={FirstMandateCreationScreen} />
    <ProjectsStack.Screen name="FocusNotesLogs" component={FocusNotesLogsScreen} />
    <ProjectsStack.Screen name="FocusSummary" component={FocusSummaryScreen} />
    <ProjectsStack.Screen name="FocusTimerLogs" component={FocusTimerLogsScreen} />
    <ProjectsStack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
    <ProjectsStack.Screen name="GoalProgressTracking" component={GoalProgressTrackingScreen} />
    <ProjectsStack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
    <ProjectsStack.Screen name="InitialConfiguration" component={InitialConfigurationScreen} />
    <ProjectsStack.Screen name="InviteMembers" component={InviteMembersScreen} />
    <ProjectsStack.Screen name="KeyboardShortcuts" component={KeyboardShortcutsScreen} />
    <ProjectsStack.Screen name="Maintenance" component={MaintenanceScreen} />
    <ProjectsStack.Screen name="MonthlyReview" component={MonthlyReviewScreen} />
    <ProjectsStack.Screen name="NaturalLanguageInput" component={NaturalLanguageInputScreen} />
    <ProjectsStack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
    <ProjectsStack.Screen name="OfflineMode" component={OfflineModeScreen} />
    <ProjectsStack.Screen name="OwnershipTransfer" component={OwnershipTransferScreen} />
    <ProjectsStack.Screen name="PreferencesBehavior" component={PreferencesBehaviorScreen} />
    <ProjectsStack.Screen name="PriorityStatus" component={PriorityStatusScreen} />
    <ProjectsStack.Screen name="ProjectTimeline" component={ProjectTimelineScreen} />
    <ProjectsStack.Screen name="ProtocolPaused" component={ProtocolPausedScreen} />
    <ProjectsStack.Screen name="QuickCreate" component={QuickCreateScreen} />
    <ProjectsStack.Screen name="ReflectionHistory" component={ReflectionHistoryScreen} />
    <ProjectsStack.Screen name="SavedViews" component={SavedViewsScreen} />
    <ProjectsStack.Screen name="SelectionProtocol" component={SelectionProtocolScreen} />
    <ProjectsStack.Screen name="SmartViews" component={SmartViewsScreen} />
    <ProjectsStack.Screen name="Splash" component={SplashScreen} />
    <ProjectsStack.Screen name="SubtaskManagement" component={SubtaskManagementScreen} />
    <ProjectsStack.Screen name="SyncConflictResolution" component={SyncConflictResolutionScreen} />
    <ProjectsStack.Screen name="TableView" component={TableViewScreen} />
    <ProjectsStack.Screen name="TagsManagement" component={TagsManagementScreen} />
    <ProjectsStack.Screen name="TaskActivityHistory" component={TaskActivityHistoryScreen} />
    <ProjectsStack.Screen name="TaskAssignment" component={TaskAssignmentScreen} />
    <ProjectsStack.Screen name="TaskAttachments" component={TaskAttachmentsScreen} />
    <ProjectsStack.Screen name="TaskComments" component={TaskCommentsScreen} />
    <ProjectsStack.Screen name="TaskCompletionTrends" component={TaskCompletionTrendsScreen} />
    <ProjectsStack.Screen name="TaskRecurrence" component={TaskRecurrenceScreen} />
    <ProjectsStack.Screen name="TaskReflection" component={TaskReflectionScreen} />
    <ProjectsStack.Screen name="TaskToGoalLinking" component={TaskToGoalLinkingScreen} />
    <ProjectsStack.Screen name="TeamActivity" component={TeamActivityScreen} />
    <ProjectsStack.Screen name="WeeklyReview" component={WeeklyReviewScreen} />
    <ProjectsStack.Screen name="Welcome" component={WelcomeScreen} />
    <ProjectsStack.Screen name="TeamDashboard" component={TeamDashboardScreen} />
    <ProjectsStack.Screen name="PersonnelLedger" component={PersonnelLedgerScreen} />
  </ProjectsStack.Navigator>
);

const ProductivityStackScreen = () => (
  <ProductivityStack.Navigator screenOptions={{ headerShown: false }}>
    <ProductivityStack.Screen name="DailyPlanning" component={DailyPlanningScreen} />
    <ProductivityStack.Screen name="LockIn" component={LockInScreen} />
    <ProductivityStack.Screen name="FocusMode" component={FocusModeScreen} />
    <ProductivityStack.Screen name="EndOfDayReview" component={EndOfDayReviewScreen} />
  </ProductivityStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    <SettingsStack.Screen name="TeamSettings" component={TeamSettingsScreen} />
    <SettingsStack.Screen name="Pricing" component={PricingScreen} />
    <SettingsStack.Screen name="Admin" component={AdminScreen} />
    <SettingsStack.Screen name="Automations" component={AutomationsScreen} />
    <SettingsStack.Screen name="Integrations" component={IntegrationsScreen} />
    <SettingsStack.Screen name="AiInsights" component={AiInsightsScreen} />
    <SettingsStack.Screen name="AiPriority" component={AiPriorityScreen} />
    <SettingsStack.Screen name="AutomationRules" component={AutomationRulesScreen} />
    <SettingsStack.Screen name="RuleBuilder" component={RuleBuilderScreen} />
    <SettingsStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <SettingsStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    <SettingsStack.Screen name="ThemeAppearance" component={ThemeAppearanceScreen} />
    <SettingsStack.Screen name="SecurityProtocols" component={SecurityProtocolsScreen} />
    <SettingsStack.Screen name="AutomationLogs" component={AutomationLogsScreen} />
    <SettingsStack.Screen name="Billing" component={BillingScreen} />
    <SettingsStack.Screen name="Permissions" component={PermissionsScreen} />
    <SettingsStack.Screen name="AccountabilityMatrix" component={AccountabilityMatrixScreen} />
    <SettingsStack.Screen name="DeviceManagement" component={DeviceManagementScreen} />
    <SettingsStack.Screen name="NotificationPrefs" component={NotificationPrefsScreen} />
    <SettingsStack.Screen name="NotificationCenter" component={NotificationCenterScreen} />
  </SettingsStack.Navigator>
);

const KnowledgeStackScreen = () => (
  <KnowledgeStack.Navigator screenOptions={{ headerShown: false }}>
    <KnowledgeStack.Screen name="KnowledgeMain" component={DocsScreen} />
    <KnowledgeStack.Screen name="Goals" component={GoalsScreen} />
    <KnowledgeStack.Screen name="GoalDetail" component={GoalDetailScreen} />
  </KnowledgeStack.Navigator>
);

const MainTabs = () => {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.outlineVariant,
          height: 64, // Standard bottom nav height
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="DASHBOARD" iconName="grid-view" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="PROJECTS" iconName="inventory-2" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Kanban"
        component={KanbanStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="ASSETS" iconName="precision-manufacturing" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Focus"
        component={ProductivityStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="FOCUS" iconName="center-focus-strong" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="ALERTS" iconName="error-outline" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="METRICS" iconName="analytics" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="SYSTEM" iconName="settings" focused={focused} colors={colors} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then(token => {
        if (token) {
          axios.post(`${API_URL}/api/users/push-token`, { expoPushToken: token })
            .catch(err => console.error('Failed to register push token', err));
        }
      });
    }
  }, [user]);

  async function registerForPushNotificationsAsync() {
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
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'YOUR_EXPO_PROJECT_ID_HERE' })).data;
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  }
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      {user ? <MainTabs /> : <AuthStack />}
    </>
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
    return null; // Or a splash screen
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <SocketProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </SocketProvider>
          </WorkspaceProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    flex: 1,
    width: "100%",
  },
  tabLabel: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0, // 0em in web
    marginTop: 2,
    textTransform: "uppercase",
  },
});
