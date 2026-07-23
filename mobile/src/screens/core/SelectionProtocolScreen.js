import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const protocols = [
  {
    id: 'p1',
    title: 'Thermal Recalibration',
    allocation: '450ms',
    status: 'STABLE',
    strain: 12,
    colorType: 'primary', // Use for progress bar color logic
    statusColor: 'tertiary',
    checked: true,
  },
  {
    id: 'p2',
    title: 'Neural Gate Override',
    allocation: '1.2s',
    status: 'High Latency',
    strain: 88,
    colorType: 'error',
    statusColor: 'error',
    checked: false,
    borderLeftColor: 'error'
  },
  {
    id: 'p3',
    title: 'Synthetic Latency Patch',
    allocation: '200ms',
    status: 'Optimized',
    strain: 4,
    colorType: 'primary',
    statusColor: 'tertiary',
    checked: true,
  },
  {
    id: 'p4',
    title: 'Grid Isolation Loop',
    allocation: '750ms',
    status: 'Pending',
    strain: 34,
    colorType: 'secondary',
    statusColor: 'secondary',
    checked: false,
  },
  {
    id: 'p5',
    title: 'Quantum Handshake',
    allocation: '50ms',
    status: 'Priority',
    strain: 15,
    colorType: 'primary',
    statusColor: 'tertiary',
    checked: true,
    borderLeftColor: 'primary'
  },
];

const SelectionProtocolScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [data, setData] = useState(protocols);

  const toggleProtocol = (id) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const selectedCount = data.filter(p => p.checked).length;
  const isExecuteDisabled = selectedCount === 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { borderColor: colors.outline }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmFmTY889WXz9efuo_0wFSPet8Drc2tDtgvdaf2XB4g7g_ULvgJ4yo9dLnIG7mm4ED5iM3gWGuEhyKITBqNMKIEtMwWSny7h-vYqYTuAg43wFKErjK3hxstP4m1oMqLuktoYvYnxInixsrYsTHYeHvy8X37vZul9R6ieYPFq1XR7fm4mIEpv6EiZS-z553cjBoUEpYt4DZR9uMZfdSNhTeXEO58NPbuQZZsc0B3o6AN3bvX2n1ESX7rg' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroTags}>
            <View style={[styles.heroTag, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>MODE: ACTIVE SELECTION</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>V4.8.2</Text>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>Selection Protocol</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 14 }]}>Configure active system overrides and resource allocation parameters.</Text>
        </View>

        {/* Protocol List */}
        <View style={styles.protocolList}>
          {data.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.protocolCard, 
                { backgroundColor: '#ffffff', borderColor: colors.outlineVariant },
                item.borderLeftColor === 'error' && { borderLeftWidth: 4, borderLeftColor: colors.error },
                item.borderLeftColor === 'primary' && { borderLeftWidth: 4, borderLeftColor: colors.primary },
              ]}
              onPress={() => toggleProtocol(item.id)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox, 
                  { borderColor: colors.outlineVariant },
                  item.checked && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}>
                  {item.checked && <MaterialIcons name="check" size={14} color={colors.onPrimary} />}
                </View>
              </View>

              <View style={styles.protocolContent}>
                <View style={styles.protocolHeader}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase' }]}>{item.title}</Text>
                    <View style={styles.allocationRow}>
                      <MaterialIcons name="schedule" size={14} color={colors.onSurfaceVariant} />
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: 4 }]}>ALLOCATION: {item.allocation}</Text>
                    </View>
                  </View>
                  
                  {item.statusColor === 'tertiary' && (
                    <View style={[styles.statusBadge, { backgroundColor: 'rgba(60, 227, 106, 0.1)', borderColor: 'rgba(0, 152, 61, 0.2)' }]}>
                      <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onTertiaryContainer }]}>{item.status}</Text>
                    </View>
                  )}
                  {item.statusColor === 'error' && (
                    <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 218, 214, 0.2)', borderColor: 'rgba(186, 26, 26, 0.2)' }]}>
                      <Text style={[typography.labelCaps, { fontSize: 10, color: colors.error }]}>{item.status}</Text>
                    </View>
                  )}
                  {item.statusColor === 'secondary' && (
                    <View style={[styles.statusBadge, { backgroundColor: 'rgba(226, 226, 228, 0.5)', borderColor: colors.outlineVariant }]}>
                      <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSecondaryFixedVariant }]}>{item.status}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.strainContainer}>
                  <View style={styles.strainHeader}>
                    <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>RESOURCE STRAIN</Text>
                    <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>{item.strain < 10 ? `0${item.strain}` : item.strain}%</Text>
                  </View>
                  <View style={[styles.strainBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
                    <View 
                      style={[
                        styles.strainBarFill, 
                        { width: `${item.strain}%` },
                        item.colorType === 'primary' ? { backgroundColor: colors.primary } :
                        item.colorType === 'error' ? { backgroundColor: colors.error } :
                        { backgroundColor: colors.secondary }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Operational Context */}
        <View style={styles.operationalContextContainer}>
          <View style={[styles.operationalCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
            <View style={styles.operationalHeader}>
              <MaterialIcons name="analytics" size={24} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', marginLeft: 8 }]}>OPERATIONAL CONTEXT</Text>
            </View>

            <View style={styles.operationalGrid}>
              <View>
                <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>SELECTED</Text>
                <Text style={[typography.headlineLgMobile, { fontSize: 36, color: colors.primary, lineHeight: 40 }]}>
                  {selectedCount < 10 ? `0${selectedCount}` : selectedCount}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>STATUS</Text>
                <Text style={[typography.labelCaps, { fontSize: 12, color: colors.onTertiaryContainer, fontWeight: '900' }]}>OPTIMAL</Text>
              </View>
            </View>

            <View style={styles.bandwidthSection}>
              <View style={styles.bandwidthRow}>
                <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>SYSTEM BANDWIDTH</Text>
                <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>64.2% Remaining</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, width: '35.8%' }]} />
              </View>
            </View>

            <View style={styles.bandwidthSection}>
              <View style={styles.bandwidthRow}>
                <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>EXECUTION RISK</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Minimal (2%)</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
                <View style={[styles.barFill, { backgroundColor: colors.tertiaryFixedDim, width: '2%' }]} />
              </View>
            </View>

            <View style={[styles.actionsContainer, { borderTopColor: colors.outlineVariant }]}>
              <TouchableOpacity 
                style={[
                  styles.executeBtn, 
                  { backgroundColor: colors.primary },
                  isExecuteDisabled && { opacity: 0.5 }
                ]}
                disabled={isExecuteDisabled}
              >
                <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>EXECUTE SEQUENCE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.resetBtn, { borderColor: colors.outline }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>RESET PARAMETERS</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Secondary Data Module */}
          <View style={[styles.feedCard, { backgroundColor: colors.primary }]}>
            <View style={styles.feedHeader}>
              <Text style={[typography.labelCaps, { fontSize: 10, color: 'rgba(255,255,255,0.6)' }]}>REAL-TIME FEED</Text>
              <View style={[styles.feedDot, { backgroundColor: colors.tertiaryFixedDim }]} />
            </View>
            <View style={styles.feedContent}>
              <Text style={[typography.labelSm, { fontSize: 11, color: 'rgba(255,255,255,0.8)' }]}><Text style={{ color: colors.onPrimary }}>12:04:32</Text> - Thermal sensors normalized.</Text>
              <Text style={[typography.labelSm, { fontSize: 11, color: 'rgba(255,255,255,0.8)' }]}><Text style={{ color: colors.onPrimary }}>12:04:31</Text> - Handshake pending verification.</Text>
              <Text style={[typography.labelSm, { fontSize: 11, color: 'rgba(255,255,255,0.8)' }]}><Text style={{ color: colors.onPrimary }}>12:04:28</Text> - Core temperature at 32°C.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
    paddingHorizontal: 24,
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
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    padding: 8,
    marginRight: -8,
  },
  container: {
    paddingTop: 88, // 64 (header) + 24
    paddingHorizontal: 24,
    paddingBottom: 100, // to clear bottom nav
  },
  heroSection: {
    marginBottom: 32,
  },
  heroTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  heroTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  protocolList: {
    gap: 16,
    marginBottom: 32,
  },
  protocolCard: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  checkboxContainer: {
    paddingTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protocolContent: {
    flex: 1,
  },
  protocolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  allocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 2,
  },
  strainContainer: {
    gap: 8,
  },
  strainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strainBarBg: {
    height: 2,
    width: '100%',
  },
  strainBarFill: {
    height: '100%',
  },
  operationalContextContainer: {
    gap: 16,
  },
  operationalCard: {
    borderWidth: 2,
    padding: 32,
  },
  operationalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  operationalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  bandwidthSection: {
    marginBottom: 16,
  },
  bandwidthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  barBg: {
    height: 16,
    borderWidth: 1,
    padding: 2,
  },
  barFill: {
    height: '100%',
  },
  actionsContainer: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    gap: 16,
  },
  executeBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  feedCard: {
    padding: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  feedContent: {
    gap: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  }
});

export default SelectionProtocolScreen;
