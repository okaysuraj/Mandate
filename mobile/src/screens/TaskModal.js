import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, SafeAreaView, ScrollView, Platform, Alert,
} from "react-native";
import { colors, fonts, spacing, borderRadius } from "../theme";

const PRIORITIES = ["low", "medium", "high"];
const STATUSES = ["pending", "in-progress", "completed"];

const TaskModal = ({ visible, onClose, onSave, initialData, projects = [] }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [priority, setPriority] = useState(initialData?.priority || "medium");
  const [status, setStatus] = useState(initialData?.status || "pending");
  const [project, setProject] = useState(initialData?.project || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().slice(0, 10) : "");

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    const taskData = {
      title: title.trim(),
      content: content.trim(),
      priority,
      status,
      ...(project ? { project } : {}),
      ...(dueDate ? { dueDate: new Date(dueDate).toISOString() } : {}),
    };
    onSave(taskData);
  };

  const getPriorityStyle = (p) => ({
    backgroundColor: priority === p ? colors.primary : "transparent",
    borderColor: priority === p ? colors.primary : colors.border,
  });

  const getPriorityTextStyle = (p) => ({
    color: priority === p ? colors.white : colors.textSecondary,
  });

  const getStatusStyle = (s) => ({
    backgroundColor: status === s ? colors.primary : "transparent",
    borderColor: status === s ? colors.primary : colors.border,
  });

  const getStatusTextStyle = (s) => ({
    color: status === s ? colors.white : colors.textSecondary,
  });

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {initialData ? "EDIT TASK" : "NEW TASK"}
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.inputGroup}>
            <Text style={styles.label}>TITLE</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Add details..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PRIORITY</Text>
            <View style={styles.chipRow}>
              {PRIORITIES.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.chip, getPriorityStyle(p)]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[styles.chipText, getPriorityTextStyle(p)]}>
                    {p.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>STATUS</Text>
            <View style={styles.chipRow}>
              {STATUSES.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, getStatusStyle(s)]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.chipText, getStatusTextStyle(s)]}>
                    {s.toUpperCase().replace("-", " ")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DUE DATE (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="2026-06-30"
              placeholderTextColor={colors.textMuted}
              keyboardType={Platform.OS === "ios" ? "default" : "default"}
            />
          </View>

          {projects.length > 0 && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PROJECT</Text>
              <View style={styles.chipRow}>
                <TouchableOpacity
                  style={[styles.chip, !project ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.border }]}
                  onPress={() => setProject("")}
                >
                  <Text style={[styles.chipText, { color: !project ? colors.white : colors.textSecondary }]}>NONE</Text>
                </TouchableOpacity>
                {projects.map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.chip, project === p ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.border }]}
                    onPress={() => setProject(p)}
                  >
                    <Text style={[styles.chipText, { color: project === p ? colors.white : colors.textSecondary }]}>
                      {p.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cancelText: { ...fonts.tiny, color: colors.textSecondary },
  headerTitle: { ...fonts.tiny, color: colors.primary },
  saveText: { ...fonts.tiny, color: colors.primary },
  form: { padding: spacing.lg, gap: spacing.lg },
  inputGroup: { gap: spacing.sm },
  label: { ...fonts.tiny },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textArea: { minHeight: 100 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  chipText: { fontSize: 10, fontWeight: "700", letterSpacing: 1 },
});

export default TaskModal;
