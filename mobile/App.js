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

import LandingScreen from "./src/screens/LandingScreen";
import AiSmartReschedulingScreen from "./src/screens/AiSmartReschedulingScreen";
import AiTaskBreakdownScreen from "./src/screens/AiTaskBreakdownScreen";
import AssignedToMeScreen from "./src/screens/AssignedToMeScreen";
import BacklogScreen from "./src/screens/BacklogScreen";
import BurnoutInsightsScreen from "./src/screens/BurnoutInsightsScreen";
import CapacityViewScreen from "./src/screens/CapacityViewScreen";
import CommitmentHistoryScreen from "./src/screens/CommitmentHistoryScreen";
import CreateGoalScreen from "./src/screens/CreateGoalScreen";
import CreateProjectScreen from "./src/screens/CreateProjectScreen";
import CreateTaskScreen from "./src/screens/CreateTaskScreen";
import CriticalAlertsScreen from "./src/screens/CriticalAlertsScreen";
import DailyReviewScreen from "./src/screens/DailyReviewScreen";
import DangerZoneScreen from "./src/screens/DangerZoneScreen";
import DataExportScreen from "./src/screens/DataExportScreen";
import DeviationReportScreen from "./src/screens/DeviationReportScreen";
import DigestPreviewScreen from "./src/screens/DigestPreviewScreen";
import EditTaskScreen from "./src/screens/EditTaskScreen";
import EmailVerificationScreen from "./src/screens/EmailVerificationScreen";
import EmptyStateNoMandatesScreen from "./src/screens/EmptyStateNoMandatesScreen";
import EmptyStateNoTasksScreen from "./src/screens/EmptyStateNoTasksScreen";
import ErrorScreen from "./src/screens/ErrorScreen";
import FilterBuilderScreen from "./src/screens/FilterBuilderScreen";
import FirstMandateCreationScreen from "./src/screens/FirstMandateCreationScreen";
import FocusNotesLogsScreen from "./src/screens/FocusNotesLogsScreen";
import FocusSummaryScreen from "./src/screens/FocusSummaryScreen";
import FocusTimerLogsScreen from "./src/screens/FocusTimerLogsScreen";
import GlobalSearchScreen from "./src/screens/GlobalSearchScreen";
import GoalProgressTrackingScreen from "./src/screens/GoalProgressTrackingScreen";
import HomeDashboardScreen from "./src/screens/HomeDashboardScreen";
import InitialConfigurationScreen from "./src/screens/InitialConfigurationScreen";
import InviteMembersScreen from "./src/screens/InviteMembersScreen";
import KeyboardShortcutsScreen from "./src/screens/KeyboardShortcutsScreen";
import MaintenanceScreen from "./src/screens/MaintenanceScreen";
import MonthlyReviewScreen from "./src/screens/MonthlyReviewScreen";
import NaturalLanguageInputScreen from "./src/screens/NaturalLanguageInputScreen";
import NotificationPreferencesScreen from "./src/screens/NotificationPreferencesScreen";
import OfflineModeScreen from "./src/screens/OfflineModeScreen";
import OwnershipTransferScreen from "./src/screens/OwnershipTransferScreen";
import PreferencesBehaviorScreen from "./src/screens/PreferencesBehaviorScreen";
import PriorityStatusScreen from "./src/screens/PriorityStatusScreen";
import ProjectTimelineScreen from "./src/screens/ProjectTimelineScreen";
import ProtocolPausedScreen from "./src/screens/ProtocolPausedScreen";
import QuickCreateScreen from "./src/screens/QuickCreateScreen";
import ReflectionHistoryScreen from "./src/screens/ReflectionHistoryScreen";
import SavedViewsScreen from "./src/screens/SavedViewsScreen";
import SelectionProtocolScreen from "./src/screens/SelectionProtocolScreen";
import SmartViewsScreen from "./src/screens/SmartViewsScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SubtaskManagementScreen from "./src/screens/SubtaskManagementScreen";
import SyncConflictResolutionScreen from "./src/screens/SyncConflictResolutionScreen";
import TableViewScreen from "./src/screens/TableViewScreen";
import TagsManagementScreen from "./src/screens/TagsManagementScreen";
import TaskActivityHistoryScreen from "./src/screens/TaskActivityHistoryScreen";
import TaskAssignmentScreen from "./src/screens/TaskAssignmentScreen";
import TaskAttachmentsScreen from "./src/screens/TaskAttachmentsScreen";
import TaskCommentsScreen from "./src/screens/TaskCommentsScreen";
import TaskCompletionTrendsScreen from "./src/screens/TaskCompletionTrendsScreen";
import TaskRecurrenceScreen from "./src/screens/TaskRecurrenceScreen";
import TaskReflectionScreen from "./src/screens/TaskReflectionScreen";
import TaskToGoalLinkingScreen from "./src/screens/TaskToGoalLinkingScreen";
import TeamActivityScreen from "./src/screens/TeamActivityScreen";
import WeeklyReviewScreen from "./src/screens/WeeklyReviewScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import TodayScreen from "./src/screens/TodayScreen";
import KanbanScreen from "./src/screens/KanbanScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import TeamSettingsScreen from "./src/screens/TeamSettingsScreen";
import PricingScreen from "./src/screens/PricingScreen";
import DocsScreen from "./src/screens/DocsScreen";
import GoalsScreen from "./src/screens/GoalsScreen";
import GoalDetailScreen from "./src/screens/GoalDetailScreen";
import AdminScreen from "./src/screens/AdminScreen";
import AutomationsScreen from "./src/screens/AutomationsScreen";
import IntegrationsScreen from "./src/screens/IntegrationsScreen";
import ProjectsScreen from "./src/screens/ProjectsScreen";
import ProjectDetailScreen from "./src/screens/ProjectDetailScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import InboxScreen from "./src/screens/InboxScreen";
import FocusModeScreen from "./src/screens/FocusModeScreen";
import LockInScreen from "./src/screens/LockInScreen";
import DailyPlanningScreen from "./src/screens/DailyPlanningScreen";
import EndOfDayReviewScreen from "./src/screens/EndOfDayReviewScreen";
import ProjectCalendarScreen from "./src/screens/ProjectCalendarScreen";
import TimelineViewScreen from "./src/screens/TimelineViewScreen";
import ListViewScreen from "./src/screens/ListViewScreen";
import TeamDashboardScreen from "./src/screens/TeamDashboardScreen";
import PersonnelLedgerScreen from "./src/screens/PersonnelLedgerScreen";
import AiInsightsScreen from "./src/screens/AiInsightsScreen";
import AiPriorityScreen from "./src/screens/AiPriorityScreen";
import AutomationRulesScreen from "./src/screens/AutomationRulesScreen";
import RuleBuilderScreen from "./src/screens/RuleBuilderScreen";
import ProfileSettingsScreen from "./src/screens/ProfileSettingsScreen";
import AccountSettingsScreen from "./src/screens/AccountSettingsScreen";
import ThemeAppearanceScreen from "./src/screens/ThemeAppearanceScreen";
import SecurityProtocolsScreen from "./src/screens/SecurityProtocolsScreen";
import AutomationLogsScreen from "./src/screens/AutomationLogsScreen";
import BillingScreen from "./src/screens/BillingScreen";
import PermissionsScreen from "./src/screens/PermissionsScreen";
import AccountabilityMatrixScreen from "./src/screens/AccountabilityMatrixScreen";
import DeviceManagementScreen from "./src/screens/DeviceManagementScreen";
import NotificationPrefsScreen from "./src/screens/NotificationPrefsScreen";
import NotificationCenterScreen from "./src/screens/NotificationCenterScreen";
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
