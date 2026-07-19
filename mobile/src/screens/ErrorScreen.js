import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ErrorScreen = ({ navigation }) => {
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
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Error Heading Section */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={styles.alertHeader}>
              <MaterialIcons name="warning" size={16} color={colors.error} />
              <Text style={[typography.labelCaps, { color: colors.error, marginLeft: 8, textTransform: 'uppercase' }]}>System Alert • Terminal Critical</Text>
            </View>
            <Text style={[typography.displayLg, { color: colors.primary, fontSize: 40, lineHeight: 40, marginBottom: spacing.sm }]}>ERR_PROTOCOL_VIOLATION</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
              The industrial handshake protocol encountered an unrecoverable deviation at the secure hardware layer.
            </Text>
          </View>

          {/* Core Dump Visualization */}
          <View style={[styles.vizCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
            <View style={styles.vizHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>CORE_DUMP_VIZ_V4.0</Text>
              <View style={[styles.liveTraceBadge, { backgroundColor: colors.errorContainer }]}>
                <Text style={[typography.labelSm, { color: colors.error, fontSize: 10 }]}>LIVE TRACE</Text>
              </View>
            </View>

            <View style={[styles.imgContainer, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyW5k19rU6Slg_mTVu3H1PfEuUrUmT5_hvgjM5PEG3PcAa1EML6zDIvgItESUJ4omAR93w4i6vNp4irMul-LY3RRATNgoD0zUYEw0rtnGIadgWlyST4QlMvnf_044X8BUTWlE10uL39TcdhztBqKjRqNrX5NLYiBfopDprA45R0vtHGHeiljnaKT3hdn867lI8ywdz9PYIvWfLw4MErCWcip-bgFgixvIHPs_V6IHpBY4_1sK5Ugkh8A' }}
                style={styles.img}
              />
              <View style={[styles.imgOverlay, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
            </View>

            <View style={styles.memoryOffsetContainer}>
              <View style={styles.memoryOffsetHeader}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>MEMORY_OFFSET</Text>
                <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>0x004F32A1</Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainerHighest }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.error, width: '75%' }]} />
              </View>
            </View>
          </View>

          {/* Technical Details List */}
          <View style={{ marginBottom: spacing.xl, marginTop: spacing.xl }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>CRITICAL_DEVIATION_LOG</Text>
            <View style={[styles.logList, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
              
              <View style={[styles.logItem, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>STATUS_CODE</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>503_SERVICE_UNAVAILABLE</Text>
                </View>
                <MaterialIcons name="terminal" size={20} color={colors.outline} />
              </View>
              
              <View style={[styles.logItem, { borderBottomColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>FAULT_LOCUS</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>IO_BUFFER_OVERFLOW</Text>
                </View>
              </View>
              
              <View style={[styles.logItem, { borderBottomWidth: 0 }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>TIMESTAMP</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>2024-11-21T09:12:44Z</Text>
                </View>
              </View>

            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="refresh" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
              <Text style={[typography.bodyMd, { color: colors.onPrimary }]}>Retry Handshake</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outline }]}>
              <MaterialIcons name="description" size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={[typography.bodyMd, { color: colors.primary }]}>View Crash Log</Text>
            </TouchableOpacity>
          </View>

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
  mainContent: {},
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vizCard: {
    padding: 24,
    borderWidth: 2,
    gap: 16,
  },
  vizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveTraceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  imgContainer: {
    height: 192,
    width: '100%',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  memoryOffsetContainer: {
    gap: 4,
  },
  memoryOffsetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    height: 4,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  logList: {
    borderWidth: 1,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  actionContainer: {
    gap: 16,
    marginBottom: 32,
  },
  primaryBtn: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  secondaryBtn: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    borderWidth: 1,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
    marginBottom: 64, // Extra space just in case
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 32,
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

export default ErrorScreen;
