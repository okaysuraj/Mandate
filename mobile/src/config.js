import { Platform } from "react-native";

// In development, Android emulator uses 10.0.2.2 to access host's localhost,
// while iOS simulator uses localhost directly.
export const API_URL = Platform.select({
  ios: "http://localhost:5001",
  android: "http://10.0.2.2:5001",
  default: "http://localhost:5001"
});
