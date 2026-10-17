import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import * as NativeSplashScreen from "expo-splash-screen";
import { AuthProvider } from "./src/context/AuthContext";
import { WorkspaceProvider } from "./src/context/WorkspaceContext";
import { SocketProvider } from "./src/context/SocketContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DrawerProvider } from "./src/context/DrawerContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { appFonts } from "./src/fonts";

// Keep the native brand screen until fonts and the first React layout are ready.
NativeSplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(appFonts);
      } catch (error) {
        console.warn("[Fonts] Could not load custom fonts:", error.message);
      } finally {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View
        style={{ flex: 1 }}
        onLayout={() => NativeSplashScreen.hideAsync().catch(() => {})}
      >
        <ThemeProvider>
          <AuthProvider>
            <WorkspaceProvider>
              <SocketProvider>
                <DrawerProvider>
                  <AppNavigator />
                </DrawerProvider>
              </SocketProvider>
            </WorkspaceProvider>
          </AuthProvider>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}
