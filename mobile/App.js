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
