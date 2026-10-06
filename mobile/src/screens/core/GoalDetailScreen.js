import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Svg, { Circle } from 'react-native-svg';
import { getGoalById } from "../../services/goalService";

const GoalDetailScreen = ({ route, navigation }) => {
  const initialGoal = route.params?.goal || { _id: "GOAL", title: "Objective", progress: 0 };
  const { colors, typography, spacing } = useTheme();

  const [goal, setGoal] = useState(initialGoal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialGoal._id && initialGoal._id !== 'GOAL') {
      setLoading(true);
      getGoalById(initialGoal._id)
        .then((data) => {
          if (data) setGoal(data);
        })
        .catch((err) => console.warn('Failed to load goal detail:', err.message))
        .finally(() => setLoading(false));
    }
  }, [initialGoal._id]);

  const linkedTasks = goal.linkedTasks || [];
  const completedTasks = linkedTasks.filter(t => t.status === 'done').length;
  
  // Real progress calculation from linked tasks or goal progress
  const progress = linkedTasks.length > 0
    ? Math.round((completedTasks / linkedTasks.length) * 100)
    : (goal.progress || 0);
  
  // Svg circular progress math
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Dynamic progress track bars
  const progressBars = [0.2, 0.4, 0.6, 0.8, 1.0].map((step) => {
    const fraction = progress / 100;
    return fraction >= step ? 100 : Math.max(0, Math.round((fraction / step) * 100));
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <MaterialIcons name="flag" size={20} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>
            GOAL PROTOCOL
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('GlobalSearch')}
          >
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Goal Header */}
        <View style={styles.section}>
          <View style={styles.goalIdRow}>
            <View style={[styles.idBadge, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 10 }]}>
                ID: {goal._id?.substring(0, 8).toUpperCase()}
              </Text>
            </View>
            <View style={[styles.statusRow, { marginLeft: 'auto' }]}>
              <View style={[styles.pulseDot, { backgroundColor: goal.status === 'achieved' ? colors.onTertiaryContainer : colors.primary }]} />
              <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>
                {goal.status?.toUpperCase() || 'ACTIVE'}
              </Text>
            </View>
          </View>
          
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginVertical: 8 }]}>
            {goal.title}
          </Text>
          
          {goal.description ? (
            <Text style={[typography.bodyMd, { color: colors.secondary, marginBottom: 8 }]}>
              {goal.description}
            </Text>
          ) : null}

          {goal.targetDate ? (
            <Text style={[typography.labelSm, { color: colors.outline }]}>
              TARGET DATE: {new Date(goal.targetDate).toLocaleDateString()}
            </Text>
          ) : null}
        </View>

        {/* Bento Grid: Main Metrics */}
        <View style={[styles.section, styles.bentoGrid]}>
          {/* Progress Gauge */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, alignItems: 'center' }]}>
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle
                  stroke={colors.surfaceContainer}
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  stroke={colors.primary}
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt"
                />
              </Svg>
              <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[typography.displayLg, { fontSize: 32, color: colors.primary }]}>{progress}%</Text>
                <Text style={[typography.labelCaps, { fontSize: 8, color: colors.secondary, marginTop: -4 }]}>COMPLETION</Text>
              </View>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 16, textAlign: 'center' }]}>
              {linkedTasks.length > 0 ? `${completedTasks} of ${linkedTasks.length} tasks completed` : 'Direct progress tracking'}
            </Text>
          </View>

          {/* Success Probability / Trajectory */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, justifyContent: 'space-between' }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>TRAJECTORY</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>
                  {progress >= 75 ? 'ON TRACK' : progress >= 40 ? 'PACING' : 'INITIAL'}
                </Text>
              </View>
            </View>
            
            {/* Dynamic Progress Distribution */}
            <View style={styles.chartContainer}>
              {progressBars.map((h, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.chartBar, 
                    { 
                      height: `${Math.max(h, 15)}%`, 
                      backgroundColor: h >= 100 ? colors.primary : colors.surfaceContainerHigh 
                    }
                  ]} 
                />
              ))}
            </View>
            
            <View style={[styles.tminusRow, { borderTopColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>STATUS</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>
                {goal.status?.toUpperCase() || 'IN PROGRESS'}
              </Text>
            </View>
          </View>
        </View>

        {/* Linked Mandates List */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>
              LINKED MANDATES ({linkedTasks.length})
            </Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 16 }} />
          ) : linkedTasks.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <MaterialIcons name="link-off" size={24} color={colors.secondary} />
              <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 8, textAlign: 'center' }]}>
                No tasks linked to this goal yet.
              </Text>
            </View>
          ) : (
            <View style={[styles.linkedList, { borderTopColor: colors.surfaceContainerHigh, borderBottomColor: colors.surfaceContainerHigh }]}>
              {linkedTasks.map((task) => (
                <TouchableOpacity 
                  key={task._id || task}
                  style={[styles.linkedItem, { borderBottomColor: colors.surfaceContainerHigh }]}
                  onPress={() => {
                    if (task._id) {
                      navigation.navigate('TaskDetail', { taskId: task._id });
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <MaterialIcons 
                      name={task.status === 'done' ? 'check-circle' : 'assignment'} 
                      size={20} 
                      color={task.status === 'done' ? colors.onTertiaryContainer : colors.secondary} 
                      style={{ marginRight: 12 }} 
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]} numberOfLines={1}>
                        {task.title || 'Mandate'}
                      </Text>
                      <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>
                        PRIORITY: {task.priority?.toUpperCase() || 'NORMAL'}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.badgeOutline, { borderColor: task.status === 'done' ? colors.onTertiaryContainer : colors.primary }]}>
                    <Text style={[typography.labelCaps, { fontSize: 8, color: task.status === 'done' ? colors.onTertiaryContainer : colors.primary }]}>
                      {task.status?.toUpperCase() || 'PENDING'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Milestone Log */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>
            LIFECYCLE LOG
          </Text>
          <View style={{ gap: 12 }}>
            <View style={[styles.milestoneCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.milestoneAccent, { backgroundColor: colors.onTertiaryContainer }]} />
              <View style={styles.milestoneHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>GOAL CREATED</Text>
                  <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 4 }]}>
                    Objective registered in workspace ledger.
                  </Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} />
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 12 }]}>
                RECORDED: {new Date(goal.createdAt || Date.now()).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  content: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  goalIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  idBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bentoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    minHeight: 180,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    gap: 6,
    marginVertical: 12,
  },
  chartBar: {
    flex: 1,
    borderRadius: 2,
  },
  tminusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkedList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  linkedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  badgeOutline: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  milestoneCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  milestoneAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GoalDetailScreen;
