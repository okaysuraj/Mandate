import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const PricingScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>BILLING</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={[typography.headlineLg, { color: colors.primary, textAlign: 'center', marginBottom: 8 }]}>PLANS</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center' }]}>Select your operational tier.</Text>
        </View>

        <View style={[styles.planCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>FREE TIER</Text>
          <Text style={[typography.headlineLg, { color: colors.primary, marginBottom: 16 }]}>$0<Text style={[typography.bodyMd, { color: colors.secondary }]}>/mo</Text></Text>
          <View style={styles.featuresList}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>• 1 Workspace</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>• 3 Team Members</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>• Basic Analytics</Text>
          </View>
          <TouchableOpacity style={[styles.planBtn, { backgroundColor: colors.surfaceContainerHigh }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>CURRENT PLAN</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.planCard, { backgroundColor: colors.primary, borderColor: colors.primary, borderRadius: borderRadius.DEFAULT }]}>
          <Text style={[typography.labelCaps, { color: colors.onPrimary, opacity: 0.8, marginBottom: 8 }]}>PRO TIER</Text>
          <Text style={[typography.headlineLg, { color: colors.onPrimary, marginBottom: 16 }]}>$49<Text style={[typography.bodyMd, { color: colors.onPrimary, opacity: 0.8 }]}>/mo</Text></Text>
          <View style={styles.featuresList}>
            <Text style={[typography.labelSm, { color: colors.onPrimary }]}>• Unlimited Workspaces</Text>
            <Text style={[typography.labelSm, { color: colors.onPrimary }]}>• Unlimited Team Members</Text>
            <Text style={[typography.labelSm, { color: colors.onPrimary }]}>• Advanced Analytics & Exports</Text>
          </View>
          <TouchableOpacity style={[styles.planBtn, { backgroundColor: colors.onPrimary }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>UPGRADE NOW</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: { flex: 1, alignItems: 'flex-start' },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  scrollContent: { padding: 24, paddingBottom: 64 },
  heroSection: { marginBottom: 32, alignItems: 'center' },
  planCard: {
    padding: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  featuresList: {
    gap: 8,
    marginBottom: 24,
  },
  planBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  }
});

export default PricingScreen;
