import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

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
import CalendarScreen from "./src/screens/CalendarScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import TeamSettingsScreen from "./src/screens/TeamSettingsScreen";
import PricingScreen from "./src/screens/PricingScreen";
import DocsScreen from "./src/screens/DocsScreen";
import GoalsScreen from "./src/screens/GoalsScreen";
import AdminScreen from "./src/screens/AdminScreen";
import AutomationsScreen from "./src/screens/AutomationsScreen";
import IntegrationsScreen from "./src/screens/IntegrationsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const KnowledgeStack = createNativeStackNavigator();

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

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    <SettingsStack.Screen name="TeamSettings" component={TeamSettingsScreen} />
    <SettingsStack.Screen name="Pricing" component={PricingScreen} />
    <SettingsStack.Screen name="Admin" component={AdminScreen} />
    <SettingsStack.Screen name="Automations" component={AutomationsScreen} />
    <SettingsStack.Screen name="Integrations" component={IntegrationsScreen} />
  </SettingsStack.Navigator>
);

const KnowledgeStackScreen = () => (
  <KnowledgeStack.Navigator screenOptions={{ headerShown: false }}>
    <KnowledgeStack.Screen name="KnowledgeMain" component={DocsScreen} />
    <KnowledgeStack.Screen name="Goals" component={GoalsScreen} />
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
        name="Kanban"
        component={KanbanScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="ASSETS" iconName="precision-manufacturing" focused={focused} colors={colors} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="ALERTS" iconName="error-outline" focused={focused} colors={colors} />,
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
