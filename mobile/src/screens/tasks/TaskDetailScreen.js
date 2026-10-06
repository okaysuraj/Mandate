import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const TaskDetailScreen = ({ route, navigation }) => {
  const { colors, typography } = useTheme();
  const routeTask = route.params?.task;
  const taskId = route.params?.taskId || routeTask?._id || routeTask?.id;

  const [task, setTask] = useState(routeTask || null);
  const [loading, setLoading] = useState(!routeTask);
  const [saving, setSaving] = useState(false);

  // Editable fields matching web TaskDetailPage.jsx
  const [title, setTitle] = useState(routeTask?.title || "");
  const [description, setDescription] = useState(
    routeTask?.description || routeTask?.content || ""
  );
  const [status, setStatus] = useState(routeTask?.status || "pending");
  const [priority, setPriority] = useState(routeTask?.priority || "medium");
  const [dueDate, setDueDate] = useState(
    routeTask?.dueDate
      ? new Date(routeTask.dueDate).toISOString().split("T")[0]
      : ""
  );

  // Subtasks & Comments
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  useEffect(() => {
    const fetchFullTask = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/tasks/${taskId}`);
        const t = res.data?.data || res.data;
        if (t) {
          setTask(t);
          setTitle(t.title || "");
          setDescription(t.description || t.content || "");
          setStatus(t.status || "pending");
          setPriority(t.priority || "medium");
          setDueDate(
            t.dueDate ? new Date(t.dueDate).toISOString().split("T")[0] : ""
          );
        }

        // Subtasks
        try {
          const subRes = await api.get("/tasks", {
            params: { parentTaskId: taskId },
          });
          setSubtasks(subRes.data?.data || subRes.data || []);
        } catch (e) {
          // ignore
        }

        // Comments
        try {
          const commRes = await api.get(`/tasks/${taskId}/comments`);
          setComments(commRes.data?.data || commRes.data || []);
        } catch (e) {
          // ignore
        }
      } catch (err) {
        console.warn("Failed to load task details", err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchFullTask();
    }
  }, [taskId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await api.put(`/tasks/${taskId}`, {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      });
      setTask(res.data?.data || res.data || { ...task, title, description, status, priority });
      Alert.alert("Success", "Mandate updated successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to update mandate");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to terminate this mandate?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/tasks/${taskId}`);
              navigation.goBack();
            } catch (err) {
              Alert.alert("Error", "Failed to delete mandate");
            }
          },
        },
      ]
    );
  };

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    try {
      const res = await api.post("/tasks", {
        title: newSubtaskTitle.trim(),
        parentTaskId: taskId,
        workspaceId: task?.workspaceId,
        priority: "medium",
        status: "pending",
      });
      const created = res.data?.data || res.data;
      setSubtasks([...subtasks, created]);
      setNewSubtaskTitle("");
    } catch (err) {
      Alert.alert("Error", "Failed to add subtask");
    }
  };

  const handleToggleSubtask = async (subId, currentStatus) => {
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await api.put(`/tasks/${subId}`, { status: nextStatus });
      setSubtasks(
        subtasks.map((s) =>
          (s._id || s.id) === subId ? { ...s, status: nextStatus } : s
        )
      );
    } catch (err) {
      // ignore
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      setPostingComment(true);
      const res = await api.post(`/tasks/${taskId}/comments`, {
        content: newComment.trim(),
      });
      const created = res.data?.data || res.data;
      setComments([created, ...comments]);
      setNewComment("");
    } catch (err) {
      Alert.alert("Error", "Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <AppHeader title="DETAILS" showBack navigation={navigation} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.onSurfaceVariant }]}>
            LOADING TASK DETAILS...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const completedSubtasksCount = subtasks.filter(
    (s) => s.status === "completed"
  ).length;
  const progressPercent =
    subtasks.length > 0
      ? Math.round((completedSubtasksCount / subtasks.length) * 100)
      : status === "completed"
      ? 100
      : status === "in-progress"
      ? 50
      : 0;

  const displayCode = String(taskId || "0000").slice(-4).toUpperCase();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="DETAILS" showBack navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header Bar matching web TaskDetailPage.jsx */}
        <View style={[styles.topHeaderCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.topMetaRow}>
            <View style={[styles.mndCodeBadge, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
              <Text style={[styles.mndCodeText, { color: colors.onSurface }]}>
                #MND-{displayCode}
              </Text>
            </View>

            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor:
                    status === "completed"
                      ? colors.tertiaryContainer
                      : status === "in-progress"
                      ? colors.surfaceContainerHighest
                      : colors.secondaryContainer,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusPillText,
                  {
                    color:
                      status === "completed"
                        ? colors.onTertiaryContainer
                        : status === "in-progress"
                        ? colors.primary
                        : colors.onSecondaryContainer,
                  },
                ]}
              >
                {status.toUpperCase()}
              </Text>
            </View>

            <Text style={[styles.createdDateText, { color: colors.onSurfaceVariant }]}>
              {new Date(task?.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>

          <Text style={[styles.taskHeadline, { color: colors.onSurface }]}>
            {title || "Untitled Mandate"}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <Text style={[styles.saveBtnText, { color: colors.onPrimary }]}>
                {saving ? "SAVING..." : "SAVE MANDATE"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.deleteBtn, { backgroundColor: colors.errorContainer, borderColor: colors.error }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.deleteBtnText, { color: colors.error }]}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Details Card */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.sectionCardLabel, { color: colors.onSurfaceVariant }]}>
            TASK DETAILS
          </Text>

          {/* Task Title */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>
              TASK TITLE
            </Text>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, color: colors.onSurface }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title..."
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>

          {/* Instructions & Context */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>
              INSTRUCTIONS & CONTEXT
            </Text>
            <TextInput
              style={[
                styles.textArea,
                { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, color: colors.onSurface },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Specify operating procedures, criteria for completion..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Status & Priority Selectors */}
          <View style={styles.selectorRow}>
            {/* Status */}
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>STATUS</Text>
              <View style={styles.chipPicker}>
                {["pending", "in-progress", "completed"].map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setStatus(s)}
                    style={[
                      styles.chipItem,
                      {
                        backgroundColor: status === s ? colors.primary : colors.surfaceContainerLow,
                        borderColor: status === s ? colors.primary : colors.outlineVariant,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipItemText,
                        { color: status === s ? colors.onPrimary : colors.onSurfaceVariant },
                      ]}
                    >
                      {s.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Priority */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>PRIORITY</Text>
            <View style={styles.chipPicker}>
              {["low", "medium", "high", "urgent"].map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  style={[
                    styles.chipItem,
                    {
                      backgroundColor: priority === p ? colors.primary : colors.surfaceContainerLow,
                      borderColor: priority === p ? colors.primary : colors.outlineVariant,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipItemText,
                      { color: priority === p ? colors.onPrimary : colors.onSurfaceVariant },
                    ]}
                  >
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Execution Velocity Progress Bar Card */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.velocityHeader}>
            <Text style={[styles.sectionCardLabel, { color: colors.onSurfaceVariant }]}>
              EXECUTION VELOCITY
            </Text>
            <Text style={[styles.velocityPercent, { color: colors.onSurface }]}>
              {progressPercent}%
            </Text>
          </View>
          <View style={[styles.velocityBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.velocityBarFill, { backgroundColor: colors.primary, width: `${progressPercent}%` }]} />
          </View>
          <Text style={[styles.velocitySubtext, { color: colors.onSurfaceVariant }]}>
            {completedSubtasksCount} of {subtasks.length} subtasks completed.
          </Text>
        </View>

        {/* Subtask Phases Card */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.velocityHeader}>
            <Text style={[styles.sectionCardLabel, { color: colors.onSurfaceVariant }]}>
              SUBTASK PHASES
            </Text>
            <Text style={[styles.velocityPercent, { color: colors.onSurface }]}>
              {completedSubtasksCount}/{subtasks.length}
            </Text>
          </View>

          {/* Add Subtask Row */}
          <View style={styles.addSubtaskRow}>
            <TextInput
              style={[
                styles.addSubtaskInput,
                { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, color: colors.onSurface },
              ]}
              value={newSubtaskTitle}
              onChangeText={setNewSubtaskTitle}
              placeholder="Append operational subtask..."
              placeholderTextColor={colors.onSurfaceVariant}
            />
            <TouchableOpacity
              onPress={handleAddSubtask}
              style={[styles.addSubtaskBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <Text style={[styles.addSubtaskBtnText, { color: colors.onPrimary }]}>ADD</Text>
            </TouchableOpacity>
          </View>

          {/* Subtasks List */}
          <View style={styles.subtasksList}>
            {subtasks.length === 0 ? (
              <Text style={[styles.emptySubtasksText, { color: colors.onSurfaceVariant }]}>
                No subtask phases initialized.
              </Text>
            ) : (
              subtasks.map((sub) => {
                const isSubDone = sub.status === "completed";
                const subId = sub._id || sub.id;

                return (
                  <TouchableOpacity
                    key={subId}
                    onPress={() => handleToggleSubtask(subId, sub.status)}
                    style={[
                      styles.subtaskItem,
                      {
                        backgroundColor: colors.surfaceContainerLow,
                        borderColor: colors.outlineVariant,
                        opacity: isSubDone ? 0.6 : 1,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={isSubDone ? "check-box" : "check-box-outline-blank"}
                      size={18}
                      color={isSubDone ? colors.primary : colors.outline}
                    />
                    <Text
                      style={[
                        styles.subtaskItemText,
                        {
                          color: colors.onSurface,
                          textDecorationLine: isSubDone ? "line-through" : "none",
                        },
                      ]}
                    >
                      {sub.title}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* Mission Logs & Communications (Comments) */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.sectionCardLabel, { color: colors.onSurfaceVariant }]}>
            MISSION LOGS & COMMUNICATIONS
          </Text>

          {/* Add Comment Input */}
          <View style={styles.addCommentBox}>
            <TextInput
              style={[
                styles.commentInput,
                { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, color: colors.onSurface },
              ]}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Record an operational log or update..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              numberOfLines={2}
            />
            <TouchableOpacity
              onPress={handleAddComment}
              disabled={postingComment || !newComment.trim()}
              style={[
                styles.postLogBtn,
                {
                  backgroundColor: colors.primary,
                  opacity: postingComment || !newComment.trim() ? 0.5 : 1,
                },
              ]}
              activeOpacity={0.85}
            >
              <Text style={[styles.postLogBtnText, { color: colors.onPrimary }]}>
                {postingComment ? "TRANSMITTING..." : "POST LOG"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <View style={styles.commentsList}>
            {comments.length === 0 ? (
              <Text style={[styles.emptySubtasksText, { color: colors.onSurfaceVariant }]}>
                No log communications recorded yet.
              </Text>
            ) : (
              comments.map((c, i) => (
                <View
                  key={c._id || i}
                  style={[
                    styles.commentItem,
                    {
                      backgroundColor: colors.surfaceContainerLow,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                >
                  <View style={styles.commentMetaRow}>
                    <Text style={[styles.commentAuthor, { color: colors.onSurface }]}>
                      {c.user?.name || "Team Member"}
                    </Text>
                    <Text style={[styles.commentTime, { color: colors.onSurfaceVariant }]}>
                      {new Date(c.createdAt || Date.now()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                  <Text style={[styles.commentContent, { color: colors.onSurface }]}>
                    {c.content}
                  </Text>
                </View>
              ))
            )}
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
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 1,
  },
  // Top Header Card
  topHeaderCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  topMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mndCodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  mndCodeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusPillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  createdDateText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  taskHeadline: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 22,
    lineHeight: 26,
    textTransform: "uppercase",
  },
  actionButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  deleteBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  deleteBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  // Section Cards
  sectionCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionCardLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 13,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 13,
    minHeight: 80,
    textAlignVertical: "top",
  },
  selectorRow: {
    flexDirection: "row",
    gap: 8,
  },
  chipPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chipItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  chipItemText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  // Velocity
  velocityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  velocityPercent: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 13,
  },
  velocityBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  velocityBarFill: {
    height: "100%",
  },
  velocitySubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  // Subtasks
  addSubtaskRow: {
    flexDirection: "row",
    gap: 8,
  },
  addSubtaskInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
  },
  addSubtaskBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addSubtaskBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  subtasksList: {
    gap: 6,
  },
  emptySubtasksText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
    fontStyle: "italic",
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  subtaskItemText: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    flex: 1,
  },
  // Comments
  addCommentBox: {
    gap: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    minHeight: 50,
  },
  postLogBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postLogBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.6,
  },
  commentsList: {
    gap: 8,
  },
  commentItem: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  commentMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentAuthor: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  commentTime: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
  commentContent: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    lineHeight: 16,
  },
});

export default TaskDetailScreen;
