import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Custom AsyncStorage persistence provider for Firebase JS SDK in React Native
class ReactNativePersistenceStorage {
  static type = "LOCAL";
  constructor() {
    this.type = "LOCAL";
  }
  async _isAvailable() {
    try {
      if (!AsyncStorage) return false;
      await AsyncStorage.setItem("__firebase_persist_test__", "1");
      await AsyncStorage.removeItem("__firebase_persist_test__");
      return true;
    } catch {
      return false;
    }
  }
  _set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
  async _get(key) {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }
  _remove(key) {
    return AsyncStorage.removeItem(key);
  }
  _addListener() {}
  _removeListener() {}
}

let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: ReactNativePersistenceStorage,
  });
} catch (e) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export default app;
