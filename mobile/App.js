import React, { useEffect, useState, useRef } from "react";
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
  Animated,
  Easing,
  BackHandler,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import * as Device from 'expo-device';
import axios from 'axios';
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
    console.warn('[Notifications] Setup failed:', err);
  }
} else {
  console.log('[Notifications] Skipped: expo-notifications is not available in Expo Go. Use a development build for push notifications.');
}

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
import { DrawerProvider, useDrawer } from "./src/context/DrawerContext";
import RightSidebarDrawer, { DRAWER_WIDTH } from "./src/components/layout/RightSidebarDrawer";
import { navigationRef } from "./src/navigation/navigationRef";

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
      <Tab.Screen name="Dashboard" component={HomeDashboardScreen} />
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Kanban" component={KanbanScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

// Main Logged-In Stack Navigator: Root is MainTabs, with all screens accessible
const MainStackNavigator = () => (
  <MainAppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Tabs">
    <MainAppStack.Screen name="Tabs" component={MainTabs} />
    <MainAppStack.Screen name="Dashboard" component={HomeDashboardScreen} />
    <MainAppStack.Screen name="Today" component={TodayScreen} />
    <MainAppStack.Screen name="Kanban" component={KanbanScreen} />
    <MainAppStack.Screen name="Calendar" component={CalendarScreen} />
    <MainAppStack.Screen name="Backlog" component={BacklogScreen} />
    <MainAppStack.Screen name="ProjectsMain" component={ProjectsScreen} />
    <MainAppStack.Screen name="Projects" component={ProjectsScreen} />
    <MainAppStack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <MainAppStack.Screen name="TaskDetail" component={TaskDetailScreen} />
    <MainAppStack.Screen name="CreateTask" component={CreateTaskScreen} />
    <MainAppStack.Screen name="EditTask" component={EditTaskScreen} />
    <MainAppStack.Screen name="Analytics" component={AnalyticsScreen} />
    <MainAppStack.Screen name="Inbox" component={InboxScreen} />
    <MainAppStack.Screen name="TeamDashboard" component={TeamDashboardScreen} />
    <MainAppStack.Screen name="DailyPlanning" component={DailyPlanningScreen} />
    <MainAppStack.Screen name="FocusMode" component={FocusModeScreen} />
    <MainAppStack.Screen name="FocusSummary" component={FocusSummaryScreen} />
    <MainAppStack.Screen name="AutomationRules" component={AutomationRulesScreen} />
    <MainAppStack.Screen name="RuleBuilder" component={RuleBuilderScreen} />
    <MainAppStack.Screen name="AutomationLogs" component={AutomationLogsScreen} />
    <MainAppStack.Screen name="Billing" component={BillingScreen} />
    <MainAppStack.Screen name="Settings" component={SettingsScreen} />
    <MainAppStack.Screen name="SettingsMain" component={SettingsScreen} />
    <MainAppStack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
    <MainAppStack.Screen name="KeyboardShortcuts" component={KeyboardShortcutsScreen} />
    <MainAppStack.Screen name="SavedViews" component={SavedViewsScreen} />
    <MainAppStack.Screen name="MonthlyReview" component={MonthlyReviewScreen} />
    <MainAppStack.Screen name="GoalProgressTracking" component={GoalProgressTrackingScreen} />
    <MainAppStack.Screen name="ProjectTimeline" component={ProjectTimelineScreen} />
    <MainAppStack.Screen name="CapacityView" component={CapacityViewScreen} />
    <MainAppStack.Screen name="TeamActivity" component={TeamActivityScreen} />
    <MainAppStack.Screen name="DeviationReport" component={DeviationReportScreen} />
    <MainAppStack.Screen name="BurnoutInsights" component={BurnoutInsightsScreen} />
    <MainAppStack.Screen name="PersonnelLedger" component={PersonnelLedgerScreen} />
    <MainAppStack.Screen name="TableView" component={TableViewScreen} />
    <MainAppStack.Screen name="CriticalAlerts" component={CriticalAlertsScreen} />
    <MainAppStack.Screen name="LockIn" component={LockInScreen} />
    <MainAppStack.Screen name="EndOfDayReview" component={EndOfDayReviewScreen} />
    <MainAppStack.Screen name="TeamSettings" component={TeamSettingsScreen} />
    <MainAppStack.Screen name="Pricing" component={PricingScreen} />
    <MainAppStack.Screen name="Admin" component={AdminScreen} />
    <MainAppStack.Screen name="Automations" component={AutomationsScreen} />
    <MainAppStack.Screen name="Integrations" component={IntegrationsScreen} />
    <MainAppStack.Screen name="AiInsights" component={AiInsightsScreen} />
    <MainAppStack.Screen name="AiPriority" component={AiPriorityScreen} />
    <MainAppStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <MainAppStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    <MainAppStack.Screen name="ThemeAppearance" component={ThemeAppearanceScreen} />
    <MainAppStack.Screen name="SecurityProtocols" component={SecurityProtocolsScreen} />
    <MainAppStack.Screen name="Permissions" component={PermissionsScreen} />
    <MainAppStack.Screen name="AccountabilityMatrix" component={AccountabilityMatrixScreen} />
    <MainAppStack.Screen name="DeviceManagement" component={DeviceManagementScreen} />
    <MainAppStack.Screen name="NotificationPrefs" component={NotificationPrefsScreen} />
    <MainAppStack.Screen name="NotificationCenter" component={NotificationCenterScreen} />
    <MainAppStack.Screen name="Docs" component={DocsScreen} />
    <MainAppStack.Screen name="KnowledgeMain" component={DocsScreen} />
    <MainAppStack.Screen name="Goals" component={GoalsScreen} />
    <MainAppStack.Screen name="GoalDetail" component={GoalDetailScreen} />
    <MainAppStack.Screen name="CreateProject" component={CreateProjectScreen} />
    <MainAppStack.Screen name="CreateGoal" component={CreateGoalScreen} />
    <MainAppStack.Screen name="AiSmartRescheduling" component={AiSmartReschedulingScreen} />
    <MainAppStack.Screen name="AiTaskBreakdown" component={AiTaskBreakdownScreen} />
    <MainAppStack.Screen name="AssignedToMe" component={AssignedToMeScreen} />
    <MainAppStack.Screen name="ProjectCalendar" component={ProjectCalendarScreen} />
    <MainAppStack.Screen name="TimelineView" component={TimelineViewScreen} />
    <MainAppStack.Screen name="ListView" component={ListViewScreen} />
    <MainAppStack.Screen name="CommitmentHistory" component={CommitmentHistoryScreen} />
    <MainAppStack.Screen name="DailyReview" component={DailyReviewScreen} />
    <MainAppStack.Screen name="DangerZone" component={DangerZoneScreen} />
    <MainAppStack.Screen name="DataExport" component={DataExportScreen} />
    <MainAppStack.Screen name="DigestPreview" component={DigestPreviewScreen} />
    <MainAppStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
    <MainAppStack.Screen name="FilterBuilder" component={FilterBuilderScreen} />
    <MainAppStack.Screen name="FocusNotesLogs" component={FocusNotesLogsScreen} />
    <MainAppStack.Screen name="FocusTimerLogs" component={FocusTimerLogsScreen} />
    <MainAppStack.Screen name="InitialConfiguration" component={InitialConfigurationScreen} />
    <MainAppStack.Screen name="InviteMembers" component={InviteMembersScreen} />
    <MainAppStack.Screen name="Maintenance" component={MaintenanceScreen} />
    <MainAppStack.Screen name="NaturalLanguageInput" component={NaturalLanguageInputScreen} />
    <MainAppStack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
    <MainAppStack.Screen name="OfflineMode" component={OfflineModeScreen} />
    <MainAppStack.Screen name="OwnershipTransfer" component={OwnershipTransferScreen} />
    <MainAppStack.Screen name="PreferencesBehavior" component={PreferencesBehaviorScreen} />
    <MainAppStack.Screen name="PriorityStatus" component={PriorityStatusScreen} />
    <MainAppStack.Screen name="ProtocolPaused" component={ProtocolPausedScreen} />
    <MainAppStack.Screen name="QuickCreate" component={QuickCreateScreen} />
    <MainAppStack.Screen name="ReflectionHistory" component={ReflectionHistoryScreen} />
    <MainAppStack.Screen name="SelectionProtocol" component={SelectionProtocolScreen} />
    <MainAppStack.Screen name="SmartViews" component={SmartViewsScreen} />
    <MainAppStack.Screen name="SubtaskManagement" component={SubtaskManagementScreen} />
    <MainAppStack.Screen name="SyncConflictResolution" component={SyncConflictResolutionScreen} />
    <MainAppStack.Screen name="TagsManagement" component={TagsManagementScreen} />
    <MainAppStack.Screen name="TaskActivityHistory" component={TaskActivityHistoryScreen} />
    <MainAppStack.Screen name="TaskAssignment" component={TaskAssignmentScreen} />
    <MainAppStack.Screen name="TaskAttachments" component={TaskAttachmentsScreen} />
    <MainAppStack.Screen name="TaskComments" component={TaskCommentsScreen} />
    <MainAppStack.Screen name="TaskCompletionTrends" component={TaskCompletionTrendsScreen} />
    <MainAppStack.Screen name="TaskRecurrence" component={TaskRecurrenceScreen} />
    <MainAppStack.Screen name="TaskReflection" component={TaskReflectionScreen} />
    <MainAppStack.Screen name="TaskToGoalLinking" component={TaskToGoalLinkingScreen} />
    <MainAppStack.Screen name="WeeklyReview" component={WeeklyReviewScreen} />
    <MainAppStack.Screen name="EmptyStateNoMandates" component={EmptyStateNoMandatesScreen} />
    <MainAppStack.Screen name="EmptyStateNoTasks" component={EmptyStateNoTasksScreen} />
    <MainAppStack.Screen name="Error" component={ErrorScreen} />
  </MainAppStack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Pricing" component={PricingScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();
  const { isDark, colors } = useTheme();
  const { isOpen, closeDrawer } = useDrawer();

  const drawerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 280,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        closeDrawer();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [isOpen, closeDrawer]);

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync()
        .then(token => {
          if (token) {
            axios.post(`${API_URL}/api/users/push-token`, { expoPushToken: token })
              .catch(err => console.error('Failed to register push token', err));
          }
        })
        .catch(err => console.warn('[Notifications] Token registration failed:', err));
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

  // ChatGPT-style transition interpolations
  const appTranslateX = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -DRAWER_WIDTH * 0.72],
  });

  const appScale = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.91],
  });

  const drawerTranslateX = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  const dimOpacity = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#0A0B0E" : "#111318" }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Main App Content - Shifts left, scales down, rounds corners like ChatGPT mobile app */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          transform: [
            { translateX: appTranslateX },
            { scale: appScale },
          ],
          borderRadius: isOpen ? 22 : 0,
          overflow: "hidden",
        }}
      >
        <MainStackNavigator />

        {/* Dim Backdrop over main app when drawer is open */}
        {isOpen && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "#000",
                opacity: dimOpacity,
              },
            ]}
          >
            <Pressable style={StyleSheet.absoluteFillObject} onPress={closeDrawer} />
          </Animated.View>
        )}
      </Animated.View>

      {/* Right Sidebar Drawer - Slides in from right, spans 100% full vertical height */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[
          styles.drawerWrapper,
          {
            width: DRAWER_WIDTH,
            transform: [{ translateX: drawerTranslateX }],
          },
        ]}
      >
        <RightSidebarDrawer />
      </Animated.View>
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
  drawerWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
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
