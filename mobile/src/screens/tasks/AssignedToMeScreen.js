import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const AssignedToMeScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return "EXPIRED";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>MANDATE OS</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: 24 }]}>
          {/* Page Headline */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', letterSpacing: -0.5 }]}>Assigned Directives</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: spacing.xs }]}>SYSTEM STATUS: ALL OPERATIONAL // 4 PENDING ACTION</Text>
          </View>

          {/* Urgency Stack */}
          <View style={styles.urgencyStack}>
            
            {/* CRITICAL SECTION */}
            <View style={{ marginBottom: spacing.md }}>
              <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
                <MaterialIcons name="priority-high" size={18} color={colors.error} />
                <Text style={[typography.labelCaps, { color: colors.error, textTransform: 'uppercase', marginLeft: spacing.xs }]}>Critical Priority</Text>
              </View>
              
              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.error, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: spacing.xs }]}>TASK_ID: X-9042</Text>
                    <Text style={[typography.headlineLgMobile, { fontSize: 20, color: colors.primary, lineHeight: 24 }]}>Core Stabilizer Calibration</Text>
                  </View>
                  <View style={[styles.timerBadge, { backgroundColor: colors.error }]}>
                    <MaterialIcons name="timer" size={14} color={colors.onError} />
                    <Text style={[typography.labelCaps, { color: colors.onError, marginLeft: 4 }]}>{formatTime(timeLeft)}</Text>
                  </View>
                </View>

                <View style={[styles.statusRow, { marginVertical: spacing.sm }]}>
                  <View style={[styles.statusBadge, { backgroundColor: colors.errorContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onErrorContainer, textTransform: 'uppercase' }]}>Immediate</Text>
                  </View>
                  <View style={[styles.statusLine, { backgroundColor: colors.outlineVariant }]} />
                </View>

                <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingVertical: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>View Protocol</Text>
                  <MaterialIcons name="chevron-right" size={16} color={colors.onPrimary} style={{ marginLeft: spacing.sm }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* HIGH PRIORITY SECTION */}
            <View style={{ marginBottom: spacing.md }}>
              <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
                <MaterialIcons name="bar-chart" size={18} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, textTransform: 'uppercase', marginLeft: spacing.xs }]}>High Priority</Text>
              </View>

              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: spacing.xs }]}>TASK_ID: L-2281</Text>
                    <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary, lineHeight: 22 }]}>Security Patch Deployment</Text>
                  </View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>ACTIVE</Text>
                </View>

                <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.outlineVariant, borderRadius: borderRadius.full, paddingVertical: spacing.md, marginTop: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>View Protocol</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* MEDIUM PRIORITY SECTION */}
            <View style={{ marginBottom: spacing.md }}>
              <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
                <MaterialIcons name="stacked-bar-chart" size={18} color={colors.secondary} />
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginLeft: spacing.xs }]}>Medium Priority</Text>
              </View>

              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: spacing.xs }]}>TASK_ID: M-4432</Text>
                    <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary, lineHeight: 22 }]}>Network Latency Audit</Text>
                  </View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>PENDING</Text>
                </View>

                <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.outlineVariant, borderRadius: borderRadius.full, paddingVertical: spacing.md, marginTop: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>View Protocol</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* LOW PRIORITY SECTION */}
            <View style={{ marginBottom: spacing.md }}>
              <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
                <MaterialIcons name="equalizer" size={18} color={colors.outline} />
                <Text style={[typography.labelCaps, { color: colors.outline, textTransform: 'uppercase', marginLeft: spacing.xs }]}>Low Priority</Text>
              </View>

              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, opacity: 0.8 }]}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: spacing.xs }]}>TASK_ID: Q-1109</Text>
                    <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary, lineHeight: 22 }]}>Archive Data Cleanse</Text>
                  </View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>QUEUED</Text>
                </View>

                <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.outlineVariant, borderRadius: borderRadius.full, paddingVertical: spacing.md, marginTop: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>View Protocol</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  mainContent: {
  },
  urgencyStack: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusLine: {
    flex: 1,
    height: 1,
    marginLeft: 8,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  }
});

export default AssignedToMeScreen;
