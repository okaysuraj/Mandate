import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,
} from "react-native";
import { colors, fonts, spacing, borderRadius } from "../theme";

const PLANS = [
  {
    name: "Standard",
    price: "₹0",
    period: "/ forever",
    description: "Perfect for individuals looking to gain control over their daily tasks.",
    features: [
      "Up to 100 active tasks",
      "Basic categorization",
      "Standard sync across devices",
    ],
    dark: false,
    buttonText: "GET STARTED",
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/ month",
    description: "For professionals who demand the absolute best out of their workflow.",
    features: [
      "Unlimited tasks & projects",
      "Advanced analytics & insights",
      "Priority support",
      "Custom themes",
    ],
    dark: true,
    recommended: true,
    buttonText: "UPGRADE TO PRO",
  },
];

const PricingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← BACK</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.label}>PRICING</Text>
          <Text style={styles.heroTitle}>SIMPLE.{"\n"}TRANSPARENT.</Text>
          <Text style={styles.heroSubtitle}>
            Invest in precision tools that scale with your ambitions.
          </Text>
        </View>

        {PLANS.map((plan) => (
          <View
            key={plan.name}
            style={[styles.planCard, plan.dark && styles.planCardDark]}
          >
            {plan.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>RECOMMENDED</Text>
              </View>
            )}

            <Text style={[styles.planName, plan.dark && { color: colors.white }]}>
              {plan.name}
            </Text>

            <View style={styles.priceRow}>
              <Text style={[styles.price, plan.dark && { color: colors.white }]}>
                {plan.price}
              </Text>
              <Text style={[styles.period, plan.dark && { color: "#9CA3AF" }]}>
                {plan.period}
              </Text>
            </View>

            <Text style={[styles.planDesc, plan.dark && { color: "#9CA3AF" }]}>
              {plan.description}
            </Text>

            {plan.features.map((f, idx) => (
              <View key={idx} style={styles.featureRow}>
                <Text style={[styles.checkIcon, plan.dark && { color: colors.white }]}>✓</Text>
                <Text style={[styles.featureText, plan.dark && { color: colors.white }]}>{f}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.planButton, plan.dark && styles.planButtonLight]}
              activeOpacity={0.8}
            >
              <Text style={[styles.planButtonText, plan.dark && { color: colors.primary }]}>
                {plan.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  backButton: { marginTop: spacing.lg },
  backText: { ...fonts.tiny, color: colors.textSecondary },
  headerSection: { marginTop: spacing.md, marginBottom: spacing.xl, alignItems: "center" },
  label: { ...fonts.tiny, marginBottom: spacing.sm },
  heroTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: -2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  heroSubtitle: { ...fonts.small, textAlign: "center", marginTop: spacing.sm, letterSpacing: 0.5 },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  planCardDark: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  recommendedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  recommendedText: { color: colors.white, fontSize: 9, fontWeight: "700", letterSpacing: 2 },
  planName: { fontSize: 22, fontWeight: "800", color: colors.primary, letterSpacing: -0.5 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.md },
  price: { fontSize: 40, fontWeight: "900", color: colors.primary, letterSpacing: -2 },
  period: { fontSize: 13, fontWeight: "500", color: colors.textSecondary },
  planDesc: { ...fonts.small, marginBottom: spacing.lg, lineHeight: 18 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  checkIcon: { fontSize: 14, fontWeight: "700", color: colors.primary },
  featureText: { fontSize: 13, fontWeight: "600", color: colors.textPrimary },
  planButton: {
    backgroundColor: "transparent",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
  },
  planButtonLight: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  planButtonText: { fontSize: 10, fontWeight: "700", letterSpacing: 2, color: colors.primary },
});

export default PricingScreen;
