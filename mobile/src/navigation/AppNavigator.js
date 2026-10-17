// Navigation lives here; App.js only prepares assets and installs providers.
import { useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useDrawerActions } from "../context/DrawerContext";
import SidebarOverlay from "../components/layout/SidebarOverlay";
import SplashScreen from "../screens/auth/SplashScreen";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { navigationRef } from "./navigationRef";
import { customScreens, featureScreens } from "./screens";
import BottomTabBar from "./BottomTabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainAppStack = createNativeStackNavigator();
const LandingScreen = () => require("../screens/core/LandingScreen").default;
const LoginScreen = () => require("../screens/auth/LoginScreen").default;
const RegisterScreen = () => require("../screens/auth/RegisterScreen").default;
const ForgotPasswordScreen = () =>
  require("../screens/auth/ForgotPasswordScreen").default;
const PricingScreen = () => require("../screens/core/PricingScreen").default;
const FeatureIndexScreen = () =>
  require("../components/features/FeatureScreen").FeatureIndexScreen;

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        lazy: true,
      }}
    >
      <Tab.Screen name="Dashboard" getComponent={customScreens.Dashboard} />
      <Tab.Screen name="Today" getComponent={customScreens.Today} />
      <Tab.Screen name="Kanban" getComponent={customScreens.Kanban} />
      <Tab.Screen name="Calendar" getComponent={customScreens.Calendar} />
    </Tab.Navigator>
  );
}

function CatalogScreen(props) {
  const FeatureScreen = customScreens.Feature();
  const config = featureScreens[props.route.name];
  return <FeatureScreen {...props} {...config} />;
}

function MainStackNavigator() {
  return (
    <MainAppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Tabs"
    >
      <MainAppStack.Screen
        name="FeatureIndex"
        getComponent={FeatureIndexScreen}
      />
      <MainAppStack.Screen name="Tabs" component={MainTabs} />
      {Object.entries(customScreens).map(([name, getComponent]) => (
        <MainAppStack.Screen
          key={name}
          name={name}
          getComponent={getComponent}
        />
      ))}
      {Object.keys(featureScreens).map((name) => (
        <MainAppStack.Screen key={name} name={name} component={CatalogScreen} />
      ))}
    </MainAppStack.Navigator>
  );
}

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Landing"
  >
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
  const { closeDrawer } = useDrawerActions();
  useEffect(() => {
    if (!user) closeDrawer();
  }, [user, closeDrawer]);
  usePushNotifications(user);

  // Prevent flash of LandingScreen when restoring cached session
  if (loading && !user) {
    return <SplashScreen />;
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <MainStackNavigator />
      <SidebarOverlay />
    </View>
  );
};

export default function AppNavigator() {
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
}
