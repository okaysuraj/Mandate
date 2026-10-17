// Workspace completion and priority metrics, plus the activity pulse card.
import styles from "./HomeDashboardScreen.styles";

import { View, Text, Animated } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../../context/ThemeContext";

export function DashboardMetrics({
  loading,
  efficiency,
  completedTasks,
  totalTasks,
  activeTasks,
  urgentCount,
  highCount,
  deepWorkRatio,
  avgLatency,
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.metricsRow}>
      {/* Card 1: Efficiency */}
      <View
        style={[
          styles.bentoCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.cardTopRow}>
          <Text
            style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}
          >
            EFFICIENCY
          </Text>
          <MaterialIcons name="query-stats" size={18} color={colors.outline} />
        </View>
        <View style={styles.valueRow}>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {loading ? "—" : efficiency}
          </Text>
          <Text style={[styles.metricUnit, { color: colors.onSurfaceVariant }]}>
            %
          </Text>
        </View>
        <View
          style={[
            styles.progressBarBg,
            { backgroundColor: colors.surfaceContainer },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${loading ? 0 : efficiency}%`,
              },
            ]}
          />
        </View>
        <Text
          style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}
        >
          {completedTasks} of {totalTasks} tasks completed
        </Text>
      </View>

      {/* Card 2: Active Mandates */}
      <View
        style={[
          styles.bentoCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.cardTopRow}>
          <Text
            style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}
          >
            ACTIVE TASKS
          </Text>
          <MaterialIcons name="hub" size={18} color={colors.outline} />
        </View>
        <View style={styles.valueRow}>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {loading ? "—" : activeTasks.length}
          </Text>
        </View>
        <View style={styles.statusBlocksRow}>
          <View
            style={[
              styles.statusBlock,
              {
                backgroundColor: colors.primary,
                opacity: activeTasks.length > 0 ? 1 : 0.2,
              },
            ]}
          />
          <View
            style={[
              styles.statusBlock,
              {
                backgroundColor: colors.primary,
                opacity: activeTasks.length > 3 ? 1 : 0.2,
              },
            ]}
          />
          <View
            style={[
              styles.statusBlock,
              {
                backgroundColor: colors.primary,
                opacity: activeTasks.length > 6 ? 1 : 0.2,
              },
            ]}
          />
          <View
            style={[
              styles.statusBlock,
              { backgroundColor: colors.surfaceContainer },
            ]}
          />
        </View>
        <Text
          style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}
        >
          {urgentCount} critical, {highCount} high priority
        </Text>
      </View>

      {/* Card 3: High priority tasks */}
      <View
        style={[
          styles.bentoCard,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.cardTopRow}>
          <Text
            style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}
          >
            HIGH PRIORITY TASKS
          </Text>
          <MaterialIcons name="speed" size={18} color={colors.outline} />
        </View>
        <View style={styles.valueRow}>
          <Text style={[styles.metricValue, { color: colors.primary }]}>
            {loading ? "—" : deepWorkRatio}
          </Text>
          <Text style={[styles.metricUnit, { color: colors.onSurfaceVariant }]}>
            %
          </Text>
        </View>
        <View
          style={[
            styles.progressBarBg,
            { backgroundColor: colors.surfaceContainer },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${loading ? 0 : deepWorkRatio}%`,
              },
            ]}
          />
        </View>
        <Text
          style={[styles.metricSubtext, { color: colors.onSurfaceVariant }]}
        >
          Avg latency: {avgLatency}
        </Text>
      </View>
    </View>
  );
}

export function ActivityPulse({
  socket,
  spin,
  recentActivity,
  formatTime,
  loading,
}) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.pulseCard,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.pulseHeader}>
        <Text style={[styles.pulseTitle, { color: colors.primary }]}>
          Recent Task Updates
        </Text>
        <View
          style={[
            styles.pulseBadge,
            {
              backgroundColor: colors.tertiaryContainer,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <Text
            style={[
              styles.pulseBadgeText,
              { color: colors.onTertiaryContainer },
            ]}
          >
            {socket?.connected ? "Live updates" : "Connection unavailable"}
          </Text>
        </View>
      </View>

      {/* Visualizer Radar Box */}
      <View
        style={[
          styles.visualizerBox,
          { backgroundColor: colors.surfaceContainerLow },
        ]}
      >
        <View style={styles.radarWrapper}>
          <Animated.View
            style={[
              styles.outerRadarRing,
              {
                borderColor: isDark
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.1)",
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View
              style={[
                styles.innerRadarRing,
                {
                  borderColor: colors.primary,
                  borderTopColor: "transparent",
                },
              ]}
            />
          </Animated.View>
        </View>
      </View>

      {/* Live Telemetry Stream Logs */}
      <View style={styles.liveLogsList}>
        {recentActivity.map((task) => (
          <View
            key={task._id}
            style={[
              styles.logItemCard,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.logMetaRow}>
              <View
                style={[
                  styles.logDot,
                  {
                    backgroundColor:
                      task.priority === "urgent"
                        ? colors.error
                        : task.status === "completed" || task.status === "done"
                          ? colors.tertiary
                          : colors.primary,
                  },
                ]}
              />
              <Text style={[styles.logTime, { color: colors.onSurface }]}>
                [{formatTime(task.updatedAt || task.createdAt)}] TASK_
                {task.status === "completed" || task.status === "done"
                  ? "DONE"
                  : "UP"}
              </Text>
            </View>
            <Text
              style={[styles.logTaskTitle, { color: colors.onSurfaceVariant }]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
          </View>
        ))}

        {recentActivity.length === 0 && !loading && (
          <View
            style={[
              styles.logItemCard,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.logTime, { color: colors.onSurface }]}>
              No task updates
            </Text>
            <Text
              style={[styles.logTaskTitle, { color: colors.onSurfaceVariant }]}
            >
              No recent activity recorded
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
