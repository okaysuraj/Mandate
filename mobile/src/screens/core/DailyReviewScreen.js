import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const DailyReviewScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const renderMatrix = () => {
    const blocks = [];
    for (let i = 0; i < 64; i++) {
      const rand = Math.random();
      let color = colors.surfaceContainerHigh;
      if (rand > 0.95) {
        color = colors.error;
      } else if (rand > 0.15) {
        color = colors.primary;
      }
      blocks.push(
        <View key={i} style={[styles.matrixBlock, { backgroundColor: color }]} />
      );
    }
    return blocks;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1 }]}>MANDATE</Text>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={[styles.cycleBadge, { backgroundColor: colors.secondaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>DAILY SPRINT COMPLETE</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginVertical: spacing.xs }]}>Daily Review</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>All Tasks & Deliverables Logged</Text>
          </View>

          {/* Success Score */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.radialProgressContainer}>
              <Svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx="70" cy="70" r="60" fill="none" stroke={colors.surfaceContainer} strokeWidth="12" />
                <Circle cx="70" cy="70" r="60" fill="none" stroke={colors.primary} strokeWidth="12" strokeDasharray="377" strokeDashoffset="37.7" strokeLinecap="round" />
              </Svg>
              <View style={styles.radialCenter}>
                <Text style={[typography.displayLg, { color: colors.primary, fontSize: 40 }]}>90%</Text>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>SCORE</Text>
              </View>
            </View>
            <View style={styles.scoreTextContainer}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Daily Completion Rate</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>EXCELLENT PROGRESS</Text>
            </View>
          </View>

          {/* Task Matrix */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.matrixHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Task Distribution</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Team Activity</Text>
            </View>
            <View style={styles.matrixGrid}>
              {renderMatrix()}
            </View>
            <View style={styles.matrixLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={[typography.labelSm, { color: colors.onSecondaryFixedVariant, fontSize: 10 }]}>Success</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.surfaceContainerHigh }]} />
                <Text style={[typography.labelSm, { color: colors.onSecondaryFixedVariant, fontSize: 10 }]}>Pending</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
                <Text style={[typography.labelSm, { color: colors.onSecondaryFixedVariant, fontSize: 10 }]}>Blocked</Text>
              </View>
            </View>
          </View>

          {/* Summary Log */}
          <View style={styles.summarySection}>
            <View style={styles.sectionHeaderRow}>
              <MaterialIcons name="analytics" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm }]}>Activity Log</Text>
            </View>
            <View style={styles.logList}>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Tasks Completed</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>All assigned sprint items finished</Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} />
              </View>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Blocker Resolved</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>Deployment dependency unblocked</Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.primary} />
              </View>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Workspace Cloud Sync</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>All changes synced to cloud</Text>
                </View>
                <MaterialIcons name="cloud-done" size={20} color={colors.primary} />
              </View>
            </View>
          </View>

          {/* Status Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>TASK VELOCITY</Text>
              <View style={styles.metricValueRow}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>94.2</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 2 }]}>%</Text>
              </View>
              <View style={[styles.metricBar, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.metricBarFill, { backgroundColor: colors.primary, width: '94%' }]} />
              </View>
            </View>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>FOCUS TIME</Text>
              <View style={styles.metricValueRow}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>6.5</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 2 }]}>hrs</Text>
              </View>
              <View style={[styles.metricBar, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.metricBarFill, { backgroundColor: colors.primary, width: '80%' }]} />
              </View>
            </View>
          </View>

          {/* Submit Action */}
          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>COMPLETE DAILY REVIEW</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Floating Status Bar */}
      <View style={styles.floatingStatusBarContainer}>
        <View style={[styles.floatingStatusBar, { backgroundColor: colors.primary, borderColor: colors.onPrimaryContainer }]}>
          <View style={styles.statusRow}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, opacity: 0.6, fontSize: 8 }]}>EFFICIENCY</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>94.2%</Text>
            </View>
            <View style={[styles.statusDivider, { backgroundColor: colors.onPrimaryContainer }]} />
            <View>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, opacity: 0.6, fontSize: 8 }]}>STATUS</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>ON TRACK</Text>
            </View>
          </View>
          <MaterialIcons name="done-all" size={20} color={colors.onPrimary} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 160,
  },
  mainContent: {
    gap: 32,
  },
  titleSection: {},
  cycleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  radialProgressContainer: {
    width: 140,
    height: 140,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radialCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreTextContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  matrixHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  matrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    width: '100%',
    justifyContent: 'center',
  },
  matrixBlock: {
    width: (width - 48 - 64 - 28) / 8, // Roughly calculated size based on padding and gaps
    aspectRatio: 1,
    borderRadius: 2,
  },
  matrixLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  summarySection: {
    gap: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logList: {
    gap: 8,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  metricBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
  },
  submitBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  floatingStatusBarContainer: {
    position: 'absolute',
    bottom: 80, // Above typical nav bar
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    zIndex: 40,
  },
  floatingStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusDivider: {
    width: 1,
    height: 24,
    opacity: 0.2,
  }
});

export default DailyReviewScreen;
