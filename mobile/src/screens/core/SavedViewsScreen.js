import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, ActivityIndicator, RefreshControl 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useDataStore } from '../../store/useDataStore';
import api from '../../services/api';

const SavedViewsScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { tasks, loadTasks } = useDataStore((state) => state);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      await loadTasks();
      const res = await api.get('/projects').catch(() => ({ data: [] }));
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.warn('Failed to load views data:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed' || t.status === 'done').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent');
  const highTasks = tasks.filter((t) => t.priority === 'high');
  const priorityBacklogCount = urgentTasks.length + highTasks.length;
  const activeProjectsCount = projects.length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const viewsList = [
    {
      id: 'today_focus',
      title: 'Today Focus',
      subtitle: `${tasks.filter((t) => t.status !== 'completed' && t.status !== 'done').length} active mandates`,
      tag1: 'EXECUTION',
      tag2: `${tasks.filter((t) => t.status === 'in-progress' || t.status === 'in_progress').length} IN PROGRESS`,
      progress: completionRate,
      icon: 'flare',
      onPress: () => navigation.navigate('Today'),
    },
    {
      id: 'priority_backlog',
      title: 'Priority Backlog',
      subtitle: `${priorityBacklogCount} urgent & high tasks`,
      tag1: 'CRITICAL PATH',
      tag2: `${urgentTasks.length} URGENT`,
      progress: priorityBacklogCount > 0 ? Math.min(100, Math.round((highTasks.length / priorityBacklogCount) * 100)) : 100,
      icon: 'warning',
      onPress: () => navigation.navigate('KanbanMain'),
    },
    {
      id: 'active_projects',
      title: 'Active Projects',
      subtitle: `${activeProjectsCount} registered workspace projects`,
      tag1: 'WORKSPACE',
      tag2: `${activeProjectsCount} STREAMS`,
      progress: activeProjectsCount > 0 ? 100 : 0,
      icon: 'account-tree',
      onPress: () => navigation.navigate('ProjectsMain'),
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            SAVED VIEWS
          </Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('GlobalSearch')}>
          <MaterialIcons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Summary Module */}
        <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>WORKSPACE STATUS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Overall Progress</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[typography.displayLg, { fontSize: 32, lineHeight: 36, color: colors.primary }]}>{completionRate}%</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>
                {completedTasks}/{totalTasks} RESOLVED
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressFill, { width: `${completionRate}%`, backgroundColor: colors.primary }]} />
          </View>
        </View>

        {/* Gallery Header */}
        <View style={styles.galleryHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>CORE FILTERS ({viewsList.length})</Text>
        </View>

        {/* List of Modules */}
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 32 }} />
        ) : (
          <View style={styles.modulesList}>
            {viewsList.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={[styles.moduleCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}
                onPress={item.onPress}
                activeOpacity={0.8}
              >
                <View style={styles.moduleHeader}>
                  <View style={styles.moduleHeaderLeft}>
                    <View style={[styles.moduleIconContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                      <MaterialIcons name={item.icon} size={24} color={colors.primary} />
                    </View>
                    <View style={styles.moduleTitleContainer}>
                      <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>
                        {item.title}
                      </Text>
                      <Text style={[typography.labelSm, { color: colors.secondary }]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
                </View>

                <View style={styles.tagsRow}>
                  <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{item.tag1}</Text>
                  </View>
                  <View style={[styles.tag, { backgroundColor: colors.surfaceContainerLow }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontSize: 10 }]}>{item.tag2}</Text>
                  </View>
                </View>

                {/* Progress bar */}
                <View style={[styles.moduleProgressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.moduleProgressFill, { width: `${item.progress}%`, backgroundColor: colors.primary }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 48,
    gap: 16,
  },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  modulesList: {
    gap: 12,
  },
  moduleCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  moduleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTitleContainer: {
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  moduleProgressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  moduleProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default SavedViewsScreen;
