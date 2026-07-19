import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const WeeklyReviewScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -0.5 }]}>MANDATE</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>REVIEW PERIOD</Text>
          <View style={styles.heroFlex}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Performance Cycle 07</Text>
            <View style={[styles.activeBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>ACTIVE</Text>
            </View>
          </View>
        </View>

        {/* Commitment Score & Velocity Trend Bento Row */}
        <View style={styles.bentoRow}>
          {/* Commitment */}
          <View style={[styles.bentoCard, styles.bentoFlex, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>COMMITMENT</Text>
            <View>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48, fontWeight: '900' }]}>
                98<Text style={{ fontSize: 20, color: colors.secondary }}>/100</Text>
              </Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>+2.4% vs PC06</Text>
            </View>
          </View>

          {/* Velocity Trend */}
          <View style={[styles.bentoCard, styles.bentoFlex, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim, position: 'relative', overflow: 'hidden' }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>VELOCITY 7D</Text>
            <View style={styles.sparklineContainer}>
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '45%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '62%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '38%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '75%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '55%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '92%' }]} />
              <View style={[styles.sparklineBar, { backgroundColor: colors.primary, height: '84%' }]} />
            </View>
          </View>
        </View>

        {/* Focus Efficiency Distribution */}
        <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim, marginBottom: 16 }]}>
          <View style={styles.cardHeaderFlex}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>FOCUS EFFICIENCY DISTRIBUTION</Text>
            <MaterialIcons name="info" size={16} color={colors.secondary} />
          </View>
          <View style={styles.histogramContainer}>
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '15%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '25%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '45%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.primary, height: '85%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.primary, height: '95%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.primary, height: '70%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '40%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '20%' }]} />
            <View style={[styles.histBar, { backgroundColor: colors.surfaceContainerHighest, height: '10%' }]} />
          </View>
          <View style={[styles.histogramFooter, { borderTopColor: colors.outlineVariant }]}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>0.0</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>EFFICIENCY ALPHA</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>1.0</Text>
          </View>
        </View>

        {/* Resource Utilization Summary */}
        <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim, marginBottom: 16 }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 32 }]}>RESOURCE UTILIZATION</Text>
          
          {/* Compute Capacity */}
          <View style={styles.resourceRow}>
            <View style={styles.resourceHeader}>
              <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Compute Capacity</Text>
              <Text style={[typography.labelSm, { color: colors.primary }]}>84.2%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '84.2%' }]} />
            </View>
            <View style={styles.resourceFooter}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>L-NODE CLUSTER A</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>12.4 TFLOPS AVG</Text>
            </View>
          </View>

          {/* Personnel Density */}
          <View style={styles.resourceRow}>
            <View style={styles.resourceHeader}>
              <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Personnel Density</Text>
              <Text style={[typography.labelSm, { color: colors.primary }]}>62/75 Units</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '82.6%' }]} />
            </View>
            <View style={styles.resourceFooter}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ON-SITE OPS</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>SHIFT DELTA STABLE</Text>
            </View>
          </View>
        </View>

        {/* Top Performing Project Clusters Ledger */}
        <View style={styles.ledgerSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, paddingHorizontal: 8, marginBottom: 8 }]}>TOP PERFORMANCE LEDGER</Text>
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim, padding: 0, overflow: 'hidden' }]}>
            
            {/* Project 1 */}
            <View style={[styles.ledgerRow, { borderBottomColor: colors.surfaceContainer }]}>
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Project ARC-900</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Infrastructure Automation</Text>
              </View>
              <View style={styles.ledgerRight}>
                <Text style={[typography.labelSm, { color: colors.primary, textAlign: 'right', marginBottom: 4 }]}>+12.5%</Text>
                <View style={[styles.statusChip, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                  <Text style={{ fontSize: 10, color: colors.onTertiaryContainer, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>CRITICAL</Text>
                </View>
              </View>
            </View>

            {/* Project 2 */}
            <View style={[styles.ledgerRow, { borderBottomColor: colors.surfaceContainer }]}>
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Quant-Shell 2</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Risk Analysis Engine</Text>
              </View>
              <View style={styles.ledgerRight}>
                <Text style={[typography.labelSm, { color: colors.primary, textAlign: 'right', marginBottom: 4 }]}>+8.2%</Text>
                <View style={[styles.statusChip, { backgroundColor: colors.secondaryContainer }]}>
                  <Text style={{ fontSize: 10, color: colors.onSecondaryContainer, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>STABLE</Text>
                </View>
              </View>
            </View>

            {/* Project 3 */}
            <View style={[styles.ledgerRow, { borderBottomWidth: 0 }]}>
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Neural-Gate V4</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Traffic Load Balancing</Text>
              </View>
              <View style={styles.ledgerRight}>
                <Text style={[typography.labelSm, { color: colors.primary, textAlign: 'right', marginBottom: 4 }]}>+19.1%</Text>
                <View style={[styles.statusChip, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                  <Text style={{ fontSize: 10, color: colors.onTertiaryContainer, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}>CRITICAL</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
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
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>SYSTEM</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 80,
  },
  heroSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  heroFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  bentoFlex: {
    flex: 1,
    height: 160,
    justifyContent: 'space-between',
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 64,
    width: '100%',
    gap: 2,
  },
  sparklineBar: {
    flex: 1,
  },
  cardHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 128,
    gap: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  histBar: {
    flex: 1,
  },
  histogramFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  resourceRow: {
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ledgerSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  ledgerRight: {
    alignItems: 'flex-end',
  },
  statusChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
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
    alignItems: 'stretch',
    height: 80,
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
    borderTopWidth: 2,
  }
});

export default WeeklyReviewScreen;
