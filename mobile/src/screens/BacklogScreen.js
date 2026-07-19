import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const BacklogScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [activeFilter, setActiveFilter] = useState('ALL TASKS');

  const renderFilterChip = (label, isActive) => (
    <TouchableOpacity
      key={label}
      onPress={() => setActiveFilter(label)}
      style={[
        styles.filterChip,
        isActive 
          ? { backgroundColor: colors.primary, borderColor: colors.primary }
          : { backgroundColor: 'transparent', borderColor: colors.outlineVariant }
      ]}
    >
      <Text style={[
        typography.labelSm,
        isActive ? { color: colors.onPrimary } : { color: colors.secondary }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginLeft: spacing.sm, fontWeight: 'bold' }]}>MANDATE</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.lg }]}>
          
          {/* Dashboard Stats */}
          <View style={styles.statsRow}>
            {/* System Load */}
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.statTop}>
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>System Load</Text>
                <MaterialIcons name="bolt" size={18} color={colors.onTertiaryContainer} />
              </View>
              <View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>78.4%</Text>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh, marginTop: spacing.xs }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '78.4%' }]} />
                </View>
              </View>
            </View>

            {/* Operators */}
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.statTop}>
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Operators</Text>
                <MaterialIcons name="group" size={18} color={colors.secondary} />
              </View>
              <View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12</Text>
                <View style={styles.standbyRow}>
                  <View style={[styles.dot, { backgroundColor: colors.onTertiaryContainer }]} />
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>3 STANDBY</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Search & Filter */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color={colors.secondary} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, typography.labelSm, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                placeholder="SEARCH TASK LEDGER..."
                placeholderTextColor={colors.secondary}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
              {['ALL TASKS', 'PENDING', 'IN-PROGRESS', 'FAILED'].map(filter => renderFilterChip(filter, activeFilter === filter))}
            </ScrollView>
          </View>

          {/* Task Ledger List */}
          <View>
            <View style={styles.ledgerHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>TASK LEDGER</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>42 TOTAL</Text>
            </View>

            {/* Task Item 1 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.taskTop}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>UID: MDT-902-A</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Pressure Valve Calibration</Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: colors.errorContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onErrorContainer, fontSize: 10 }]}>URGENT</Text>
                </View>
              </View>
              <View style={[styles.taskBottom, { borderTopColor: colors.surfaceContainerHigh }]}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: spacing.sm }]}>ACTIVE</Text>
                </View>
                <View style={styles.avatarsRow}>
                  <View style={[styles.avatarRound, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest }]} />
                  <View style={[styles.avatarRound, styles.avatarOverlap, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest }]} />
                </View>
              </View>
            </View>

            {/* Task Item 2 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.taskTop}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>UID: MDT-774-B</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Coolant Intake Inspection</Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>NORMAL</Text>
                </View>
              </View>
              <View style={[styles.taskBottom, { borderTopColor: colors.surfaceContainerHigh }]}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: colors.outline }]} />
                  <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: spacing.sm }]}>QUEUED</Text>
                </View>
                <View style={styles.avatarsRow}>
                  <View style={[styles.avatarRound, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest }]} />
                </View>
              </View>
            </View>

            {/* Task Item 3 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.taskTop}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>UID: MDT-112-C</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Relay Logic Diagnostic</Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: colors.errorContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onErrorContainer, fontSize: 10 }]}>CRITICAL</Text>
                </View>
              </View>
              <View style={[styles.taskBottom, { borderTopColor: colors.surfaceContainerHigh }]}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                  <Text style={[typography.labelSm, { color: colors.error, marginLeft: spacing.sm }]}>STALLED</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.secondary, fontStyle: 'italic' }]}>UNASSIGNED</Text>
              </View>
            </View>

            {/* Visualization Bento */}
            <View style={[styles.vizBento, { backgroundColor: colors.primary, borderRadius: borderRadius.lg }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>THROUGHPUT RATIO</Text>
              <Text style={[typography.displayLg, { color: colors.onPrimary, fontSize: 48, fontWeight: '900', marginVertical: spacing.sm }]}>0.992</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary, opacity: 0.7 }]}>OPERATIONAL EFFICIENCY WITHIN OPTIMAL RANGE FOR SECTOR 7B.</Text>
            </View>

            {/* Task Item 4 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.taskTop}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>UID: MDT-440-X</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Turbine Blade Resurfacing</Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>LOW</Text>
                </View>
              </View>
              <View style={[styles.taskBottom, { borderTopColor: colors.surfaceContainerHigh }]}>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer }]} />
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: spacing.sm }]}>COMPLETE</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>08:45 AM</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64, // Extra padding for tab bar
  },
  mainContent: {
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderWidth: 1,
    padding: 16,
    height: 128,
    justifyContent: 'space-between',
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  standbyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 44,
    paddingRight: 16,
    paddingVertical: 16,
    borderBottomWidth: 2,
  },
  filterScroll: {
    paddingVertical: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  taskCard: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  taskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  taskBottom: {
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  avatarRound: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  vizBento: {
    padding: 32,
    marginBottom: 12,
    overflow: 'hidden',
  }
});

export default BacklogScreen;
