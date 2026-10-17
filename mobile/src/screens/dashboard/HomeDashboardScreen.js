import { DashboardMetrics, ActivityPulse } from "./DashboardMetrics";
import { PinnedTasks, WorkspaceHealth } from "./DashboardActivity";
import styles from "./HomeDashboardScreen.styles";
import { useIsFocused } from "@react-navigation/native";
import useVisibleTasks from "../../hooks/useVisibleTasks";
import useLoopAnimation from "../../hooks/useLoopAnimation";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { View, Text, ScrollView, RefreshControl, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../context/ThemeContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useSocket } from "../../context/SocketContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";
import { subscribeRefresh } from "../../../../shared/socketRefresh";

const HomeDashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const workspaceId = activeWorkspace?._id;
  const [error, setError] = useState("");
  const tasks = useVisibleTasks();
  const focused = useIsFocused();
  const storeWorkspaceId = useDataStore((state) => state.workspaceId);
  const loadTasks = useDataStore((state) => state.loadTasks);
  const { socket } = useSocket();

  const dashboardRequest = useRef(null);
  useEffect(
    () => () => dashboardRequest.current?.abort(),
    [workspaceId, focused],
  );
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => setAnalytics(null), [workspaceId]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Radar spinner animation matching web animate-[spin_10s_linear_infinite]
  const spinValue = useRef(new Animated.Value(0)).current;

  useLoopAnimation(spinValue, 10000);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const fetchDashboardData = useCallback(async () => {
    dashboardRequest.current?.abort();
    const controller = new AbortController();
    dashboardRequest.current = controller;
    try {
      if (!workspaceId) return;
      setError("");
      const [, analyticsRes] = await Promise.all([
        loadTasks(),
        api.get("/tasks/analytics", {
          params: { workspaceId },
          signal: controller.signal,
        }),
      ]);
      if (analyticsRes?.data) {
        if (!controller.signal.aborted) setAnalytics(analyticsRes.data);
      }
    } catch (err) {
      if (!controller.signal.aborted)
        setError(
          err.response?.data?.message || "Could not load dashboard analytics",
        );
    } finally {
      if (!controller.signal.aborted) setLoading(false);
      if (!controller.signal.aborted) setRefreshing(false);
    }
  }, [loadTasks, workspaceId]);

  useEffect(() => {
    if (user && focused && storeWorkspaceId) fetchDashboardData();
  }, [user, fetchDashboardData, focused, storeWorkspaceId]);

  useEffect(
    () => (focused ? subscribeRefresh(socket, fetchDashboardData) : undefined),
    [socket, fetchDashboardData, focused],
  );

  const onRefresh = () => {
    setRefreshing(true);
    useDataStore.getState().loadTasks({ force: true });
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
    (t) => t && (t.status === "completed" || t.status === "done"),
  ).length;
  const efficiency =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100 * 10) / 10
      : 0;
  const activeTasks = taskList.filter(
    (t) => t && t.status !== "completed" && t.status !== "done",
  );
  const urgentCount = activeTasks.filter(
    (t) => t?.priority === "urgent",
  ).length;
  const highCount = activeTasks.filter((t) => t?.priority === "high").length;
  const mediumCount = activeTasks.filter(
    (t) => t?.priority === "medium",
  ).length;
  const lowCount = activeTasks.filter(
    (t) => !t?.priority || t?.priority === "low",
  ).length;

  const deepWorkRatio = analytics?.highPriorityTaskPercentage ?? 0;
  const avgLatency = analytics?.averageResolutionLatency ?? "Unavailable";

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
    } catch {
      return "";
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <AppHeader title="DASHBOARD" navigation={navigation} />
      {error && (
        <Text
          accessibilityRole="alert"
          style={{ color: colors.error, padding: 16 }}
        >
          {error}
        </Text>
      )}

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
            <Text
              style={[
                styles.commandSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              Workspace:{" "}
              {user?.activeWorkspace ? "Active Workspace" : "Personal"} • Live
              Updates
            </Text>
          </View>
          <View
            style={[
              styles.liveBadge,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View
              style={[
                styles.liveDot,
                { backgroundColor: colors.onTertiaryContainer },
              ]}
            />
            <Text
              style={[styles.liveText, { color: colors.onTertiaryContainer }]}
            >
              {socket?.connected ? "Connected" : "Disconnected"}
            </Text>
          </View>
        </View>

        {/* Bento Grid: Metrics Row */}
        <DashboardMetrics
          loading={loading}
          efficiency={efficiency}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          activeTasks={activeTasks}
          urgentCount={urgentCount}
          highCount={highCount}
          deepWorkRatio={deepWorkRatio}
          avgLatency={avgLatency}
        />

        {/* System Pulse Visualization & Realtime Telemetry */}
        <ActivityPulse
          socket={socket}
          spin={spin}
          recentActivity={recentActivity}
          formatTime={formatTime}
          loading={loading}
        />

        {/* Priority Tasks */}
        <PinnedTasks
          navigation={navigation}
          activeTasks={activeTasks}
          loading={loading}
        />

        {/* Task Priority Distribution & Health */}
        <WorkspaceHealth
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          activeTasks={activeTasks}
          urgentCount={urgentCount}
          highCount={highCount}
          mediumCount={mediumCount}
          lowCount={lowCount}
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDashboardScreen;
