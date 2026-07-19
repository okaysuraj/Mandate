import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const MonthlyReviewScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surfaceBright }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>REVIEW CYCLE: NOV 2024</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>Monthly Report</Text>
          </View>
          <View style={[styles.trendBadge, { backgroundColor: colors.tertiaryContainer }]}>
            <MaterialIcons name="trending-up" size={14} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>12.4%</Text>
          </View>
        </View>

        {/* Long-Term Operational Trend */}
        <View style={styles.trendSection}>
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryFixedVariant }]}>LONG-TERM OPERATIONAL TREND</Text>
              <MaterialIcons name="info" size={16} color={colors.secondary} />
            </View>
            
            <View style={styles.chartContainer}>
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '30%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '45%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '40%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '55%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '65%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '85%' }]} />
            </View>
            
            <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 16 }]}>
              Efficiency metrics show a sustained upward trajectory over 6 months.
            </Text>
          </View>

          {/* Double Column */}
          <View style={styles.doubleCol}>
            {/* Allocation */}
            <View style={[styles.bentoCard, styles.halfCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center', marginBottom: 16 }]}>ALLOCATION</Text>
              
              <View style={styles.donutPlaceholder}>
                <View style={[styles.donutRing, { borderColor: colors.surfaceContainer }]}>
                  <View style={[styles.donutInnerRing, { borderTopColor: colors.primary, borderRightColor: colors.primary }]} />
                </View>
                <View style={styles.donutCenter}>
                  <Text style={[typography.labelSm, { fontWeight: 'bold' }]}>72%</Text>
                </View>
              </View>

              <Text style={[typography.labelSm, { textAlign: 'center', marginTop: 16 }]}>Active Cycles</Text>
            </View>

            {/* Growth Metric */}
            <View style={[styles.bentoCard, styles.halfCard, { borderColor: colors.outlineVariant, justifyContent: 'space-between' }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>MONTHLY GROWTH</Text>
              <View>
                <Text style={[typography.headlineLgMobile, { fontWeight: 'bold' }]}>12.4%</Text>
                <View style={[styles.miniProgressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.miniProgressFill, { backgroundColor: colors.primary, width: '12.4%' }]} />
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>+2.1% from OCT</Text>
            </View>
          </View>
        </View>

        {/* Task Heatmap Placeholder */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>TASK INTENSITY HEATMAP</Text>
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, padding: 16 }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.heatmapRow}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.heatmapCell, 
                      { backgroundColor: i % 4 === 0 ? colors.primary : (i % 3 === 0 ? colors.surfaceContainerHigh : colors.surfaceContainerLowest) }
                    ]} 
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.heatmapLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>00:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>12:00</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>23:59</Text>
            </View>
          </View>
        </View>

        {/* Node-Level Performance */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>NODE-LEVEL PERFORMANCE (30D)</Text>
            <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>VIEW ALL</Text>
          </View>

          <View style={styles.nodeList}>
            {/* Row 1 */}
            <View style={[styles.nodeCard, { borderColor: colors.outlineVariant }]}>
              <View style={styles.nodeLeft}>
                <View style={[styles.nodeIconBg, { backgroundColor: colors.surfaceContainer }]}>
                  <MaterialIcons name="memory" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={[typography.labelSm, { fontWeight: 'bold' }]}>NODE_DELTA_01</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Compute Unit Alpha</Text>
                </View>
              </View>
              <View style={styles.nodeRight}>
                <Text style={[typography.labelSm, { fontWeight: 'bold', color: colors.onTertiaryContainer }]}>98.2%</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Uptime</Text>
              </View>
            </View>

            {/* Row 2 */}
            <View style={[styles.nodeCard, { borderColor: colors.outlineVariant }]}>
              <View style={styles.nodeLeft}>
                <View style={[styles.nodeIconBg, { backgroundColor: colors.surfaceContainer }]}>
                  <MaterialIcons name="router" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={[typography.labelSm, { fontWeight: 'bold' }]}>NODE_EPSILON_09</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Relay Link Primary</Text>
                </View>
              </View>
              <View style={styles.nodeRight}>
                <Text style={[typography.labelSm, { fontWeight: 'bold', color: colors.error }]}>84.1%</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Uptime</Text>
              </View>
            </View>

            {/* Row 3 */}
            <View style={[styles.nodeCard, { borderColor: colors.outlineVariant }]}>
              <View style={styles.nodeLeft}>
                <View style={[styles.nodeIconBg, { backgroundColor: colors.surfaceContainer }]}>
                  <MaterialIcons name="storage" size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={[typography.labelSm, { fontWeight: 'bold' }]}>NODE_OMEGA_04</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Storage Array Base</Text>
                </View>
              </View>
              <View style={styles.nodeRight}>
                <Text style={[typography.labelSm, { fontWeight: 'bold' }]}>99.9%</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Uptime</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Predictive CTA */}
        <View style={[styles.ctaBox, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="shield" size={48} color={colors.onPrimary} style={{ marginBottom: 16 }} />
          <Text style={[typography.headlineLgMobile, { color: colors.onPrimary, textAlign: 'center', marginBottom: 8 }]}>
            Predictive System Health
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onPrimaryContainer, textAlign: 'center', marginBottom: 24 }]}>
            Automated diagnostics have identified 3 preventative maintenance opportunities for the next cycle.
          </Text>
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>RUN PREDICTIVE ANALYSIS</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10, fontWeight: 'bold' }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
    marginHorizontal: -8,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 32,
    paddingBottom: 100,
    gap: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  trendSection: {
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24, // p-lg
    backgroundColor: '#ffffff',
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartContainer: {
    height: 192, // h-48
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 16,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  doubleCol: {
    flexDirection: 'row',
    gap: 16,
  },
  halfCard: {
    flex: 1,
    padding: 16,
  },
  donutPlaceholder: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    position: 'relative',
  },
  donutRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 8,
    position: 'relative',
  },
  donutInnerRing: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 8,
    borderRadius: 48,
    borderColor: 'transparent',
    transform: [{ rotate: '-45deg' }]
  },
  donutCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniProgressTrack: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  section: {
    width: '100%',
  },
  heatmapRow: {
    flexDirection: 'row',
    gap: 4,
    minWidth: 320,
  },
  heatmapCell: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  heatmapLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nodeList: {
    gap: 8,
  },
  nodeCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  nodeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  nodeIconBg: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeRight: {
    alignItems: 'flex-end',
  },
  ctaBox: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  footer: {
    marginHorizontal: -16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    marginTop: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
  }
});

export default MonthlyReviewScreen;
