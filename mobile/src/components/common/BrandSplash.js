import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import BrandLogo from "./BrandLogo";

// System fonts keep this screen available while the app's custom fonts load.
export default function BrandSplash({
  colors,
  isDark = false,
  message = "Loading your workspace…",
}) {
  return (
    <View
      style={[styles.screen, { backgroundColor: colors.background }]}
      accessibilityLiveRegion="polite"
      accessibilityLabel={message}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <BrandLogo size={144} decorative />
      <Text style={[styles.brand, { color: colors.onSurface }]}>MANDATE</Text>
      <ActivityIndicator color={colors.primary} accessibilityLabel={message} />
      <Text style={{ color: colors.onSurfaceVariant, fontSize: 14 }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 20 },
  brand: { fontSize: 20, fontWeight: "700", letterSpacing: 3 },
});
