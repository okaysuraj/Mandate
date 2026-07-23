import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const OfflineModeScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1 }]}>MANDATE</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Main Content Canvas */}
        <View style={styles.contentCanvas}>
          {/* Status Indicator */}
          <View style={styles.statusSection}>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainer }]}>
              <MaterialIcons name="portable-wifi-off" size={48} color={colors.primary} />
            </View>
            <Text style={[typography.headlineLg, { color: colors.primary, letterSpacing: -1, textAlign: 'center' }]}>OFFLINE_MODE_ACTIVE</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', maxWidth: 300, marginTop: 8 }]}>
              No Signal Detected. The industrial local core has automatically switched to restricted access.
            </Text>
          </View>

          {/* Cache Details */}
          <View style={styles.gridSection}>
            {/* Local Cache Card */}
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, padding: 32 }]}>
              <View style={styles.cardHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM_CACHE</Text>
                <MaterialIcons name="storage" size={16} color={colors.secondary} />
              </View>
              <View style={styles.cacheRow}>
                <Text style={[typography.displayLg, { fontSize: 36, color: colors.primary }]}>42</Text>
                <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: 8, paddingBottom: 4 }]}>mandates available</Text>
              </View>
              <View style={styles.progressSection}>
                <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerLow }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '68%' }]} />
                </View>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 8 }]}>Storage: 2.4GB / 4.0GB allocated</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
                <Text style={[typography.headlineLgMobile, { fontSize: 20, color: colors.onPrimary }]}>Continue Offline</Text>
                <MaterialIcons name="arrow-forward" size={24} color={colors.onPrimary} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="history" size={20} color={colors.primary} />
                <Text style={[typography.bodyMd, { color: colors.primary, marginLeft: 8 }]}>View Cached Logs</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pending Alert */}
          <View style={styles.pendingAlertWrapper}>
            <View style={[styles.pendingAlert, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <Animated.View style={{ opacity: pulseAnim }}>
                <MaterialIcons name="sync-problem" size={24} color={colors.secondary} />
              </Animated.View>
              <View style={styles.pendingText}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYNC_PENDING</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>12 items awaiting uplink. Connection required.</Text>
              </View>
            </View>
          </View>

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
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10, fontWeight: 'bold' }]}>SYSTEM</Text>
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
  },
  contentCanvas: {
    padding: 24, // px-gutter
    paddingTop: 64, // py-xl
    gap: 32, // space-y-lg
    flex: 1,
    alignItems: 'center',
  },
  statusSection: {
    alignItems: 'center',
    width: '100%',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gridSection: {
    width: '100%',
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cacheRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  progressSection: {
    paddingTop: 16,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionButtons: {
    gap: 16,
    paddingTop: 8,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    borderWidth: 1,
  },
  pendingAlertWrapper: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: 32,
  },
  pendingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    gap: 16,
  },
  pendingText: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
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

export default OfflineModeScreen;
