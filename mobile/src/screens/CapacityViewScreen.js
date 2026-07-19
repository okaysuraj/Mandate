import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CapacityViewScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          
          {/* System Health Utility Block */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, textTransform: 'uppercase', marginBottom: spacing.xs }]}>Utilization</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>84%</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, textTransform: 'uppercase', marginBottom: spacing.xs }]}>Latency</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12ms</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, textTransform: 'uppercase', marginBottom: spacing.xs }]}>Active</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>42</Text>
            </View>
          </View>

          {/* Aggregate System Load (Vertical Bar Chart) */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Aggregate Load</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>T-24H TREND</Text>
            </View>

            <View style={[styles.chartContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderBottomColor: colors.primary, borderBottomWidth: 2 }]}>
              {/* Grid Lines */}
              <View style={styles.gridLines}>
                <View style={[styles.gridLine, { borderTopColor: colors.outline }]} />
                <View style={[styles.gridLine, { borderTopColor: colors.outline }]} />
                <View style={[styles.gridLine, { borderTopColor: colors.outline }]} />
              </View>

              {/* Bars */}
              <View style={styles.chartBars}>
                <View style={[styles.bar, { height: '30%', backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.bar, { height: '45%', backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.bar, { height: '85%', backgroundColor: colors.primary }]} />
                <View style={[styles.bar, { height: '95%', backgroundColor: colors.primary }]} />
                <View style={[styles.bar, { height: '70%', backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.bar, { height: '60%', backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.bar, { height: '80%', backgroundColor: colors.primary }]} />
              </View>
            </View>

            {/* Chart Labels */}
            <View style={styles.chartLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>00:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>06:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>12:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>18:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>23:59</Text>
            </View>
          </View>

          {/* Operator Availability Heatmap */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>Operator Matrix</Text>
              <View style={styles.legend}>
                <View style={[styles.legendDot, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={[typography.labelSm, { color: colors.primary, fontSize: 10, marginLeft: 4 }]}>LOAD</Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
              <View style={styles.heatmapGrid}>
                {/* Headers */}
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <View key={`h-${i}`} style={styles.heatmapCell}>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{day}</Text>
                  </View>
                ))}
                
                {/* Mock data row 1 */}
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />

                {/* Mock data row 2 */}
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />

                {/* Mock data row 3 */}
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />

                {/* Mock data row 4 */}
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.primary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.secondary }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
                <View style={[styles.heatmapCellData, { backgroundColor: colors.surfaceContainerHighest }]} />
              </View>

              <View style={[styles.heatmapFooter, { borderTopColor: colors.surfaceContainer }]}>
                <Text style={[typography.bodyMd, { color: colors.onSurface, fontSize: 14 }]}>Cluster Nodes 01-04</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>Optimal Distribution</Text>
              </View>
            </View>
          </View>

          {/* Upcoming Mandates */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.labelCaps, { color: colors.primary, paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>Upcoming Mandates</Text>
            
            <View style={styles.mandateList}>
              {/* Mandate 1 */}
              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.mandateHeader}>
                  <View style={styles.mandateTags}>
                    <View style={[styles.priorityBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>PRIORITY A</Text>
                    </View>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ID: 8829-X</Text>
                  </View>
                  <View style={styles.mandateTime}>
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>T-MINUS</Text>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>02:40:00</Text>
                  </View>
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, marginVertical: spacing.xs }]}>System Integrity Audit</Text>
                <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14 }]}>Automated security sweep across sub-sectors 4 through 9.</Text>
              </View>

              {/* Mandate 2 */}
              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.mandateHeader}>
                  <View style={styles.mandateTags}>
                    <View style={[styles.priorityBadge, { backgroundColor: colors.secondary }]}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>PRIORITY B</Text>
                    </View>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ID: 4412-K</Text>
                  </View>
                  <View style={styles.mandateTime}>
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>T-MINUS</Text>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>05:12:00</Text>
                  </View>
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, marginVertical: spacing.xs }]}>Cache Purge Sequence</Text>
                <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14 }]}>Redistribution of local temporary data blocks.</Text>
              </View>

              {/* Mandate 3 */}
              <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.mandateHeader}>
                  <View style={styles.mandateTags}>
                    <View style={[styles.priorityBadge, { backgroundColor: colors.surfaceContainerHighest }]}>
                      <Text style={[typography.labelCaps, { color: colors.onBackground, fontSize: 10 }]}>PRIORITY C</Text>
                    </View>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ID: 1092-A</Text>
                  </View>
                  <View style={styles.mandateTime}>
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>T-MINUS</Text>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>12:00:00</Text>
                  </View>
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, marginVertical: spacing.xs }]}>Node Synchronization</Text>
                <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14 }]}>Wait-state reconciliation for standby clusters.</Text>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>
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
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 4,
    marginLeft: 16,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  mainContent: {},
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartContainer: {
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    position: 'relative',
    marginTop: 8,
    justifyContent: 'flex-end',
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 32,
    justifyContent: 'space-between',
    zIndex: 0,
  },
  gridLine: {
    borderTopWidth: 1,
    opacity: 0.2,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 8,
  },
  bar: {
    flex: 1,
    marginHorizontal: 2,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    marginLeft: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heatmapCell: {
    width: '13%',
    alignItems: 'center',
    marginBottom: 4,
  },
  heatmapCellData: {
    width: '13%',
    height: 24,
    marginBottom: 2,
  },
  heatmapFooter: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mandateList: {
    gap: 12,
  },
  mandateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mandateTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  mandateTime: {
    alignItems: 'flex-end',
  }
});

export default CapacityViewScreen;
