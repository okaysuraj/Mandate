import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const LandingScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, textAlign: 'center' }]}>MANDATE</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>
            SYSTEM DEPLOYMENT // PHASE 4
          </Text>
          <Text style={[typography.displayLg, { color: colors.primary, marginBottom: spacing.md }]}>
            FOCUS.{"\n"}EXECUTE.{"\n"}MANDATE.
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginBottom: spacing.xl }]}>
            Industrial-grade task synthesis and workspace tracking for the modern enterprise.
          </Text>
        </View>

        {/* Action Grid */}
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={[styles.primaryAction, { backgroundColor: colors.primary, borderRadius: borderRadius.DEFAULT }]}
            onPress={() => navigation.navigate("Register")}
          >
            <View>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, opacity: 0.8 }]}>INITIALIZE</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.onPrimary, marginTop: spacing.xs }]}>
                New Node
              </Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color={colors.onPrimary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryAction, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.DEFAULT, borderColor: colors.outlineVariant }]}
            onPress={() => navigation.navigate("Login")}
          >
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>RETURN</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>
                Login
              </Text>
            </View>
            <MaterialIcons name="login" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: "space-between",
    paddingBottom: 48,
  },
  heroSection: {
    flex: 1,
  },
  actionGrid: {
    gap: 16,
  },
  primaryAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  secondaryAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderWidth: 1,
  }
});

export default LandingScreen;
