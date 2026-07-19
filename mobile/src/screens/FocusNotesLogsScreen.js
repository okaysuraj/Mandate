import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const FocusNotesLogsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>PROMETHEUS</Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqNpLpWNML3ng5yZpLbMSED_G5X-hoH3ufA4RHPVreC9poNDPc1nR_9zY-TGLPWT5pCeMV0gyojCc3jaQyaJuDymToHxO89OELjU_ckNJ48wZok2XCnA4-JPNY9OOB5DUIhaXMyXOgwwhzn9-1EM_dWRo5KKLGVQRcNLHt6iMjAgjE_4NBdOXHvW8qCVKiDR8qwO40ZX_oz9v7EpEuX3igEpFqWJ6_BgNQfJ7b3uK_zLBju5SuIggW-w' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Dashboard Header / Active Document Tags */}
        <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>FOCUS MODE</Text>
            <View style={[styles.liveCaptureBadge, { backgroundColor: colors.tertiaryContainer + '1A', borderColor: colors.onTertiaryContainer + '33' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>LIVE CAPTURE</Text>
            </View>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.md }]}>Neural Engine Optimization Trace</Text>
        </View>

        {/* Document Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.tagsContainer, { paddingHorizontal: spacing.md }]}>
          <View style={[styles.tag, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="terminal" size={14} color={colors.onPrimary} style={{ marginRight: 4 }} />
            <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>SYSTEM_V2</Text>
          </View>
          <View style={[styles.tagOutline, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>LOGS</Text>
          </View>
          <View style={[styles.tagOutline, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>LATENCY_CRITICAL</Text>
          </View>
          <View style={[styles.tagOutline, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>DEBUG</Text>
          </View>
        </ScrollView>

        {/* Technical Log Feed */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <View style={[styles.sectionHeader, { marginBottom: spacing.md }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>ACTIVITY LOG</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="filter-list" size={16} color={colors.secondary} />
              <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 4 }]}>FILTER</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logList}>
            {/* Log Card 1 */}
            <View style={[styles.bentoCard, { borderLeftColor: colors.primary, borderLeftWidth: 4 }]}>
              <View style={styles.logCardHeader}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>14:22:05.892</Text>
                <MaterialIcons name="more-horiz" size={18} color={colors.secondary} />
              </View>
              <Text style={[typography.bodyMd, { color: colors.onBackground, marginBottom: 16 }]}>
                Buffer overflow detected in L2 cache sequence. Re-routing through secondary parity nodes.
              </Text>
              <View style={[styles.codeSnippetContainer, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={[styles.codeSnippetHeader, { backgroundColor: colors.surfaceContainer, borderBottomColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>memory_manager.rs</Text>
                  <MaterialIcons name="content-copy" size={16} color={colors.secondary} />
                </View>
                <ScrollView horizontal style={styles.codeContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>
                    fn flush_l2_cache(ptr: *mut u8) {'\n'}
                    {'  '}unsafe {'{'} atomic_fence(SeqCst); {'}'}{'\n'}
                    {'  '}// Validate alignment{'\n'}
                    {'  '}if ptr.align_to(64) != 0 {'{'} panic!("E_ALIGN"); {'}'}{'\n'}
                    {'}'}
                  </Text>
                </ScrollView>
              </View>
            </View>

            {/* Log Card 2 - Success */}
            <View style={styles.bentoCard}>
              <View style={styles.logCardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer, marginRight: 8 }]} />
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>14:25:12.004</Text>
                </View>
                <View style={[styles.resolvedBadge, { backgroundColor: colors.tertiaryContainer + '1A' }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>RESOLVED</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.onBackground }]}>
                Parity nodes synchronized. System throughput stabilized at 98.4% capacity.
              </Text>
            </View>

            {/* Log Card 3 - Manual Entry */}
            <View style={[styles.bentoCard, { borderLeftColor: colors.secondary, borderLeftWidth: 4 }]}>
              <View style={styles.logCardHeader}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>14:30:00.000</Text>
                <MaterialIcons name="edit-note" size={18} color={colors.secondary} />
              </View>
              <Text style={[typography.bodyMd, { color: colors.onBackground, fontStyle: 'italic', fontWeight: '500' }]}>
                "Note: Check thermal throttling on Rack 04-B after next cycle. Sensors indicating 5% delta above baseline."
              </Text>
            </View>
          </View>
        </View>

        {/* Metrics Snapshot */}
        <View style={{ marginTop: spacing.lg, paddingBottom: spacing.xl }}>
          <View style={[styles.sectionHeader, { paddingHorizontal: spacing.md, marginBottom: spacing.sm }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>LIVE TELEMETRY</Text>
            <MaterialIcons name="sensors" size={20} color={colors.onTertiaryContainer} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.telemetryContainer, { paddingHorizontal: spacing.md }]}>
            <View style={styles.telemetryCard}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>CPU LOAD</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>14.2</Text>
                <Text style={{ fontSize: 12, color: colors.primary, marginLeft: 4 }}>%</Text>
              </View>
            </View>
            <View style={styles.telemetryCard}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>TEMP</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>42.0</Text>
                <Text style={{ fontSize: 12, color: colors.primary, marginLeft: 4 }}>°C</Text>
              </View>
            </View>
            <View style={[styles.telemetryCard, { borderColor: colors.error + '33' }]}>
              <Text style={[typography.labelCaps, { color: colors.error, fontSize: 10, marginBottom: 4 }]}>ERR_RATE</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={[typography.headlineLgMobile, { color: colors.error }]}>0.02</Text>
                <Text style={{ fontSize: 12, color: colors.error, marginLeft: 4 }}>%</Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.error, shadowColor: colors.primary }]}>
          <MaterialIcons name="flag" size={20} color={colors.onError} />
          <Text style={[typography.labelCaps, { color: colors.onError, marginLeft: 8 }]}>FLAG FOR REVIEW</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="view-kanban" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Board</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="timeline" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Gantt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer }]}>
          <MaterialIcons name="center-focus-strong" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginTop: 4 }]}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Metrics</Text>
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
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  liveCaptureBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  tagsContainer: {
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  tagOutline: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logList: {
    gap: 16,
  },
  bentoCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9DADC',
    borderRadius: 8,
    padding: 16,
  },
  logCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  resolvedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  codeSnippetContainer: {
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  codeSnippetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  codeContent: {
    padding: 12,
  },
  telemetryContainer: {
    gap: 16,
  },
  telemetryCard: {
    minWidth: 140,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9DADC',
    borderRadius: 8,
    padding: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    zIndex: 40,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 9999,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 16,
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  }
});

export default FocusNotesLogsScreen;
