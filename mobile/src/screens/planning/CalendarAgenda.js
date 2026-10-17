// Selected-day task rows and calendar summary metrics.
import styles from "./CalendarScreen.styles";

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "../../context/ThemeContext";

export function CalendarTaskCard({
  task,
  getPriorityLabel,
  idx,
  navigation,
  getPriorityDot,
}) {
  const { colors } = useTheme();

  const idStr = String(task._id || task.id || "0000");
  const refCode =
    idStr.length >= 4 ? idStr.slice(-4).toUpperCase() : idStr.toUpperCase();
  const isDone = task.status === "completed" || task.status === "done";
  const priorityLabel = getPriorityLabel(task.priority);

  return (
    <View style={styles.agendaTasksList}>
      <TouchableOpacity
        key={idx}
        onPress={() =>
          navigation.navigate("TaskDetail", {
            task,
            taskId: task._id || task.id,
          })
        }
        style={[
          styles.agendaTaskItem,
          {
            backgroundColor: colors.surfaceContainerLow,
            borderColor: colors.outlineVariant,
            opacity: isDone ? 0.6 : 1,
          },
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.agendaTaskMetaRow}>
          <Text
            style={[
              styles.agendaRefCode,
              {
                color: colors.onSurfaceVariant,
                backgroundColor: colors.surfaceContainer,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            #MND-{refCode}
          </Text>
          <View
            style={[
              styles.agendaPriorityPill,
              {
                borderColor: colors.outlineVariant,
                backgroundColor: colors.surfaceContainer,
              },
            ]}
          >
            <View
              style={[
                styles.taskMiniDot,
                {
                  backgroundColor: getPriorityDot(task.priority),
                  marginRight: 4,
                },
              ]}
            />
            <Text
              style={[
                styles.agendaPriorityText,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {priorityLabel}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.agendaTaskTitle,
            {
              color: colors.onSurface,
              textDecorationLine: isDone ? "line-through" : "none",
            },
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[styles.agendaTaskDesc, { color: colors.onSurfaceVariant }]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}

        <View
          style={[
            styles.agendaTaskFooter,
            { borderTopColor: colors.outlineVariant },
          ]}
        >
          <Text
            style={[
              styles.agendaStatusText,
              { color: colors.onSurfaceVariant },
            ]}
          >
            {task.status?.toUpperCase() || "PENDING"}
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={14}
            color={colors.onSurfaceVariant}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function CalendarSummary({
  totalTasksCount,
  completionRate,
  highPriorityCount,
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 16 }}>
      {/* Operational Severity Index Legend */}
      <View
        style={[
          styles.legendCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <Text style={[styles.legendTitle, { color: colors.onSurfaceVariant }]}>
          OPERATIONAL SEVERITY INDEX
        </Text>
        <View style={styles.legendGrid}>
          <View
            style={[
              styles.legendItem,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View
              style={[styles.legendDot, { backgroundColor: colors.error }]}
            />
            <Text style={[styles.legendLabel, { color: colors.onSurface }]}>
              Critical
            </Text>
          </View>
          <View
            style={[
              styles.legendItem,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View
              style={[styles.legendDot, { backgroundColor: colors.primary }]}
            />
            <Text style={[styles.legendLabel, { color: colors.onSurface }]}>
              High
            </Text>
          </View>
          <View
            style={[
              styles.legendItem,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View
              style={[styles.legendDot, { backgroundColor: colors.tertiary }]}
            />
            <Text style={[styles.legendLabel, { color: colors.onSurface }]}>
              Medium
            </Text>
          </View>
          <View
            style={[
              styles.legendItem,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View
              style={[styles.legendDot, { backgroundColor: colors.outline }]}
            />
            <Text style={[styles.legendLabel, { color: colors.onSurface }]}>
              Completed
            </Text>
          </View>
        </View>
      </View>

      {/* Operational Metrics Bento */}
      <View style={styles.metricsGrid}>
        {/* Scheduled Volume */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.metricTop}>
            <MaterialIcons
              name="calendar-month"
              size={18}
              color={colors.primary}
            />
            <Text
              style={[styles.metricTag, { color: colors.onSurfaceVariant }]}
            >
              SCHEDULED VOLUME
            </Text>
          </View>
          <Text style={[styles.metricNumber, { color: colors.onSurface }]}>
            {totalTasksCount}
          </Text>
          <Text style={[styles.metricDesc, { color: colors.onSurfaceVariant }]}>
            Total tasks tracked in this timeframe
          </Text>
        </View>

        {/* Resolution Ratio */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.metricTop}>
            <MaterialIcons name="task-alt" size={18} color={colors.tertiary} />
            <Text
              style={[styles.metricTag, { color: colors.onSurfaceVariant }]}
            >
              COMPLETION RATE
            </Text>
          </View>
          <Text style={[styles.metricNumber, { color: colors.onSurface }]}>
            {completionRate}%
          </Text>
          <View
            style={[
              styles.metricBarBg,
              { backgroundColor: colors.surfaceContainerHigh },
            ]}
          >
            <View
              style={[
                styles.metricBarFill,
                {
                  backgroundColor: colors.primary,
                  width: `${completionRate}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Critical Density */}
        <View
          style={[
            styles.metricCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.metricTop}>
            <MaterialIcons
              name="priority-high"
              size={18}
              color={colors.error}
            />
            <Text
              style={[styles.metricTag, { color: colors.onSurfaceVariant }]}
            >
              HIGH PRIORITY
            </Text>
          </View>
          <Text style={[styles.metricNumber, { color: colors.error }]}>
            {highPriorityCount}
          </Text>
          <Text style={[styles.metricDesc, { color: colors.onSurfaceVariant }]}>
            Tasks requiring priority focus
          </Text>
        </View>
      </View>

      <View style={{ height: 32 }} />
    </View>
  );
}
