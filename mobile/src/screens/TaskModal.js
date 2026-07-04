import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const TaskModal = ({ visible, onClose, onSave, task = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "pending");
      setPriority(task.priority || "medium");
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
    }
  }, [task, visible]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSave({
        ...(task && { _id: task._id }),
        title,
        description,
        status,
        priority
      });
      onClose();
    } catch (error) {
      // handled
    } finally {
      setLoading(false);
    }
  };

  const renderOptionBtn = (value, current, setValue, label) => {
    const isSelected = value === current;
    return (
      <TouchableOpacity
        style={[
          styles.optionBtn,
          { 
            backgroundColor: isSelected ? colors.primary : colors.surfaceContainer,
            borderColor: isSelected ? colors.primary : colors.outlineVariant,
            borderRadius: borderRadius.DEFAULT
          }
        ]}
        onPress={() => setValue(value)}
      >
        <Text style={[typography.labelCaps, { color: isSelected ? colors.onPrimary : colors.secondary }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView 
        style={styles.modalOverlay} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>NODE CONFIGURATION</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>
                {task ? "EDIT TASK" : "NEW TASK"}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContent}>
            {/* Title */}
            <View style={styles.formGroup}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>NODE DESIGNATION</Text>
              <TextInput
                style={[
                  styles.input,
                  typography.bodyMd,
                  { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, color: colors.primary }
                ]}
                placeholder="Enter designation..."
                placeholderTextColor={colors.outline}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Description */}
            <View style={styles.formGroup}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>PARAMETERS / DESC</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  typography.bodyMd,
                  { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, color: colors.primary }
                ]}
                placeholder="Operational parameters..."
                placeholderTextColor={colors.outline}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Priority */}
            <View style={styles.formGroup}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>PRIORITY PROTOCOL</Text>
              <View style={styles.optionsRow}>
                {renderOptionBtn("low", priority, setPriority, "ROUTINE")}
                {renderOptionBtn("medium", priority, setPriority, "MEDIUM")}
                {renderOptionBtn("high", priority, setPriority, "CRITICAL")}
                {renderOptionBtn("urgent", priority, setPriority, "URGENT")}
              </View>
            </View>

            {/* Status (only if editing) */}
            {task && (
              <View style={styles.formGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>NODE STATUS</Text>
                <View style={styles.optionsRow}>
                  {renderOptionBtn("pending", status, setStatus, "PENDING")}
                  {renderOptionBtn("in-progress", status, setStatus, "ACTIVE")}
                  {renderOptionBtn("completed", status, setStatus, "COMPLETE")}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: colors.outlineVariant }]}>
            <TouchableOpacity 
              style={[styles.saveBtn, { backgroundColor: colors.primary, borderRadius: borderRadius.DEFAULT }, loading && { opacity: 0.7 }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>COMMIT CHANGES</Text>
                  <MaterialIcons name="check" size={18} color={colors.onPrimary} style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContent: {
    padding: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionBtn: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  }
});

export default TaskModal;
