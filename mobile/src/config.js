import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

// Read IP and Port from environment variables (.env file)
const ENV_IP = process.env.EXPO_PUBLIC_API_IP;
const ENV_PORT = process.env.EXPO_PUBLIC_API_PORT || "5001";
const ENV_URL = process.env.EXPO_PUBLIC_API_URL;

// Automatically extract the host computer's IP address from Expo Metro Bundler when running in Expo Go
const getHostIpFromExpo = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return hostUri.split(":")[0];
  }
  return null;
};

// Use explicit env IP, or auto-detected Expo Metro IP, or fallback default
const LOCAL_IP = ENV_IP || getHostIpFromExpo() || "10.246.92.156";

const getApiUrl = () => {
  if (ENV_URL) return ENV_URL;

  // Real physical mobile device (Expo Go or standalone)
  if (Device.isDevice) {
    return `http://${LOCAL_IP}:${ENV_PORT}`;
  }

  // Emulators and Simulators
  return Platform.select({
    ios: `http://localhost:${ENV_PORT}`,
    android: `http://10.0.2.2:${ENV_PORT}`,
    default: `http://${LOCAL_IP}:${ENV_PORT}`,
  });
};

export const API_URL = getApiUrl();

