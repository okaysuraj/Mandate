import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Micro-interaction for temperature jitter
  const [temp, setTemp] = useState(42.8);
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.4;
      setTemp(prev => prev + jitter);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getProgress = () => {
    if (task.status === 'completed') return 100;
    if (task.status === 'in-progress') return 82.4;
    return 0;
  };

  const progress = getProgress();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primaryFixed }]}>
            {/* Using an icon instead of an image for simplicity, but simulating the profile picture */}
            <MaterialIcons name="person" size={24} color={colors.onPrimaryFixed} />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginLeft: spacing.sm }]}>
            CORE_OS_v1.0
          </Text>
        </View>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: 'transparent' }]}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Navigation Breadcrumb / Context */}
        <View style={styles.breadcrumbRow}>
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="chevron-left" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>BACK TO SYSTEM</Text>
          </TouchableOpacity>
          <View style={[styles.liveBadge, { backgroundColor: colors.tertiary }]}>
            <Text style={[typography.labelCaps, { color: colors.onTertiary, fontSize: 10 }]}>LIVE CONNECTION</Text>
          </View>
        </View>

        <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8, marginTop: 16 }]}>
          {task.title}
        </Text>
        <Text style={[typography.bodyMd, { color: colors.secondary, marginBottom: 24 }]}>
          {task.description || "No parameters specified."}
        </Text>

        {/* Progress Bento Module */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.lg }]}>
          <View style={styles.progressCenter}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>OPERATIONAL PROGRESS</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={[typography.displayLg, { color: colors.primary }]}>{progress.toFixed(1)}</Text>
              <Text style={[typography.headlineLg, { color: colors.primary }]}>%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer, marginTop: spacing.md }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${progress}%` }]} />
            </View>
          </View>
          <View style={[styles.progressFooter, { borderTopColor: colors.outlineVariant, marginTop: spacing.md, paddingTop: spacing.md }]}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>ELAPSED</Text>
              <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>12:44:02</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>ETA</Text>
              <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>02:15:40</Text>
            </View>
          </View>
        </View>

        {/* Telemetry Row */}
        <View style={styles.telemetryRow}>
          {/* Temp */}
          <View style={[styles.bentoCard, styles.telemetryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.telemetryHeader}>
              <MaterialIcons name="thermostat" size={20} color={colors.onSurfaceVariant} />
              <View style={[styles.statusMiniBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>STABLE</Text>
              </View>
            </View>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>TEMPERATURE</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{temp.toFixed(1)}°C</Text>
          </View>

          {/* Pressure */}
          <View style={[styles.bentoCard, styles.telemetryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.telemetryHeader}>
              <MaterialIcons name="compress" size={20} color={colors.onSurfaceVariant} />
              <View style={[styles.statusMiniBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>OPTIMAL</Text>
              </View>
            </View>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>PRESSURE</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>104.2 <Text style={{ fontSize: 14 }}>kPa</Text></Text>
          </View>
        </View>

        {/* Phase Duration Chart */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.lg }]}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.lg }]}>PHASE DURATION (MINS)</Text>
          <View style={styles.chartContainer}>
            {[{ label: 'INIT', h: '40%', bg: colors.primaryFixed },
              { label: 'PROC', h: '85%', bg: colors.primaryFixed },
              { label: 'SYNC', h: '60%', bg: colors.primary },
              { label: 'VALI', h: '30%', bg: colors.primaryFixed },
              { label: 'EXIT', h: '10%', bg: colors.primaryFixed }].map((col, i) => (
                <View key={i} style={styles.chartCol}>
                  <View style={[styles.chartBar, { height: col.h, backgroundColor: col.bg }]} />
                  <Text style={[typography.labelCaps, { fontSize: 9, marginTop: 8, color: colors.primary }]}>{col.label}</Text>
                </View>
            ))}
          </View>
        </View>

        {/* Operational Log */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, padding: spacing.md }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>OPERATIONAL_LOG.RAW</Text>
            <MaterialIcons name="terminal" size={18} color={colors.primary} />
          </View>
          <View style={styles.logContainer}>
            <View style={[styles.logEntry, { borderBottomColor: colors.outlineVariant }]}>
              <Text style={[styles.logTime, { color: colors.primary }]}>14:22:01</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>System calibration initialized... [OK]</Text>
            </View>
            <View style={[styles.logEntry, { borderBottomColor: colors.outlineVariant }]}>
              <Text style={[styles.logTime, { color: colors.primary }]}>14:25:34</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Loading operational parameters from core...</Text>
            </View>
            <View style={[styles.logEntry, { borderBottomColor: colors.outlineVariant }]}>
              <Text style={[styles.logTime, { color: colors.primary }]}>14:30:12</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>Thermal expansion within acceptable limits.</Text>
            </View>
            <View style={[styles.logEntry, { borderBottomColor: colors.outlineVariant }]}>
              <Text style={[styles.logTime, { color: colors.primary }]}>14:45:00</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Phase 3 (SYNC) handshake initiated.</Text>
            </View>
            <View style={[styles.logEntry, { borderBottomColor: 'transparent', paddingBottom: 0 }]}>
              <Text style={[styles.logTime, { color: colors.primary }]}>14:45:05</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Network packets arriving at 1.2GB/s.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  content: {
    padding: 24,
    gap: 16,
    paddingBottom: 40,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoCard: {
    borderWidth: 1,
  },
  progressCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
  },
  progressBarFill: {
    height: '100%',
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  telemetryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  telemetryCard: {
    flex: 1,
    padding: 16,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusMiniBadge: {
    paddingHorizontal: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 128,
    gap: 12,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  chartBar: {
    width: '100%',
  },
  logContainer: {
    gap: 8,
  },
  logEntry: {
    flexDirection: 'row',
    gap: 16,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  logTime: {
    fontWeight: '700',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
  }
});

export default TaskDetailScreen;
