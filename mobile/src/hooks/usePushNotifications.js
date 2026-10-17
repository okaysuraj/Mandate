import { useEffect } from "react";
import { Platform } from "react-native";
import { isRunningInExpoGo } from "expo";
import Constants from "expo-constants";
import * as Device from "expo-device";
import api from "../services/api";

// Expo Go has no native push module. Load it only in a standalone or development build.
let notifications;
if (!isRunningInExpoGo()) {
  try {
    notifications = require("expo-notifications");
    notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.warn("Push notifications unavailable:", error.name);
  }
}

async function requestPushToken() {
  if (!notifications || !Device.isDevice) return null;

  if (Platform.OS === "android") {
    await notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  let { status } = await notifications.getPermissionsAsync();
  if (status !== "granted") {
    ({ status } = await notifications.requestPermissionsAsync());
  }
  if (status !== "granted") return null;

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;
  const token = await notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined,
  );
  return token.data;
}

export function usePushNotifications(user) {
  const userId = user?._id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    async function register() {
      try {
        const token = await requestPushToken();
        // Permission prompts can outlive a sign-out or account switch.
        if (token && !cancelled) {
          await api.post("/users/push-token", { expoPushToken: token });
        }
      } catch (error) {
        console.warn("Push registration failed:", error.name);
      }
    }

    register();
    return () => {
      cancelled = true;
    };
  }, [userId]);
}
