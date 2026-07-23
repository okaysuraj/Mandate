import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const nodesData = [
  {
    id: 'n1',
    nodeName: 'NODE_A1',
    uid: 'MND-TX-8829-X01',
    operator: 'HELIX_CORE',
    latency: '14.2 ms',
    throughputVal: '78.4 GB/s',
    throughputPct: 78,
    isError: false,
  },
  {
    id: 'n2',
    nodeName: 'NODE_B4',
    uid: 'MND-TX-4402-Z99',
    operator: 'NEXUS_PRIM',
    latency: '118.5 ms',
    throughputVal: '12.1 GB/s',
    throughputPct: 22,
    isError: true,
  },
  {
    id: 'n3',
    nodeName: 'NODE_C2',
    uid: 'MND-TX-9910-K44',
    operator: 'SYNAPSE_7',
    latency: '8.9 ms',
    throughputVal: '94.2 GB/s',
    throughputPct: 94,
    isError: false,
  }
];

const TableViewScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconBtn, { marginRight: 8 }]}>
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Dashboard Header */}
        <View style={styles.dashboardHeader}>
          <View style={styles.headerTitleCol}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM STATUS</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>LOGS & TELEMETRY</Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
            <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, textTransform: 'uppercase' }]}>Live</Text>
          </View>
        </View>

        {/* Metric Blocks */}
        <View style={styles.metricsGrid}>
          {/* Throughput Trend */}
          <View style={[styles.metricCard, styles.colSpan2, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>THROUGHPUT TREND</Text>
            <View style={styles.chartContainer}>
              {[40, 60, 55, 80, 70, 90, 45, 50, 65, 85, 100].map((h, i) => (
                <View key={i} style={[styles.chartBar, { height: `${h}%`, backgroundColor: colors.primary }]} />
              ))}
            </View>
          </View>

          {/* Nodes */}
          <View style={[styles.metricCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>NODES</Text>
            <View style={styles.metricValRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48 }]}>128</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>+12%</Text>
            </View>
          </View>

          {/* Latency */}
          <View style={[styles.metricCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>LATENCY</Text>
            <View style={styles.metricValRow}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48 }]}>42</Text>
              <Text style={[typography.labelSm, { color: colors.primary, marginLeft: 4 }]}>ms</Text>
            </View>
          </View>

          {/* Failures */}
          <View style={[styles.metricCard, styles.colSpan2, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.error }]}>
            <View style={styles.failuresHeader}>
              <Text style={[typography.labelCaps, { color: colors.error }]}>FAILURES</Text>
              <MaterialIcons name="warning" size={24} color={colors.error} />
            </View>
            <View style={styles.metricValRow}>
              <Text style={[typography.displayLg, { color: colors.error, fontSize: 48, lineHeight: 48 }]}>0.04%</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>PAST 24H</Text>
            </View>
          </View>
        </View>

        {/* Node Registry */}
        <View style={styles.registrySection}>
          <View style={styles.registryHeader}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 20 }]}>Node Registry</Text>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="filter-list" size={16} color={colors.onPrimary} />
              <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 8 }]}>FILTER</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.nodeList}>
            {nodesData.map((node) => (
              <TouchableOpacity key={node.id} style={[styles.nodeCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
                <View style={styles.nodeBadge}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{node.nodeName}</Text>
                </View>

                <View style={styles.nodeFieldGroup}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 2 }]}>UID IDENTIFIER</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>{node.uid}</Text>
                </View>

                <View style={styles.nodeGrid2}>
                  <View style={styles.nodeFieldGroup}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 2 }]}>OPERATOR</Text>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>{node.operator}</Text>
                  </View>
                  <View style={styles.nodeFieldGroup}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 2 }]}>LATENCY</Text>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>{node.latency}</Text>
                  </View>
                </View>

                <View style={styles.nodeFieldGroup}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>THROUGHPUT</Text>
                  <View style={styles.throughputRow}>
                    <View style={[styles.throughputBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <View style={[styles.throughputBarFill, { backgroundColor: node.isError ? colors.error : colors.primary, width: `${node.throughputPct}%` }]} />
                    </View>
                    <Text style={[typography.labelSm, { color: node.isError ? colors.error : colors.primary }]}>{node.throughputVal}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.loadMoreContainer}>
            <TouchableOpacity style={[styles.loadMoreBtn, { borderColor: colors.outline }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>LOAD FULL DATASET</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="track-changes" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>Network</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer, borderTopColor: colors.primary }]}>
          <MaterialIcons name="analytics" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>Config</Text>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 100, 
    paddingHorizontal: 16,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  headerTitleCol: {
    gap: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    width: '47%',
    borderWidth: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  colSpan2: {
    width: '100%',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 96,
    marginTop: 16,
    gap: 2,
  },
  chartBar: {
    flex: 1,
  },
  metricValRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  failuresHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registrySection: {
    gap: 16,
  },
  registryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  nodeList: {
    gap: 12,
  },
  nodeCard: {
    borderWidth: 1,
    padding: 16,
    position: 'relative',
    gap: 16,
  },
  nodeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  nodeFieldGroup: {
    gap: 2,
  },
  nodeGrid2: {
    flexDirection: 'row',
    gap: 16,
  },
  throughputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  throughputBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  throughputBarFill: {
    height: '100%',
  },
  loadMoreContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadMoreBtn: {
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 32,
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

export default TableViewScreen;
