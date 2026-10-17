import { KanbanTaskCard } from "./KanbanTaskCard";
import styles from "./KanbanScreen.styles";
import { useIsFocused } from "@react-navigation/native";
import useVisibleTasks from "../../hooks/useVisibleTasks";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const COLUMNS = [
  { id: "pending", title: "Backlog", status: "pending" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  { id: "validation", title: "Validation", status: "validation" },
  { id: "completed", title: "Deployed", status: "completed" },
];

const KanbanScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const tasks = useVisibleTasks();
  const focused = useIsFocused();
  const storeWorkspaceId = useDataStore((state) => state.workspaceId);
  const loading = useDataStore((state) => state.loading);
  const loadTasks = useDataStore((state) => state.loadTasks);
  const moveTask = useDataStore((state) => state.moveTask);
  const reorderTasks = useDataStore((state) => state.reorderTasks);
  const { colors } = useTheme();

  const { activeWorkspace } = useWorkspace();
  const role = activeWorkspace?.members?.find(
    (member) => String(member.user?._id || member.user) === String(user?._id),
  )?.role;
  const canEdit =
    String(activeWorkspace?.owner?._id || activeWorkspace?.owner) ===
      String(user?._id) || ["Admin", "Editor"].includes(role);
  const [actionError, setActionError] = useState("");
  const [saving, setSaving] = useState(false);
  const perform = async (action) => {
    setActionError("");
    setSaving(true);
    try {
      await action();
    } catch (error) {
      setActionError(error.response?.data?.message || "Unable to save changes");
    } finally {
      setSaving(false);
    }
  };
  const shiftTask = (task, direction) => {
    const column = tasks
      .filter((item) => item.status === task.status)
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    const index = column.findIndex((item) => item._id === task._id),
      target = index + direction;
    if (target < 0 || target >= column.length) return;
    [column[index], column[target]] = [column[target], column[index]];
    const order = new Map(column.map((item, i) => [item._id, i]));
    return perform(() =>
      reorderTasks(
        tasks.map((item) =>
          order.has(item._id)
            ? { ...item, orderIndex: order.get(item._id) }
            : item,
        ),
      ),
    );
  };
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (user && focused && storeWorkspaceId) loadTasks();
  }, [user, loadTasks, focused, storeWorkspaceId]);

  const onRefresh = async () => {
    await loadTasks({ force: true });
  };

  const filteredTasks = useMemo(() => {
    const taskList = Array.isArray(tasks)
      ? tasks
      : Array.isArray(tasks?.data)
        ? tasks.data
        : [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return taskList;
    return taskList.filter(
      (t) =>
        (t?.title && t.title.toLowerCase().includes(q)) ||
        (t?.description && t.description.toLowerCase().includes(q)),
    );
  }, [tasks, searchQuery]);

  const getColumnTasks = (status) => {
    return filteredTasks.filter((t) => {
      const s = (t.status || "pending").toLowerCase();
      if (status === "pending") return s === "pending" || s === "todo";
      if (status === "in-progress")
        return (
          s === "in-progress" || s === "in_progress" || s === "in progress"
        );
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

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <AppHeader title="KANBAN" navigation={navigation} />
      {actionError ? (
        <Text
          accessibilityRole="alert"
          style={{ color: colors.error, padding: 12 }}
        >
          {actionError}
        </Text>
      ) : null}

      {/* Board Header matching web KanbanPage.jsx */}
      <View
        style={[
          styles.boardHeader,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.boardHeaderTop}>
          <View>
            <View style={styles.pipelineTagRow}>
              <View
                style={[
                  styles.pipelineDot,
                  { backgroundColor: colors.primary },
                ]}
              />
              <Text
                style={[
                  styles.pipelineTagText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                EXECUTION PIPELINE · REALTIME INTERACTIVE
              </Text>
            </View>
            <Text style={[styles.boardTitle, { color: colors.onSurface }]}>
              Kanban Board
            </Text>
          </View>

          {/* New Mandate Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateTask")}
            style={[styles.newMandateBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={16} color={colors.onPrimary} />
            <Text
              style={[styles.newMandateBtnText, { color: colors.onPrimary }]}
            >
              New Mandate
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Mandates Search Bar */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <MaterialIcons
            name="search"
            size={18}
            color={colors.onSurfaceVariant}
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.onSurface }]}
            placeholder="Filter mandates..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <MaterialIcons
                name="close"
                size={16}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Column Switcher Tabs */}
      <View
        style={[
          styles.columnTabsRow,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.outlineVariant,
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
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
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.surfaceContainerLow,
                    borderColor: isSelected
                      ? colors.primary
                      : colors.outlineVariant,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    {
                      color: isSelected
                        ? colors.onPrimary
                        : colors.onSurfaceVariant,
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
            <FlatList
              key={col.id}
              data={colTasks}
              keyExtractor={(task) => task._id}
              renderItem={({ item }) => (
                <KanbanTaskCard
                  task={item}
                  colStatus={col.status}
                  navigation={navigation}
                  canEdit={canEdit}
                  saving={saving}
                  shiftTask={shiftTask}
                  perform={perform}
                  moveTask={moveTask}
                />
              )}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
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
              ListEmptyComponent={
                <View
                  style={[
                    styles.emptyColumnBox,
                    { borderColor: colors.outlineVariant },
                  ]}
                >
                  <MaterialIcons
                    name="add-task"
                    size={28}
                    color={colors.outline}
                    style={{ marginBottom: 6 }}
                  />
                  <Text
                    style={[
                      styles.emptyColumnTitle,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    No tasks in {col.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CreateTask")}
                    style={[
                      styles.emptyAssignBtn,
                      {
                        backgroundColor: colors.surfaceContainer,
                        borderColor: colors.outlineVariant,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.emptyAssignText,
                        { color: colors.primary },
                      ]}
                    >
                      + Create Task
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default KanbanScreen;
