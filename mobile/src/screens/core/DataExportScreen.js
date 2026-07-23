import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const DataExportScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [sqlEnabled, setSqlEnabled] = useState(true);
  const [jsonEnabled, setJsonEnabled] = useState(false);
  const [compression, setCompression] = useState('RAW'); // RAW, GZIP, LZ4

  const renderToggle = (title, subtitle, enabled, setEnabled) => (
    <View style={styles.toggleRow}>
      <View style={styles.toggleText}>
        <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>{title}</Text>
        <Text style={[typography.labelSm, { color: colors.secondary }]}>{subtitle}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.toggleTrack, { backgroundColor: enabled ? colors.primaryContainer : colors.secondaryContainer }]}
        onPress={() => setEnabled(!enabled)}
        activeOpacity={0.8}
      >
        <View style={[styles.toggleKnob, { left: enabled ? 24 : 4 }]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.lg }]}>
          
          {/* Workspace Header */}
          <View style={{ marginBottom: spacing.md }}>
            <View style={styles.syncStatusRow}>
              <View style={[styles.statusChip, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10, textTransform: 'uppercase' }]}>Live Sync</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: spacing.xs }]}>ID: 247-ALPHA</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs, marginBottom: spacing.xs }]}>Data Export Workspace</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary }]}>Configure immutable serialization parameters and monitor real-time packaging queues.</Text>
          </View>

          {/* Export Configuration */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>EXPORT PARAMETERS</Text>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>Defaults</Text>
            </View>
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              {renderToggle('SQL Serialization', 'Immutable schema-locked export', sqlEnabled, setSqlEnabled)}
              <View style={[styles.divider, { backgroundColor: colors.surfaceContainer }]} />
              {renderToggle('JSON Payload', 'Nested object hierarchy', jsonEnabled, setJsonEnabled)}
              <View style={[styles.divider, { backgroundColor: colors.surfaceContainer }]} />
              
              <View style={{ marginTop: spacing.sm }}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>COMPRESSION LEVEL</Text>
                <View style={styles.compressionRow}>
                  {['RAW', 'GZIP', 'LZ4'].map((level) => {
                    const isActive = compression === level;
                    return (
                      <TouchableOpacity 
                        key={level}
                        style={[
                          styles.compressionBtn, 
                          { 
                            borderColor: isActive ? colors.primary : colors.outlineVariant,
                            borderWidth: isActive ? 2 : 1 
                          }
                        ]}
                        onPress={() => setCompression(level)}
                      >
                        <Text style={[typography.labelSm, { color: isActive ? colors.primary : colors.secondary }]}>{level}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          {/* Packaging Queues */}
          <View style={styles.section}>
            <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.sm }]}>PACKAGING QUEUES</Text>
            
            {/* Queue Item 1 */}
            <View style={[styles.queueCard, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="data-object" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>TRANSACTION_LOGS_MAY</Text>
                  <View style={[styles.statusChip, { backgroundColor: colors.tertiaryContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>82%</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '82%' }]} />
                </View>
              </View>
            </View>

            {/* Queue Item 2 */}
            <View style={[styles.queueCard, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="table-rows" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>USER_METRICS_V4</Text>
                  <View style={[styles.statusChip, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>PENDING</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.outline, width: '0%' }]} />
                </View>
              </View>
            </View>

            {/* Queue Item 3 */}
            <View style={[styles.queueCard, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="cloud-done" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>SYSTEM_ARCHIVE_FINAL</Text>
                  <View style={[styles.statusChip, { backgroundColor: colors.primaryContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSecondary, fontSize: 10 }]}>DONE</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} />
                </View>
              </View>
            </View>

          </View>

          {/* System Logs */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM LOGS</Text>
              <MaterialIcons name="filter-list" size={16} color={colors.secondary} />
            </View>
            <View style={[styles.logsCard, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, marginBottom: 4 }]}>08:22:11 | INIT_EXPORT_DAEMON...</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.7, marginBottom: 4 }]}>08:22:14 | VERIFY_SQL_SCHEMA [PASSED]</Text>
              <Text style={[typography.labelSm, { color: '#fff', marginBottom: 4 }]}>08:22:18 | SERIALIZING_CHUNK_02... [RUNNING]</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.7, marginBottom: 4 }]}>08:22:25 | ALLOCATING_BUFF_SIZE: 512MB</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, marginBottom: 4 }]}>08:22:30 | WAITING_FOR_QUEUE_ACK...</Text>
              <View style={styles.logStreamActive}>
                <View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                <Text style={[typography.labelSm, { color: colors.tertiaryFixedDim }]}>STREAM_ACTIVE_SOCKET: 44.02.1</Text>
              </View>
            </View>
          </View>

          {/* Final Action CTA */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="rocket-launch" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>INITIALIZE BATCH EXPORT</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.8, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom NavBar */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="warning" size={24} color={colors.secondary} />
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
  mainContent: {},
  syncStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    flex: 1,
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  compressionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  compressionBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  queueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  queueIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  queueInfo: {
    flex: 1,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  logsCard: {
    padding: 16,
    borderRadius: 8,
    minHeight: 160,
  },
  logStreamActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  actionSection: {
    paddingBottom: 32,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
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
    paddingBottom: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 2,
  }
});

export default DataExportScreen;
