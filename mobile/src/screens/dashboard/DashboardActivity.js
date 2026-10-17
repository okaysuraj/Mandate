// Pinned tasks and workspace health cards; all data is supplied by the dashboard.
import styles from "./HomeDashboardScreen.styles";

import { View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../../context/ThemeContext";

export function PinnedTasks({ navigation, activeTasks, loading }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.pinnedCard,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.pinnedHeader}>
        <Text style={[styles.pinnedTitle, { color: colors.primary }]}>
          Priority Tasks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Today")}>
          <Text style={[styles.viewAllText, { color: colors.outline }]}>
            VIEW ALL
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pinnedList}>
        {activeTasks.slice(0, 3).map((task) => {
          const priorityGrade =
            task.priority === "urgent"
              ? "S"
              : task.priority === "high"
                ? "A"
                : task.priority === "medium"
                  ? "B"
                  : "C";

          return (
            <TouchableOpacity
              key={task._id}
              onPress={() =>
                navigation.navigate("TaskDetail", {
                  task,
                  taskId: task._id,
                })
              }
              style={[
                styles.mandateItem,
                {
                  backgroundColor: colors.surfaceContainerLow,
                  borderColor: colors.outlineVariant,
                },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.mandateTop}>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        task.priority === "urgent" || task.priority === "high"
                          ? colors.primary
                          : colors.surfaceContainer,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityBadgeText,
                      {
                        color:
                          task.priority === "urgent" || task.priority === "high"
                            ? colors.onPrimary
                            : colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    PRIORITY {priorityGrade}
                  </Text>
                </View>
                <MaterialIcons
                  name="push-pin"
                  size={16}
                  color={colors.outline}
                />
              </View>

              <Text
                style={[styles.mandateItemTitle, { color: colors.onSurface }]}
                numberOfLines={1}
              >
                {task.title}
              </Text>
              <Text
                style={[
                  styles.mandateItemDesc,
                  { color: colors.onSurfaceVariant },
                ]}
                numberOfLines={1}
              >
                {task.description || "No description provided."}
              </Text>

              <View style={styles.mandateBottom}>
                <Text style={[styles.dueDateText, { color: colors.outline }]}>
                  {task.dueDate
                    ? (() => {
                        try {
                          const d = new Date(task.dueDate);
                          return isNaN(d.getTime())
                            ? "No due date"
                            : `Due: ${d.toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                              })}`;
                        } catch {
                          return "No due date";
                        }
                      })()
                    : "No due date"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {activeTasks.length === 0 && !loading && (
          <View
            style={[
              styles.emptyMandatesBox,
              { borderColor: colors.outlineVariant },
            ]}
          >
            <Text
              style={[
                styles.emptyMandatesText,
                { color: colors.onSurfaceVariant },
              ]}
            >
              NO ACTIVE TASKS
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateTask")}
        style={[
          styles.addMandateBtn,
          { borderTopColor: colors.outlineVariant },
        ]}
      >
        <Text
          style={[styles.addMandateBtnText, { color: colors.onSurfaceVariant }]}
        >
          + ADD NEW TASK
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function WorkspaceHealth({
  totalTasks,
  completedTasks,
  activeTasks,
  urgentCount,
  highCount,
  mediumCount,
  lowCount,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.healthCard,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.healthHeader}>
        <View>
          <Text style={[styles.healthTitle, { color: colors.primary }]}>
            Execution Health & Workstreams
          </Text>
          <Text
            style={[styles.healthSubtitle, { color: colors.onSurfaceVariant }]}
          >
            Active tasks categorized by execution priority
          </Text>
        </View>

        <View style={styles.healthCounters}>
          <View style={styles.counterCol}>
            <Text
              style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}
            >
              TOTAL
            </Text>
            <Text style={[styles.counterVal, { color: colors.primary }]}>
              {totalTasks}
            </Text>
          </View>
          <View style={styles.counterCol}>
            <Text
              style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}
            >
              RESOLVED
            </Text>
            <Text
              style={[styles.counterVal, { color: colors.onTertiaryContainer }]}
            >
              {completedTasks}
            </Text>
          </View>
          <View style={styles.counterCol}>
            <Text
              style={[styles.counterLabel, { color: colors.onSurfaceVariant }]}
            >
              QUEUE
            </Text>
            <Text style={[styles.counterVal, { color: colors.primary }]}>
              {activeTasks.length}
            </Text>
          </View>
        </View>
      </View>

      {/* 4 Priority Meter Columns */}
      <View style={styles.priorityGrid}>
        {/* Urgent */}
        <View
          style={[
            styles.priorityColCard,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.priorityColHeader}>
            <Text style={[styles.priorityColName, { color: colors.error }]}>
              URGENT
            </Text>
            <Text style={[styles.priorityColCount, { color: colors.error }]}>
              {urgentCount} ACTIVE
            </Text>
          </View>
          <View
            style={[
              styles.meterBg,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <View
              style={[
                styles.meterFill,
                {
                  backgroundColor: colors.error,
                  height: `${activeTasks.length > 0 ? Math.round((urgentCount / activeTasks.length) * 100) : 0}%`,
                },
              ]}
            />
          </View>
          <Text
            style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}
          >
            Immediate action required
          </Text>
        </View>

        {/* High */}
        <View
          style={[
            styles.priorityColCard,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.priorityColHeader}>
            <Text style={[styles.priorityColName, { color: colors.primary }]}>
              HIGH
            </Text>
            <Text style={[styles.priorityColCount, { color: colors.primary }]}>
              {highCount} ACTIVE
            </Text>
          </View>
          <View
            style={[
              styles.meterBg,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <View
              style={[
                styles.meterFill,
                {
                  backgroundColor: colors.primary,
                  height: `${activeTasks.length > 0 ? Math.round((highCount / activeTasks.length) * 100) : 0}%`,
                },
              ]}
            />
          </View>
          <Text
            style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}
          >
            Key milestone deliverables
          </Text>
        </View>

        {/* Medium */}
        <View
          style={[
            styles.priorityColCard,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.priorityColHeader}>
            <Text style={[styles.priorityColName, { color: colors.onSurface }]}>
              MEDIUM
            </Text>
            <Text
              style={[
                styles.priorityColCount,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {mediumCount} ACTIVE
            </Text>
          </View>
          <View
            style={[
              styles.meterBg,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <View
              style={[
                styles.meterFill,
                {
                  backgroundColor: colors.primaryContainer,
                  height: `${activeTasks.length > 0 ? Math.round((mediumCount / activeTasks.length) * 100) : 0}%`,
                },
              ]}
            />
          </View>
          <Text
            style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}
          >
            Standard workflow progress
          </Text>
        </View>

        {/* Low */}
        <View
          style={[
            styles.priorityColCard,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.priorityColHeader}>
            <Text style={[styles.priorityColName, { color: colors.outline }]}>
              LOW
            </Text>
            <Text style={[styles.priorityColCount, { color: colors.outline }]}>
              {lowCount} ACTIVE
            </Text>
          </View>
          <View
            style={[
              styles.meterBg,
              { backgroundColor: colors.surfaceContainer },
            ]}
          >
            <View
              style={[
                styles.meterFill,
                {
                  backgroundColor: colors.surfaceVariant,
                  height: `${activeTasks.length > 0 ? Math.round((lowCount / activeTasks.length) * 100) : 0}%`,
                },
              ]}
            />
          </View>
          <Text
            style={[styles.meterSubtext, { color: colors.onSurfaceVariant }]}
          >
            Backlog & deferred tasks
          </Text>
        </View>
      </View>
    </View>
  );
}
