import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, RefreshControl
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

const TodayScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();
  const { socket } = useSocket();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks`, {
        params: { page: 1, limit: 100 },
      });
      setTasks(data.data || data); // handle standard pagination format
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  useEffect(() => {
    if (!socket) return;
    const handleCreated = (t) => setTasks((prev) => [t, ...prev]);
    const handleUpdated = (t) => setTasks((prev) => prev.map((x) => (x._id === t._id ? t : x)));
    const handleDeleted = (id) => setTasks((prev) => prev.filter((x) => x._id !== id));

    socket.on("task:created", handleCreated);
    socket.on("task:updated", handleUpdated);
    socket.on("task:deleted", handleDeleted);
    return () => {
      socket.off("task:created", handleCreated);
      socket.off("task:updated", handleUpdated);
      socket.off("task:deleted", handleDeleted);
    };
  }, [socket]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const efficiency = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : "0.0";
  const activeTasks = tasks.filter(t => t.status !== "completed");
  const recentActivity = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 3);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>MANDATE</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>GLOBAL STATUS</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>PRECISION METRICS</Text>
        </View>

        {/* Stacking Metrics */}
        <View style={styles.metricsContainer}>
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>Efficiency</Text>
              <View style={styles.metricRow}>
                <Text style={[typography.headlineLg, { fontFamily: 'JetBrainsMono-Bold' }]}>{loading ? "—" : efficiency}</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>%</Text>
              </View>
            </View>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="bolt" size={24} color={colors.primary} />
            </View>
          </View>

          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>Nodes</Text>
              <View style={styles.metricRow}>
                <Text style={[typography.headlineLg, { fontFamily: 'JetBrainsMono-Bold' }]}>{loading ? "—" : totalTasks}</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, marginLeft: 4 }]}>Live</Text>
              </View>
            </View>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="hub" size={24} color={colors.primary} />
            </View>
          </View>

          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>Latency</Text>
              <View style={styles.metricRow}>
                <Text style={[typography.headlineLg, { fontFamily: 'JetBrainsMono-Bold' }]}>12.4</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 4 }]}>ms</Text>
              </View>
            </View>
            <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="speed" size={24} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Active Projects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>Active Projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Kanban")}>
              <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: spacing.sm }}>
            {activeTasks.length === 0 ? (
              <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', padding: spacing.md }]}>No active projects.</Text>
            ) : (
              activeTasks.slice(0, 3).map((task, i) => (
                <View key={task._id} style={[styles.projectCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
                  <View style={[styles.projectIcon, { backgroundColor: i % 2 === 0 ? colors.primary : colors.secondaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: i % 2 === 0 ? colors.onPrimary : colors.primary, fontSize: 10 }]}>P-0{i+1}</Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: spacing.md }}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]} numberOfLines={1}>{task.title}</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Priority: {task.priority || 'Standard'}</Text>
                  </View>
                  <View style={[styles.progressBadge, { backgroundColor: colors.surfaceContainer }]}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontSize: 10 }]}>Active</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Activity Log */}
        <View style={[styles.section, { paddingBottom: spacing.xl }]}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.md }]}>Activity Log</Text>
          <View style={[styles.timeline, { borderLeftColor: colors.outlineVariant }]}>
            {recentActivity.map((task, i) => (
              <View key={task._id || i} style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: i === 0 ? colors.primary : colors.outline }]} />
                <Text style={[typography.labelSm, { fontWeight: '700', color: i === 0 ? colors.primary : colors.onSurfaceVariant }]} numberOfLines={1}>
                  {task.title}
                </Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary, marginTop: 2 }]}>
                  {new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Update
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  scrollContent: {
    padding: 24,
    gap: 32,
  },
  section: {
    // marginBottom: 32
  },
  metricsContainer: {
    gap: 16,
  },
  bentoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderWidth: 1,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  projectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
  },
  projectIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  timeline: {
    borderLeftWidth: 1,
    marginLeft: 8,
    paddingLeft: 16,
    gap: 24,
  },
  timelineItem: {
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -21, // 16 (padding) + 1 (border half) + 4 (dot half)
    top: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});

export default TodayScreen;
