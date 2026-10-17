// Focus task, scheduled task rows, and completion metrics for TodayScreen.
import styles from "./TodayScreen.styles";

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "../../context/ThemeContext";

export function TodayFocusCard({ mndCode, focusTask, refCode, navigation }) {
  const { colors } = useTheme();
  return (
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
      <Text style={[styles.watermarkText, { color: colors.onSurfaceVariant }]}>
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
          <View
            style={[styles.pulseDot, { backgroundColor: colors.tertiary }]}
          />
          <Text
            style={[
              styles.focusStatusText,
              { color: colors.onTertiaryContainer },
            ]}
          >
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
          <Text
            style={[styles.refCodeText, { color: colors.onSurfaceVariant }]}
          >
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
            style={[
              styles.startSessionBtn,
              { backgroundColor: colors.primary },
            ]}
            activeOpacity={0.85}
          >
            <Text
              style={[styles.startSessionBtnText, { color: colors.onPrimary }]}
            >
              START SESSION
            </Text>
            <MaterialIcons
              name="play-arrow"
              size={16}
              color={colors.onPrimary}
            />
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
  );
}

export function TodayTaskCard({
  task,
  i,
  focusTask,
  navigation,
  renderStatusBadge,
}) {
  const { colors } = useTheme();

  const taskId = String(task._id || task.id || i);
  const isDone = task.status === "completed" || task.status === "done";
  const isFocus =
    String(task._id || task.id) === String(focusTask?._id || focusTask?.id);

  const timeLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No due time";

  return (
    <View
      style={[
        styles.protocolsListCard,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <TouchableOpacity
        key={taskId}
        onPress={() => navigation.navigate("TaskDetail", { task, taskId })}
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
            style={[styles.focusLeftBar, { backgroundColor: colors.primary }]}
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
          onPress={() => navigation.navigate("TaskDetail", { task, taskId })}
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
    </View>
  );
}

export function TodaySummary({
  completedScheduledCount,
  scheduledTasks,
  progressPercent,
  focusTask,
  navigation,
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
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
            <Text
              style={[styles.bentoLabel, { color: colors.onSurfaceVariant }]}
            >
              Today's Execution Progress
            </Text>
            <Text
              style={[styles.bentoProgressCount, { color: colors.primary }]}
            >
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
            <View
              style={[
                styles.progressBarBg,
                { backgroundColor: colors.surfaceContainerHigh },
              ]}
            >
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
              <Text
                style={[
                  styles.progressStepText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                0% Initiated
              </Text>
              <Text
                style={[styles.progressCenterVal, { color: colors.primary }]}
              >
                {progressPercent}%
              </Text>
              <Text
                style={[
                  styles.progressStepText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
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
          <Text
            style={[styles.activeDirectiveTitle, { color: colors.onSurface }]}
            numberOfLines={1}
          >
            {focusTask ? focusTask.title : "All Tasks Clear"}
          </Text>
          <Text
            style={[
              styles.activeDirectiveMeta,
              { color: colors.onSurfaceVariant },
            ]}
          >
            Priority: {focusTask?.priority?.toUpperCase() || "Unassigned"} •
            Status: {focusTask?.status?.toUpperCase() || "IDLE"}
          </Text>

          <TouchableOpacity
            onPress={() =>
              focusTask
                ? navigation.navigate("FocusMode", {
                    taskId: focusTask._id || focusTask.id,
                  })
                : navigation.navigate("Kanban")
            }
            style={[
              styles.focusActionBottomBtn,
              { backgroundColor: colors.primary },
            ]}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.focusActionBottomBtnText,
                { color: colors.onPrimary },
              ]}
            >
              {focusTask ? "ENTER FOCUS MODE" : "VIEW KANBAN"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 32 }} />
    </View>
  );
}
