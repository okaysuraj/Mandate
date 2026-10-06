import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, TextInput, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const { width } = Dimensions.get("window");

const COLUMNS = [
  { id: "pending", title: "Backlog", status: "pending" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  { id: "validation", title: "Validation", status: "validation" },
  { id: "completed", title: "Deployed", status: "completed" },
];

const KanbanScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tasks, loading, loadTasks, subscribeToSocket, moveTask } =
    useDataStore((state) => state);
  const { socket } = useSocket();
  const { colors, typography } = useTheme();

  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (user) loadTasks();
  }, [user, loadTasks]);

  useEffect(() => {
    if (!socket) return;
    return subscribeToSocket(socket);
  }, [socket, subscribeToSocket]);

  const onRefresh = async () => {
    await loadTasks();
  };

  const filteredTasks = useMemo(() => {
    const taskList = Array.isArray(tasks) ? tasks : (Array.isArray(tasks?.data) ? tasks.data : []);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return taskList;
    return taskList.filter(
      (t) =>
        (t?.title && t.title.toLowerCase().includes(q)) ||
        (t?.description && t.description.toLowerCase().includes(q))
    );
  }, [tasks, searchQuery]);

  const getColumnTasks = (status) => {
    return filteredTasks.filter((t) => {
      const s = (t.status || "pending").toLowerCase();
      if (status === "pending") return s === "pending" || s === "todo";
      if (status === "in-progress")
        return s === "in-progress" || s === "in_progress" || s === "in progress";
      if (status === "validation") return s === "validation";
      if (status === "completed") return s === "completed" || s === "done";
      return false;
    });
  };

  const scrollToTab = (index) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(x / width);
    if (activeIndex !== activeTab && activeIndex >= 0 && activeIndex < 4) {
      setActiveTab(activeIndex);
    }
  };

  const getPriorityDetails = (priority) => {
    switch (priority) {
      case "urgent":
        return {
          label: "CRITICAL",
          dotColor: colors.error,
          textColor: colors.error,
          bg: colors.errorContainer,
        };
      case "high":
        return {
          label: "HIGH",
          dotColor: colors.primary,
          textColor: colors.primary,
          bg: colors.surfaceContainerHighest,
        };
      case "medium":
        return {
          label: "MEDIUM",
          dotColor: colors.tertiary,
          textColor: colors.onTertiaryContainer,
          bg: colors.tertiaryContainer,
        };
      default:
        return {
          label: "ROUTINE",
          dotColor: colors.outline,
          textColor: colors.onSurfaceVariant,
          bg: colors.surfaceContainer,
        };
    }
  };

  const renderCard = (task, colStatus) => {
    const taskIdStr = String(task._id || task.id || "0000");
    const displayCode =
      taskIdStr.length >= 6
        ? taskIdStr.slice(-6).toUpperCase()
        : taskIdStr.toUpperCase();
    const priority = getPriorityDetails(task.priority);
    const isCompleted = colStatus === "completed";
    const isInProgress = colStatus === "in-progress";

    return (
      <TouchableOpacity
        key={taskIdStr}
        onPress={() =>
          navigation.navigate("TaskDetail", { task, taskId: task._id || task.id })
        }
        style={[
          styles.taskCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: isInProgress ? colors.primary : colors.outlineVariant,
          },
        ]}
        activeOpacity={0.75}
      >
        {/* Card Header: Ref Code & Priority */}
        <View style={styles.cardHeader}>
          <Text style={[styles.refCodeText, { color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
            #MND-{displayCode}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priority.bg, borderColor: colors.outlineVariant },
            ]}
          >
            <View style={[styles.priorityDot, { backgroundColor: priority.dotColor }]} />
            <Text style={[styles.priorityText, { color: priority.textColor }]}>
              {priority.label}
            </Text>
          </View>
        </View>

        {/* Task Title */}
        <Text
          style={[
            styles.cardTitle,
            {
              color: colors.onSurface,
              textDecorationLine: isCompleted ? "line-through" : "none",
            },
          ]}
          numberOfLines={2}
        >
          {task.title || "Untitled Mandate"}
        </Text>

        {/* Description */}
        {task.description ? (
          <Text style={[styles.cardDescription, { color: colors.onSurfaceVariant }]} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}

        {/* Tags */}
        {task.tags && task.tags.length > 0 ? (
          <View style={styles.tagsRow}>
            {task.tags.slice(0, 3).map((tag, tIdx) => (
              <View
                key={tIdx}
                style={[
                  styles.tagPill,
                  {
                    backgroundColor: colors.surfaceContainer,
                    borderColor: colors.outlineVariant,
                  },
                ]}
              >
                <Text style={[styles.tagText, { color: colors.onSurfaceVariant }]}>
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Footer Meta */}
        <View style={[styles.cardFooter, { borderTopColor: colors.outlineVariant }]}>
          <View style={styles.metaLeft}>
            {task.dueDate ? (
              <View style={styles.dateRow}>
                <MaterialIcons name="calendar-today" size={12} color={colors.onSurfaceVariant} />
                <Text style={[styles.metaText, { color: colors.onSurfaceVariant }]}>
                  {new Date(task.dueDate).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>
            ) : (
              <View style={styles.dateRow}>
                <MaterialIcons name="schedule" size={12} color={colors.onSurfaceVariant} />
                <Text style={[styles.metaText, { color: colors.onSurfaceVariant }]}>QUEUE</Text>
              </View>
            )}

            {isInProgress ? (
              <View style={styles.activePill}>
                <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.activePillText, { color: colors.primary }]}>ACTIVE</Text>
              </View>
            ) : null}

            {isCompleted ? (
              <View style={styles.activePill}>
                <MaterialIcons name="check-circle" size={12} color={colors.tertiary} />
                <Text style={[styles.activePillText, { color: colors.tertiary }]}>DONE</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Quick Status Transition Actions */}
        <View style={[styles.statusActionsRow, { borderTopColor: colors.outlineVariant }]}>
          {colStatus !== "pending" ? (
            <TouchableOpacity
              onPress={() => moveTask(task._id || task.id, "pending")}
              style={[styles.transitionBtn, { backgroundColor: colors.surfaceContainerHigh }]}
            >
              <Text style={[styles.transitionBtnText, { color: colors.secondary }]}>TO BACKLOG</Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "in-progress" ? (
            <TouchableOpacity
              onPress={() => moveTask(task._id || task.id, "in-progress")}
              style={[styles.transitionBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.transitionBtnText, { color: colors.onPrimary }]}>START</Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "validation" ? (
            <TouchableOpacity
              onPress={() => moveTask(task._id || task.id, "validation")}
              style={[styles.transitionBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderWidth: 1 }]}
            >
              <Text style={[styles.transitionBtnText, { color: colors.onSurfaceVariant }]}>VALIDATE</Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "completed" ? (
            <TouchableOpacity
              onPress={() => moveTask(task._id || task.id, "completed")}
              style={[styles.transitionBtn, { backgroundColor: colors.tertiary }]}
            >
              <Text style={[styles.transitionBtnText, { color: colors.onTertiary }]}>DEPLOY</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="KANBAN" navigation={navigation} />

      {/* Board Header matching web KanbanPage.jsx */}
      <View style={[styles.boardHeader, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.boardHeaderTop}>
          <View>
            <View style={styles.pipelineTagRow}>
              <View style={[styles.pipelineDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.pipelineTagText, { color: colors.onSurfaceVariant }]}>
                EXECUTION PIPELINE · REALTIME INTERACTIVE
              </Text>
            </View>
            <Text style={[styles.boardTitle, { color: colors.onSurface }]}>Kanban Board</Text>
          </View>

          {/* New Mandate Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateTask")}
            style={[styles.newMandateBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={16} color={colors.onPrimary} />
            <Text style={[styles.newMandateBtnText, { color: colors.onPrimary }]}>
              New Mandate
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Mandates Search Bar */}
        <View style={[styles.searchBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <MaterialIcons name="search" size={18} color={colors.onSurfaceVariant} style={{ marginRight: 6 }} />
          <TextInput
            style={[styles.searchInput, { color: colors.onSurface }]}
            placeholder="Filter mandates..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <MaterialIcons name="close" size={16} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Column Switcher Tabs */}
      <View style={[styles.columnTabsRow, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
          {COLUMNS.map((col, idx) => {
            const count = getColumnTasks(col.status).length;
            const isSelected = activeTab === idx;

            return (
              <TouchableOpacity
                key={col.id}
                onPress={() => scrollToTab(idx)}
                style={[
                  styles.tabChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surfaceContainerLow,
                    borderColor: isSelected ? colors.primary : colors.outlineVariant,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    {
                      color: isSelected ? colors.onPrimary : colors.onSurfaceVariant,
                      fontWeight: isSelected ? "bold" : "600",
                    },
                  ]}
                >
                  {col.title.toUpperCase()} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Swipeable Columns */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.columnsPager}
      >
        {COLUMNS.map((col) => {
          const colTasks = getColumnTasks(col.status);

          return (
            <ScrollView
              key={col.id}
              style={{ width }}
              contentContainerStyle={styles.columnScrollContent}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={onRefresh}
                  tintColor={colors.primary}
                />
              }
              showsVerticalScrollIndicator={false}
            >
              {colTasks.length === 0 ? (
                <View style={[styles.emptyColumnBox, { borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="add-task" size={28} color={colors.outline} style={{ marginBottom: 6 }} />
                  <Text style={[styles.emptyColumnTitle, { color: colors.onSurfaceVariant }]}>
                    No tasks in {col.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CreateTask")}
                    style={[styles.emptyAssignBtn, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}
                  >
                    <Text style={[styles.emptyAssignText, { color: colors.primary }]}>
                      + Create Task
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                colTasks.map((t) => renderCard(t, col.status))
              )}
            </ScrollView>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  boardHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  boardHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  pipelineTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  pipelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pipelineTagText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  boardTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  newMandateBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  newMandateBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  searchBox: {
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
  columnTabsRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
  },
  tabChipText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  columnsPager: {
    flex: 1,
  },
  columnScrollContent: {
    padding: 16,
    paddingBottom: 48,
    gap: 12,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refCodeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  priorityDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  priorityText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  cardTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 13,
    lineHeight: 18,
  },
  cardDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tagPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activePillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  statusActionsRow: {
    flexDirection: "row",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    flexWrap: "wrap",
  },
  transitionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  transitionBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.5,
  },
  emptyColumnBox: {
    padding: 32,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  emptyColumnTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    textTransform: "uppercase",
  },
  emptyAssignBtn: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  emptyAssignText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
});

export default KanbanScreen;
