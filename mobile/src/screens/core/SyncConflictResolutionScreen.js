import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const SyncConflictResolutionScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, letterSpacing: -0.5, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Critical Alert Header */}
        <View style={[styles.alertHeader, { backgroundColor: colors.errorContainer, borderBottomColor: colors.outlineVariant }]}>
          <View style={styles.alertTopRow}>
            <MaterialIcons name="warning" size={32} color={colors.error} />
            <View style={styles.alertTitleCol}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 20 }]}>Sync Conflict Detected</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>Object ID: 8X-7742-ALPHA</Text>
            </View>
          </View>
          <Text style={[typography.bodyMd, { color: colors.onErrorContainer, marginTop: 16 }]}>
            Version divergence in asset operational parameters. Manual intervention required to prevent data corruption.
          </Text>
        </View>

        {/* Comparison Canvas */}
        <View style={styles.comparisonCanvas}>
          
          {/* Local State */}
          <View style={styles.stateSection}>
            <View style={styles.stateHeader}>
              <View style={styles.stateTitleRow}>
                <MaterialIcons name="smartphone" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Local State</Text>
              </View>
              <View style={[styles.versionPill, { backgroundColor: colors.secondaryContainer }]}>
                <Text style={[typography.labelSm, { color: colors.onSecondaryContainer, fontSize: 10 }]}>VERSION 1.4.2</Text>
              </View>
            </View>

            <View style={[styles.bentoModule, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SOURCE ID</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>NODE_091_CLIENT</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>TIMESTAMP</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>2024-05-21 14:02:11.004</Text>
                </View>
              </View>

              <View style={styles.jsonSection}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>ENTRY CONTENT</Text>
                <View style={[styles.jsonBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
{`{
  "operational_status": "active",
  "temperature_threshold": 88.5,
  "last_maintenance": "2024-05-19",
  "priority_level": "critical",
  "override_reason": "Manual calibration"
}`}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={[styles.resolveBtnPrimary, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimary, fontWeight: 'bold' }]}>RESOLVE WITH LOCAL</Text>
                <MaterialIcons name="done-all" size={18} color={colors.onPrimary} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* VS Divider */}
          <View style={styles.vsDividerContainer}>
            <View style={[styles.vsLine, { backgroundColor: colors.outlineVariant }]} />
            <View style={[styles.vsTextBg, { backgroundColor: colors.background }]}>
              <Text style={[typography.labelCaps, { color: colors.outline }]}>VS</Text>
            </View>
          </View>

          {/* Server State */}
          <View style={styles.stateSection}>
            <View style={styles.stateHeader}>
              <View style={styles.stateTitleRow}>
                <MaterialIcons name="cloud" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Server State</Text>
              </View>
              <View style={[styles.versionPill, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>VERSION 1.4.3</Text>
              </View>
            </View>

            <View style={[styles.bentoModule, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SOURCE ID</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>CORE_PRIMARY_DB</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>TIMESTAMP</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>2024-05-21 14:02:12.891</Text>
                </View>
              </View>

              <View style={styles.jsonSection}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>ENTRY CONTENT</Text>
                <View style={[styles.jsonBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
{`{
  "operational_status": "standby",
  "temperature_threshold": 82.0,
  "last_maintenance": "2024-05-19",
  "priority_level": "standard",
  "override_reason": "Automated throttling"
}`}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={[styles.resolveBtnSecondary, { borderColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>RESOLVE WITH SERVER</Text>
                <MaterialIcons name="cloud-upload" size={18} color={colors.primary} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Diff Summary */}
        <View style={styles.diffSummaryContainer}>
          <View style={[styles.diffSummaryBox, { backgroundColor: colors.surfaceContainerHigh, borderLeftColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 16 }]}>CONFLICT SUMMARY</Text>
            
            <View style={styles.diffList}>
              <View style={styles.diffItem}>
                <View style={[styles.diffDot, { backgroundColor: colors.error }]} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, flex: 1 }]}>Key mismatch: operational_status (active vs standby)</Text>
              </View>
              <View style={styles.diffItem}>
                <View style={[styles.diffDot, { backgroundColor: colors.error }]} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, flex: 1 }]}>Variance: temperature_threshold (Δ 6.5)</Text>
              </View>
              <View style={styles.diffItem}>
                <View style={[styles.diffDot, { backgroundColor: colors.outline }]} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, flex: 1 }]}>Server state is 1.887s more recent</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text></TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="error" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
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
    padding: 4,
  },
  container: {
    paddingTop: 64, 
    paddingBottom: 100, // to clear bottom nav
  },
  alertHeader: {
    padding: 24,
    paddingTop: 32,
    borderBottomWidth: 1,
  },
  alertTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  alertTitleCol: {
    flex: 1,
    gap: 4,
  },
  comparisonCanvas: {
    padding: 16,
    paddingTop: 32,
    gap: 32,
  },
  stateSection: {
    gap: 16,
  },
  stateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stateTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bentoModule: {
    borderWidth: 1,
    padding: 32,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metaItem: {
    flex: 1,
  },
  jsonSection: {
    marginBottom: 32,
  },
  jsonBox: {
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
  },
  resolveBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  resolveBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
  },
  vsDividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    position: 'relative',
  },
  vsLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  vsTextBg: {
    paddingHorizontal: 16,
    zIndex: 1,
  },
  diffSummaryContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  diffSummaryBox: {
    padding: 32,
    borderLeftWidth: 4,
  },
  diffList: {
    gap: 8,
  },
  diffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  diffDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
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
    height: 80,
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

export default SyncConflictResolutionScreen;
