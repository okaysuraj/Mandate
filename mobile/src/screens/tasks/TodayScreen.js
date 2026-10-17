import { TodayFocusCard, TodayTaskCard, TodaySummary } from "./TodayCards";
import styles from "./TodayScreen.styles";
import { useIsFocused } from "@react-navigation/native";
import useVisibleTasks from "../../hooks/useVisibleTasks";
import {
  todaySchedule,
  activeFocusTask,
} from "../../../../shared/taskSchedule";
import { useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const TodayScreen = ({ navigation }) => {
  const { user } = useAuth();
  const tasks = useVisibleTasks();
  const focused = useIsFocused();
  const storeWorkspaceId = useDataStore((state) => state.workspaceId);
  const loading = useDataStore((state) => state.loading);
  const loadTasks = useDataStore((state) => state.loadTasks);
  const { colors } = useTheme();

  useEffect(() => {
    if (user && focused && storeWorkspaceId) {
      loadTasks();
    }
  }, [user, loadTasks, focused, storeWorkspaceId]);

  const activeTasks = Array.isArray(tasks)
    ? tasks
    : Array.isArray(tasks?.data)
      ? tasks.data
      : [];

  const today = new Date();
  const dayStr = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  const focusTask = activeFocusTask(activeTasks);
  const scheduledTasks = todaySchedule(activeTasks, user?.timezone || "UTC");

  const focusIdStr = String(focusTask?._id || focusTask?.id || "");
  const refCode =
    focusIdStr.length >= 4
      ? focusIdStr.slice(-4).toUpperCase()
      : focusIdStr.toUpperCase();
  const mndCode =
    focusIdStr.length >= 3
      ? focusIdStr.slice(-3).toUpperCase()
      : focusIdStr.toUpperCase();

  const completedScheduledCount = scheduledTasks.filter(
    (t) => t.status === "completed" || t.status === "done",
  ).length;
  const progressPercent =
    scheduledTasks.length > 0
      ? Math.round((completedScheduledCount / scheduledTasks.length) * 100)
      : 0;

  const renderStatusBadge = (task) => {
    const isCompleted = task.status === "completed" || task.status === "done";
    const isActive =
      task.status === "in-progress" ||
      task.status === "in_progress" ||
      String(task._id) === String(focusTask?._id);

    if (isCompleted) {
      return (
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: colors.surfaceContainerHighest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <MaterialIcons
            name="check"
            size={12}
            color={colors.onSurfaceVariant}
          />
          <Text
            style={[styles.statusPillText, { color: colors.onSurfaceVariant }]}
          >
            COMPLETED
          </Text>
        </View>
      );
    }

    if (isActive) {
      return (
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: colors.tertiaryContainer,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View
            style={[styles.pulseDot, { backgroundColor: colors.tertiary }]}
          />
          <Text
            style={[
              styles.statusPillText,
              { color: colors.onTertiaryContainer },
            ]}
          >
            ACTIVE
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.statusPill,
          {
            backgroundColor: colors.secondaryContainer,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <Text
          style={[
            styles.statusPillText,
            { color: colors.onSecondaryContainer },
          ]}
        >
          PENDING
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <AppHeader title="TODAY" navigation={navigation} />

      <FlatList
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => loadTasks({ force: true })}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        data={scheduledTasks}
        keyExtractor={(task) => task._id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {/* ACTIVE FOCUS SECTION (Hero Card matching web TodayPage.jsx) */}
            <TodayFocusCard
              mndCode={mndCode}
              focusTask={focusTask}
              refCode={refCode}
              navigation={navigation}
            />

            {/* SCHEDULED TASKS SECTION */}

            <View
              style={[
                styles.sectionHeaderRow,
                { borderBottomColor: colors.outlineVariant },
              ]}
            >
              <View style={styles.sectionHeaderLeft}>
                <MaterialIcons
                  name="schedule"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={[styles.sectionTitle, { color: colors.onSurface }]}
                >
                  Today's Schedule
                </Text>
              </View>
              <Text
                style={[styles.dayText, { color: colors.onSurfaceVariant }]}
              >
                {dayStr}
              </Text>
            </View>

            {/* Tasks List */}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyProtocolsBox}>
            <Text
              style={[
                styles.emptyProtocolsText,
                { color: colors.onSurfaceVariant },
              ]}
            >
              NO TASKS SCHEDULED
            </Text>
          </View>
        }
        renderItem={({ item: task, index: i }) => (
          <TodayTaskCard
            task={task}
            i={i}
            focusTask={focusTask}
            navigation={navigation}
            renderStatusBadge={renderStatusBadge}
          />
        )}
        ListFooterComponent={
          <TodaySummary
            completedScheduledCount={completedScheduledCount}
            scheduledTasks={scheduledTasks}
            progressPercent={progressPercent}
            focusTask={focusTask}
            navigation={navigation}
          />
        }
      />
    </SafeAreaView>
  );
};

export default TodayScreen;
