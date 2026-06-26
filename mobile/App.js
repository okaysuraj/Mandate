import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { WorkspaceProvider } from "./src/context/WorkspaceContext";
import { SocketProvider } from "./src/context/SocketContext";

import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import TodayScreen from "./src/screens/TodayScreen";
import KanbanScreen from "./src/screens/KanbanScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import TeamSettingsScreen from "./src/screens/TeamSettingsScreen";
import PricingScreen from "./src/screens/PricingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

// Custom minimal tab bar icon
const TabIcon = ({ label, focused }) => (
  <View style={styles.tabIconContainer}>
    <View style={[styles.tabDot, focused && styles.tabDotActive]} />
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
  </View>
);

// Settings stack with nested screens
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    <SettingsStack.Screen name="TeamSettings" component={TeamSettingsScreen} />
    <SettingsStack.Screen name="Pricing" component={PricingScreen} />
  </SettingsStack.Navigator>
);

// Main tab navigator (authenticated)
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#EDEDF0",
        height: 70,
        paddingBottom: 12,
        paddingTop: 8,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Today"
      component={TodayScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="TODAY" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Kanban"
      component={KanbanScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="KANBAN" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="CALENDAR" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabIcon label="SETTINGS" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

// Auth stack (unauthenticated)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

// Root navigator that switches based on auth state
const RootNavigator = () => {
  const { user } = useAuth();
  return user ? <MainTabs /> : <AuthStack />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <SocketProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </SocketProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D9DADC",
  },
  tabDotActive: {
    backgroundColor: "#1A1A1A",
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#9CA3AF",
    textTransform: "uppercase",
  },
  tabLabelActive: {
    color: "#1A1A1A",
  },
});
