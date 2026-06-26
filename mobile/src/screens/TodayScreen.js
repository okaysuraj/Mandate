import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, FlatList, RefreshControl, Alert, ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { API_URL } from "../config";
import { colors, fonts, spacing, borderRadius } from "../theme";
import TaskModal from "./TaskModal";

const PRIORITY_COLORS = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

const TodayScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const { user, updateUser } = useAuth();
  const { socket } = useSocket();

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/todos`, {
        params: { page: 1, limit: 100, isDeleted: "false" },
      });
      setTodos(data.data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user, fetchTodos]);

  useEffect(() => {
    if (!socket) return;
    const handleCreated = (t) => setTodos((prev) => [t, ...prev]);
    const handleUpdated = (t) => setTodos((prev) => prev.map((x) => (x._id === t._id ? t : x)));
    const handleDeleted = (id) => setTodos((prev) => prev.filter((x) => x._id !== id));
    socket.on("todo_created", handleCreated);
    socket.on("todo_updated", handleUpdated);
    socket.on("todo_deleted", handleDeleted);
    return () => {
      socket.off("todo_created", handleCreated);
      socket.off("todo_updated", handleUpdated);
      socket.off("todo_deleted", handleDeleted);
    };
  }, [socket]);

  const handleSave = async (taskData) => {
    try {
      if (editingTodo) {
        await axios.put(`${API_URL}/api/todos/${editingTodo._id}`, taskData);
      } else {
        await axios.post(`${API_URL}/api/todos`, taskData);
      }
      setModalVisible(false);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(`${API_URL}/api/todos/${id}`, { isDeleted: true });
      fetchTodos();
    } catch {
      Alert.alert("Error", "Failed to delete task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/todos/${id}`, { status: newStatus });
      fetchTodos();
    } catch {
      Alert.alert("Error", "Failed to update status");
    }
  };

  const todayTodos = todos.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    return (
      due.getDate() === today.getDate() &&
      due.getMonth() === today.getMonth() &&
      due.getFullYear() === today.getFullYear()
    );
  });

  const upcomingTodos = todos.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due > today && t.status !== "completed";
  });

  const completedCount = todos.filter((t) => t.status === "completed").length;
  const efficiency = (() => {
    const completed = todos.filter((t) => t.status === "completed");
    if (completed.length === 0) return 0;
    let onTime = 0;
    completed.forEach((t) => {
      if (!t.dueDate) { onTime++; return; }
      const c = new Date(t.updatedAt);
      const d = new Date(t.dueDate);
      c.setHours(0, 0, 0, 0);
      d.setHours(0, 0, 0, 0);
      if (c <= d) onTime++;
    });
    return Math.round((onTime / completed.length) * 100);
  })();

  const getNextStatus = (current) => {
    if (current === "pending") return "in-progress";
    if (current === "in-progress") return "completed";
    return "pending";
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={[styles.statusCircle, item.status === "completed" && styles.statusCompleted]}
        onPress={() => handleStatusChange(item._id, getNextStatus(item.status))}
      >
        {item.status === "completed" && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => { setEditingTodo(item); setModalVisible(true); }}
        onLongPress={() =>
          Alert.alert("Delete Task", "Move this task to trash?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => handleDelete(item._id) },
          ])
        }
      >
        <View style={styles.todoHeader}>
          <Text
            style={[styles.todoTitle, item.status === "completed" && styles.todoTitleCompleted]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={[styles.priorityDot, { backgroundColor: PRIORITY_COLORS[item.priority] || colors.textMuted }]} />
        </View>
        {item.dueDate && (
          <Text style={styles.todoDueDate}>
            {new Date(item.dueDate).toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todayTodos.length > 0 ? todayTodos : upcomingTodos}
        keyExtractor={(item) => item._id}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTodos(); }} tintColor={colors.primary} />
        }
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <Text style={styles.heroTitle}>
              {todayTodos.length > 0 ? "TODAY" : "UPCOMING"}
            </Text>
            <Text style={styles.heroSubtitle}>YOUR TASK OVERVIEW</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks found. Enjoy the focus.</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>EFFICIENCY</Text>
              <Text style={styles.statValue}>{efficiency}%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>COMPLETION</Text>
              <Text style={styles.statValue}>{completedCount}/{todos.length}</Text>
            </View>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => { setEditingTodo(null); setModalVisible(true); }}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setEditingTodo(null); }}
        onSave={handleSave}
        initialData={editingTodo}
        projects={user?.projects || []}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: 100 },
  headerSection: { marginTop: spacing.lg, marginBottom: spacing.xl },
  heroTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: -2,
    textTransform: "uppercase",
  },
  heroSubtitle: { ...fonts.tiny, marginTop: spacing.xs },
  emptyState: {
    paddingVertical: spacing.xxl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    alignItems: "center",
  },
  emptyText: { ...fonts.small, fontWeight: "600" },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: spacing.md,
  },
  statusCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkMark: { color: colors.white, fontSize: 12, fontWeight: "700" },
  todoContent: { flex: 1 },
  todoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  todoTitle: { fontSize: 14, fontWeight: "600", color: colors.textPrimary, flex: 1, marginRight: spacing.sm },
  todoTitleCompleted: { textDecorationLine: "line-through", color: colors.textMuted },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  todoDueDate: { ...fonts.tiny, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xl },
  statCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    borderRadius: 2,
  },
  statLabel: { ...fonts.tiny, marginBottom: spacing.sm },
  statValue: { fontSize: 28, fontWeight: "800", color: colors.primary, letterSpacing: -1 },
  fab: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: { color: colors.white, fontSize: 28, fontWeight: "300", marginTop: -2 },
});

export default TodayScreen;
