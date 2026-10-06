import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { createTask } from '../../services/taskService';
import AppHeader from '../../components/layout/AppHeader';

const CreateTaskScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [timeEstimate, setTimeEstimate] = useState(60);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const priorityMap = {
        URGENT: 'urgent',
        HIGH: 'high',
        MEDIUM: 'medium',
        LOW: 'low',
      };

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority: priorityMap[priority] || 'medium',
        status: 'pending',
        timeEstimate: Number(timeEstimate) || 0,
        workspaceId: user?.activeWorkspace,
      };

      if (dueDate && dueDate.trim()) {
        taskData.dueDate = dueDate.trim();
      }

      await createTask(taskData);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const renderPriorityBtn = (label) => {
    const isActive = priority === label;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.priorityBtn,
          {
            backgroundColor: isActive ? colors.primary : colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
        onPress={() => setPriority(label)}
      >
        <Text style={[typography.labelCaps, { color: isActive ? colors.onPrimary : colors.onSurfaceVariant, fontSize: 11 }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="NEW TASK" showBack={true} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: 24 }]}>
          <View style={styles.formSpace}>
            
            {/* 01 TASK TITLE */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>
                01 // TASK TITLE
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <TextInput
                  style={[typography.bodyMd, { color: colors.primary, fontSize: 16, fontWeight: '700' }]}
                  placeholder="What needs to be done?"
                  placeholderTextColor={colors.outlineVariant}
                  value={title}
                  onChangeText={setTitle}
                  autoFocus={true}
                />
              </View>
            </View>

            {/* DESCRIPTION */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>
                DESCRIPTION (OPTIONAL)
              </Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <TextInput
                  style={[typography.bodyMd, { color: colors.onSurface, minHeight: 60 }]}
                  placeholder="Add notes, links, or extra context..."
                  placeholderTextColor={colors.outlineVariant}
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* 02 PRIORITY */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>
                02 // PRIORITY LEVEL
              </Text>
              <View style={[styles.priorityGroup, { borderColor: colors.outlineVariant }]}>
                {['URGENT', 'HIGH', 'MEDIUM', 'LOW'].map(renderPriorityBtn)}
              </View>
            </View>

            {/* 03 DUE DATE */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>
                03 // SCHEDULE & DUE DATE
              </Text>
              <View style={styles.row}>
                <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                  <Text style={[typography.labelSm, { color: colors.outline, marginBottom: spacing.xs }]}>
                    DUE DATE (YYYY-MM-DD)
                  </Text>
                  <TextInput
                    style={[typography.labelCaps, { color: colors.onSurface }]}
                    placeholder="e.g. 2026-10-15"
                    placeholderTextColor={colors.outlineVariant}
                    value={dueDate}
                    onChangeText={setDueDate}
                  />
                </View>
              </View>
            </View>

            {/* 04 ESTIMATED TIME */}
            <View>
              <View style={styles.allocationHeader}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>
                  04 // TIME ESTIMATE
                </Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>{timeEstimate} MIN</Text>
              </View>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <View style={styles.timeButtonsRow}>
                  {[15, 30, 45, 60, 90, 120].map((mins) => (
                    <TouchableOpacity
                      key={mins}
                      onPress={() => setTimeEstimate(mins)}
                      style={[
                        styles.timePill,
                        {
                          backgroundColor: timeEstimate === mins ? colors.primary : colors.surfaceContainer,
                          borderColor: colors.outlineVariant,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          typography.labelSm,
                          {
                            color: timeEstimate === mins ? colors.onPrimary : colors.onSurfaceVariant,
                            fontWeight: '600',
                          },
                        ]}
                      >
                        {mins}m
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <View style={{ paddingTop: spacing.md }}>
              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
                onPress={handleCreate}
                disabled={loading || !title.trim()}
              >
                <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.md, fontWeight: '700' }]}>
                  {loading ? 'CREATING TASK...' : 'CREATE TASK'}
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingBottom: 96,
  },
  mainContent: {},
  formSpace: {
    gap: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
  },
  priorityGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
  },
  allocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  timeButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  timePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
});

export default CreateTaskScreen;
