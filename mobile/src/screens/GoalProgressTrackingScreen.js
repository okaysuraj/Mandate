import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Svg, { Line, Polyline, Circle } from 'react-native-svg';

const GoalProgressTrackingScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 4, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header / Aggregate Telemetry */}
        <View style={styles.aggregateSection}>
          <View style={styles.aggregateHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>AGGREGATE COMPLETION</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>84.2%</Text>
            </View>
            <View style={[styles.trendBadge, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+3.1% vs last_log</Text>
            </View>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '84.2%' }]} />
          </View>
        </View>

        {/* Main Bento Grid */}
        <View style={styles.gridContainer}>
          
          {/* Performance Line Chart Module */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>PERFORMANCE_ENGINE</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Actual vs Target</Text>
              </View>
              <MaterialIcons name="monitoring" size={24} color={colors.outline} />
            </View>

            <View style={[styles.chartContainer, { borderColor: colors.surfaceContainer }]}>
              {/* Background Grid Pattern Simulation */}
              <View style={[styles.chartGrid, { opacity: 0.1 }]} />
              
              {/* Svg Chart Mock */}
              <Svg style={StyleSheet.absoluteFill} viewBox="0 0 400 200">
                <Line x1="0" y1="180" x2="400" y2="20" stroke={colors.outline} strokeWidth="1" strokeDasharray="4,4" />
                <Polyline points="0,190 40,170 80,175 120,140 160,130 200,100 240,110 280,70 320,50 360,60 400,25" fill="none" stroke={colors.primary} strokeWidth="2.5" />
                <Circle cx="400" cy="25" r="4" fill={colors.primary} />
              </Svg>
              <Text style={[typography.labelSm, styles.chartLabel, { color: colors.secondary, fontSize: 10 }]}>Q3_ITERATION_9</Text>
            </View>

            <View style={[styles.legendContainer, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={[typography.labelSm, { color: colors.onSurface }]}>ACTUAL</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDash, { borderColor: colors.outline }]} />
                <Text style={[typography.labelSm, { color: colors.onSurface }]}>TARGET</Text>
              </View>
            </View>
          </View>

          {/* Burn-up Telemetry */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>BURN-UP_TELEMETRY</Text>
              <View style={styles.syncBadge}>
                <View style={[styles.syncDot, { backgroundColor: colors.onTertiaryContainer }]} />
                <Text style={[typography.labelSm, { color: colors.secondary }]}>SYNCED</Text>
              </View>
            </View>

            <View style={styles.barChartContainer}>
              {[0.2, 0.25, 0.4, 0.35, 0.55, 0.65, 0.6, 0.85, 0.82, 0.9].map((h, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.barFill, 
                    { 
                      backgroundColor: i >= 7 ? colors.primary : colors.surfaceContainerHigh,
                      height: `${h * 100}%` 
                    }
                  ]} 
                />
              ))}
            </View>

            <View style={[styles.metricsContainer, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.metricItem}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>TOTAL VELOCITY</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>124.5 u/sec</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>REMAINING WORK</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>42.1 hrs</Text>
              </View>
            </View>
          </View>

          {/* Task Dependencies List */}
          <View style={styles.dependenciesSection}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>TASK_DEPENDENCIES</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>4 TOTAL</Text>
            </View>

            <View style={styles.taskList}>
              {/* Task 1 */}
              <View style={[styles.taskItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="radio-button-checked" size={24} color={colors.primary} />
                <View style={styles.taskContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>CORE_SYSTEM_AUDIT_01</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>SYSTEM_ALPHA</Text>
                </View>
                <View style={[styles.taskBadge, { backgroundColor: colors.tertiaryFixed }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>ACTIVE</Text>
                </View>
              </View>

              {/* Task 2 */}
              <View style={[styles.taskItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="radio-button-unchecked" size={24} color={colors.outline} />
                <View style={styles.taskContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>LATENCY_REDUCTION_X</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>NET_CLUSTER</Text>
                </View>
                <View style={[styles.taskBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>QUEUED</Text>
                </View>
              </View>

              {/* Task 3 */}
              <View style={[styles.taskItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="error" size={24} color={colors.error} />
                <View style={styles.taskContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>DB_MIGRATION_S4</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>STORAGE_NODE</Text>
                </View>
                <View style={[styles.taskBadge, { backgroundColor: colors.errorContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onErrorContainer, fontSize: 10 }]}>BLOCKED</Text>
                </View>
              </View>

              {/* Task 4 */}
              <View style={[styles.taskItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="radio-button-checked" size={24} color={colors.primary} />
                <View style={styles.taskContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>UI_REFINEMENT_09</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>SHELL_CORE</Text>
                </View>
                <View style={[styles.taskBadge, { backgroundColor: colors.tertiaryFixed }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>ACTIVE</Text>
                </View>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer, borderTopColor: colors.primary }]}>
          <MaterialIcons name="track-changes" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, marginTop: 4, fontSize: 10 }]}>GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>NETWORK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>LOGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>CONFIG</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 32,
    paddingBottom: 100, // Bottom nav
    gap: 32,
  },
  aggregateSection: {
    gap: 8,
  },
  aggregateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  gridContainer: {
    gap: 24,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartContainer: {
    height: 192, // h-48
    width: '100%',
    borderWidth: 1,
    position: 'relative',
    marginBottom: 16,
  },
  chartGrid: {
    // Simulate grid pattern by using borders (in actual CSS this would be a background pattern)
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f3f3f5',
  },
  chartLabel: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
  },
  legendDash: {
    width: 8,
    height: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  barChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 96, // h-24
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  barFill: {
    flex: 1,
  },
  metricsContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
    gap: 16,
  },
  metricItem: {
    flex: 1,
  },
  dependenciesSection: {
    gap: 16,
  },
  taskList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80, // h-20
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 8,
    borderTopWidth: 2,
  }
});

export default GoalProgressTrackingScreen;
