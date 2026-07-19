import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const EmptyStateNoTasksScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

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
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.xl }]}>
          
          {/* Empty State Hero */}
          <View style={styles.heroSection}>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.scanline} />
              <MaterialIcons name="precision-manufacturing" size={48} color={colors.primary} />
            </View>
            <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48, marginBottom: spacing.sm, textAlign: 'center', letterSpacing: -1 }]}>Backlog Vacant</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', maxWidth: 300 }]}>
              No operational tasks detected in the current queue. System idling at baseline.
            </Text>
          </View>

          {/* Primary Actions */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="terminal" size={18} color={colors.onPrimary} style={{ marginRight: 8 }} />
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>Initialize Mandate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="sync" size={18} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={[typography.labelSm, { color: colors.primary }]}>Sync from Core</Text>
            </TouchableOpacity>
          </View>

          {/* Bento Secondary Modules */}
          <View style={styles.bentoGrid}>
            
            {/* Auto Allocate Module */}
            <TouchableOpacity style={[styles.bentoModule, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoHeader}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 2 }]}>Auto Allocate</Text>
                <MaterialIcons name="bolt" size={16} color={colors.primary} />
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14, marginBottom: 12 }]}>
                Automated logic to pull high-priority shards from the global stack and assign to your local worker.
              </Text>
              <View style={{ alignSelf: 'flex-start' }}>
                <View style={[styles.inactiveBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelSm, { color: colors.onSecondaryContainer, fontSize: 10 }]}>INACTIVE</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* CLI Interface Module */}
            <TouchableOpacity style={[styles.bentoModule, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoHeader}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 2 }]}>CLI Interface</Text>
                <MaterialIcons name="code" size={16} color={colors.primary} />
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14, marginBottom: 12 }]}>
                Direct access to the mandate shell. Run scripts or manually ingest batch job descriptors.
              </Text>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>Open Terminal</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>© 2024 MANDATE INDUSTRIAL</Text>
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
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 48,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 48,
    justifyContent: 'flex-end',
  },
  iconBtn: {
    padding: 8,
    marginHorizontal: -8,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80, // Space for bottom nav
  },
  mainContent: {
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  actionContainer: {
    width: '100%',
    marginBottom: 48,
    gap: 16,
  },
  primaryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
  },
  secondaryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 1,
  },
  bentoGrid: {
    width: '100%',
    gap: 16,
    marginBottom: 48,
  },
  bentoModule: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inactiveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  footer: {
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

export default EmptyStateNoTasksScreen;
