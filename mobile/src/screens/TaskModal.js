import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Modal, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const TaskModal = ({ visible, onClose, onSave, task = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [allocation, setAllocation] = useState(75);
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
        priority,
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
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3uS-AaCfL0hkObqtrHUJCH8xA3dLcvqrQSiZO7LTz68SbYJIOQKdHn5yp3AyG2RZCKQ9aeKJm-B2YSONGjI9dgzo0LA4cUiInusAZd8xttTPP3tMQOs5W4720Op8_w1TI6wf7Uh_t--ruFJTPfQtXQqPuVUByrMyNIE5K4byKQz9EFmo9OJvEj8rJJGbp0ChlkVs1MOyA6Id8fo90yuwkKKCGC_L1oYEnWpgKZ16rkUR7deqcKEl1MQ' }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <ScrollView style={styles.formContent} contentContainerStyle={{ gap: 24, paddingBottom: 40 }}>
            {/* Name */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                01 // MANDATE_NAME
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <TextInput
                  style={[
                    typography.headlineLgMobile,
                    { color: colors.primary, textTransform: 'uppercase' }
                  ]}
                  placeholder="ENTER IDENTIFIER..."
                  placeholderTextColor={colors.outlineVariant}
                  value={title}
                  onChangeText={setTitle}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Description (Mapped to Temporal Parameters conceptually in layout, but is description) */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                02 // PARAMETERS
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <TextInput
                  style={[
                    typography.bodyMd,
                    { color: colors.primary, minHeight: 80 }
                  ]}
                  placeholder="OPERATIONAL PARAMS..."
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
                03 // PRIORITY_LEVEL
              </Text>
              <View style={[styles.segmentedControl, { borderColor: colors.outlineVariant }]}>
                {renderSegmentBtn("high", "ALPHA", true, false)}
                {renderSegmentBtn("medium", "BETA", false, false)}
                {renderSegmentBtn("low", "GAMMA", false, true)}
              </View>
            </View>

            {/* Resource Allocation */}
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>
                  04 // RESOURCE_ALLOCATION
                </Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>{allocation}%</Text>
              </View>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, paddingVertical: 24 }]}>
                {/* Visual Fake Slider */}
                <View style={{ height: 4, backgroundColor: colors.surfaceDim, width: '100%', position: 'relative', justifyContent: 'center' }}>
                  <View style={{ position: 'absolute', left: `${allocation}%`, width: 24, height: 24, backgroundColor: colors.primary, marginLeft: -12, borderWidth: 2, borderColor: colors.primary }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>MINIMAL</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CRITICAL_LOAD</Text>
                </View>
              </View>
            </View>

            {/* Decorative Visual Token */}
            <View style={[styles.decorativeBox, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.statusToken, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM_STABLE</Text>
              </View>
            </View>

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
                    {task ? "UPDATE_MANDATE" : "INITIALIZE_MANDATE"}
                  </Text>
                  <MaterialIcons name="bolt" size={20} color={colors.onPrimary} style={{ marginLeft: 8 }} />
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
