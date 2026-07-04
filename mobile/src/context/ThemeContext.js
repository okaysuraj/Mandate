import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors, typography, spacing, borderRadius } from "../theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system"); // "light", "dark", "system"
  
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@theme_mode");
        if (savedTheme) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme preference", error);
      }
    };
    loadTheme();
  }, []);

  const isDark = themeMode === "dark" || (themeMode === "system" && systemColorScheme === "dark");
  const colors = isDark ? darkColors : lightColors;

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem("@theme_mode", mode);
    } catch (error) {
      console.error("Failed to save theme preference", error);
    }
  };

  const toggleTheme = () => {
    changeTheme(isDark ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{
      themeMode,
      isDark,
      colors,
      typography,
      spacing,
      borderRadius,
      changeTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
