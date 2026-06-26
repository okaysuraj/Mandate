import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { colors, fonts, spacing, borderRadius } from "../theme";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero */}
        <Text style={styles.heroTitle}>MANDATE</Text>
        <Text style={styles.heroSubtitle}>
          Precision productivity for the focused mind.
        </Text>

        {/* Logo Card */}
        <View style={styles.logoCard}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Helping you reach your goal faster.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.description}>
          Streamline your workflow with tools that adapt to your speed, giving
          you the clarity needed to execute flawlessly.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>START YOUR MANDATE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  heroTitle: {
    fontSize: 64,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: -3,
    textAlign: "center",
  },
  heroSubtitle: {
    ...fonts.small,
    letterSpacing: 1,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  logoCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
  },
  tagline: {
    ...fonts.sectionHeading,
    textAlign: "center",
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 2,
  },
  description: {
    ...fonts.small,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    width: "100%",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});

export default LandingScreen;
