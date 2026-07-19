import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CommitmentHistoryScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXgoxZrXgZUtzEtM_0NxYm1EMEyk3oBQNE88rkR_zKDF-Z6fnsWc13N_AuxKU_ygvhgB6WHS7PbjfI7jsfY0YwTgoRZjolWLP6U60xwr5eBKvLBTaSJIvqoDOR1YfdyxCiUX1oXA02zyDkvwhnuCsK5MuxrrE1YZLaG0k8yQkfxG6FumJIakrA8a4s3GI09VfUfw18EMoqXFiSz8a3pQ22bdXSk4gAth8iWgqMG5n_W27i5aUc6YCJw' }} 
              style={styles.avatarImage} 
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginLeft: spacing.sm, fontWeight: 'bold', textTransform: 'uppercase' }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Daily Mandate History Summary */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>DAILY MANDATE HISTORY</Text>
              <Text style={[typography.labelSm, { color: colors.primary }]}>CYCLE_092</Text>
            </View>

            <View style={styles.bentoGrid}>
              {/* Total Mandates */}
              <View style={[styles.bentoCardFull, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.cardTopRow}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>TOTAL MANDATES</Text>
                  <MaterialIcons name="inventory-2" size={20} color={colors.primary} />
                </View>
                <View style={styles.cardBottomRow}>
                  <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48, letterSpacing: -1 }]}>1,284</Text>
                  <View style={[styles.trendBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                    <MaterialIcons name="trending-up" size={14} color={colors.onTertiaryContainer} />
                    <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>+12%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bentoRowHalf}>
                {/* Success Rate */}
                <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>SUCCESS RATE</Text>
                  <View>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold' }]}>99.8%</Text>
                    <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer, marginTop: spacing.sm }]}>
                      <View style={[styles.progressBarFill, { backgroundColor: colors.tertiary, width: '99.8%' }]} />
                    </View>
                  </View>
                </View>

                {/* Operator Load */}
                <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>OPERATOR LOAD</Text>
                  <View style={styles.operatorLoadRow}>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold' }]}>42%</Text>
                    <MaterialIcons name="sensors" size={24} color={colors.onSecondaryContainer} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Previous Cycles List */}
          <View>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>PREVIOUS CYCLES</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>FILTER</Text>
                <MaterialIcons name="filter-list" size={16} color={colors.primary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            <View style={styles.cycleList}>
              
              {/* Cycle Item 091 */}
              <TouchableOpacity style={[styles.cycleCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.cycleHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>CYCLE_091</Text>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: 'bold' }]}>OPTIMIZED_FLOW</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                    <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, textTransform: 'uppercase' }]}>Completed</Text>
                  </View>
                </View>
                <View style={styles.cycleFooter}>
                  <View style={styles.cycleStats}>
                    <View style={{ marginRight: spacing.lg }}>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>LOAD</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>882_UNIT</Text>
                    </View>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EFFICIENCY</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>A++</Text>
                    </View>
                  </View>
                  <View style={styles.barGraph}>
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 8 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 16 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 12 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 24 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 20 }]} />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Cycle Item 090 */}
              <TouchableOpacity style={[styles.cycleCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.cycleHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>CYCLE_090</Text>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: 'bold' }]}>STRESS_TEST_A</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(147, 0, 10, 0.1)' }]}>
                    <Text style={[typography.labelSm, { color: colors.onErrorContainer, textTransform: 'uppercase' }]}>Flagged</Text>
                  </View>
                </View>
                <View style={styles.cycleFooter}>
                  <View style={styles.cycleStats}>
                    <View style={{ marginRight: spacing.lg }}>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>LOAD</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>1.2K_UNIT</Text>
                    </View>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EFFICIENCY</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>B-</Text>
                    </View>
                  </View>
                  <View style={styles.barGraph}>
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 32 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 28 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 24 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.error, height: 16 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.error, height: 8 }]} />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Cycle Item 089 */}
              <TouchableOpacity style={[styles.cycleCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.cycleHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>CYCLE_089</Text>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: 'bold' }]}>NOMINAL_OPS</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                    <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, textTransform: 'uppercase' }]}>Completed</Text>
                  </View>
                </View>
                <View style={styles.cycleFooter}>
                  <View style={styles.cycleStats}>
                    <View style={{ marginRight: spacing.lg }}>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>LOAD</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>744_UNIT</Text>
                    </View>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EFFICIENCY</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary }]}>A+</Text>
                    </View>
                  </View>
                  <View style={styles.barGraph}>
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 16 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 16 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.surfaceVariant, height: 16 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 20 }]} />
                    <View style={[styles.barItem, { backgroundColor: colors.primary, height: 20 }]} />
                  </View>
                </View>
              </TouchableOpacity>

            </View>

            {/* Pagination */}
            <View style={[styles.pagination, { marginTop: spacing.lg }]}>
              <TouchableOpacity style={[styles.pageNavButton, { borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
              </TouchableOpacity>
              <View style={styles.pageNumbers}>
                <View style={[styles.pageNumberActive, { backgroundColor: colors.primary }]}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>01</Text>
                </View>
                <TouchableOpacity style={styles.pageNumberInactive}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>02</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pageNumberInactive}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>03</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.pageNavButton, { borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 96,
  },
  mainContent: {},
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  bentoGrid: {
    gap: 8,
  },
  bentoCardFull: {
    borderWidth: 1,
    height: 128,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bentoRowHalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  bentoCardHalf: {
    flex: 1,
    borderWidth: 1,
    height: 128,
    justifyContent: 'space-between',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  operatorLoadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cycleList: {
    gap: 8,
  },
  cycleCard: {
    borderWidth: 1,
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  cycleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cycleStats: {
    flexDirection: 'row',
  },
  barGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    width: 64,
    height: 32,
  },
  barItem: {
    width: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  pageNavButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageNumberActive: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberInactive: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CommitmentHistoryScreen;
