import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SavedViewsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Summary Module */}
        <View style={[styles.summaryCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SUMMARY</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>System Activity</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[typography.displayLg, { fontSize: 32, lineHeight: 36, color: colors.primary }]}>84%</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+12% vs LY</Text>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            {[40, 65, 50, 85, 95, 70, 60, 45, 30, 55].map((h, i) => (
              <View 
                key={i} 
                style={[
                  styles.chartBar, 
                  { 
                    height: `${h}%`, 
                    backgroundColor: h === 95 ? colors.primary : colors.surfaceContainerHighest 
                  }
                ]} 
              />
            ))}
          </View>
          <View style={styles.chartFooter}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>08:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>12:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>16:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>20:00</Text>
          </View>
        </View>

        {/* Gallery Header */}
        <View style={styles.galleryHeader}>
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>SAVED VIEWS (12)</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <MaterialIcons name="tune" size={16} color={colors.primary} />
            <Text style={[typography.labelSm, { color: colors.primary, marginLeft: 4 }]}>FILTER</Text>
          </TouchableOpacity>
        </View>

        {/* List of Modules */}
        <View style={styles.modulesList}>
          
          {/* Module 1 */}
          <TouchableOpacity style={[styles.moduleCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.moduleHeader}>
              <View style={styles.moduleHeaderLeft}>
                <View style={[styles.moduleIconContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                  <MaterialIcons name="analytics" size={24} color={colors.primary} />
                </View>
                <View style={styles.moduleTitleContainer}>
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Q4 Pipeline Analysis</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Updated 2h ago</Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={24} color={colors.secondary} />
            </View>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>REG: EMEA</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>STAT: ACTIVE</Text>
              </View>
            </View>
            {/* Fake Sparkline */}
            <View style={styles.sparklineContainer}>
              <View style={[styles.sparklineMock, { borderColor: colors.primary }]} />
            </View>
            <View style={styles.moduleFooter}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+24.8%</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>VOL: $4.2M</Text>
            </View>
          </TouchableOpacity>

          {/* Module 2 */}
          <TouchableOpacity style={[styles.moduleCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.moduleHeader}>
              <View style={styles.moduleHeaderLeft}>
                <View style={[styles.moduleIconContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                  <MaterialIcons name="adjust" size={24} color={colors.primary} />
                </View>
                <View style={styles.moduleTitleContainer}>
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Core Health</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Real-time sync</Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={24} color={colors.secondary} />
            </View>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>STABLE</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>NODES: 124</Text>
              </View>
            </View>
            {/* Fake Sparkline */}
            <View style={styles.sparklineContainer}>
              <View style={[styles.sparklineMock, { borderColor: colors.primary }]} />
            </View>
            <View style={styles.moduleFooter}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Latency: 14ms</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>UP: 99.9%</Text>
            </View>
          </TouchableOpacity>

          {/* Module 3 */}
          <TouchableOpacity style={[styles.moduleCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.moduleHeader}>
              <View style={styles.moduleHeaderLeft}>
                <View style={[styles.moduleIconContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                  <MaterialIcons name="account-tree" size={24} color={colors.primary} />
                </View>
                <View style={styles.moduleTitleContainer}>
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Project Artemis</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Priority Alpha</Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={24} color={colors.secondary} />
            </View>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: colors.errorContainer }]}>
                <Text style={[typography.labelSm, { color: colors.error }]}>CRITICAL PATH</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>SPRINT 14</Text>
              </View>
            </View>
            {/* Fake Sparkline */}
            <View style={styles.sparklineContainer}>
              <View style={[styles.sparklineMock, { borderColor: colors.error, borderStyle: 'dashed' }]} />
            </View>
            <View style={styles.moduleFooter}>
              <Text style={[typography.labelSm, { color: colors.error }]}>High Volatility</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>ETA: OCT 24</Text>
            </View>
          </TouchableOpacity>

          {/* Empty State / Add New */}
          <TouchableOpacity style={[styles.emptyStateCard, { borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="add-circle" size={36} color={colors.secondary} style={{ marginBottom: 8 }} />
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>Create New View</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>SYSTEM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="account-tree" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="adjust" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>CORE</Text>
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
    flexGrow: 1,
    paddingTop: 80, // to clear header + space
    paddingHorizontal: 16,
    paddingBottom: 100, // to clear bottom nav
  },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24, // p-lg conceptually
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 96,
    paddingTop: 16,
    gap: 4,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modulesList: {
    gap: 16,
  },
  moduleCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  moduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moduleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTitleContainer: {
    justifyContent: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sparklineContainer: {
    height: 64,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  sparklineMock: {
    height: '50%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 16,
    opacity: 0.5,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyStateCard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingBottom: 24, // pb-safe conceptually
    paddingTop: 12,
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
    borderRadius: 24,
    marginHorizontal: 8,
  }
});

export default SavedViewsScreen;
