import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { colors, fonts, spacing, borderRadius } from "../theme";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← BACK</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.brandLabel}>MANDATE</Text>
          <Text style={styles.title}>Reset Password.</Text>
          <Text style={styles.subtitle}>
            Password reset functionality is coming soon. Please contact support for assistance.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: "center", padding: spacing.lg },
  backButton: { position: "absolute", top: spacing.xxl, left: spacing.lg, zIndex: 1 },
  backText: { ...fonts.tiny, color: colors.textSecondary },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  brandLabel: { ...fonts.tiny, textAlign: "center", marginBottom: spacing.sm },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
    textAlign: "center",
    letterSpacing: -1,
    textTransform: "uppercase",
  },
  subtitle: { ...fonts.small, textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.lg, lineHeight: 20 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
  },
  buttonText: { color: colors.white, fontSize: 11, fontWeight: "700", letterSpacing: 2 },
});

export default ForgotPasswordScreen;
