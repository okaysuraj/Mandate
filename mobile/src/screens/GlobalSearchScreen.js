import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const GlobalSearchScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="close" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Search Input Section */}
        <View style={styles.searchSection}>
          <View style={[styles.searchInputContainer, { borderBottomColor: colors.primary }]}>
            <TextInput 
              style={[styles.searchInput, typography.headlineLgMobile, { color: colors.primary }]}
              placeholder="Search Industrial Assets..."
              placeholderTextColor={colors.outlineVariant}
              autoFocus
            />
            <View style={styles.searchIcons}>
              <MaterialIcons name="mic" size={24} color={colors.outline} style={{ marginRight: 16 }} />
              <MaterialIcons name="filter-list" size={24} color={colors.outline} />
            </View>
          </View>
        </View>

        {/* Category Horizontal Scroll */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
            <TouchableOpacity style={[styles.categoryBtn, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>DASHBOARD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryBtnOutline, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>TODAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryBtnOutline, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>BACKLOG</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryBtnOutline, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>INBOX</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bento Grid: Active Infrastructure Status */}
        <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.infrastructureHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM HEALTH</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Active Infrastructure</Text>
            </View>
            <View style={[styles.optimalBadge, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>OPTIMAL</Text>
            </View>
          </View>

          {/* Status Chart Placeholder */}
          <View style={[styles.chartContainer, { backgroundColor: colors.surfaceContainerLow }]}>
            {[0.75, 0.5, 0.66, 1, 0.6, 0.8, 0.5, 0.66, 0.75, 1, 0.66, 0.5].map((h, i) => (
              <View key={i} style={[styles.chartBar, { backgroundColor: colors.primary, height: `${h * 100}%`, opacity: 0.1 + (i * 0.07) }]} />
            ))}
          </View>
          
          <View style={styles.chartLabels}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>06:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>12:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>18:00</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>00:00</Text>
          </View>
        </View>

        {/* Recent Activity List */}
        <View style={styles.activitySection}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>RECENT ACTIVITY</Text>
          
          <View style={styles.activityList}>
            {/* Activity Item 1 */}
            <View style={[styles.activityItem, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View style={styles.activityItemLeft}>
                <View style={[styles.activityIconBg, { backgroundColor: colors.secondaryContainer }]}>
                  <MaterialIcons name="precision-manufacturing" size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Turbine Alpha-4 Maintenance</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Sector 7G • Routine Check</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.outline }]}>12m ago</Text>
            </View>

            {/* Activity Item 2 */}
            <View style={[styles.activityItem, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View style={styles.activityItemLeft}>
                <View style={[styles.activityIconBg, { backgroundColor: colors.errorContainer }]}>
                  <MaterialIcons name="error" size={20} color={colors.error} />
                </View>
                <View>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Overheat Alert: Boiler 12</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Pressure Vessel • Critical</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.outline }]}>48m ago</Text>
            </View>

            {/* Activity Item 3 */}
            <View style={styles.activityItem}>
              <View style={styles.activityItemLeft}>
                <View style={[styles.activityIconBg, { backgroundColor: colors.surfaceDim }]}>
                  <MaterialIcons name="settings" size={20} color={colors.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>System Firmware Updated</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Kernel v.2.4.0 • Node Cluster</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.outline }]}>2h ago</Text>
            </View>
          </View>
        </View>

        {/* Visual Asset Break */}
        <View style={[styles.assetBreak, { borderColor: colors.outlineVariant }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk5QN1bT5P_oFi-h-bgJnj8d_qiowooeb-fjRHdMjyIZz6yAtj2Xaif3z9Z_Gh3qTgz3ixhYR113okoe4ArvcPPyg-inclcThZozo07An846wZRnYb_-KqPxAFYZdTzUatW6zjqVnIQDv-HOezBrpifmz7L7n0HRsWerljCLoWiEk3p9v-h7Y6vthaLHotLpa7J4q46Ib40kdgDiHs_69CNRJNIhZD8-_0Th0VOx9gYKc_5LDkHYUfag' }}
            style={styles.assetImage}
          />
          <View style={styles.assetOverlay} />
          <View style={styles.assetTextContainer}>
            <Text style={[typography.labelCaps, { color: '#FFFFFF', opacity: 0.8 }]}>FACILITY OVERVIEW</Text>
            <Text style={[typography.headlineLgMobile, { color: '#FFFFFF' }]}>Central Hub S-1</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

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
    padding: 16,
    paddingTop: 32,
    paddingBottom: 100, // Fab and nav space
    gap: 32,
  },
  searchSection: {
    width: '100%',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    height: 64,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  searchIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesSection: {
    width: '100%',
  },
  categoriesContent: {
    gap: 16,
    paddingBottom: 4,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  categoryBtnOutline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
  },
  infrastructureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  optimalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  chartContainer: {
    height: 192, // h-48
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  chartBar: {
    width: '8%',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  activitySection: {
    width: '100%',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  activityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetBreak: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
  },
  assetImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // Simulate grayscale hover logic (static here)
  },
  assetOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  assetTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginHorizontal: -16,
    gap: 16,
    marginBottom: 64, // Space for nav
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 96, // Above nav
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 60,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
  }
});

export default GlobalSearchScreen;
