import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const tagsData = [
  {
    id: 't1',
    category: 'SYSTEM_CORE',
    name: '#production-v1',
    status: 'LOCKED',
    icon: 'lock',
    freq: '1,248',
    freqChange: '+12%',
    freqChangeType: 'positive',
    priority: 'High',
    priorityColor: 'tertiaryFixedDim',
    chartData: [20, 40, 100, 75, 87]
  },
  {
    id: 't2',
    category: 'UX_ASSET',
    name: '#beta-tester',
    status: 'MUTABLE',
    icon: 'edit',
    freq: '842',
    freqChange: '-4%',
    freqChangeType: 'negative',
    priority: 'Neutral',
    priorityColor: 'outline',
    chartData: [100, 87, 50, 25, 37]
  },
  {
    id: 't3',
    category: 'SECURITY',
    name: '#auth-failure',
    status: 'LOCKED',
    icon: 'lock',
    freq: '156',
    freqChange: '+42%',
    freqChangeType: 'positive',
    priority: 'Critical',
    priorityColor: 'error',
    chartData: [25, 37, 50, 75, 100]
  }
];

const TagsManagementScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800', letterSpacing: -0.5, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.sectionHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8 }]}>Tag Management</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary }]}>Configure system-wide taxonomy and frequency protocols.</Text>
        </View>

        {/* Action Bar */}
        <View style={styles.actionBar}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, typography.labelSm, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.surfaceDim }]}
              placeholder="Search parameters..."
              placeholderTextColor={colors.outlineVariant}
            />
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="add" size={20} color={colors.onPrimary} />
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 8 }]}>DEFINE NEW TAG</Text>
          </TouchableOpacity>
        </View>

        {/* Tag List */}
        <View style={styles.tagList}>
          {tagsData.map((tag) => (
            <View key={tag.id} style={[styles.tagCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
              
              <View style={styles.cardHeader}>
                <View>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.secondaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>{tag.category}</Text>
                  </View>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 8 }]}>{tag.name}</Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  tag.status === 'LOCKED' ? { backgroundColor: 'rgba(0, 33, 8, 0.1)' } : { backgroundColor: colors.surfaceContainerHigh }
                ]}>
                  <MaterialIcons name={tag.icon} size={16} color={tag.status === 'LOCKED' ? colors.onTertiaryContainer : colors.secondary} />
                  <Text style={[typography.labelCaps, { color: tag.status === 'LOCKED' ? colors.onTertiaryContainer : colors.secondary, marginLeft: 4 }]}>{tag.status}</Text>
                </View>
              </View>

              <View style={[styles.cardMiddle, { borderTopColor: colors.surfaceDim, borderBottomColor: colors.surfaceDim }]}>
                <View style={styles.freqCol}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>FREQUENCY</Text>
                  <View style={styles.freqRow}>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 28 }]}>{tag.freq}</Text>
                    <Text style={[typography.labelSm, { color: tag.freqChangeType === 'positive' ? colors.onTertiaryContainer : colors.error, marginLeft: 8 }]}>{tag.freqChange}</Text>
                  </View>
                </View>

                <View style={styles.chartCol}>
                  <View style={styles.chartRow}>
                    {tag.chartData.map((val, idx) => (
                      <View 
                        key={idx} 
                        style={[
                          styles.chartBar, 
                          { height: `${val}%`, backgroundColor: val > 50 ? colors.primary : colors.surfaceDim }
                        ]} 
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.priorityRow}>
                  <View style={[
                    styles.priorityDot, 
                    { backgroundColor: tag.priorityColor === 'error' ? colors.error : tag.priorityColor === 'tertiaryFixedDim' ? colors.tertiaryFixedDim : colors.outline }
                  ]} />
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Priority: {tag.priority}</Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={24} color={colors.secondary} />
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="account-tree" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="adjust" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>CORE</Text>
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
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 100, 
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginBottom: 32,
  },
  actionBar: {
    gap: 16,
    marginBottom: 32,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 2,
  },
  searchInput: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    borderBottomWidth: 2,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
  },
  tagList: {
    gap: 16,
  },
  tagCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardMiddle: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  freqCol: {
    flex: 1,
  },
  freqRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  chartCol: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 32,
    gap: 4,
  },
  chartBar: {
    flex: 1,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    paddingHorizontal: 16,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 32,
    marginHorizontal: 4,
  }
});

export default TagsManagementScreen;
