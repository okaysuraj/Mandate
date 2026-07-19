import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const EmptyStateNoMandatesScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
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
        <View style={styles.mainContent}>
          {/* Abstract Grid Background Mock (Just light padding instead of full grid) */}
          <View style={[styles.contentWrapper, { paddingHorizontal: spacing.gutter, paddingTop: spacing.xl, paddingBottom: spacing.xl }]}>
            
            {/* Empty State Content */}
            <View style={styles.emptyStateCenter}>
              <View style={[styles.iconCircle, { borderColor: colors.primary, backgroundColor: '#fff' }]}>
                <MaterialIcons name="precision-manufacturing" size={48} color={colors.primary} />
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.md, letterSpacing: -1 }]}>No Active Mandates</Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', marginBottom: spacing.xl, maxWidth: 300 }]}>
                The current operational window is open and awaiting task allocation. Systems are idling at standby capacity.
              </Text>
              
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimary, marginRight: 8 }]}>SELECT MANDATES FOR TODAY</Text>
                <MaterialIcons name="arrow-forward" size={18} color={colors.onPrimary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>VIEW HISTORICAL LOGS</Text>
              </TouchableOpacity>
            </View>

            {/* Telemetry Bento Section */}
            <View style={styles.telemetryGrid}>
              {/* Telemetry 1 */}
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>COMMITMENT RATE</Text>
                <View style={styles.metricRow}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>0.0</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.error, width: '2%' }]} />
                </View>
              </View>

              {/* Telemetry 2 */}
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>TIME REMAINING</Text>
                <View style={styles.metricRow}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>07:42</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>HRS</Text>
                </View>
                <View style={styles.statusRow}>
                  <MaterialIcons name="schedule" size={14} color={colors.onTertiaryContainer} />
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>WINDOW OPEN</Text>
                </View>
              </View>
            </View>

            {/* System Status Line */}
            <View style={[styles.systemStatus, { borderTopColor: colors.outlineVariant, borderBottomColor: colors.outlineVariant }]}>
              <View style={styles.statusLeft}>
                <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM STATUS: NOMINAL</Text>
              </View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>REFRESH: 120S</Text>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error-outline" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>SYSTEM</Text>
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
    paddingBottom: 80, // Space for bottom nav
  },
  mainContent: {
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  emptyStateCenter: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  primaryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  secondaryBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    borderWidth: 1,
    marginTop: 16,
  },
  telemetryGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginTop: 64,
  },
  bentoCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 4,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  systemStatus: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 32,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
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

export default EmptyStateNoMandatesScreen;
