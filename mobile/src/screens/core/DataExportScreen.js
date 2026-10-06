import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
        <View style={[styles.toggleKnob, { backgroundColor: colors.surfaceContainerLowest, left: enabled ? 24 : 4 }]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
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
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10, textTransform: 'uppercase' }]}>Ready</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: spacing.xs }]}>WORKSPACE EXPORT</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs, marginBottom: spacing.xs }]}>Data Export</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary }]}>Export tasks, projects, and workspace data in CSV or JSON format.</Text>
          </View>

          {/* Export Configuration */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>EXPORT FORMATS</Text>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>Defaults</Text>
            </View>
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              {renderToggle('CSV / Spreadsheet', 'Export tasks as formatted CSV table', sqlEnabled, setSqlEnabled)}
              <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
              {renderToggle('JSON Archive', 'Full nested workspace data and metadata', jsonEnabled, setJsonEnabled)}
              <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
              
              <View style={{ marginTop: spacing.sm }}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>COMPRESSION</Text>
                <View style={styles.compressionRow}>
                  {['RAW', 'ZIP', 'GZIP'].map((level) => {
                    const isActive = compression === level;
                    return (
                      <TouchableOpacity 
                        key={level}
                        style={[
                          styles.compressionBtn, 
                          { 
                            backgroundColor: isActive ? colors.surfaceContainerHigh : colors.surfaceContainerLowest,
                            borderColor: isActive ? colors.primary : colors.outlineVariant,
                            borderWidth: 1 
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
            <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.sm }]}>RECENT EXPORTS</Text>
            
            {/* Queue Item 1 */}
            <View style={[styles.queueCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="data-object" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>TASKS_AND_PROJECTS</Text>
                  <View style={[styles.statusChip, { backgroundColor: colors.tertiaryContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>100%</Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} />
                </View>
              </View>
            </View>

            {/* Queue Item 2 */}
            <View style={[styles.queueCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="table-rows" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>WORKSPACE_ANALYTICS</Text>
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
            <View style={[styles.queueCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.queueIcon, { backgroundColor: colors.surfaceContainer }]}>
                <MaterialIcons name="cloud-done" size={20} color={colors.primary} />
              </View>
              <View style={styles.queueInfo}>
                <View style={styles.queueHeader}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>FULL_WORKSPACE_BACKUP</Text>
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
              <Text style={[typography.labelCaps, { color: colors.primary }]}>EXPORT STATUS LOGS</Text>
              <MaterialIcons name="filter-list" size={16} color={colors.secondary} />
            </View>
            <View style={[styles.logsCard, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, marginBottom: 4 }]}>08:22:11 | Export job initialized...</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.7, marginBottom: 4 }]}>08:22:14 | Task records verified [PASSED]</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, fontWeight: '600', marginBottom: 4 }]}>08:22:18 | Packaging files and attachments... [RUNNING]</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.7, marginBottom: 4 }]}>08:22:25 | Archive size: 14.2 MB</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, marginBottom: 4 }]}>08:22:30 | Generating secure download link...</Text>
              <View style={styles.logStreamActive}>
                <View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                <Text style={[typography.labelSm, { color: colors.tertiaryFixedDim }]}>STATUS: READY FOR DOWNLOAD</Text>
              </View>
            </View>
          </View>

          {/* Final Action CTA */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="file-download" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>EXPORT DATA</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.8, marginBottom: 16 }]}>© 2024 MANDATE</Text>
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
          <MaterialIcons name="folder-open" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications-none" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>SETTINGS</Text>
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
    borderRadius: 12,
    padding: 16,
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
    borderRadius: 8,
  },
  queueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  queueIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
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
    borderRadius: 12,
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
    borderRadius: 12,
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
