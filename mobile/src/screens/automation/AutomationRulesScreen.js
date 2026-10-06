import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const AutomationRulesScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const webRules = [
    { title: 'Auto-assign urgent tasks', desc: 'When priority changes to CRITICAL, dispatch to lead engineer', active: true, tag: 'TRIGGER: PRIORITY' },
    { title: 'Escalate overdue items', desc: 'When due date passes by >24h, elevate priority to HIGH', active: true, tag: 'TRIGGER: TIME_DELTA' },
    { title: 'Notify on blocker state', desc: 'Broadcast alert to workspace channel when status moves to BLOCKED', active: false, tag: 'TRIGGER: STATUS' }
  ];

  const filteredRules = webRules.filter(rule => 
    rule.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rule.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rule.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="AUTOMATION" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section matching web AutomationRulesPage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              AUTOMATION LAYER
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Automation Rules
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            SYSTEM TRIGGER &amp; DISPATCH DIRECTORY
          </Text>

          <TouchableOpacity
            onPress={() => navigation?.navigate("RuleBuilder")}
            style={[styles.manageBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <MaterialIcons name="settings-suggest" size={18} color={colors.onPrimary} style={{ marginRight: 6 }} />
            <Text style={[styles.manageBtnText, { color: colors.onPrimary }]}>
              MANAGE PROTOCOLS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Active Execution Rules Card matching web */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardTitle, { color: colors.onSurfaceVariant }]}>
            ACTIVE EXECUTION RULES
          </Text>

          {/* Search/Filter */}
          <View style={[styles.searchBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="search" size={18} color={colors.secondary} />
            <TextInput 
              style={[styles.searchInput, { color: colors.onSurface }]}
              placeholder="FILTER RULES..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.rulesList}>
            {filteredRules.map((rule) => (
              <View 
                key={rule.title} 
                style={[styles.ruleItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
              >
                <View style={styles.ruleInfo}>
                  <View style={styles.ruleTitleRow}>
                    <Text style={[styles.ruleTitle, { color: colors.onSurface }]}>{rule.title}</Text>
                    <View style={[styles.tagBadge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                      <Text style={[styles.tagBadgeText, { color: colors.onSurfaceVariant }]}>{rule.tag}</Text>
                    </View>
                  </View>
                  <Text style={[styles.ruleDesc, { color: colors.onSurfaceVariant }]}>{rule.desc}</Text>
                </View>

                <View style={styles.ruleStatusContainer}>
                  {rule.active ? (
                    <View style={[styles.activePill, { backgroundColor: colors.tertiaryContainer, borderColor: colors.outlineVariant }]}>
                      <Text style={[styles.activePillText, { color: colors.onTertiaryContainer }]}>ACTIVE</Text>
                    </View>
                  ) : (
                    <View style={[styles.inactivePill, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                      <Text style={[styles.inactivePillText, { color: colors.onSurfaceVariant }]}>INACTIVE</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Telemetry Summary Cards */}
        <View style={styles.telemetryRow}>
          <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.metricLabel, { color: colors.secondary }]}>ACTIVE INSTANCES</Text>
            <Text style={[styles.metricValue, { color: colors.primary }]}>1,284</Text>
            <Text style={[styles.metricSubtext, { color: colors.tertiary }]}>+12% Velocity</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.metricLabel, { color: colors.secondary }]}>SUCCESS RATE</Text>
            <Text style={[styles.metricValue, { color: colors.primary }]}>99.8%</Text>
            <Text style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}>42 op/min</Text>
          </View>
        </View>
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
  subtitle: { fontFamily: "JetBrainsMono-Regular", fontSize: 11, marginTop: 4, letterSpacing: 0.5 },
  manageBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 10, marginTop: 14 },
  manageBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 },
  searchBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, height: 38, marginBottom: 14 },
  searchInput: { flex: 1, marginLeft: 8, fontFamily: "JetBrainsMono-Regular", fontSize: 12 },
  rulesList: { gap: 10 },
  ruleItem: { borderWidth: 1, borderRadius: 10, padding: 14, gap: 10 },
  ruleInfo: { flex: 1 },
  ruleTitleRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 },
  ruleTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 13 },
  tagBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  tagBadgeText: { fontFamily: "JetBrainsMono-Bold", fontSize: 9 },
  ruleDesc: { fontFamily: "HankenGrotesk-Regular", fontSize: 12, lineHeight: 16 },
  ruleStatusContainer: { alignSelf: "flex-start" },
  activePill: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  activePillText: { fontFamily: "JetBrainsMono-Bold", fontSize: 9, letterSpacing: 1 },
  inactivePill: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  inactivePillText: { fontFamily: "JetBrainsMono-Bold", fontSize: 9, letterSpacing: 1 },
  telemetryRow: { flexDirection: "row", gap: 12 },
  metricCard: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 14 },
  metricLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 10, textTransform: "uppercase" },
  metricValue: { fontFamily: "HankenGrotesk-Bold", fontSize: 26, marginVertical: 4 },
  metricSubtext: { fontFamily: "JetBrainsMono-Regular", fontSize: 10 },
});

export default AutomationRulesScreen;
