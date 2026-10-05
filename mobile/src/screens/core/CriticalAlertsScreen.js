import React, { useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, ActivityIndicator, RefreshControl 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useDataStore } from '../../store/useDataStore';

const CriticalAlertsScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { tasks, loading, loadTasks } = useDataStore((state) => state);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const now = new Date();
  const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'done');
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'done');
  
  // Unique critical tasks combining overdue and urgent
  const criticalMap = new Map();
  overdueTasks.forEach((t) => criticalMap.set(t._id, { ...t, alertType: 'OVERDUE' }));
  urgentTasks.forEach((t) => {
    if (!criticalMap.has(t._id)) {
      criticalMap.set(t._id, { ...t, alertType: 'URGENT' });
    }
  });
  const criticalList = Array.from(criticalMap.values());

  const activeTasksCount = tasks.filter((t) => t.status !== 'done').length;
  const loadPercentage = tasks.length > 0 ? Math.round((activeTasksCount / tasks.length) * 100) : 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>
            CRITICAL ALERTS
          </Text>
        </View>
        <TouchableOpacity onPress={() => loadTasks()}>
          <MaterialIcons name="refresh" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadTasks} tintColor={colors.primary} />
        }
      >
        <View style={styles.mainContent}>
          {/* System Critical Alert Header */}
          <View style={styles.alertHeaderRow}>
            <View style={[styles.alertBadge, { backgroundColor: criticalList.length > 0 ? colors.errorContainer : colors.primaryContainer }]}>
              <Text style={[typography.labelCaps, { color: criticalList.length > 0 ? colors.onErrorContainer : colors.onPrimaryContainer, fontSize: 10 }]}>
                {criticalList.length > 0 ? 'ATTENTION REQUIRED' : 'SYSTEM NOMINAL'}
              </Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>
              {criticalList.length} TOTAL ISSUES
            </Text>
          </View>

          {/* High-Impact Metrics */}
          <View style={styles.bentoGrid}>
            <View style={styles.row}>
              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.error }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>OVERDUE</Text>
                <View>
                  <Text style={[typography.displayLg, { color: colors.error, fontSize: 36, lineHeight: 40 }]}>
                    {overdueTasks.length}
                  </Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Mandates</Text>
                </View>
              </View>

              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>CRITICAL PRIORITY</Text>
                <View>
                  <Text style={[typography.displayLg, { color: colors.primary, fontSize: 36, lineHeight: 40 }]}>
                    {urgentTasks.length}
                  </Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Active Tasks</Text>
                </View>
              </View>
            </View>

            <View style={[styles.bentoCardFull, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.secondary }]}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>ACTIVE WORKLOAD</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{loadPercentage}% Active</Text>
              </View>
              <View style={[styles.loadTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.loadFill, { width: `${loadPercentage}%`, backgroundColor: colors.primary }]} />
              </View>
            </View>
          </View>

          {/* Urgent Queue */}
          <View style={{ marginTop: 24, marginBottom: 16 }}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Urgent Queue</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>
                {criticalList.length} ITEMS
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 24 }} />
            ) : criticalList.length === 0 ? (
              <View style={[styles.emptyBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
                <MaterialIcons name="verified" size={32} color={colors.onTertiaryContainer} />
                <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 8, textAlign: 'center' }]}>
                  All systems clear. No critical alerts or overdue mandates pending.
                </Text>
              </View>
            ) : (
              <View style={styles.queueList}>
                {criticalList.map((item) => {
                  const isOverdue = item.alertType === 'OVERDUE';
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={[styles.alertCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}
                      onPress={() => navigation.navigate('TaskDetail', { taskId: item._id })}
                      activeOpacity={0.8}
                    >
                      <View style={styles.alertCardTop}>
                        <View style={{ flex: 1 }}>
                          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 16 }]} numberOfLines={1}>
                            {item.title}
                          </Text>
                          <View style={styles.alertStatusRow}>
                            <View style={[styles.statusDot, { backgroundColor: isOverdue ? colors.error : colors.primary }]} />
                            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>
                              {item.alertType} • PRIORITY: {item.priority?.toUpperCase()}
                            </Text>
                          </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
                      </View>

                      {item.dueDate ? (
                        <View style={styles.alertCardBottom}>
                          <Text style={[typography.labelSm, { color: isOverdue ? colors.error : colors.secondary, fontSize: 11 }]}>
                            DUE: {new Date(item.dueDate).toLocaleDateString()}
                          </Text>
                          <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>
                            STATUS: {item.status?.toUpperCase()}
                          </Text>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
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
  container: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  mainContent: {
    padding: 16,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoGrid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoCardHalf: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 110,
  },
  bentoCardFull: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  loadTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  queueList: {
    gap: 12,
  },
  alertCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  alertCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  alertCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 8,
    marginTop: 4,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CriticalAlertsScreen;
