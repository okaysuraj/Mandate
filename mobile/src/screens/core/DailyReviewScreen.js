import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
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
              <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>CYCLE 224-B COMPLETE</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginVertical: spacing.xs }]}>Daily Review</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Mandate Reconciliation Protocol Active</Text>
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
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Cycle Success Score</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>OPTIMAL PERFORMANCE</Text>
            </View>
          </View>

          {/* Mandate Matrix */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.matrixHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Mandate Matrix</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>8x8 Cluster</Text>
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
                <Text style={[typography.labelSm, { color: colors.onSecondaryFixedVariant, fontSize: 10 }]}>Deviation</Text>
              </View>
            </View>
          </View>

          {/* Summary Log */}
          <View style={styles.summarySection}>
            <View style={styles.sectionHeaderRow}>
              <MaterialIcons name="analytics" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm }]}>Summary Log</Text>
            </View>
            <View style={styles.logList}>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.primary }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Mandate Reconciled</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>Batch 4409-Z successful</Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} />
              </View>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.error }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Deviation Detection</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>Heat variance in Zone 4</Text>
                </View>
                <MaterialIcons name="warning" size={20} color={colors.error} />
              </View>
              <View style={[styles.logItem, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.secondary }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Neural Synchronization</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>Completed in 14.2ms</Text>
                </View>
                <MaterialIcons name="sync" size={20} color={colors.primary} />
              </View>
            </View>
          </View>

          {/* Status Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>POWER EFFICIENCY</Text>
              <View style={styles.metricValueRow}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>94.2</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 2 }]}>%</Text>
              </View>
              <View style={[styles.metricBar, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.metricBarFill, { backgroundColor: colors.primary, width: '94%' }]} />
              </View>
            </View>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>NEURAL LOAD</Text>
              <View style={styles.metricValueRow}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12.8</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 2 }]}>TFLOPS</Text>
              </View>
              <View style={[styles.metricBar, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.metricBarFill, { backgroundColor: colors.primary, width: '45%' }]} />
              </View>
            </View>
          </View>

          {/* Submit Action */}
          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>ARCHIVE CYCLE DATA</Text>
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
              <Text style={[typography.labelCaps, { color: colors.onPrimary, opacity: 0.6, fontSize: 8 }]}>LOAD</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>OPTIMAL</Text>
            </View>
          </View>
          <MaterialIcons name="sensors" size={20} color={colors.onPrimary} />
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
    borderRadius: 16,
    marginBottom: 8,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
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
    borderRadius: 6,
    borderLeftWidth: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
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
    borderRadius: 32,
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
    borderRadius: 8,
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
