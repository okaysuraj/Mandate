import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const FocusSummaryScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const stats = [
    { label: "DEEP WORK MINUTES", value: "180", unit: "MIN", icon: "timer" },
    { label: "INTERRUPTIONS MITIGATED", value: "3", unit: "EVENTS", icon: "shield" },
    { label: "COGNITIVE PULSE SCORE", value: "8.7", unit: "/10", icon: "psychology" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="FOCUS SUMMARY" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section matching web FocusSummaryPage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              ATTENTION METRICS
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Focus Summary
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Insights from completed focus sessions, deep work intervals, and flow preservation.
          </Text>
        </View>

        {/* 3 Stats Grid matching web FocusSummaryPage.jsx */}
        <View style={styles.statsGrid}>
          {stats.map((item) => (
            <View 
              key={item.label} 
              style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}
            >
              <View style={styles.statHeader}>
                <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>{item.label}</Text>
                <MaterialIcons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: colors.onSurface }]}>{item.value}</Text>
                <Text style={[styles.statUnit, { color: colors.onSurfaceVariant }]}>{item.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Efficiency Rating Card */}
        <View style={[styles.efficiencyCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardHeaderTitle, { color: colors.secondary }]}>EFFICIENCY RATING</Text>
          <View style={styles.ratingValueRow}>
            <Text style={[styles.bigRating, { color: colors.primary }]}>94.2</Text>
            <Text style={[styles.ratingDenominator, { color: colors.secondary }]}>/100</Text>
          </View>
          <View style={styles.trendRow}>
            <MaterialIcons name="trending-up" size={16} color={colors.tertiary} />
            <Text style={[styles.trendText, { color: colors.tertiary }]}>+4.1% vs previous session</Text>
          </View>
        </View>

        {/* Start New Session CTA */}
        <TouchableOpacity
          onPress={() => navigation?.navigate("FocusMode")}
          style={[styles.startSessionBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
        >
          <Text style={[styles.startSessionBtnText, { color: colors.onPrimary }]}>
            START NEW FOCUS SESSION
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageHeader: { marginBottom: 16 },
  breadcrumbRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  brandDot: { width: 8, height: 8, borderRadius: 4 },
  breadcrumbText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  title: { fontFamily: "HankenGrotesk-Bold", fontSize: 24, textTransform: "uppercase", letterSpacing: -0.5 },
  subtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 13, marginTop: 4, lineHeight: 18 },
  statsGrid: { gap: 12, marginBottom: 16 },
  statCard: { borderWidth: 1, borderRadius: 14, padding: 16 },
  statHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  statLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" },
  statValueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  statValue: { fontFamily: "JetBrainsMono-Bold", fontSize: 32 },
  statUnit: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, textTransform: "uppercase" },
  efficiencyCard: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardHeaderTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  ratingValueRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  bigRating: { fontFamily: "HankenGrotesk-Bold", fontSize: 44, letterSpacing: -1 },
  ratingDenominator: { fontFamily: "HankenGrotesk-Bold", fontSize: 18 },
  trendRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  trendText: { fontFamily: "JetBrainsMono-Bold", fontSize: 12 },
  startSessionBtn: { width: "100%", paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 8 },
  startSessionBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" },
});

export default FocusSummaryScreen;
