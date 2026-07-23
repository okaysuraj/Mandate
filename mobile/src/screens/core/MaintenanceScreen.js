import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const MaintenanceScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Spin animation
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
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
        
        {/* Hero Visualization */}
        <View style={styles.heroSection}>
          <View style={styles.vizContainer}>
            {/* Outer Ring */}
            <Animated.View style={[
              styles.outerRing, 
              { borderColor: colors.outlineVariant, transform: [{ rotate: spin }] }
            ]} />
            
            {/* Main Gear */}
            <Animated.View style={[
              styles.gearContainer,
              { transform: [{ rotate: spin }] }
            ]}>
              <MaterialIcons name="settings" size={120} color={colors.primary} style={{ opacity: 0.9 }} />
            </Animated.View>

            {/* Center Core */}
            <View style={styles.centerCoreWrapper}>
              <View style={[styles.centerCore, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
                <MaterialIcons name="bolt" size={24} color={colors.primary} />
              </View>
            </View>
          </View>

          <View style={styles.heroTextContainer}>
            <View style={[styles.statusBadge, { backgroundColor: colors.secondaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>SYSTEM STATUS: MAINTENANCE</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 16, marginBottom: 8 }]}>System Maintenance in Progress</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', maxWidth: 280 }]}>
              Our industrial nodes are being optimized for peak operational efficiency.
            </Text>
          </View>
        </View>

        {/* Estimated Uptime Countdown */}
        <View style={[styles.bentoBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>ESTIMATED UPTIME</Text>
            <MaterialIcons name="timer" size={20} color={colors.primary} />
          </View>
          <View style={styles.countdownRow}>
            <View>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 36, letterSpacing: -1, fontWeight: '800' }]}>00:42:18</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 2, marginTop: 4 }]}>HRS MIN SEC</Text>
            </View>
            <View style={[styles.onTrackBadge, { backgroundColor: colors.tertiaryFixedDim }]}>
              <Text style={[typography.labelSm, { color: colors.tertiaryContainer }]}>ON TRACK</Text>
            </View>
          </View>
        </View>

        {/* Node Migration Progress Bar */}
        <View style={[styles.bentoBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>NODE MIGRATION</Text>
            <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>78.4%</Text>
          </View>
          
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerHighest }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '78.4%' }]} />
          </View>
          
          <View style={styles.progressFooter}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>STAGE 3: SYNCING</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CLUSTER_094</Text>
          </View>
        </View>

        {/* Admin Advisory Module */}
        <View style={[styles.advisoryBox, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
          <View style={styles.advisoryHeader}>
            <MaterialIcons name="warning" size={20} color={colors.error} />
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 8 }]}>ADMIN ADVISORY</Text>
          </View>
          <Text style={[typography.bodyMd, { color: colors.onPrimary, opacity: 0.9, lineHeight: 24, fontSize: 14 }]}>
            Manual overrides and node access are strictly disabled during core migration to prevent data divergence.{' '}
            <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>System Lockout is active.</Text>
          </Text>
          <View style={styles.advisoryFooter}>
            <MaterialIcons name="lock" size={12} color={colors.onPrimary} style={{ opacity: 0.6 }} />
            <Text style={[typography.labelSm, { color: colors.onPrimary, fontSize: 10, letterSpacing: 2, opacity: 0.6, marginLeft: 4 }]}>
              SECURE HANDSHAKE PENDING
            </Text>
          </View>
        </View>

        {/* Help Link */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpBtn}>
            <MaterialIcons name="support-agent" size={20} color={colors.secondary} />
            <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>CONTACT INDUSTRIAL SUPPORT</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary, letterSpacing: 2, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
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
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
    padding: 24, // px-gutter
    paddingBottom: 100,
    gap: 32, // space-y-lg
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 16,
  },
  vizContainer: {
    width: 192, // w-48
    height: 192, // h-48
    position: 'relative',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 4,
    borderStyle: 'dashed',
    borderRadius: 96,
    opacity: 0.3,
  },
  gearContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCoreWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCore: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // shadow
  },
  heroTextContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bentoBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 32, // p-lg
    gap: 16, // space-y-md
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  onTrackBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  advisoryBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 32,
    elevation: 4, // shadow-xl
    gap: 16,
  },
  advisoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  advisoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  helpSection: {
    alignItems: 'center',
    paddingTop: 16,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginHorizontal: -24, // neg px-gutter
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    marginTop: 32,
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

export default MaintenanceScreen;
