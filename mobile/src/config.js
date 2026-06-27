import { Platform } from "react-native";
import Constants from "expo-constants";

// Detect if running on a physical device vs emulator/simulator
const isDevice = !__DEV__ || Constants.executionEnvironment === "storeClient" || Constants.executionEnvironment === "standalone";

// Use the machine's local network IP for physical devices,
// localhost/10.0.2.2 for simulators/emulators
const LOCAL_IP = "192.168.0.7";

export const API_URL = Platform.select({
  ios: isDevice ? `http://${LOCAL_IP}:5001` : "http://localhost:5001",
  android: isDevice ? `http://${LOCAL_IP}:5001` : "http://10.0.2.2:5001",
  default: `http://${LOCAL_IP}:5001`,
});
