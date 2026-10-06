import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const DailyPlanningScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const [suggestions, setSuggestions] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSuggestions = async () => {
    try {
      const res = await api.get('/planning/suggestions');
      setSuggestions(res.data);
    } catch (e) {
      console.warn('Failed to load planning suggestions', e);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSuggestions();
    setRefreshing(false);
  };

  const focusBlocks = [
    { time: "09:00 - 11:30", label: "Deep Work: Core Architecture Sprint" },
    { time: "13:00 - 14:00", label: "Admin & Async Slack Reviews" },
    { time: "15:30 - 17:00", label: "Code Review & Quality Gateways" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="DAILY PLANNING" navigation={navigation} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header Section matching web DailyPlanningPage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              SCHEDULE &amp; TIME-BOXING
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Daily Planning
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Map out time-boxed focus windows, sync calendar commitments, and establish top priorities.
          </Text>
        </View>

        {/* Time-Boxed Focus Blocks Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              TIME-BOXED FOCUS BLOCKS
            </Text>
            <View style={[styles.countBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <Text style={[styles.countBadgeText, { color: colors.primary }]}>
                {focusBlocks.length} BLOCKS
              </Text>
            </View>
          </View>

          <View style={styles.blocksList}>
            {focusBlocks.map((item) => (
              <View 
                key={item.time} 
                style={[styles.blockItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
              >
                <Text style={[styles.blockTime, { color: colors.primary }]}>{item.time}</Text>
                <Text style={[styles.blockLabel, { color: colors.onSurface }]}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Calendar & Cadence Sync Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              CALENDAR &amp; CADENCE SYNC
            </Text>
            <MaterialIcons name="sync" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.cadenceDescription, { color: colors.onSurfaceVariant }]}>
            Your top 3 strategic priorities are harmoniously scheduled with your external calendar, allocating zero conflicting meetings during designated flow state windows.
          </Text>

          <TouchableOpacity
            onPress={() => navigation?.navigate("Calendar")}
            style={[styles.calendarBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <Text style={[styles.calendarBtnText, { color: colors.onPrimary }]}>
              OPEN FULL CALENDAR
            </Text>
          </TouchableOpacity>
        </View>

        {/* Throughput & Switching Risk Telemetry */}
        <View style={styles.telemetryRow}>
          <View style={[styles.miniCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.miniCardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>THROUGHPUT</Text>
              <MaterialIcons name="speed" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.bigStat, { color: colors.primary }]}>94.2%</Text>
            <Text style={[styles.subStat, { color: colors.tertiary }]}>+2.4% vs Yesterday</Text>
          </View>

          <View style={[styles.miniCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.miniCardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>OPTIMIZATION</Text>
              <MaterialIcons name="bolt" size={16} color={colors.primary} />
            </View>
            <Text style={[styles.bigStat, { color: colors.primary }]}>READY</Text>
            <Text style={[styles.subStat, { color: colors.onSurfaceVariant }]}>Peak Flow: 14:00 - 16:00</Text>
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
  subtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 13, marginTop: 4, lineHeight: 18 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" },
  countBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  countBadgeText: { fontFamily: "JetBrainsMono-Bold", fontSize: 10 },
  blocksList: { gap: 10 },
  blockItem: { borderWidth: 1, borderRadius: 10, padding: 12 },
  blockTime: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, textTransform: "uppercase", marginBottom: 4 },
  blockLabel: { fontFamily: "HankenGrotesk-Bold", fontSize: 13 },
  cadenceDescription: { fontFamily: "HankenGrotesk-Regular", fontSize: 13, lineHeight: 19, marginBottom: 16 },
  calendarBtn: { width: "100%", paddingVertical: 12, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  calendarBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" },
  telemetryRow: { flexDirection: "row", gap: 12 },
  miniCard: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 14 },
  miniCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  bigStat: { fontFamily: "HankenGrotesk-Bold", fontSize: 24 },
  subStat: { fontFamily: "JetBrainsMono-Regular", fontSize: 10, marginTop: 4 },
});

export default DailyPlanningScreen;
