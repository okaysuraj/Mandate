// Task card rendering and priority labels for the native Kanban board.
import styles from "./KanbanScreen.styles";

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "../../context/ThemeContext";

export function KanbanTaskCard({
  task,
  colStatus,
  navigation,
  canEdit,
  saving,
  shiftTask,
  perform,
  moveTask,
}) {
  const { colors } = useTheme();
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
        navigation.navigate("TaskDetail", {
          task,
          taskId: task._id || task.id,
        })
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
        <Text
          style={[
            styles.refCodeText,
            {
              color: colors.onSurfaceVariant,
              backgroundColor: colors.surfaceContainer,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          #MND-{displayCode}
        </Text>
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor: priority.bg,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View
            style={[styles.priorityDot, { backgroundColor: priority.dotColor }]}
          />
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
        <Text
          style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}
          numberOfLines={2}
        >
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
              <Text
                style={[styles.tagText, { color: colors.onSurfaceVariant }]}
              >
                #{tag}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Footer Meta */}
      <View
        style={[styles.cardFooter, { borderTopColor: colors.outlineVariant }]}
      >
        <View style={styles.metaLeft}>
          {task.dueDate ? (
            <View style={styles.dateRow}>
              <MaterialIcons
                name="calendar-today"
                size={12}
                color={colors.onSurfaceVariant}
              />
              <Text
                style={[styles.metaText, { color: colors.onSurfaceVariant }]}
              >
                {new Date(task.dueDate).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>
          ) : (
            <View style={styles.dateRow}>
              <MaterialIcons
                name="schedule"
                size={12}
                color={colors.onSurfaceVariant}
              />
              <Text
                style={[styles.metaText, { color: colors.onSurfaceVariant }]}
              >
                QUEUE
              </Text>
            </View>
          )}

          {isInProgress ? (
            <View style={styles.activePill}>
              <View
                style={[styles.activeDot, { backgroundColor: colors.primary }]}
              />
              <Text style={[styles.activePillText, { color: colors.primary }]}>
                ACTIVE
              </Text>
            </View>
          ) : null}

          {isCompleted ? (
            <View style={styles.activePill}>
              <MaterialIcons
                name="check-circle"
                size={12}
                color={colors.tertiary}
              />
              <Text style={[styles.activePillText, { color: colors.tertiary }]}>
                DONE
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Quick Status Transition Actions */}
      {canEdit && (
        <View
          style={[
            styles.statusActionsRow,
            { borderTopColor: colors.outlineVariant },
          ]}
        >
          <TouchableOpacity
            disabled={saving}
            accessibilityLabel="Move task earlier"
            onPress={() => shiftTask(task, -1)}
          >
            <MaterialIcons
              name="arrow-upward"
              size={18}
              color={colors.onSurface}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={saving}
            accessibilityLabel="Move task later"
            onPress={() => shiftTask(task, 1)}
          >
            <MaterialIcons
              name="arrow-downward"
              size={18}
              color={colors.onSurface}
            />
          </TouchableOpacity>
          {colStatus !== "pending" ? (
            <TouchableOpacity
              disabled={saving}
              onPress={() =>
                perform(() => moveTask(task._id || task.id, "pending"))
              }
              style={[
                styles.transitionBtn,
                { backgroundColor: colors.surfaceContainerHigh },
              ]}
            >
              <Text
                style={[styles.transitionBtnText, { color: colors.secondary }]}
              >
                TO BACKLOG
              </Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "in-progress" ? (
            <TouchableOpacity
              disabled={saving}
              onPress={() =>
                perform(() => moveTask(task._id || task.id, "in-progress"))
              }
              style={[
                styles.transitionBtn,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[styles.transitionBtnText, { color: colors.onPrimary }]}
              >
                START
              </Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "validation" ? (
            <TouchableOpacity
              disabled={saving}
              onPress={() =>
                perform(() => moveTask(task._id || task.id, "validation"))
              }
              style={[
                styles.transitionBtn,
                {
                  backgroundColor: colors.surfaceContainerLow,
                  borderColor: colors.outlineVariant,
                  borderWidth: 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.transitionBtnText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                VALIDATE
              </Text>
            </TouchableOpacity>
          ) : null}

          {colStatus !== "completed" ? (
            <TouchableOpacity
              disabled={saving}
              onPress={() =>
                perform(() => moveTask(task._id || task.id, "completed"))
              }
              style={[
                styles.transitionBtn,
                { backgroundColor: colors.tertiary },
              ]}
            >
              <Text
                style={[styles.transitionBtnText, { color: colors.onTertiary }]}
              >
                DEPLOY
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
}
