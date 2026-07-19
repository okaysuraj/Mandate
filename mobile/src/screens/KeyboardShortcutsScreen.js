import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const KeyboardShortcutsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [activeFilter, setActiveFilter] = useState('ALL MODULES');

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
        
        {/* Search & Filter Section */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Shortcut Registry</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>System Config v4.2.0</Text>
            </View>
            <View style={[styles.errorPulse, { backgroundColor: colors.errorContainer }]}>
              <MaterialIcons name="error" size={20} color={colors.onErrorContainer} />
            </View>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, typography.labelSm, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.primary, color: colors.onBackground }]}
              placeholder="Search commands or keys..."
              placeholderTextColor={colors.outline}
            />
          </View>

          {/* Horizontal Module Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {['ALL MODULES', 'SYSTEM', 'ASSETS', 'DASHBOARD', 'ALERTS'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterBtn,
                  activeFilter === filter 
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : { backgroundColor: 'transparent', borderColor: colors.outlineVariant }
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  typography.labelCaps, 
                  { color: activeFilter === filter ? colors.onPrimary : colors.secondary }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Conflict Alert Banner */}
        <View style={[styles.alertBanner, { backgroundColor: 'rgba(255, 218, 214, 0.2)', borderColor: colors.error }]}>
          <View style={[styles.alertIconBg, { backgroundColor: colors.error }]}>
            <MaterialIcons name="warning" size={16} color={colors.onError} />
          </View>
          <View style={styles.alertContent}>
            <Text style={[typography.labelCaps, { color: colors.error, fontWeight: 'bold', marginBottom: 4 }]}>CONFLICT DETECTED</Text>
            <Text style={[typography.labelSm, { color: colors.onErrorContainer, lineHeight: 20 }]}>
              <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>CMD + S</Text> is mapped to both <Text style={{ fontStyle: 'italic' }}>'Save Config'</Text> and <Text style={{ fontStyle: 'italic' }}>'System Sync'</Text>.
            </Text>
            <TouchableOpacity style={[styles.resolveBtn, { backgroundColor: colors.error }]}>
              <Text style={[typography.labelCaps, { color: colors.onError, fontSize: 10 }]}>RESOLVE NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Registry List */}
        <View style={styles.listContainer}>
          
          {/* Category: SYSTEM */}
          <View style={styles.categoryBlock}>
            <View style={[styles.categoryTitle, { borderLeftColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM MODULE</Text>
            </View>
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              
              <View style={[styles.shortcutRow, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.shortcutInfo}>
                  <Text style={[typography.bodyMd, { color: colors.onBackground, fontWeight: 'bold' }]}>System Diagnostics</Text>
                  <Text style={[typography.labelSm, { color: colors.outline }]}>Runs hardware sanity check</Text>
                </View>
                <View style={styles.keysContainer}>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CTRL</Text>
                  </View>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>SHIFT</Text>
                  </View>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>D</Text>
                  </View>
                </View>
              </View>

              <View style={styles.shortcutRow}>
                <View style={styles.shortcutInfo}>
                  <Text style={[typography.bodyMd, { color: colors.onBackground, fontWeight: 'bold' }]}>Force Sync</Text>
                  <Text style={[typography.labelSm, { color: colors.outline }]}>Manual database refresh</Text>
                </View>
                <View style={styles.keysContainer}>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CMD</Text>
                  </View>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>S</Text>
                  </View>
                  <MaterialIcons name="error" size={16} color={colors.error} style={{ marginLeft: 4 }} />
                </View>
              </View>

            </View>
          </View>

          {/* Category: ASSETS */}
          <View style={styles.categoryBlock}>
            <View style={[styles.categoryTitle, { borderLeftColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>ASSET CONTROL</Text>
            </View>
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              
              <View style={[styles.shortcutRow, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.shortcutInfo}>
                  <Text style={[typography.bodyMd, { color: colors.onBackground, fontWeight: 'bold' }]}>Emergency Stop</Text>
                  <Text style={[typography.labelSm, { color: colors.outline }]}>Interrupts all active processes</Text>
                </View>
                <View style={styles.keysContainer}>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>ESC</Text>
                  </View>
                </View>
              </View>

              <View style={styles.shortcutRow}>
                <View style={styles.shortcutInfo}>
                  <Text style={[typography.bodyMd, { color: colors.onBackground, fontWeight: 'bold' }]}>New Machine Entry</Text>
                  <Text style={[typography.labelSm, { color: colors.outline }]}>Open asset creation wizard</Text>
                </View>
                <View style={styles.keysContainer}>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>ALT</Text>
                  </View>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>N</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          {/* Category: ALERTS */}
          <View style={styles.categoryBlock}>
            <View style={[styles.categoryTitle, { borderLeftColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>ALERTS & LOGS</Text>
            </View>
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              
              <View style={styles.shortcutRow}>
                <View style={styles.shortcutInfo}>
                  <Text style={[typography.bodyMd, { color: colors.onBackground, fontWeight: 'bold' }]}>Clear All Notifications</Text>
                  <Text style={[typography.labelSm, { color: colors.outline }]}>Wipes local alert buffer</Text>
                </View>
                <View style={styles.keysContainer}>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CMD</Text>
                  </View>
                  <View style={[styles.keyBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>DEL</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, fontWeight: 'bold' }]}>MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
          <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>© 2024 MANDATE INDUSTRIAL</Text>
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
    paddingBottom: 100, // Nav
    gap: 32,
  },
  section: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorPulse: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderRadius: 4,
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 16,
  },
  alertIconBg: {
    padding: 8,
    borderRadius: 16,
  },
  alertContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  resolveBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  listContainer: {
    gap: 32,
  },
  categoryBlock: {
    gap: 8,
  },
  categoryTitle: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginLeft: 4,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  shortcutInfo: {
    flex: 1,
  },
  keysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  keyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  footer: {
    marginHorizontal: -16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 16,
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

export default KeyboardShortcutsScreen;
