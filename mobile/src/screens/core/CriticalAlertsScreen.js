import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const CriticalAlertsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.surfaceDim, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: 20 }]}>
          
          {/* System Critical Alert Header */}
          <View style={styles.alertHeaderRow}>
            <View style={[styles.alertBadge, { backgroundColor: 'rgba(186, 26, 26, 0.2)' }]}>
              <Text style={[typography.labelCaps, { color: colors.error }]}>SYSTEM CRITICAL ALERT</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>REF: SEC-9941</Text>
          </View>

          {/* High-Impact Mobile Cards */}
          <View style={styles.bentoGrid}>
            <View style={styles.row}>
              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.error }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>OVERDUE</Text>
                <View>
                  <Text style={[typography.displayLg, { color: colors.error, fontSize: 40, lineHeight: 40 }]}>14</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Critical Tasks</Text>
                </View>
              </View>
              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>AT-RISK</Text>
                <View>
                  <Text style={[typography.displayLg, { color: colors.primary, fontSize: 40, lineHeight: 40 }]}>08</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Mandates</Text>
                </View>
              </View>
            </View>

            <View style={[styles.bentoCardFull, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.secondary }]}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>RESOURCE LOAD</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>94.2% Peak</Text>
              </View>
              <View style={styles.chartMockup}>
                {/* SVG alternative */}
                <View style={[styles.donutOuter, { borderColor: colors.surfaceContainerHighest }]}>
                  <View style={[styles.donutInner, { borderColor: colors.primary, borderTopColor: 'transparent', transform: [{ rotate: '45deg' }] }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Urgent Queue */}
          <View style={{ marginTop: spacing.xl, marginBottom: spacing.lg }}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Urgent Queue</Text>
              <TouchableOpacity>
                <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline' }]}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.queueList}>
              
              {/* Alert Card 1 */}
              <View style={[styles.alertCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
                <View style={styles.alertCardTop}>
                  <View>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18 }]}>Core Pipeline Delta</Text>
                    <View style={styles.alertStatusRow}>
                      <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                      <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>PRIORITY ALPHA</Text>
                    </View>
                  </View>
                  <View style={styles.alertRight}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>BREACH IN</Text>
                    <Text style={[typography.labelSm, { color: colors.error, fontSize: 16, fontWeight: 'bold' }]}>00:04:12</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.error, width: '80%' }]} />
                </View>
                <View style={styles.alertCardBottom}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Agent ID: 94-X</Text>
                  <View style={styles.actionBtnsRow}>
                    <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: colors.surfaceDim }]}>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>HOLD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtnPrimary, { backgroundColor: colors.primary }]}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>EXECUTE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Alert Card 2 */}
              <View style={[styles.alertCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
                <View style={styles.alertCardTop}>
                  <View>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18 }]}>Network Saturation</Text>
                    <View style={styles.alertStatusRow}>
                      <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
                      <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>SYSTEM ADVISORY</Text>
                    </View>
                  </View>
                  <View style={styles.alertRight}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>BREACH IN</Text>
                    <Text style={[typography.labelSm, { color: colors.primary, fontSize: 16, fontWeight: 'bold' }]}>00:22:45</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '40%' }]} />
                </View>
                <View style={styles.alertCardBottom}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Region: US-EAST-1</Text>
                  <View style={styles.actionBtnsRow}>
                    <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: colors.surfaceDim }]}>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>RESOLVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Alert Card 3 */}
              <View style={[styles.alertCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
                <View style={styles.alertCardTop}>
                  <View>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18 }]}>Financial Mandate 401</Text>
                    <View style={styles.alertStatusRow}>
                      <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                      <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>LATE SETTLEMENT</Text>
                    </View>
                  </View>
                  <View style={styles.alertRight}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>OVERDUE BY</Text>
                    <Text style={[typography.labelSm, { color: colors.error, fontSize: 16, fontWeight: 'bold' }]}>14:02:11</Text>
                  </View>
                </View>
                <View style={styles.alertCardBottom}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Batch: #883921</Text>
                  <View style={styles.actionBtnsRow}>
                    <TouchableOpacity style={[styles.actionBtnPrimary, { backgroundColor: colors.primary }]}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>AUDIT NOW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </View>

          {/* Dynamic Visualization */}
          <View style={[styles.vizCard, { borderColor: colors.surfaceDim }]}>
            <View style={styles.vizOverlay}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>LOAD TRENDS</Text>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, fontSize: 14 }]}>Anomalous spikes detected in Sector 4-B. Automation recommended.</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Global CTA */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="bolt" size={24} color={colors.onPrimary} />
          <Text style={[typography.headlineLgMobile, { color: colors.onPrimary, fontSize: 18, marginLeft: spacing.sm }]}>EXECUTE REALLOCATION</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation (Mock) */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.surfaceDim }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4 }]}>SYSTEM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="account-tree" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="adjust" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>CORE</Text>
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
    paddingBottom: 180, // Space for fab and bottom nav
  },
  mainContent: {},
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoGrid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoCardHalf: {
    flex: 1,
    height: 128,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    justifyContent: 'space-between',
  },
  bentoCardFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 128,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
  },
  chartMockup: {
    width: 64,
    height: 64,
    position: 'relative',
  },
  donutOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
  },
  donutInner: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 32,
    borderWidth: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  queueList: {
    gap: 12,
  },
  alertCard: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    gap: 12,
  },
  alertCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  alertStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertRight: {
    alignItems: 'flex-end',
  },
  progressBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  alertCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtnsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtnSecondary: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  actionBtnPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  vizCard: {
    height: 160,
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff', // placeholder
  },
  vizOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    justifyContent: 'flex-end',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    zIndex: 30,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 32,
  }
});

export default CriticalAlertsScreen;
