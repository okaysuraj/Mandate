import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const filters = ['ALL UNITS', 'CYBER_SEC', 'LOGISTICS', 'ANALYTICS'];

const operators = [
  {
    id: 'op1',
    name: 'A. VANCE',
    role: 'SENIOR ARCHITECT',
    avail: '98% AVAIL',
    availColor: 'onTertiaryContainer',
    dotColor: 'tertiaryFixedDim',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADbpAtD6nHok8xbSBKL3LOq9QWT4JLGkbx4bXNPkMMWMknoWZuPNM0JRPHD4ylMKWnFtOSYY2UfhkVO7YhCd7Fz0I_RfaI-1zLWhn_OhM2tcPMZMGSPvq-L3C7xItqwUBhioic-dDwM_F3Qcu8S12sEggDtj0l8W2jL2XQnqat-WicRHEM33Z_1_8ZFllv7jxjZYohGIAwZTqcUEtcv3hWoS_YCkqVxeYIJNxIYmQVwgcF0Cv1kTelMw',
    tags: ['NODE_V3', 'ENCRYPTION', 'FAILOVER'],
    isBusy: false
  },
  {
    id: 'op2',
    name: 'M. CHEN',
    role: 'CORE ANALYST',
    avail: '84% AVAIL',
    availColor: 'onTertiaryContainer',
    dotColor: 'tertiaryFixedDim',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVT6M8RJstVkbtffA3GmtI1s-lf7r13v8AOwTMtQ2-17gsohwOQcLcf3ki40djQ1-iHKJZf2_tVDp9_HFIAcil5NeCjo-NBp8XMNoP8gWW5sbHxA_uyv_VXBROHd_EEUlNxpG017z0ciS4Xy5guyuAmQUjVSPxH48qAy7uOlhaeQbmSyGKDNt5IRV46ACCLx01oyErRub9irEPYu_sNAxGVMIOr2joCMveDJmbwGw53B6h8x5mOsqCZA',
    tags: ['ML_TRAINING', 'DATA_FLOW'],
    isBusy: false
  },
  {
    id: 'op3',
    name: 'J. SMITH',
    role: 'LEAD OPERATIONS',
    avail: '12% AVAIL',
    availColor: 'error',
    dotColor: 'error',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzZZmzFQnfIhJfqrhxdX5oiO-Eo1k7EsprtQ8RczvIfVdstjfqLcPTlX0qqdTSvR91JQVVWjyvw8DvBfYi9ebgU0KzO0HvUHmXcTXB8XNpaH_SB1y7AnVbeaYLLhrqb-vtHHNUzgsZjuLCuDfj-RwZiGNZPZVN3jh8xu5qcOxkyBZkMbWOrA1vQRSduDoEf6qWNO7hTgGuRNKLZK_RdRxlvatF1QEOGmEiN0gYXcyoBdJGDzTjfTL_Vg',
    tags: ['OVERSEE', 'PROTO_L2'],
    isBusy: true
  }
];

const TaskAssignmentScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerAvatar, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3c25PQBgQT4Fn3vXuTTXRS5hwz4vLZZkGAGt6WqXbIWjKZp40zuXu3oxL5hiS3pjIE0opyf2PPguC6oeu2XxMPlnLdIeHYOGDBglFBS-99LHhSLyuHgwp-hi2MV-02W8KHJpwumZFP23ZlvD9wQTKkTxnnrPN8GlnaODlQCuZfSQvVLPvfpBxj84aCpVo-auIelf3vPos5WcrUs6PYx36YnM5oAqdO4ygYCaqncWXy66aAdCAvbbUuw' }} 
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 8 }]}>CORE_OS_V1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Page Title */}
        <View style={styles.pageTitleBox}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginBottom: 4 }]}>Task Assignment</Text>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 }]}>System Deployment Stage 04</Text>
        </View>

        {/* Required Capacity Summary */}
        <View style={styles.capacitySection}>
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.capHeader}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>REQUIRED CAPACITY</Text>
                <View style={styles.capValueRow}>
                  <Text style={[typography.headlineLg, { color: colors.primary, fontSize: 36, fontWeight: 'bold' }]}>48.5</Text>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginLeft: 4 }]}>GHZ/UNIT</Text>
                </View>
              </View>
              <View style={[styles.boltIcon, { backgroundColor: colors.primary }]}>
                <MaterialIcons name="bolt" size={24} color={colors.onPrimary} />
              </View>
            </View>

            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '75%' }]} />
            </View>

            <View style={styles.progressLabels}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>Allocated: 32.0</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase' }]}>Shortfall: 16.5</Text>
            </View>
          </View>
        </View>

        {/* Search & Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, typography.labelCaps, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}
              placeholder="SEARCH OPERATORS..."
              placeholderTextColor={colors.outlineVariant}
            />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {filters.map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.filterBtn, 
                  index === 0 ? { backgroundColor: colors.primary } : { borderColor: colors.outlineVariant, borderWidth: 1 }
                ]}
              >
                <Text style={[typography.labelCaps, { color: index === 0 ? colors.onPrimary : colors.onSurfaceVariant }]}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Available Operators List */}
        <View style={styles.operatorsSection}>
          <View style={styles.operatorsHeader}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>AVAILABLE OPERATORS</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>24 FOUND</Text>
          </View>

          <View style={styles.operatorList}>
            {operators.map((op) => (
              <View key={op.id} style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }, op.isBusy && { opacity: 0.6 }]}>
                
                <View style={styles.opHeaderRow}>
                  <View style={styles.opAvatarWrapper}>
                    <View style={[styles.opAvatar, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                      <Image source={{ uri: op.image }} style={styles.avatarImg} />
                    </View>
                    <View style={[styles.statusDot, { backgroundColor: colors[op.dotColor], borderColor: '#ffffff' }]} />
                  </View>

                  <View style={styles.opInfoCol}>
                    <View style={styles.opTitleRow}>
                      <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: 'bold' }]} numberOfLines={1}>{op.name}</Text>
                      <Text style={[typography.labelCaps, { color: colors[op.availColor] }]}>{op.avail}</Text>
                    </View>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>{op.role}</Text>
                  </View>
                </View>

                <View style={styles.tagsRow}>
                  {op.tags.map((tag, idx) => (
                    <View key={idx} style={[styles.tagBadge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                      <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {op.isBusy ? (
                  <View style={[styles.actionBtn, { borderColor: colors.outlineVariant, borderWidth: 1 }]}>
                    <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 2 }]}>Occupied</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
                    <Text style={[typography.labelCaps, { color: colors.onPrimary, textTransform: 'uppercase', letterSpacing: 2 }]}>Assign</Text>
                  </TouchableOpacity>
                )}

              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary, borderLeftColor: colors.outline, borderRightColor: colors.outline }]}>
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
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 112, 
    paddingHorizontal: 24,
  },
  pageTitleBox: {
    marginBottom: 24,
  },
  capacitySection: {
    marginBottom: 24,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  capHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  capValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  boltIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  searchSection: {
    marginBottom: 24,
    gap: 16,
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
  filterScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  operatorsSection: {
    marginBottom: 32,
  },
  operatorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  operatorList: {
    gap: 16,
  },
  opHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  opAvatarWrapper: {
    position: 'relative',
  },
  opAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  opInfoCol: {
    flex: 1,
  },
  opTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }
});

export default TaskAssignmentScreen;
