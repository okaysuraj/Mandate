import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const { width } = Dimensions.get("window");

const AnalyticsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { colors, typography } = useTheme();

  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [tasksRes, analyticsRes] = await Promise.all([
        api.get("/tasks", { params: { limit: 100 } }),
        api.get("/tasks/analytics"),
      ]);
      setTasks(tasksRes.data?.data || tasksRes.data || []);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.warn("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAnalytics();
  }, [user]);

  // Compute 6 dynamic buckets for Output vs Capacity matching web AnalyticsPage.jsx
  const taskList = Array.isArray(tasks) ? tasks : (Array.isArray(tasks?.data) ? tasks.data : []);
  const completedTasks = taskList.filter(
    (t) => t && (t.status === "completed" || t.status === "done")
  );
  const activeTasks = taskList.filter(
    (t) => t && t.status !== "completed" && t.status !== "done"
  );

  const buckets = [
    {
      label: "URGENT",
      total: taskList.filter((t) => t?.priority === "urgent").length,
      done: completedTasks.filter((t) => t?.priority === "urgent").length,
    },
    {
      label: "HIGH",
      total: taskList.filter((t) => t?.priority === "high").length,
      done: completedTasks.filter((t) => t?.priority === "high").length,
    },
    {
      label: "MEDIUM",
      total: taskList.filter((t) => t?.priority === "medium").length,
      done: completedTasks.filter((t) => t?.priority === "medium").length,
    },
    {
      label: "LOW",
      total: taskList.filter((t) => t?.priority === "low").length,
      done: completedTasks.filter((t) => t?.priority === "low").length,
    },
    {
      label: "PLANNED",
      total: taskList.filter((t) => !!t?.dueDate).length,
      done: completedTasks.filter((t) => !!t?.dueDate).length,
    },
    {
      label: "QUEUE",
      total: taskList.filter((t) => !t?.dueDate).length,
      done: completedTasks.filter((t) => !t?.dueDate).length,
    },
  ];

  // SVG Gauge calculations
  const deepWorkVal = analytics?.deepWorkRatio ?? 0;
  const gaugeSize = 140;
  const strokeWidth = 12;
  const radius = (gaugeSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (deepWorkVal / 100) * circumference;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="ANALYTICS" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchAnalytics}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section matching web AnalyticsPage.jsx */}
        <View style={[styles.sectionHeader, { borderBottomColor: colors.outlineVariant }]}>
          <View>
            <View style={styles.headerTagRow}>
              <View style={[styles.headerTagDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.headerTagText, { color: colors.onSurfaceVariant }]}>
                PRODUCTIVITY INTELLIGENCE · REAL-TIME ANALYTICS
              </Text>
            </View>
            <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
              Analytics & Performance
            </Text>
          </View>

          <View style={styles.headerBadgesRow}>
            <View
              style={[
                styles.directivesBadge,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <Text style={[styles.directivesTag, { color: colors.onSurfaceVariant }]}>
                TASKS:
              </Text>
              <Text style={[styles.directivesVal, { color: colors.onSurface }]}>
                {tasks.length} LOGGED
              </Text>
            </View>

            <View
              style={[
                styles.systemOptimalBadge,
                {
                  backgroundColor: colors.tertiaryContainer,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
              <Text style={[styles.systemOptimalText, { color: colors.onTertiaryContainer }]}>
                SYSTEM_OPTIMAL
              </Text>
            </View>
          </View>
        </View>

        {/* Output vs. Capacity (Primary Chart) */}
        <View
          style={[
            styles.chartCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: colors.onSurface }]}>
                Output vs. Capacity
              </Text>
              <Text style={[styles.chartSubtitle, { color: colors.onSurfaceVariant }]}>
                Dual-axis workstream distribution (Done vs Total)
              </Text>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBar, { backgroundColor: colors.primary }]} />
                <Text style={[styles.legendText, { color: colors.onSurface }]}>OUTPUT</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBar, { backgroundColor: colors.surfaceContainerHigh }]} />
                <Text style={[styles.legendText, { color: colors.onSurfaceVariant }]}>
                  CAPACITY
                </Text>
              </View>
            </View>
          </View>

          {/* Dual Axis Bars Grid */}
          <View style={styles.barsContainer}>
            {buckets.map((b) => {
              const maxVal = Math.max(...buckets.map((x) => x.total), 4);
              const capacityHeight = Math.max(
                Math.round((b.total / maxVal) * 100),
                16
              );
              const outputHeight =
                b.total > 0
                  ? Math.round((b.done / b.total) * capacityHeight)
                  : 0;

              return (
                <View key={b.label} style={styles.barCol}>
                  <View
                    style={[
                      styles.barColBg,
                      {
                        backgroundColor: colors.surfaceContainerLow,
                        borderColor: colors.outlineVariant,
                        height: `${capacityHeight}%`,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.outputFill,
                        {
                          backgroundColor: colors.primary,
                          height: `${outputHeight}%`,
                        },
                      ]}
                    />
                    <Text style={[styles.barCountLabel, { color: colors.onSurface }]}>
                      {b.done}/{b.total}
                    </Text>
                  </View>
                  <Text style={[styles.barNameLabel, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                    {b.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Deep Work Ratio Bento Card */}
        <View
          style={[
            styles.gaugeCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.gaugeHeader}>
            <View>
              <Text style={[styles.cardSectionTitle, { color: colors.onSurface }]}>
                Deep Work Ratio
              </Text>
              <Text style={[styles.cardSectionSubtitle, { color: colors.onSurfaceVariant }]}>
                Synchronous focus tracking
              </Text>
            </View>
            <MaterialIcons name="bolt" size={20} color={colors.primary} />
          </View>

          {/* Circular SVG Gauge */}
          <View style={styles.svgWrapper}>
            <Svg width={gaugeSize} height={gaugeSize} style={{ transform: [{ rotate: "-90deg" }] }}>
              <Circle
                stroke={colors.surfaceContainer}
                fill="none"
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                stroke={colors.primary}
                fill="none"
                cx={gaugeSize / 2}
                cy={gaugeSize / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View style={[StyleSheet.absoluteFill, styles.gaugeCenterContent]}>
              <Text style={[styles.gaugeVal, { color: colors.onSurface }]}>
                {deepWorkVal}%
              </Text>
              <Text style={[styles.gaugeTag, { color: colors.tertiary }]}>
                ACTIVE METRIC
              </Text>
            </View>
          </View>

          <View style={[styles.gaugeMetaFooter, { borderTopColor: colors.outlineVariant }]}>
            <View style={styles.metaRowItem}>
              <Text style={[styles.metaLabel, { color: colors.onSurfaceVariant }]}>TARGET</Text>
              <Text style={[styles.metaVal, { color: colors.onSurface }]}>80.0%</Text>
            </View>
            <View style={styles.metaRowItem}>
              <Text style={[styles.metaLabel, { color: colors.onSurfaceVariant }]}>
                TOTAL RESOLVED
              </Text>
              <Text style={[styles.metaVal, { color: colors.onSurface }]}>
                {analytics?.completedTasks || completedTasks.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Task Latency Card */}
        <View
          style={[
            styles.latencyCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View>
            <Text style={[styles.cardSectionTitle, { color: colors.onSurface }]}>
              Task Latency
            </Text>
            <Text style={[styles.cardSectionSubtitle, { color: colors.onSurfaceVariant }]}>
              Mean resolution time per ticket
            </Text>
          </View>

          <View style={[styles.latencyBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <View style={styles.latencyBoxTop}>
              <Text style={[styles.latencyLabel, { color: colors.onSurfaceVariant }]}>
                AVERAGE LATENCY
              </Text>
              <Text style={[styles.latencyVal, { color: colors.onSurface }]}>
                {analytics?.averageResolutionLatency || "0h 0m"}
              </Text>
            </View>
            <View style={[styles.latencyBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.latencyBarFill, { backgroundColor: colors.primary, width: "85%" }]} />
            </View>
          </View>

          <View style={[styles.latencyFooter, { borderTopColor: colors.outlineVariant }]}>
            <MaterialIcons name="schedule" size={16} color={colors.primary} />
            <Text style={[styles.latencyFooterText, { color: colors.onSurfaceVariant }]}>
              Live workspace activity logs
            </Text>
          </View>
        </View>

        {/* Strategic Overview: Workloads & System Balance */}
        <View style={styles.strategicRow}>
          {/* Dynamic Workloads */}
          <View
            style={[
              styles.strategicCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.strategicCardTop}>
              <Text style={[styles.strategicCardTitle, { color: colors.onSurface }]}>
                Dynamic Workloads
              </Text>
              <MaterialIcons name="layers" size={18} color={colors.onSurfaceVariant} />
            </View>
            <View style={styles.workloadsList}>
              <View style={styles.workloadItem}>
                <View style={[styles.workloadNumBox, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                  <Text style={[styles.workloadNum, { color: colors.onSurface }]}>01</Text>
                </View>
                <View>
                  <Text style={[styles.workloadTitle, { color: colors.onSurface }]}>Total Tasks</Text>
                  <Text style={[styles.workloadDesc, { color: colors.onSurfaceVariant }]}>
                    Total Logged: {tasks.length}
                  </Text>
                </View>
              </View>

              <View style={styles.workloadItem}>
                <View style={[styles.workloadNumBox, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                  <Text style={[styles.workloadNum, { color: colors.onSurface }]}>02</Text>
                </View>
                <View>
                  <Text style={[styles.workloadTitle, { color: colors.onSurface }]}>In Progress & Pending</Text>
                  <Text style={[styles.workloadDesc, { color: colors.onSurfaceVariant }]}>
                    {analytics?.activeTasks || activeTasks.length} Pending
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* System Balance */}
          <View
            style={[
              styles.strategicCard,
              {
                backgroundColor: colors.surfaceContainerHigh,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.strategicCardTitle, { color: colors.onSurfaceVariant }]}>
              Workspace Overview
            </Text>
            <Text style={[styles.systemBalanceBig, { color: colors.onSurface }]}>
              Live Status
            </Text>
            <View style={styles.balanceDataList}>
              <Text style={[styles.balanceDataLine, { color: colors.onSurfaceVariant }]}>
                Active Tasks:{" "}
                <Text style={{ color: colors.onSurface, fontWeight: "bold" }}>
                  {analytics?.activeTasks || activeTasks.length}
                </Text>
              </Text>
              <Text style={[styles.balanceDataLine, { color: colors.onSurfaceVariant }]}>
                Completed Tasks:{" "}
                <Text style={{ color: colors.onSurface, fontWeight: "bold" }}>
                  {analytics?.completedTasks || completedTasks.length}
                </Text>
              </Text>
            </View>
            <View style={styles.liveSyncBadge}>
              <View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
              <Text style={[styles.liveSyncText, { color: colors.tertiary }]}>
                Status: Synchronized
              </Text>
            </View>
          </View>
        </View>

        {/* Resolution Log */}
        <View
          style={[
            styles.resolutionCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={[styles.resolutionHeader, { borderBottomColor: colors.outlineVariant }]}>
            <Text style={[styles.resolutionTitle, { color: colors.onSurface }]}>
              Resolution Log
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Today")}>
              <Text style={[styles.viewFullLogBtn, { color: colors.primary }]}>
                VIEW FULL LOG
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resolutionList}>
            {tasks.slice(0, 3).map((task, idx) => {
              const isDone = task.status === "completed" || task.status === "done";

              return (
                <TouchableOpacity
                  key={task._id || idx}
                  onPress={() =>
                    navigation.navigate("TaskDetail", { task, taskId: task._id || task.id })
                  }
                  style={[styles.resolutionItem, { borderBottomColor: colors.outlineVariant }]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.resTime, { color: colors.onSurfaceVariant }]}>
                    14:{22 - idx}:{String(idx * 14).padStart(2, "0")}
                  </Text>
                  <MaterialIcons
                    name={isDone ? "check-circle" : "pause-circle"}
                    size={18}
                    color={isDone ? colors.tertiary : colors.onSurfaceVariant}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.resTaskTitle, { color: colors.onSurface }]} numberOfLines={1}>
                      {task.title}
                    </Text>
                    <Text style={[styles.resTaskSub, { color: colors.onSurfaceVariant }]}>
                      {isDone ? "Resolved successfully" : "Pending resolution"}
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={16} color={colors.outline} />
                </TouchableOpacity>
              );
            })}
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  headerTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  headerTagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerTagText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  pageTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  headerBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  directivesBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  directivesTag: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  directivesVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  systemOptimalBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  systemOptimalText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  // Primary Chart Card
  chartCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  chartHeader: {
    gap: 8,
  },
  chartTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  chartSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  legendRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 2,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendBar: {
    width: 12,
    height: 4,
    borderRadius: 2,
  },
  legendText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
    gap: 6,
    paddingTop: 8,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    gap: 6,
  },
  barColBg: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "flex-end",
    position: "relative",
  },
  outputFill: {
    width: "100%",
    borderRadius: 4,
  },
  barCountLabel: {
    position: "absolute",
    top: 3,
    left: 3,
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 8,
  },
  barNameLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 8,
    textAlign: "center",
  },
  // Deep Work Gauge Card
  gaugeCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  gaugeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardSectionTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  cardSectionSubtitle: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
    marginTop: 2,
  },
  svgWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  gaugeCenterContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 26,
  },
  gaugeTag: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 8,
    letterSpacing: 0.8,
    marginTop: 2,
  },
  gaugeMetaFooter: {
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 6,
  },
  metaRowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  metaVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  // Latency Card
  latencyCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  latencyBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  latencyBoxTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  latencyLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  latencyVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  latencyBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  latencyBarFill: {
    height: "100%",
  },
  latencyFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 6,
  },
  latencyFooterText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  // Strategic Row
  strategicRow: {
    gap: 12,
  },
  strategicCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  strategicCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  strategicCardTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  workloadsList: {
    gap: 10,
  },
  workloadItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  workloadNumBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  workloadNum: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  workloadTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  workloadDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  systemBalanceBig: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 16,
  },
  balanceDataList: {
    gap: 4,
  },
  balanceDataLine: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  liveSyncBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  liveSyncText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  // Resolution Log Card
  resolutionCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  resolutionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
  },
  resolutionTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  viewFullLogBtn: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  resolutionList: {
    paddingVertical: 4,
  },
  resolutionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  resTime: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    width: 50,
  },
  resTaskTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  resTaskSub: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 10,
  },
});

export default AnalyticsScreen;
