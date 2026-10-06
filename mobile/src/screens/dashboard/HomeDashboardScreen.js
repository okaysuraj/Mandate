import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Animated, Easing, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useSocket } from "../../context/SocketContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const HomeDashboardScreen = ({ navigation }) => {
  const { colors, typography, isDark } = useTheme();
  const { user } = useAuth();
  const { tasks, loadTasks } = useDataStore((state) => state);
  const { socket } = useSocket();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Radar spinner animation matching web animate-[spin_10s_linear_infinite]
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      if (typeof loadTasks === "function") {
        await loadTasks();
      }
      const analyticsRes = await api.get("/tasks/analytics").catch(() => null);
      if (analyticsRes?.data) {
        setAnalytics(analyticsRes.data);
      }
    } catch (err) {
      console.warn("Dashboard data fetch error:", err?.message || err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loadTasks]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, fetchDashboardData]);

  useEffect(() => {
    if (!socket || typeof socket.on !== "function") return;
    socket.on("task:created", fetchDashboardData);
    socket.on("task:updated", fetchDashboardData);
    socket.on("task:deleted", fetchDashboardData);
    return () => {
      if (typeof socket.off === "function") {
        socket.off("task:created", fetchDashboardData);
        socket.off("task:updated", fetchDashboardData);
        socket.off("task:deleted", fetchDashboardData);
      }
    };
  }, [socket, fetchDashboardData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // Safely normalize tasks to guaranteed array
  const taskList = useMemo(() => {
    if (Array.isArray(tasks)) return tasks;
    if (Array.isArray(tasks?.data)) return tasks.data;
    if (Array.isArray(tasks?.tasks)) return tasks.tasks;
    return [];
  }, [tasks]);

  // Metrics matching web HomePage.jsx
  const totalTasks = taskList.length;
  const completedTasks = taskList.filter(
    (t) => t && (t.status === "completed" || t.status === "done")
  ).length;
  const efficiency =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100 * 10) / 10
      : 0;
  const activeTasks = taskList.filter(
    (t) => t && t.status !== "completed" && t.status !== "done"
  );
  const urgentCount = activeTasks.filter((t) => t?.priority === "urgent").length;
  const highCount = activeTasks.filter((t) => t?.priority === "high").length;
  const mediumCount = activeTasks.filter((t) => t?.priority === "medium").length;
  const lowCount = activeTasks.filter(
    (t) => !t?.priority || t?.priority === "low"
  ).length;

  const deepWorkRatio = analytics?.deepWorkRatio ?? 0;
  const avgLatency = analytics?.averageResolutionLatency ?? "0h 0m";

  // Recent activity sorted by updatedAt / createdAt
  const recentActivity = [...taskList]
    .sort((a, b) => {
      const timeB = new Date(b?.updatedAt || b?.createdAt || 0).getTime() || 0;
      const timeA = new Date(a?.updatedAt || a?.createdAt || 0).getTime() || 0;
      return timeB - timeA;
    })
    .slice(0, 5);

  const formatTime = (dateVal) => {
    if (!dateVal) return "";
    try {
      const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
      if (isNaN(d.getTime())) return "";
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const seconds = String(d.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    } catch (e) {
      return "";
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="DASHBOARD" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.commandTitle, { color: colors.primary }]}>
              DASHBOARD
            </Text>
            <Text style={[styles.commandSubtitle, { color: colors.onSurfaceVariant }]}>
              Workspace: {user?.activeWorkspace ? "Active Workspace" : "Personal"} • Live Updates
            </Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <View style={[styles.liveDot, { backgroundColor: colors.onTertiaryContainer }]} />
            <Text style={[styles.liveText, { color: colors.onTertiaryContainer }]}>
              ONLINE
            </Text>
          </View>
        </View>

        {/* Bento Grid: Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Card 1: Efficiency */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
                EFFICIENCY
              </Text>
              <MaterialIcons name="query-stats" size={18} color={colors.outline} />
            </View>
            <View style={styles.valueRow}>
              <Text style={[styles.metricValue, { color: colors.primary }]}>
                {loading ? "—" : efficiency}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.onSurfaceVariant }]}>%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: colors.primary, width: `${loading ? 0 : efficiency}%` },
                ]}
              />
            </View>
            <Text style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}>
              {completedTasks} of {totalTasks} tasks completed
            </Text>
          </View>

          {/* Card 2: Active Mandates */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
                ACTIVE TASKS
              </Text>
              <MaterialIcons name="hub" size={18} color={colors.outline} />
            </View>
            <View style={styles.valueRow}>
              <Text style={[styles.metricValue, { color: colors.primary }]}>
                {loading ? "—" : activeTasks.length}
              </Text>
            </View>
            <View style={styles.statusBlocksRow}>
              <View
                style={[
                  styles.statusBlock,
                  { backgroundColor: colors.primary, opacity: activeTasks.length > 0 ? 1 : 0.2 },
                ]}
              />
              <View
                style={[
                  styles.statusBlock,
                  { backgroundColor: colors.primary, opacity: activeTasks.length > 3 ? 1 : 0.2 },
                ]}
              />
              <View
                style={[
                  styles.statusBlock,
                  { backgroundColor: colors.primary, opacity: activeTasks.length > 6 ? 1 : 0.2 },
                ]}
              />
              <View
                style={[styles.statusBlock, { backgroundColor: colors.surfaceContainer }]}
              />
            </View>
            <Text style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}>
              {urgentCount} critical, {highCount} high priority
            </Text>
          </View>

          {/* Card 3: Deep Work Ratio */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
                DEEP WORK RATIO
              </Text>
              <MaterialIcons name="speed" size={18} color={colors.outline} />
            </View>
            <View style={styles.valueRow}>
              <Text style={[styles.metricValue, { color: colors.primary }]}>
                {loading ? "—" : deepWorkRatio}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.onSurfaceVariant }]}>%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: colors.primary, width: `${loading ? 0 : deepWorkRatio}%` },
                ]}
              />
            </View>
            <Text style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}>
              Avg latency: {avgLatency}
            </Text>
          </View>
        </View>

        {/* System Pulse Visualization & Realtime Telemetry */}
        <View
          style={[
            styles.pulseCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.pulseHeader}>
            <Text style={[styles.pulseTitle, { color: colors.primary }]}>
              Activity & Realtime Updates
            </Text>
            <View style={[styles.pulseBadge, { backgroundColor: colors.tertiaryContainer, borderColor: colors.outlineVariant }]}>
              <Text style={[styles.pulseBadgeText, { color: colors.onTertiaryContainer }]}>
                LIVE ACTIVITY
              </Text>
            </View>
          </View>

          {/* Visualizer Radar Box */}
          <View style={[styles.visualizerBox, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.radarWrapper}>
              <Animated.View
                style={[
                  styles.outerRadarRing,
                  {
                    borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                    transform: [{ rotate: spin }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.innerRadarRing,
                    {
                      borderColor: colors.primary,
                      borderTopColor: "transparent",
                    },
                  ]}
                />
              </Animated.View>
            </View>
          </View>

          {/* Live Telemetry Stream Logs */}
          <View style={styles.liveLogsList}>
            {recentActivity.map((task) => (
              <View
                key={task._id}
                style={[
                  styles.logItemCard,
                  {
                    backgroundColor: colors.surfaceContainerLow,
                    borderColor: colors.outlineVariant,
                  },
                ]}
              >
                <View style={styles.logMetaRow}>
                  <View
                    style={[
                      styles.logDot,
                      {
                        backgroundColor:
                          task.priority === "urgent"
                            ? colors.error
                            : task.status === "completed" || task.status === "done"
                            ? colors.tertiary
                            : colors.primary,
                      },
                    ]}
                  />
                  <Text style={[styles.logTime, { color: colors.onSurface }]}>
                    [{formatTime(task.updatedAt || task.createdAt)}] TASK_
                    {task.status === "completed" || task.status === "done" ? "DONE" : "UP"}
                  </Text>
                </View>
                <Text style={[styles.logTaskTitle, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                  {task.title}
                </Text>
              </View>
            ))}

            {recentActivity.length === 0 && !loading && (
              <View
                style={[
                  styles.logItemCard,
                  {
                    backgroundColor: colors.surfaceContainerLow,
                    borderColor: colors.outlineVariant,
                  },
                ]}
              >
                <Text style={[styles.logTime, { color: colors.onSurface }]}>
                  [{formatTime(new Date())}] IDLE
                </Text>
                <Text style={[styles.logTaskTitle, { color: colors.onSurfaceVariant }]}>
                  No recent activity recorded
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Pinned Tasks */}
        <View
          style={[
            styles.pinnedCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.pinnedHeader}>
            <Text style={[styles.pinnedTitle, { color: colors.primary }]}>
              Pinned Tasks
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Today")}>
              <Text style={[styles.viewAllText, { color: colors.outline }]}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pinnedList}>
            {activeTasks.slice(0, 3).map((task) => {
              const priorityGrade =
                task.priority === "urgent"
                  ? "S"
                  : task.priority === "high"
                  ? "A"
                  : task.priority === "medium"
                  ? "B"
                  : "C";

              return (
                <TouchableOpacity
                  key={task._id}
                  onPress={() => navigation.navigate("TaskDetail", { task, taskId: task._id })}
                  style={[
                    styles.mandateItem,
                    {
                      backgroundColor: colors.surfaceContainerLow,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.mandateTop}>
                    <View
                      style={[
                        styles.priorityBadge,
                        {
                          backgroundColor:
                            task.priority === "urgent" || task.priority === "high"
                              ? colors.primary
                              : colors.surfaceContainer,
                          borderColor: colors.outlineVariant,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityBadgeText,
                          {
                            color:
                              task.priority === "urgent" || task.priority === "high"
                                ? colors.onPrimary
                                : colors.onSurfaceVariant,
                          },
                        ]}
                      >
                        PRIORITY {priorityGrade}
                      </Text>
                    </View>
                    <MaterialIcons name="push-pin" size={16} color={colors.outline} />
                  </View>

                  <Text style={[styles.mandateItemTitle, { color: colors.onSurface }]} numberOfLines={1}>
                    {task.title}
                  </Text>
                  <Text style={[styles.mandateItemDesc, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                    {task.description || "No description provided."}
                  </Text>

                  <View style={styles.mandateBottom}>
                    <Text style={[styles.dueDateText, { color: colors.outline }]}>
                      {task.dueDate
                        ? (() => {
                            try {
                              const d = new Date(task.dueDate);
                              return isNaN(d.getTime())
                                ? "No due date"
                                : `Due: ${d.toLocaleDateString([], {
                                    month: "short",
                                    day: "numeric",
                                  })}`;
                            } catch (e) {
                              return "No due date";
                            }
                          })()
                        : "No due date"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {activeTasks.length === 0 && !loading && (
              <View style={[styles.emptyMandatesBox, { borderColor: colors.outlineVariant }]}>
                <Text style={[styles.emptyMandatesText, { color: colors.onSurfaceVariant }]}>
                  NO ACTIVE TASKS
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreateTask")}
            style={[styles.addMandateBtn, { borderTopColor: colors.outlineVariant }]}
          >
            <Text style={[styles.addMandateBtnText, { color: colors.onSurfaceVariant }]}>
              + ADD NEW TASK
            </Text>
          </TouchableOpacity>
        </View>

        {/* Task Priority Distribution & Health */}
        <View
          style={[
            styles.healthCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.healthHeader}>
            <View>
              <Text style={[styles.healthTitle, { color: colors.primary }]}>
                Execution Health & Workstreams
              </Text>
              <Text style={[styles.healthSubtitle, { color: colors.onSurfaceVariant }]}>
                Active tasks categorized by execution priority
              </Text>
            </View>

            <View style={styles.healthCounters}>
              <View style={styles.counterCol}>
                <Text style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}>TOTAL</Text>
                <Text style={[styles.counterVal, { color: colors.primary }]}>{totalTasks}</Text>
              </View>
              <View style={styles.counterCol}>
                <Text style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}>RESOLVED</Text>
                <Text style={[styles.counterVal, { color: colors.onTertiaryContainer }]}>{completedTasks}</Text>
              </View>
              <View style={styles.counterCol}>
                <Text style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}>QUEUE</Text>
                <Text style={[styles.counterVal, { color: colors.primary }]}>{activeTasks.length}</Text>
              </View>
            </View>
          </View>

          {/* 4 Priority Meter Columns */}
          <View style={styles.priorityGrid}>
            {/* Urgent */}
            <View style={[styles.priorityColCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.priorityColHeader}>
                <Text style={[styles.priorityColName, { color: colors.error }]}>URGENT</Text>
                <Text style={[styles.priorityColCount, { color: colors.error }]}>{urgentCount} ACTIVE</Text>
              </View>
              <View style={[styles.meterBg, { backgroundColor: colors.surfaceContainer }]}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      backgroundColor: colors.error,
                      height: `${activeTasks.length > 0 ? Math.round((urgentCount / activeTasks.length) * 100) : 0}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}>
                Immediate action required
              </Text>
            </View>

            {/* High */}
            <View style={[styles.priorityColCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.priorityColHeader}>
                <Text style={[styles.priorityColName, { color: colors.primary }]}>HIGH</Text>
                <Text style={[styles.priorityColCount, { color: colors.primary }]}>{highCount} ACTIVE</Text>
              </View>
              <View style={[styles.meterBg, { backgroundColor: colors.surfaceContainer }]}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      backgroundColor: colors.primary,
                      height: `${activeTasks.length > 0 ? Math.round((highCount / activeTasks.length) * 100) : 0}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}>
                Key milestone deliverables
              </Text>
            </View>

            {/* Medium */}
            <View style={[styles.priorityColCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.priorityColHeader}>
                <Text style={[styles.priorityColName, { color: colors.onSurface }]}>MEDIUM</Text>
                <Text style={[styles.priorityColCount, { color: colors.onSurfaceVariant }]}>{mediumCount} ACTIVE</Text>
              </View>
              <View style={[styles.meterBg, { backgroundColor: colors.surfaceContainer }]}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      backgroundColor: colors.primaryContainer,
                      height: `${activeTasks.length > 0 ? Math.round((mediumCount / activeTasks.length) * 100) : 0}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}>
                Standard workflow progress
              </Text>
            </View>

            {/* Low */}
            <View style={[styles.priorityColCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.priorityColHeader}>
                <Text style={[styles.priorityColName, { color: colors.outline }]}>LOW</Text>
                <Text style={[styles.priorityColCount, { color: colors.outline }]}>{lowCount} ACTIVE</Text>
              </View>
              <View style={[styles.meterBg, { backgroundColor: colors.surfaceContainer }]}>
                <View
                  style={[
                    styles.meterFill,
                    {
                      backgroundColor: colors.surfaceVariant,
                      height: `${activeTasks.length > 0 ? Math.round((lowCount / activeTasks.length) * 100) : 0}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}>
                Backlog & deferred tasks
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  commandTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  commandSubtitle: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.8,
    marginTop: 2,
    textTransform: "uppercase",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  metricsRow: {
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  metricLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  metricValue: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 32,
    lineHeight: 36,
  },
  metricUnit: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 16,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 10,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  metricSubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  statusBlocksRow: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 10,
  },
  statusBlock: {
    flex: 1,
    height: 6,
    borderRadius: 2,
  },
  // Pulse Card
  pulseCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  pulseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  pulseTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  pulseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pulseBadgeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  visualizerBox: {
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  radarWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerRadarRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRadarRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
  },
  liveLogsList: {
    gap: 8,
  },
  logItemCard: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  logMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  logTime: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  logTaskTitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    paddingLeft: 12,
  },
  // Pinned Mandates Card
  pinnedCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  pinnedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pinnedTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  pinnedList: {
    gap: 10,
  },
  mandateItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  mandateTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  mandateItemTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  mandateItemDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  mandateBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  dueDateText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  emptyMandatesBox: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMandatesText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  addMandateBtn: {
    borderTopWidth: 1,
    paddingTop: 12,
    alignItems: "center",
  },
  addMandateBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  // Health & Workstreams Card
  healthCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  healthHeader: {
    gap: 12,
  },
  healthTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  healthSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    marginTop: 2,
  },
  healthCounters: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  counterCol: {
    alignItems: "center",
  },
  counterLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  counterVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 18,
    marginTop: 2,
  },
  priorityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  priorityColCard: {
    flexBasis: "48%",
    flexGrow: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  priorityColHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityColName: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  priorityColCount: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  meterBg: {
    height: 48,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  meterFill: {
    width: "100%",
  },
  meterSubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
});

export default HomeDashboardScreen;
