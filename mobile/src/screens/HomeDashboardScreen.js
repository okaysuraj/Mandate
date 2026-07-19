import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const HomeDashboardScreen = ({ navigation }) => {
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
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Hero Metrics Canvas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Operational Matrix</Text>
            <View style={styles.liveBadge}>
              <View style={[styles.liveDot, { backgroundColor: colors.onTertiaryContainer }]} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>LIVE</Text>
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="bolt" size={24} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>EFFICIENCY</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>98.4</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>%</Text>
                </View>
              </View>
            </View>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="speed" size={24} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>THROUGHPUT</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>2.4</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>GB/S</Text>
                </View>
              </View>
            </View>
            <View style={[styles.metricCardWide, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE NODES</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>1,024 / 1,024</Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} />
              </View>
              
              <View style={styles.miniGraph}>
                {[0.5, 0.75, 0.66, 1, 0.8, 0.66, 0.75].map((h, i) => (
                  <View key={i} style={[styles.miniGraphBar, { backgroundColor: colors.primary, height: `${h * 100}%`, opacity: 0.2 + (i * 0.1) }]} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Health Map adapted for mobile */}
        <View style={styles.section}>
          <View style={[styles.healthMapCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={[styles.healthMapHeader, { backgroundColor: colors.surfaceContainerLow }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>INFRASTRUCTURE HEALTH</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>GLOBAL CLUSTER</Text>
            </View>
            <View style={[styles.healthMapImageContainer, { backgroundColor: colors.surfaceDim }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAeWArOJi6U0Y7AFftWc9jjXjRcfvghbPs5Bk5A4H1aGMUXxv5Ns_FXQQe9jxw1bptt54-CN6hVgoNLn3bODI5A589gHlZ-PU5GL0hBoVDCFX31pDzrmVBfhfEkK6syYBcB1egDwmMdhQ1IFVfkQKAd4nVlXkIISmbQAi8EdN6i7Z03OCN8rb4adTAKeTCRcJnOVMCrBt3VBOUiqmVUUQselsfpjCzE-PI61GK6N9Am48rBj-eEP_f_g' }}
                style={[styles.healthMapImage, { opacity: 0.6 }]}
              />
              <View style={styles.healthMapOverlay} />
              {/* Pulse dots simulated */}
              <View style={[styles.mapDot, { top: '25%', left: '33%', backgroundColor: colors.primary, borderColor: '#fff' }]} />
              <View style={[styles.mapDot, { bottom: '33%', right: '25%', backgroundColor: colors.primary, borderColor: '#fff' }]} />
            </View>
            <View style={[styles.healthMapStats, { borderTopColor: colors.outlineVariant }]}>
              <View style={styles.healthStat}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>LATENCY</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>12ms</Text>
              </View>
              <View style={[styles.healthStat, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>UPTIME</Text>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>99.99%</Text>
              </View>
              <View style={styles.healthStat}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>LOAD</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>42%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pinned Mandates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>PINNED MANDATES</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[typography.labelSm, { color: colors.primary, marginRight: 4 }]}>VIEW ALL</Text>
              <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 8 }}>
            <View style={[styles.mandateCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <View style={styles.mandateLeft}>
                <View style={[styles.mandateIconBg, { backgroundColor: colors.surfaceContainer }]}>
                  <MaterialIcons name="precision-manufacturing" size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>MN-782: TURBINE OPS</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Priority: HIGH</Text>
                </View>
              </View>
              <View style={[styles.priorityIndicator, { backgroundColor: colors.error, opacity: 0.8 }]} />
            </View>
            <View style={[styles.mandateCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <View style={styles.mandateLeft}>
                <View style={[styles.mandateIconBg, { backgroundColor: colors.surfaceContainer }]}>
                  <MaterialIcons name="inventory-2" size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>MN-911: LOGISTICS SYNC</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Priority: MID</Text>
                </View>
              </View>
              <View style={[styles.priorityIndicator, { backgroundColor: colors.primary, opacity: 0.2 }]} />
            </View>
          </View>
        </View>

        {/* System Pulse Feed */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>SYSTEM PULSE</Text>
          <View style={[styles.logContainer, { backgroundColor: colors.primaryContainer }]}>
            <View style={styles.logList}>
              <View style={[styles.logItem, { borderLeftColor: colors.onTertiaryContainer + '4D' }]}>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, width: 70 }]}>[08:42:11]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>Node cluster ALPHA re-synced successfully.</Text>
              </View>
              <View style={[styles.logItem, { borderLeftColor: colors.outline + '4D' }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, width: 70 }]}>[08:41:05]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>Secondary cooling pump cycles initiated.</Text>
              </View>
              <View style={[styles.logItem, { borderLeftColor: colors.error + '80' }]}>
                <Text style={[typography.labelSm, { color: colors.error, width: 70 }]}>[08:39:22]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>Minor deviation detected in Grid 4. Auto-correcting.</Text>
              </View>
              <View style={[styles.logItem, { borderLeftColor: colors.outline + '4D' }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, width: 70 }]}>[08:35:48]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>Encryption keys rotated for regional gateway.</Text>
              </View>
              <View style={[styles.logItem, { borderLeftColor: colors.outline + '4D' }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, width: 70 }]}>[08:32:10]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>Backup power test completed. 100% nominal.</Text>
              </View>
              <View style={[styles.logItem, { borderLeftColor: colors.outline + '4D' }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.5, width: 70 }]}>[08:30:00]</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, flex: 1 }]}>System audit report generated. Status: CLEAR.</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
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
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: {
    flexGrow: 1,
    padding: 24, // px-gutter
    paddingTop: 16,
    paddingBottom: 128,
    gap: 32,
  },
  section: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    minWidth: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  metricCardWide: {
    width: '100%',
    height: 128, // h-32
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  miniGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 32, // h-8
    gap: 4,
  },
  miniGraphBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  healthMapCard: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  healthMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  healthMapImageContainer: {
    height: 192, // h-48
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  healthMapImage: {
    width: '100%',
    height: '100%',
  },
  healthMapOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  mapDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  healthMapStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    padding: 16,
  },
  healthStat: {
    flex: 1,
    alignItems: 'center',
  },
  mandateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  mandateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  mandateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
  },
  logContainer: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  logList: {
    gap: 8,
    height: 192,
  },
  logItem: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    paddingLeft: 8,
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

export default HomeDashboardScreen;
