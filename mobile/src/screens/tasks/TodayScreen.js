import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const TodayScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tasks, loading, loadTasks } = useDataStore((state) => state);
  const { colors, typography } = useTheme();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const activeTasks = Array.isArray(tasks) ? tasks : (Array.isArray(tasks?.data) ? tasks.data : []);

  const today = new Date();
  const dayStr = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  // Focus task: urgent/high priority active task, or first active task
  const focusTask =
    activeTasks.find(
      (t) =>
        t.status !== "completed" &&
        t.status !== "done" &&
        (t.priority === "urgent" || t.priority === "high")
    ) ||
    activeTasks.find((t) => t.status !== "completed" && t.status !== "done") ||
    activeTasks[0];

  const scheduledTasks = useMemo(() => {
    return [...activeTasks]
      .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0))
      .slice(0, 10);
  }, [activeTasks]);

  const focusIdStr = String(focusTask?._id || focusTask?.id || "0000");
  const refCode =
    focusIdStr.length >= 4
      ? focusIdStr.slice(-4).toUpperCase()
      : focusIdStr.toUpperCase();
  const mndCode =
    focusIdStr.length >= 3
      ? focusIdStr.slice(-3).toUpperCase()
      : focusIdStr.toUpperCase();

  const completedScheduledCount = scheduledTasks.filter(
    (t) => t.status === "completed" || t.status === "done"
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
          <MaterialIcons name="check" size={12} color={colors.onSurfaceVariant} />
          <Text style={[styles.statusPillText, { color: colors.onSurfaceVariant }]}>
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
          <View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
          <Text style={[styles.statusPillText, { color: colors.onTertiaryContainer }]}>
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
        <Text style={[styles.statusPillText, { color: colors.onSecondaryContainer }]}>
          PENDING
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="TODAY" navigation={navigation} />

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
        {/* ACTIVE FOCUS SECTION (Hero Card matching web TodayPage.jsx) */}
        <View
          style={[
            styles.focusHeroCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          {/* Big MND Code Watermark */}
          <Text
            style={[
              styles.watermarkText,
              { color: colors.onSurfaceVariant },
            ]}
          >
            MND-{mndCode}
          </Text>

          {/* Top Badges */}
          <View style={styles.focusTopBadges}>
            <View
              style={[
                styles.focusStatusPill,
                {
                  backgroundColor: colors.tertiaryContainer,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <View style={[styles.pulseDot, { backgroundColor: colors.tertiary }]} />
              <Text style={[styles.focusStatusText, { color: colors.onTertiaryContainer }]}>
                Status: {focusTask ? "Ready" : "Idle"}
              </Text>
            </View>

            <View
              style={[
                styles.refCodeBadge,
                {
                  backgroundColor: colors.surfaceContainer,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <Text style={[styles.refCodeText, { color: colors.onSurfaceVariant }]}>
                Task #{refCode}
              </Text>
            </View>
          </View>

          {/* Headline & Description */}
          <Text style={[styles.focusTitle, { color: colors.onSurface }]}>
            {focusTask ? focusTask.title : "NO ACTIVE TASK"}
          </Text>

          <Text
            style={[styles.focusDescription, { color: colors.onSurfaceVariant }]}
            numberOfLines={3}
          >
            {focusTask
              ? focusTask.description ||
                "Focus on your most important task for today, or select one from your task list."
              : "All clear! You have completed all scheduled tasks for today."}
          </Text>

          {/* Action Buttons */}
          {focusTask ? (
            <View style={styles.focusActionRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FocusMode", {
                    taskId: focusTask._id || focusTask.id,
                  })
                }
                style={[styles.startSessionBtn, { backgroundColor: colors.primary }]}
                activeOpacity={0.85}
              >
                <Text style={[styles.startSessionBtnText, { color: colors.onPrimary }]}>
                  START SESSION
                </Text>
                <MaterialIcons name="play-arrow" size={16} color={colors.onPrimary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("TaskDetail", {
                    task: focusTask,
                    taskId: focusTask._id || focusTask.id,
                  })
                }
                style={[
                  styles.detailsBtn,
                  {
                    backgroundColor: colors.surfaceContainerLow,
                    borderColor: colors.outlineVariant,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text style={[styles.detailsBtnText, { color: colors.onSurface }]}>
                  DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/* SCHEDULED TASKS SECTION */}
        <View style={styles.scheduledSection}>
          <View style={[styles.sectionHeaderRow, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.sectionHeaderLeft}>
              <MaterialIcons name="schedule" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
                Today's Schedule
              </Text>
            </View>
            <Text style={[styles.dayText, { color: colors.onSurfaceVariant }]}>
              {dayStr}
            </Text>
          </View>

          {/* Tasks List */}
          <View
            style={[
              styles.protocolsListCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            {scheduledTasks.length === 0 ? (
              <View style={styles.emptyProtocolsBox}>
                <Text style={[styles.emptyProtocolsText, { color: colors.onSurfaceVariant }]}>
                  NO TASKS SCHEDULED
                </Text>
              </View>
            ) : (
              scheduledTasks.map((task, i) => {
                const taskId = String(task._id || task.id || i);
                const isDone = task.status === "completed" || task.status === "done";
                const isFocus =
                  String(task._id || task.id) ===
                  String(focusTask?._id || focusTask?.id);

                const timeLabel = task.dueDate
                  ? new Date(task.dueDate).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : `${String(8 + i).padStart(2, "0")}:00`;

                return (
                  <TouchableOpacity
                    key={taskId}
                    onPress={() =>
                      navigation.navigate("TaskDetail", { task, taskId })
                    }
                    style={[
                      styles.protocolItem,
                      {
                        borderBottomColor: colors.outlineVariant,
                        opacity: isDone ? 0.65 : 1,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    {isFocus ? (
                      <View
                        style={[
                          styles.focusLeftBar,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    ) : null}

                    {/* Time Column */}
                    <Text style={[styles.protocolTime, { color: colors.onSurfaceVariant }]}>
                      {timeLabel}
                    </Text>

                    {/* Task Info */}
                    <View style={styles.protocolInfo}>
                      <Text
                        style={[
                          styles.protocolTitle,
                          {
                            color: colors.onSurface,
                            textDecorationLine: isDone ? "line-through" : "none",
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {task.title}
                      </Text>

                      <View style={styles.protocolBadgesRow}>
                        {renderStatusBadge(task)}
                        {!isDone ? (
                          <View
                            style={[
                              styles.priorityBadge,
                              {
                                backgroundColor: colors.surfaceContainer,
                                borderColor: colors.outlineVariant,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.priorityBadgeText,
                                { color: colors.onSurfaceVariant },
                              ]}
                            >
                              PRIORITY: {task.priority?.toUpperCase() || "MEDIUM"}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    {/* Action Icon */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("TaskDetail", { task, taskId })
                      }
                      style={[
                        styles.protocolActionBtn,
                        { borderColor: colors.outlineVariant },
                      ]}
                    >
                      <MaterialIcons
                        name={isDone ? "visibility" : "play-arrow"}
                        size={16}
                        color={colors.onSurfaceVariant}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* ANALYTICS BENTO SECTION */}
        <View style={styles.bentoSection}>
          {/* Card 1: Today's Execution Progress */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.bentoTopRow}>
              <Text style={[styles.bentoLabel, { color: colors.onSurfaceVariant }]}>
                Today's Execution Progress
              </Text>
              <Text style={[styles.bentoProgressCount, { color: colors.primary }]}>
                {completedScheduledCount} / {scheduledTasks.length} COMPLETED
              </Text>
            </View>

            <View
              style={[
                styles.bentoProgressBox,
                {
                  backgroundColor: colors.surfaceContainerLow,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${progressPercent}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.progressLabelsRow}>
                <Text style={[styles.progressStepText, { color: colors.onSurfaceVariant }]}>
                  0% Initiated
                </Text>
                <Text style={[styles.progressCenterVal, { color: colors.primary }]}>
                  {progressPercent}%
                </Text>
                <Text style={[styles.progressStepText, { color: colors.onSurfaceVariant }]}>
                  100% Target
                </Text>
              </View>
            </View>
          </View>

          {/* Card 2: Active Directive */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerHigh,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoLabel, { color: colors.onSurfaceVariant }]}>
              Priority Task
            </Text>
            <Text style={[styles.activeDirectiveTitle, { color: colors.onSurface }]} numberOfLines={1}>
              {focusTask ? focusTask.title : "All Tasks Clear"}
            </Text>
            <Text style={[styles.activeDirectiveMeta, { color: colors.onSurfaceVariant }]}>
              Priority: {focusTask?.priority?.toUpperCase() || "MEDIUM"} • Status:{" "}
              {focusTask?.status?.toUpperCase() || "IDLE"}
            </Text>

            <TouchableOpacity
              onPress={() =>
                focusTask
                  ? navigation.navigate("FocusMode", {
                      taskId: focusTask._id || focusTask.id,
                    })
                  : navigation.navigate("Kanban")
              }
              style={[styles.focusActionBottomBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <Text style={[styles.focusActionBottomBtnText, { color: colors.onPrimary }]}>
                {focusTask ? "ENTER FOCUS MODE" : "VIEW KANBAN"}
              </Text>
            </TouchableOpacity>
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
    gap: 20,
  },
  // Hero Focus Card
  focusHeroCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  watermarkText: {
    position: "absolute",
    top: 16,
    right: 16,
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 48,
    opacity: 0.08,
  },
  focusTopBadges: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  focusStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  focusStatusText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  refCodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  refCodeText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    textTransform: "uppercase",
  },
  focusTitle: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.6,
    textTransform: "uppercase",
  },
  focusDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  focusActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  startSessionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9999,
    gap: 6,
  },
  startSessionBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  detailsBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  detailsBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  // Scheduled Protocols Section
  scheduledSection: {
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  dayText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 11,
  },
  protocolsListCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  emptyProtocolsBox: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyProtocolsText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  protocolItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    position: "relative",
    gap: 12,
  },
  focusLeftBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  protocolTime: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    width: 44,
  },
  protocolInfo: {
    flex: 1,
    gap: 4,
  },
  protocolTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  protocolBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  statusPillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
  protocolActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Bento Section
  bentoSection: {
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  bentoTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bentoLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  bentoProgressCount: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  bentoProgressBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStepText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  progressCenterVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 13,
  },
  activeDirectiveTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 16,
  },
  activeDirectiveMeta: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
    textTransform: "uppercase",
  },
  focusActionBottomBtn: {
    paddingVertical: 11,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  focusActionBottomBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
});

export default TodayScreen;
