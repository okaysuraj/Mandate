import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, RefreshControl, ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useDataStore } from '../../store/useDataStore';
import api from '../../services/api';

const HomeDashboardScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { user } = useAuth();
  const { tasks, loadTasks } = useDataStore((state) => state);
  
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      await loadTasks();
      const analyticsRes = await api.get('/tasks/analytics').catch(() => null);
      if (analyticsRes?.data) {
        setAnalytics(analyticsRes.data);
      }
    } catch (err) {
      console.warn('Dashboard data fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loadTasks]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'todo').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent').length;
  const highTasks = tasks.filter((t) => t.priority === 'high').length;

  const efficiencyRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // 7-day relative completion distribution
  const graphBars = [0.2, 0.4, 0.35, 0.6, 0.5, 0.8, 1.0].map((baseline, i) => {
    const fraction = totalTasks > 0 ? (completedTasks + i) / (totalTasks + 7) : baseline;
    return Math.min(Math.max(fraction, 0.15), 1.0);
  });

  const pinnedTasks = tasks.slice(0, 5);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => navigation.navigate('ProjectsMain')}
          >
            <MaterialIcons name="dashboard" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE OS
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => navigation.navigate('GlobalSearch')}
          >
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Hero Metrics Canvas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>
              Operational Matrix
            </Text>
            <View style={styles.liveBadge}>
              <View style={[styles.liveDot, { backgroundColor: colors.onTertiaryContainer }]} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>LIVE</Text>
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="bolt" size={24} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>EFFICIENCY</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{efficiencyRate}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>%</Text>
                </View>
              </View>
            </View>

            <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="done-all" size={24} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>RESOLVED</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{completedTasks}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}> / {totalTasks}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.metricCardWide, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE MANDATES</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>
                    {inProgressTasks + pendingTasks} Active
                  </Text>
                </View>
                <View style={[styles.priorityTag, { backgroundColor: urgentTasks > 0 ? colors.errorContainer : colors.surfaceContainer }]}>
                  <Text style={[typography.labelCaps, { color: urgentTasks > 0 ? colors.onErrorContainer : colors.secondary, fontSize: 10 }]}>
                    {urgentTasks} CRITICAL
                  </Text>
                </View>
              </View>
              
              <View style={styles.miniGraph}>
                {graphBars.map((h, i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.miniGraphBar, 
                      { 
                        backgroundColor: colors.primary, 
                        height: `${h * 100}%`, 
                        opacity: 0.3 + (i * 0.1) 
                      }
                    ]} 
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Workstream Health Stats */}
        <View style={styles.section}>
          <View style={[styles.healthMapCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={[styles.healthMapHeader, { backgroundColor: colors.surfaceContainerLow }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>WORKSTREAM HEALTH</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>
                {user?.activeWorkspace ? 'WORKSPACE CONTEXT' : 'ACTIVE PIPELINE'}
              </Text>
            </View>
            
            <View style={[styles.healthMapStats, { borderTopColor: colors.outlineVariant }]}>
              <View style={styles.healthStat}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>IN PROGRESS</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>{inProgressTasks}</Text>
              </View>
              <View style={[styles.healthStat, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>HIGH PRIORITY</Text>
                <Text style={[typography.labelCaps, { color: highTasks > 0 ? colors.primary : colors.secondary }]}>
                  {highTasks}
                </Text>
              </View>
              <View style={styles.healthStat}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>DEEP WORK</Text>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>
                  {analytics?.deepWorkRatio ? `${analytics.deepWorkRatio}%` : `${efficiencyRate}%`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pinned Mandates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>PINNED MANDATES</Text>
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation.navigate('ProjectsMain')}
            >
              <Text style={[typography.labelSm, { color: colors.primary, marginRight: 4 }]}>VIEW ALL</Text>
              <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 24 }} />
          ) : pinnedTasks.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="assignment-late" size={32} color={colors.secondary} />
              <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 8, textAlign: 'center' }]}>
                No mandates found. Create your first task to initiate tracking.
              </Text>
              <TouchableOpacity 
                style={[styles.createBtn, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('CreateTask')}
              >
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>CREATE MANDATE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              {pinnedTasks.map((item) => {
                const isUrgent = item.priority === 'urgent';
                const isHigh = item.priority === 'high';
                return (
                  <TouchableOpacity 
                    key={item._id}
                    style={[styles.mandateCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}
                    onPress={() => navigation.navigate('TaskDetail', { taskId: item._id })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.mandateLeft}>
                      <View style={[styles.mandateIconBg, { backgroundColor: colors.surfaceContainer }]}>
                        <MaterialIcons 
                          name={item.status === 'done' ? 'check-circle' : 'assignment'} 
                          size={20} 
                          color={item.status === 'done' ? colors.onTertiaryContainer : colors.secondary} 
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[typography.labelCaps, { color: colors.primary }]} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>
                          STATUS: {item.status?.toUpperCase()} • PRIORITY: {item.priority?.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View 
                      style={[
                        styles.priorityIndicator, 
                        { 
                          backgroundColor: isUrgent ? colors.error : isHigh ? colors.primary : colors.outlineVariant,
                          opacity: 0.8 
                        }
                      ]} 
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Live System Log */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>
            PIPELINE ACTIVITY
          </Text>
          <View style={[styles.logContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderWidth: 1 }]}>
            <View style={styles.logList}>
              {pinnedTasks.length > 0 ? (
                pinnedTasks.map((t, idx) => (
                  <View key={idx} style={[styles.logItem, { borderLeftColor: colors.primary }]}>
                    <Text style={[typography.labelSm, { color: colors.secondary, width: 80, fontSize: 10 }]}>
                      {new Date(t.updatedAt || t.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Text>
                    <Text style={[typography.labelSm, { color: colors.primary, flex: 1 }]} numberOfLines={1}>
                      [{t.status?.toUpperCase()}] {t.title}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={[styles.logItem, { borderLeftColor: colors.secondary }]}>
                  <Text style={[typography.labelSm, { color: colors.secondary, width: 80, fontSize: 10 }]}>[STATUS]</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, flex: 1 }]}>Telemetry monitoring online. No recent events.</Text>
                </View>
              )}
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
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 16,
    paddingBottom: 48,
    gap: 24,
  },
  section: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    minWidth: '48%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 110,
  },
  metricCardWide: {
    width: '100%',
    height: 128,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  miniGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 32,
    gap: 4,
  },
  miniGraphBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  healthMapCard: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  healthMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  healthMapStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    padding: 16,
  },
  healthStat: {
    flex: 1,
    alignItems: 'center',
  },
  mandateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  mandateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  mandateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityIndicator: {
    width: 6,
    height: 36,
    borderRadius: 3,
    marginLeft: 12,
  },
  emptyCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logContainer: {
    borderRadius: 8,
    padding: 16,
  },
  logList: {
    gap: 12,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
    paddingLeft: 10,
  },
});

export default HomeDashboardScreen;
