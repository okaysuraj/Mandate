import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";
import { getProjects } from "../../services/projectService";

const ProjectsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { colors, typography } = useTheme();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active"); // "active" or "archived"

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects({ workspaceId: user?.activeWorkspace });
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const activeCount = projects.filter(
    (p) => p.status !== "completed" && p.status !== "archived"
  ).length;
  const completedCount = projects.filter(
    (p) => p.status === "completed" || p.status === "archived"
  ).length;
  const systemHealth =
    projects.length > 0
      ? ((completedCount / projects.length) * 100).toFixed(1)
      : "0.0";
  const criticalCount = projects.filter(
    (p) =>
      p.status === "active" &&
      (p.priority === "urgent" || p.priority === "high")
  ).length;

  const getProgress = (p) => {
    if (p.status === "completed") return 100;
    if (typeof p.progress === "number") return p.progress;
    if (p.taskCount > 0) {
      return Math.round(((p.completedTaskCount || 0) / p.taskCount) * 100);
    }
    if (p.status === "archived") return 100;
    return 0;
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "completed":
        return {
          label: "COMPLETED",
          bg: colors.surfaceContainerHighest,
          text: colors.onSurfaceVariant,
          dot: colors.tertiary,
        };
      case "active":
        return {
          label: "ACTIVE",
          bg: colors.tertiaryContainer,
          text: colors.onTertiaryContainer,
          dot: colors.tertiary,
        };
      case "archived":
        return {
          label: "ARCHIVED",
          bg: colors.surfaceContainerHigh,
          text: colors.onSurfaceVariant,
          dot: colors.outline,
        };
      default:
        return {
          label: "STALLED",
          bg: colors.surfaceContainerHigh,
          text: colors.onSurfaceVariant,
          dot: colors.outline,
        };
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === "active")
      return p.status !== "completed" && p.status !== "archived";
    if (filter === "archived")
      return p.status === "completed" || p.status === "archived";
    return true;
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="PROJECTS" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchProjects}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header matching web ProjectsPage.jsx */}
        <View style={[styles.sectionHeader, { borderBottomColor: colors.outlineVariant }]}>
          <View>
            <View style={styles.headerTagRow}>
              <View style={[styles.headerTagDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.headerTagText, { color: colors.onSurfaceVariant }]}>
                REGISTRY OVERVIEW · PORTFOLIO MATRIX
              </Text>
            </View>
            <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
              Industrial Projects
            </Text>
          </View>

          {/* Active / Archived Filter Switcher */}
          <View style={[styles.filterSwitcher, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <TouchableOpacity
              onPress={() => setFilter("active")}
              style={[
                styles.filterTab,
                filter === "active" && {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color: filter === "active" ? colors.onPrimary : colors.onSurfaceVariant,
                  },
                ]}
              >
                ACTIVE ({activeCount})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("archived")}
              style={[
                styles.filterTab,
                filter === "archived" && {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color: filter === "archived" ? colors.onPrimary : colors.onSurfaceVariant,
                  },
                ]}
              >
                ARCHIVED ({completedCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Modules Bento (3 cards) */}
        <View style={styles.bentoModulesGrid}>
          {/* System Health */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoTag, { color: colors.onSurfaceVariant }]}>
              SYSTEM HEALTH
            </Text>
            <View style={styles.valRow}>
              <Text style={[styles.bentoVal, { color: colors.onSurface }]}>{systemHealth}</Text>
              <Text style={[styles.bentoUnit, { color: colors.onSurfaceVariant }]}>%</Text>
            </View>
            <View style={[styles.barBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View
                style={[
                  styles.barFill,
                  { backgroundColor: colors.primary, width: `${parseFloat(systemHealth)}%` },
                ]}
              />
            </View>
          </View>

          {/* Active Operators */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoTag, { color: colors.onSurfaceVariant }]}>
              ACTIVE OPERATORS
            </Text>
            <Text style={[styles.bentoVal, { color: colors.onSurface }]}>142</Text>
            <Text style={[styles.bentoSubtext, { color: colors.onSurfaceVariant }]}>
              Across 18 regional hubs
            </Text>
          </View>

          {/* Critical Blocks */}
          <View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <Text style={[styles.bentoTag, { color: colors.onSurfaceVariant }]}>
              CRITICAL BLOCKS
            </Text>
            <Text style={[styles.bentoVal, { color: colors.onSurface }]}>
              {String(criticalCount).padStart(2, "0")}
            </Text>
            <View
              style={[
                styles.statusMiniPill,
                {
                  backgroundColor:
                    criticalCount > 0 ? colors.errorContainer : colors.tertiaryContainer,
                  borderColor: criticalCount > 0 ? colors.error : colors.outlineVariant,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusMiniPillText,
                  { color: criticalCount > 0 ? colors.error : colors.onTertiaryContainer },
                ]}
              >
                {criticalCount > 0 ? "REQUIRES ATTENTION" : "NOMINAL"}
              </Text>
            </View>
          </View>
        </View>

        {/* Project Cards List */}
        <View style={styles.projectsList}>
          {loading && projects.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant }]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.emptyText, { color: colors.onSurfaceVariant, marginTop: 8 }]}>
                LOADING REGISTRY...
              </Text>
            </View>
          ) : filteredProjects.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant }]}>
              <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                NO PROJECTS MATCHING CRITERIA
              </Text>
            </View>
          ) : (
            filteredProjects.map((project, i) => {
              const status = getStatusChip(project.status);
              const progress = getProgress(project);

              return (
                <TouchableOpacity
                  key={project._id || i}
                  onPress={() =>
                    navigation.navigate("ProjectDetail", {
                      project,
                      projectId: project._id,
                    })
                  }
                  style={[
                    styles.projectCard,
                    {
                      backgroundColor: colors.surfaceContainerLowest,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.projectCardTop}>
                    <Text style={[styles.prjIdText, { color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                      #PRJ-{String(2400 + i).padStart(4, "0")}
                    </Text>

                    <View style={[styles.projectStatusPill, { backgroundColor: status.bg, borderColor: colors.outlineVariant }]}>
                      <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
                      <Text style={[styles.projectStatusText, { color: status.text }]}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.projectName, { color: colors.onSurface }]} numberOfLines={1}>
                    {project.name || project.title || "Untitled Project"}
                  </Text>

                  {/* Progress */}
                  <View style={styles.progressRow}>
                    <View style={styles.progressLabelRow}>
                      <Text style={[styles.progressLabel, { color: colors.onSurfaceVariant }]}>
                        Progress
                      </Text>
                      <Text style={[styles.progressVal, { color: colors.onSurface }]}>
                        {progress}%
                      </Text>
                    </View>
                    <View style={[styles.barBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            backgroundColor: progress < 50 ? colors.error : colors.primary,
                            width: `${progress}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={[styles.projectCardFooter, { borderTopColor: colors.outlineVariant }]}>
                    <Text style={[styles.projectDueDate, { color: colors.onSurfaceVariant }]}>
                      DUE:{" "}
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString("en-GB")
                        : "UNSCHEDULED"}
                    </Text>
                    <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* Critical Timeline & Sector Allocation Bento Bottom */}
        <View style={styles.bottomBentoSection}>
          {/* Critical Timeline */}
          <View style={[styles.bentoBottomCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.bottomCardTitle, { color: colors.onSurfaceVariant, borderBottomColor: colors.outlineVariant }]}>
              CRITICAL TIMELINE
            </Text>
            <View style={styles.timelineList}>
              {projects
                .filter((p) => p.priority === "urgent" || p.priority === "high")
                .slice(0, 3)
                .map((p, idx) => (
                  <View
                    key={p._id || idx}
                    style={[
                      styles.timelineItem,
                      {
                        backgroundColor: colors.surfaceContainerLow,
                        borderColor: colors.outlineVariant,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.timelineDot,
                        {
                          backgroundColor:
                            p.priority === "urgent" ? colors.error : colors.primary,
                        },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.timelineItemTitle, { color: colors.onSurface }]} numberOfLines={1}>
                        {p.name || p.title}
                      </Text>
                      <Text style={[styles.timelineItemDesc, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
                        {p.description || "No description provided."}
                      </Text>
                    </View>
                  </View>
                ))}
              {projects.filter((p) => p.priority === "urgent" || p.priority === "high").length === 0 && (
                <Text style={[styles.emptyTimelineText, { color: colors.onSurfaceVariant }]}>
                  No critical timeline items found.
                </Text>
              )}
            </View>
          </View>

          {/* Sector Allocation */}
          <View style={[styles.bentoBottomCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.bottomCardTitle, { color: colors.onSurfaceVariant, borderBottomColor: colors.outlineVariant }]}>
              SECTOR ALLOCATION
            </Text>
            <View style={styles.sectorList}>
              <View style={styles.sectorRow}>
                <View style={styles.sectorLabelLeft}>
                  <View style={[styles.sectorDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.sectorName, { color: colors.onSurface }]}>Energy</Text>
                </View>
                <Text style={[styles.sectorPercent, { color: colors.onSurface }]}>62%</Text>
              </View>

              <View style={styles.sectorRow}>
                <View style={styles.sectorLabelLeft}>
                  <View style={[styles.sectorDot, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={[styles.sectorName, { color: colors.onSurface }]}>Manufacturing</Text>
                </View>
                <Text style={[styles.sectorPercent, { color: colors.onSurface }]}>28%</Text>
              </View>

              <View style={styles.sectorRow}>
                <View style={styles.sectorLabelLeft}>
                  <View style={[styles.sectorDot, { backgroundColor: colors.tertiary }]} />
                  <Text style={[styles.sectorName, { color: colors.onSurface }]}>Logistics</Text>
                </View>
                <Text style={[styles.sectorPercent, { color: colors.onSurface }]}>10%</Text>
              </View>
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
  filterSwitcher: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    padding: 3,
    alignSelf: "flex-start",
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterTabText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  // Bento Modules
  bentoModulesGrid: {
    gap: 10,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  bentoTag: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  valRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  bentoVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 24,
  },
  bentoUnit: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 14,
  },
  barBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 4,
  },
  barFill: {
    height: "100%",
  },
  bentoSubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
    marginTop: 2,
  },
  statusMiniPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    marginTop: 4,
  },
  statusMiniPillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  // Projects List
  projectsList: {
    gap: 10,
  },
  projectCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  projectCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prjIdText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  projectStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  projectStatusText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  projectName: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  progressRow: {
    gap: 4,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  progressVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  projectCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  projectDueDate: {
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
  // Bottom Bento
  bottomBentoSection: {
    gap: 12,
  },
  bentoBottomCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  bottomCardTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  timelineList: {
    gap: 8,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  timelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  timelineItemTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  timelineItemDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  emptyTimelineText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  sectorList: {
    gap: 8,
  },
  sectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectorLabelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectorName: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  sectorPercent: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
});

export default ProjectsScreen;
