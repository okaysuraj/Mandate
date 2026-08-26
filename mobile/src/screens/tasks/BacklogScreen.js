import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useDataStore } from '../../store/useDataStore';
import { useAuth } from '../../context/AuthContext';

const BacklogScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [activeFilter, setActiveFilter] = useState('ALL TASKS');
  const [search, setSearch] = useState('');
  
  const { tasks, loading, loadTasks } = useDataStore(state => state);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

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

  const filteredTasks = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !(t.description && t.description.toLowerCase().includes(search.toLowerCase()))) {
      return false;
    }
    if (activeFilter === 'PENDING' && t.status !== 'pending') return false;
    if (activeFilter === 'IN-PROGRESS' && t.status !== 'in-progress') return false;
    if (activeFilter === 'FAILED' && t.status !== 'failed') return false; // Assuming failed is a status
    return true;
  });

  const getStatusColor = (status) => {
    if (status === 'completed') return colors.onTertiaryContainer;
    if (status === 'in-progress') return colors.tertiaryFixedDim;
    if (status === 'failed') return colors.error;
    return colors.outline;
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'urgent' || priority === 'high') {
      return { bg: colors.errorContainer, text: colors.onErrorContainer, label: 'CRITICAL' };
    }
    if (priority === 'low') {
      return { bg: colors.surfaceContainerHigh, text: colors.secondary, label: 'LOW' };
    }
    return { bg: colors.surfaceContainerHigh, text: colors.secondary, label: 'NORMAL' };
  };

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
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Active Load</Text>
                <MaterialIcons name="bolt" size={18} color={colors.onTertiaryContainer} />
              </View>
              <View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{tasks.filter(t => t.status === 'in-progress').length}</Text>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh, marginTop: spacing.xs }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${Math.min(100, (tasks.filter(t => t.status === 'in-progress').length / (tasks.length || 1)) * 100)}%` }]} />
                </View>
              </View>
            </View>

            {/* Operators */}
            <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <View style={styles.statTop}>
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Total Tasks</Text>
                <MaterialIcons name="group" size={18} color={colors.secondary} />
              </View>
              <View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{tasks.length}</Text>
                <View style={styles.standbyRow}>
                  <View style={[styles.dot, { backgroundColor: colors.error }]} />
                  <Text style={[typography.labelSm, { color: colors.error, marginLeft: 4 }]}>{tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length} CRITICAL</Text>
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
                value={search}
                onChangeText={setSearch}
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
              <Text style={[typography.labelSm, { color: colors.secondary }]}>{filteredTasks.length} TOTAL</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 32 }} />
            ) : filteredTasks.length === 0 ? (
              <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', marginTop: 32 }]}>NO TASKS FOUND</Text>
            ) : (
              filteredTasks.map((task, i) => {
                const priority = getPriorityBadge(task.priority);
                
                return (
                  <View key={task._id || i} style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
                    <View style={styles.taskTop}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6 }]}>UID: MDT-{String(task._id).substring(0,6).toUpperCase() || 'XXX'}</Text>
                        <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]} numberOfLines={2}>{task.title}</Text>
                      </View>
                      <View style={[styles.priorityBadge, { backgroundColor: priority.bg }]}>
                        <Text style={[typography.labelCaps, { color: priority.text, fontSize: 10 }]}>{priority.label}</Text>
                      </View>
                    </View>
                    <View style={[styles.taskBottom, { borderTopColor: colors.surfaceContainerHigh }]}>
                      <View style={styles.statusRow}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(task.status) }]} />
                        <Text style={[typography.labelSm, { color: getStatusColor(task.status), marginLeft: spacing.sm, textTransform: 'uppercase' }]}>{task.status || 'UNKNOWN'}</Text>
                      </View>
                      <View style={styles.avatarsRow}>
                        <View style={[styles.avatarRound, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest }]} />
                      </View>
                    </View>
                  </View>
                );
              })
            )}

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
