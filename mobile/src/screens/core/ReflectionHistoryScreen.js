import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const ReflectionHistoryScreen = ({ navigation }) => {
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
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>ARCHIVE SYSTEM v4.0</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Reflection History</Text>
        </View>

        {/* Aggregate Metric Card */}
        <View style={[styles.aggregateCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
          <MaterialIcons name="analytics" size={80} color={colors.primary} style={[styles.bgIcon, { opacity: 0.1 }]} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>AGGREGATE QUALITY</Text>
          <Text style={[typography.displayLg, { color: colors.primary, lineHeight: 64 }]}>82.3</Text>
          <View style={styles.trendContainer}>
            <MaterialIcons name="trending-up" size={16} color={colors.tertiaryFixedDim} />
            <Text style={[typography.labelSm, { color: colors.tertiaryFixedDim, marginLeft: 4 }]}>+2.4% THIS QUARTER</Text>
          </View>
        </View>

        {/* Reflections Ledger Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>REFLECTIONS LEDGER</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>24 ENTRIES FOUND</Text>
          </View>

          <View style={styles.ledgerList}>
            {/* Item 1 */}
            <TouchableOpacity style={[styles.ledgerItem, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              <View style={styles.ledgerHeader}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>MANDATE ID</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>#M-8842-AX</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>DATE</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>OCT 24, 2024</Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase' }]}>Focus Quality</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>94%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '94%' }]} />
                </View>
              </View>

              <View style={[styles.ledgerFooter, { borderTopColor: colors.surfaceContainer }]}>
                <View style={styles.footerLeft}>
                  <MaterialIcons name="sentiment-very-satisfied" size={20} color={colors.onTertiaryContainer} />
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Operator Optimal</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity style={[styles.ledgerItem, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              <View style={styles.ledgerHeader}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>MANDATE ID</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>#M-8839-BX</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>DATE</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>OCT 22, 2024</Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase' }]}>Focus Quality</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>72%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '72%' }]} />
                </View>
              </View>

              <View style={[styles.ledgerFooter, { borderTopColor: colors.surfaceContainer }]}>
                <View style={styles.footerLeft}>
                  <MaterialIcons name="sentiment-neutral" size={20} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Operator Nominal</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
              </View>
            </TouchableOpacity>

            {/* Item 3 */}
            <TouchableOpacity style={[styles.ledgerItem, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              <View style={styles.ledgerHeader}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>MANDATE ID</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>#M-8791-CC</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>DATE</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>OCT 19, 2024</Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase' }]}>Focus Quality</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>81%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '81%' }]} />
                </View>
              </View>

              <View style={[styles.ledgerFooter, { borderTopColor: colors.surfaceContainer }]}>
                <View style={styles.footerLeft}>
                  <MaterialIcons name="sentiment-satisfied" size={20} color={colors.onTertiaryContainer} />
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Operator Stable</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.loadBtn, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>LOAD PREVIOUS RECORDS</Text>
          </TouchableOpacity>
        </View>

        {/* Technical Notes Summary */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 16 }]}>TECHNICAL NOTES SUMMARY</Text>
          <View style={[styles.notesCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="terminal" size={24} color={colors.primary} style={styles.terminalIcon} />
            <View style={styles.notesContent}>
              <Text style={[typography.bodyMd, { color: colors.onSurface, marginBottom: 12 }]}>
                Observed steady-state synchronization during 90% of logged active cycles. Some latency detected in peripheral response units during the mid-quarter transition.
              </Text>
              <View style={styles.tagContainer}>
                <View style={[styles.tag, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Sync: Locked</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Thermal: Nominal</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Logic: 0 Errors</Text>
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
          <MaterialIcons name="medical-information" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
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
    paddingTop: 32, // py-lg
    paddingBottom: 80, // to clear bottom nav
  },
  headerSection: {
    paddingHorizontal: 24, // px-gutter
    marginBottom: 32,
  },
  aggregateCard: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 32,
  },
  bgIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ledgerList: {
    gap: 16,
    marginBottom: 16,
  },
  ledgerItem: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  ledgerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadBtn: {
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    flexDirection: 'row',
    gap: 16,
  },
  terminalIcon: {
    marginTop: 4,
  },
  notesContent: {
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  footer: {
    padding: 32,
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
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 2,
  }
});

export default ReflectionHistoryScreen;
