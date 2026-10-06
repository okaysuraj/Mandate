import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../../context/ThemeContext";

const TaskModal = ({ visible, onClose, onSave, task = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [timeEstimate, setTimeEstimate] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (task) {
      setTimeEstimate(String(task.timeEstimate || 0));
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "pending");
      setPriority(task.priority || "medium");
    } else {
      setTimeEstimate('');
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
        priority,
        timeEstimate: Number(timeEstimate||0),
      });
      onClose();
    } catch (error) {
      // handled
    } finally {
      setLoading(false);
    }
  };

  const renderSegmentBtn = (value, label, isFirst, isLast) => {
    const isSelected = value === priority;
    return (
      <TouchableOpacity
        style={[
          styles.segmentBtn,
          {
            backgroundColor: isSelected ? colors.primary : colors.surfaceContainerLowest,
            borderLeftWidth: isFirst ? 0 : 1,
            borderLeftColor: colors.outlineVariant,
          }
        ]}
        onPress={() => setPriority(value)}
      >
        <Text style={[typography.labelCaps, { color: isSelected ? colors.onPrimary : colors.onSurfaceVariant }]}>
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
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>
                {task ? "EDIT TASK" : "CREATE TASK"}
              </Text>
            </View>
            <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <ScrollView style={styles.formContent} contentContainerStyle={{ gap: 24, paddingBottom: 40 }}>
            {/* Name */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                01 // TASK TITLE
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <TextInput
                  style={[
                    typography.headlineLgMobile,
                    { color: colors.primary, textTransform: 'uppercase' }
                  ]}
                  placeholder="ENTER TASK TITLE..."
                  placeholderTextColor={colors.outlineVariant}
                  value={title}
                  onChangeText={setTitle}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Description */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                02 // DESCRIPTION
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <TextInput
                  style={[
                    typography.bodyMd,
                    { color: colors.primary, minHeight: 80 }
                  ]}
                  placeholder="Add details, notes, or specifications..."
                  placeholderTextColor={colors.outlineVariant}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Priority Level */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                03 // PRIORITY LEVEL
              </Text>
              <View style={[styles.segmentedControl, { borderColor: colors.outlineVariant }]}>
                {renderSegmentBtn("urgent", "URGENT", true, false)}
                {renderSegmentBtn("high", "HIGH", false, false)}
                {renderSegmentBtn("medium", "MEDIUM", false, false)}
                {renderSegmentBtn("low", "LOW", false, true)}
              </View>
            </View>

            <View><Text style={{color:colors.onSurface}}>Estimate in minutes</Text><TextInput accessibilityLabel="Estimate in minutes" keyboardType="numeric" value={timeEstimate} onChangeText={setTimeEstimate} style={{padding:12,color:colors.onSurface,borderWidth:1,borderColor:colors.outlineVariant}}/></View>
            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>
                    {task ? "SAVE CHANGES" : "CREATE TASK"}
                  </Text>
                  <MaterialIcons name="check" size={20} color={colors.onPrimary} style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>

          </ScrollView>
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
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  formContent: {
    padding: 24,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderWidth: 1,
    overflow: 'hidden',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeBox: {
    height: 128,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusToken: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 16,
  }
});

export default TaskModal;
