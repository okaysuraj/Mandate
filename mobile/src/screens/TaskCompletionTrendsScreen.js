import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Svg, { Path } from 'react-native-svg';

const TaskCompletionTrendsScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', marginLeft: 8, letterSpacing: -1 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.titleSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }]}>Analytics Dashboard</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Velocity Lifecycle Metrics</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 8 }]}>Real-time performance throughput and system efficiency analysis.</Text>
        </View>

        {/* Metrics Stack */}
        <View style={styles.metricsStack}>
          
          {/* Avg Lead Time */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>AVG LEAD TIME</Text>
              <MaterialIcons name="timer" size={24} color={colors.primary} />
            </View>
            <View style={styles.cardValueRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 64, letterSpacing: -2 }]}>4.2</Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: 8 }]}>DAYS</Text>
            </View>
            <View style={[styles.cardFooter, { borderTopColor: colors.surfaceContainer }]}>
              <MaterialIcons name="arrow-downward" size={14} color={colors.onTertiaryContainer} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>12% vs last week</Text>
            </View>
          </View>

          {/* Daily Throughput */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>DAILY THROUGHPUT</Text>
              <MaterialIcons name="bolt" size={24} color={colors.primary} />
            </View>
            <View style={styles.cardValueRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 64, letterSpacing: -2 }]}>18</Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: 8 }]}>TASKS</Text>
            </View>
            <View style={[styles.cardFooter, { borderTopColor: colors.surfaceContainer }]}>
              <MaterialIcons name="trending-up" size={14} color={colors.onTertiaryContainer} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>Optimized output</Text>
            </View>
          </View>

          {/* WIP Velocity */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>WIP VELOCITY</Text>
              <MaterialIcons name="dynamic-form" size={24} color={colors.primary} />
            </View>
            <View style={styles.cardValueRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 64, letterSpacing: -2 }]}>24</Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: 8 }]}>ACTIVE</Text>
            </View>
            <View style={[styles.cardFooter, { borderTopColor: colors.surfaceContainer }]}>
              <MaterialIcons name="priority-high" size={14} color={colors.error} />
              <Text style={[typography.labelSm, { color: colors.error, marginLeft: 4 }]}>Near Capacity</Text>
            </View>
          </View>

          {/* Efficiency Ratio */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>EFFICIENCY RATIO</Text>
              <MaterialIcons name="auto-graph" size={24} color={colors.primary} />
            </View>
            <View style={styles.cardValueRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 64, letterSpacing: -2 }]}>94</Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: 8 }]}>%</Text>
            </View>
            <View style={[styles.cardFooterBar, { borderTopColor: colors.surfaceContainer }]}>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '94%' }]} />
              </View>
            </View>
          </View>

        </View>

        {/* Creation vs Completion Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>LIFECYCLE BALANCE</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Creation vs. Completion</Text>
          </View>
          
          <View style={[styles.chartBox, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <Svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
              <Path d="M0,180 L50,160 L100,155 L150,130 L200,110 L250,90 L300,70 L350,65 L400,40" fill="none" stroke={colors.surfaceDim} strokeDasharray="4" strokeWidth="2" />
              <Path d="M0,185 L50,175 L100,165 L150,150 L200,125 L250,105 L300,85 L350,75 L400,50" fill="none" stroke={colors.primary} strokeWidth="3" />
            </Svg>

            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={[typography.labelSm, { color: colors.primary }]}>Completed</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: 'transparent', borderColor: colors.outline, borderWidth: 1, borderStyle: 'dashed' }]} />
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Created</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Throughput Histogram */}
        <View style={styles.histogramSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>VOLUME DISTRIBUTION</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 16 }]}>Throughput Histogram</Text>

          <View style={[styles.histogramBox, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View style={styles.barsContainer}>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '25%', backgroundColor: colors.surfaceContainer }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '50%', backgroundColor: colors.surfaceContainer }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '75%', backgroundColor: colors.primary }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '100%', backgroundColor: colors.primary }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '80%', backgroundColor: colors.primary }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '60%', backgroundColor: colors.surfaceContainer }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '40%', backgroundColor: colors.surfaceContainer }]} /></View>
              <View style={styles.barWrapper}><View style={[styles.barFill, { height: '33%', backgroundColor: colors.surfaceContainerHigh }]} /></View>
            </View>
            <View style={styles.histogramLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>MON</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>FRI</Text>
            </View>
          </View>
        </View>

        {/* Visual */}
        <View style={styles.visualSection}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYudhNRgQVsnyj7XuWcnVZXL1WXRjOxY_azwveC1_Nr0jSeWi_oC1Gqq8odhDJtnQwPnFSZCRf5SvSp1kOCMt54WJ07difAA3jDjZ-G7oIqgW_H7JhHjbzrHtfmdJm76HENdEawwQwyJbtsEvYa9o3LdPgexV3djLrexaQwDeZhAXRhNv6QkKU_XEWN9NkYyGqhth7zF6LvM2MKs-AGNAHgtbE71zIK6HCwxus_PMKDmM2TIMpMkKzjg' }}
            style={styles.visualImg}
          />
          <View style={[styles.visualOverlay, { backgroundColor: 'rgba(0,0,0,0.1)' }]} />
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline' }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline' }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline' }]}>Support</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error-outline" size={24} color={colors.secondary} />
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
    height: 56,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
    paddingTop: 72, 
    paddingBottom: 80, // Space for bottom nav
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  metricsStack: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 64,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 32,
    // rounded-none from html means 0 border radius
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFooterBar: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  chartSection: {
    paddingHorizontal: 24,
    marginBottom: 64,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartBox: {
    borderWidth: 1,
    aspectRatio: 16/9,
    position: 'relative',
    padding: 16,
  },
  chartLegend: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    gap: 16,
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
  histogramSection: {
    paddingHorizontal: 24,
    marginBottom: 64,
  },
  histogramBox: {
    borderWidth: 1,
    padding: 32,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 192, // h-48
    gap: 4,
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
  },
  histogramLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  visualSection: {
    height: 192,
    width: '100%',
    position: 'relative',
  },
  visualImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  visualOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
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
    borderTopWidth: 2,
  }
});

export default TaskCompletionTrendsScreen;
