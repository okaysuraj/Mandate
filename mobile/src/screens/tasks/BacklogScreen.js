import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const BacklogScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tasks, loading, loadTasks } = useDataStore((state) => state);
  const { colors, typography } = useTheme();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) loadTasks();
  }, [user, loadTasks]);

  const taskList = useMemo(() => {
    if (Array.isArray(tasks)) return tasks;
    if (Array.isArray(tasks?.data)) return tasks.data;
    if (Array.isArray(tasks?.tasks)) return tasks.tasks;
    return [];
  }, [tasks]);

  const activeCount = taskList.filter(
    (t) => t && t.status !== "completed" && t.status !== "done"
  ).length;
  const criticalCount = taskList.filter(
    (t) =>
      t &&
      t.status !== "completed" &&
      t.status !== "done" &&
      (t.priority === "urgent" || t.priority === "high")
  ).length;
  const stablePercentage =
    taskList.length > 0
      ? Math.round(((taskList.length - criticalCount) / taskList.length) * 100)
      : 100;

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return taskList;
    return taskList.filter(
      (t) =>
        (t?.title && t.title.toLowerCase().includes(q)) ||
        (t?.description && t.description.toLowerCase().includes(q))
    );
  }, [taskList, search]);

  const getStatusChip = (task) => {
    const isCompleted = task.status === "completed" || task.status === "done";
    const isCritical =
      task.priority === "urgent" || task.priority === "high";
    const isActive =
      task.status === "in-progress" ||
      task.status === "in_progress" ||
      task.status === "in progress";

    if (isCompleted) {
      return (
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: colors.surfaceContainerHighest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <Text style={[styles.statusBadgeText, { color: colors.onSurfaceVariant }]}>
            COMPLETED
          </Text>
        </View>
      );
    }

    if (isCritical) {
      return (
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: colors.errorContainer,
              borderColor: colors.error,
            },
          ]}
        >
          <Text style={[styles.statusBadgeText, { color: colors.error }]}>
            CRITICAL
          </Text>
        </View>
      );
    }

    if (isActive) {
      return (
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: colors.tertiaryContainer,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
          <Text style={[styles.statusBadgeText, { color: colors.onTertiaryContainer }]}>
            ACTIVE
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: colors.secondaryContainer,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <Text style={[styles.statusBadgeText, { color: colors.onSecondaryContainer }]}>
          PENDING
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="BACKLOG" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadTasks}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section matching web BacklogPage.jsx */}
        <View style={[styles.sectionHeader, { borderBottomColor: colors.outlineVariant }]}>
          <View>
            <View style={styles.headerTagRow}>
              <View style={[styles.headerTagDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.headerTagText, { color: colors.onSurfaceVariant }]}>
                SYSTEM INVENTORY · REGISTRY LEDGER
              </Text>
            </View>
            <Text style={[styles.pageTitle, { color: colors.onSurface }]}>List View</Text>
            <Text style={[styles.pageSubtitle, { color: colors.onSurfaceVariant }]}>
              High-density operational overview. Manage system backlogs, critical path items, and scheduled maintenance tasks with industrial precision.
            </Text>
          </View>

          {/* Search & Actions Bar */}
          <View style={styles.searchActionsRow}>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <MaterialIcons name="search" size={18} color={colors.onSurfaceVariant} style={{ marginRight: 6 }} />
              <TextInput
                style={[styles.searchInput, { color: colors.onSurface }]}
                placeholder="Query mandates..."
                placeholderTextColor={colors.onSurfaceVariant}
                value={search}
                onChangeText={setSearch}
              />
              {search ? (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <MaterialIcons name="close" size={16} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateTask")}
              style={[styles.newBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <MaterialIcons name="add" size={16} color={colors.onPrimary} />
              <Text style={[styles.newBtnText, { color: colors.onPrimary }]}>NEW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Summary Bento (4 cards) */}
        <View style={styles.bentoSummaryGrid}>
          {/* Card 1 */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoCardTag, { color: colors.onSurfaceVariant }]}>
              ACTIVE_TASKS
            </Text>
            <Text style={[styles.bentoCardNumber, { color: colors.onSurface }]}>
              {loading ? "—" : activeCount}
            </Text>
          </View>

          {/* Card 2 */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoCardTag, { color: colors.error }]}>
              CRITICAL_PATH
            </Text>
            <Text style={[styles.bentoCardNumber, { color: colors.onSurface }]}>
              {loading ? "—" : criticalCount}
            </Text>
          </View>

          {/* Card 3 */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoCardTag, { color: colors.tertiary }]}>
              STABLE_STATE
            </Text>
            <Text style={[styles.bentoCardNumber, { color: colors.onSurface }]}>
              {loading ? "—" : `${stablePercentage}%`}
            </Text>
          </View>

          {/* Card 4 */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoCardTag, { color: colors.onSurfaceVariant }]}>
              OPERATOR_LOAD
            </Text>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={[styles.bentoCardNumber, { color: colors.onSurface }]}>72</Text>
              <Text style={[styles.bentoCardUnit, { color: colors.onSurfaceVariant }]}>/hr</Text>
            </View>
          </View>
        </View>

        {/* Task Cards List */}
        <View style={styles.tasksList}>
          {loading && tasks.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant }]}>
              <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                LOADING DATA...
              </Text>
            </View>
          ) : filteredTasks.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant }]}>
              <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                NO ENTITIES FOUND
              </Text>
            </View>
          ) : (
            filteredTasks.map((task, i) => {
              const taskId = task._id || task.id;
              const refCode = String(taskId || i).slice(-5).toUpperCase();

              return (
                <TouchableOpacity
                  key={taskId || i}
                  onPress={() =>
                    navigation.navigate("TaskDetail", { task, taskId })
                  }
                  style={[
                    styles.taskCard,
                    {
                      backgroundColor: colors.surfaceContainerLowest,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.taskCardHeader}>
                    <Text style={[styles.refCodeBadge, { color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                      #CX-{refCode}
                    </Text>
                    {getStatusChip(task)}
                  </View>

                  <Text style={[styles.taskTitle, { color: colors.onSurface }]} numberOfLines={1}>
                    {task.title}
                  </Text>

                  {task.description ? (
                    <Text style={[styles.taskDesc, { color: colors.onSurfaceVariant }]} numberOfLines={2}>
                      {task.description}
                    </Text>
                  ) : null}

                  <View style={[styles.taskFooter, { borderTopColor: colors.outlineVariant }]}>
                    <Text style={[styles.taskDate, { color: colors.onSurfaceVariant }]}>
                      {new Date(task.createdAt || Date.now()).toLocaleDateString("en-GB")}
                    </Text>
                    <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* Footer Pagination Bar */}
        <View style={[styles.paginationBar, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.paginationSeq, { color: colors.onSurfaceVariant }]}>
            PAGE_SEQUENCE: 1 OF 1
          </Text>
          <View style={styles.paginationButtons}>
            <View style={[styles.pageNumBtn, { backgroundColor: colors.primary }]}>
              <Text style={[styles.pageNumText, { color: colors.onPrimary }]}>1</Text>
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
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 10,
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
  pageSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  searchActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
  },
  newBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    gap: 4,
  },
  newBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  // Bento Summary
  bentoSummaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bentoCard: {
    flexBasis: "48%",
    flexGrow: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  bentoCardTag: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  bentoCardNumber: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 22,
  },
  bentoCardUnit: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 12,
    marginLeft: 2,
  },
  // Tasks List
  tasksList: {
    gap: 10,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  taskCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refCodeBadge: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  pulseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  statusBadgeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  taskTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  taskDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    lineHeight: 16,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  taskDate: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  emptyBox: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  emptyText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  // Pagination
  paginationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  paginationSeq: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  paginationButtons: {
    flexDirection: "row",
    gap: 4,
  },
  pageNumBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pageNumText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
});

export default BacklogScreen;
