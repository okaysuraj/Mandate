import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, FlatList, RefreshControl, Alert, ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { colors, fonts, spacing, borderRadius } from "../theme";
import TaskModal from "./TaskModal";

const COLUMNS = [
  { key: "pending", label: "PENDING" },
  { key: "in-progress", label: "IN PROGRESS" },
  { key: "completed", label: "COMPLETED" },
];

const PRIORITY_COLORS = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

const KanbanScreen = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const { user } = useAuth();

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/todos`, {
        params: { page: 1, limit: 100, isDeleted: "false" },
      });
      setTodos(data.data);
    } catch {
      Alert.alert("Error", "Failed to load tasks");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user, fetchTodos]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/todos/${id}`, { status: newStatus });
      fetchTodos();
    } catch {
      Alert.alert("Error", "Failed to update status");
    }
  };

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
      <View style={styles.headerSection}>
        <Text style={styles.heroTitle}>KANBAN</Text>
        <Text style={styles.heroSubtitle}>YOUR TASK OVERVIEW</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.columnsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchTodos(); }} tintColor={colors.primary} />
        }
      >
        {COLUMNS.map((col) => {
          const columnTodos = todos.filter((t) => t.status === col.key);
          return (
            <View key={col.key} style={styles.column}>
              <View style={styles.columnHeader}>
                <Text style={styles.columnTitle}>{col.label}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{columnTodos.length}</Text>
                </View>
              </View>

              <FlatList
                data={columnTodos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.kanbanCard}
                    onPress={() => { setEditingTodo(item); setModalVisible(true); }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.cardHeader}>
                      <View style={[styles.priorityDot, { backgroundColor: PRIORITY_COLORS[item.priority] || colors.textMuted }]} />
                      <Text style={styles.priorityLabel}>{item.priority?.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                    {item.dueDate && (
                      <Text style={styles.cardDate}>{new Date(item.dueDate).toLocaleDateString()}</Text>
                    )}
                    {col.key !== "completed" && (
                      <TouchableOpacity
                        style={styles.moveButton}
                        onPress={() => handleStatusChange(item._id, col.key === "pending" ? "in-progress" : "completed")}
                      >
                        <Text style={styles.moveButtonText}>
                          {col.key === "pending" ? "START →" : "COMPLETE ✓"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyColumn}>
                    <Text style={styles.emptyText}>No tasks</Text>
                  </View>
                }
                showsVerticalScrollIndicator={false}
              />
            </View>
          );
        })}
      </ScrollView>

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
  headerSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  heroTitle: { fontSize: 48, fontWeight: "900", color: colors.primary, letterSpacing: -2 },
  heroSubtitle: { ...fonts.tiny, marginTop: spacing.xs },
  columnsContainer: { paddingHorizontal: spacing.md, paddingBottom: 100, gap: spacing.md },
  column: { width: 280, backgroundColor: colors.background, borderRadius: borderRadius.md, padding: spacing.md },
  columnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  columnTitle: { ...fonts.tiny },
  countBadge: {
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: { color: colors.white, fontSize: 10, fontWeight: "700" },
  kanbanCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginBottom: spacing.xs },
  priorityDot: { width: 6, height: 6, borderRadius: 3 },
  priorityLabel: { fontSize: 9, fontWeight: "700", letterSpacing: 1, color: colors.textMuted },
  cardTitle: { fontSize: 13, fontWeight: "600", color: colors.textPrimary, marginBottom: spacing.xs },
  cardDate: { ...fonts.tiny, marginBottom: spacing.sm },
  moveButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "flex-start",
    marginTop: spacing.xs,
  },
  moveButtonText: { fontSize: 9, fontWeight: "700", letterSpacing: 1, color: colors.textSecondary },
  emptyColumn: { paddingVertical: spacing.xl, alignItems: "center" },
  emptyText: { ...fonts.small, fontWeight: "600" },
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

export default KanbanScreen;
