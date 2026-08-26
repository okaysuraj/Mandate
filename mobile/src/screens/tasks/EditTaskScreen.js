import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useDataStore } from '../../store/useDataStore';
import axios from 'axios';
import { API_URL } from '../../config/config';

const EditTaskScreen = ({ navigation, route }) => {
  const { colors, typography, spacing } = useTheme();
  const { user } = useAuth();
  const loadTasks = useDataStore(state => state.loadTasks);

  const task = route?.params?.task;

  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !task?._id) return;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/tasks/${task._id}`, {
        title,
        priority,
        status,
        dueDate: dueDate || undefined,
      });
      loadTasks();
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update task', error);
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = ['urgent', 'high', 'medium', 'low'];
  const statusOptions = ['todo', 'in-progress', 'completed'];

  if (!task) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>NO TASK SELECTED</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase', marginLeft: 8 }]}>EDIT_TASK</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: 24 }]}>
          
          {/* Task Header Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.badgeRow}>
              <View style={[styles.badgeOutline, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>TASK_ID: {task._id?.slice(-6).toUpperCase()}</Text>
              </View>
              <View style={[styles.badgeSolid, { backgroundColor: status === 'completed' ? 'rgba(0, 152, 61, 0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <Text style={[typography.labelCaps, { color: status === 'completed' ? colors.onTertiaryContainer : colors.primary }]}>{status.toUpperCase()}</Text>
              </View>
            </View>
          </View>

          {/* Title Input */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.sectionTitleRow}>
              <MaterialIcons name="terminal" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>MANDATE_NAME</Text>
            </View>
            <View style={[styles.inputBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <TextInput
                style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}
                placeholder="ENTER IDENTIFIER..."
                placeholderTextColor={colors.outlineVariant}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Priority Selection */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.sectionTitleRow}>
              <MaterialIcons name="flag" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>PRIORITY_LEVEL</Text>
            </View>
            <View style={[styles.priorityGroup, { borderColor: colors.outlineVariant }]}>
              {priorityOptions.map((p) => {
                const isActive = priority === p;
                return (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.priorityBtn,
                      { backgroundColor: isActive ? colors.primary : colors.surfaceContainerLowest }
                    ]}
                    onPress={() => setPriority(p)}
                  >
                    <Text style={[typography.labelCaps, { color: isActive ? colors.onPrimary : colors.onSurfaceVariant }]}>{p.toUpperCase()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Status Selection */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.sectionTitleRow}>
              <MaterialIcons name="autorenew" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>STATUS</Text>
            </View>
            <View style={[styles.priorityGroup, { borderColor: colors.outlineVariant }]}>
              {statusOptions.map((s) => {
                const isActive = status === s;
                return (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.priorityBtn,
                      { backgroundColor: isActive ? colors.primary : colors.surfaceContainerLowest }
                    ]}
                    onPress={() => setStatus(s)}
                  >
                    <Text style={[typography.labelCaps, { color: isActive ? colors.onPrimary : colors.onSurfaceVariant, fontSize: 10 }]}>{s.toUpperCase()}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Due Date */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>EXECUTION_WINDOW</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelSm, { color: colors.outline, marginBottom: spacing.xs }]}>DUE DATE</Text>
              <TextInput
                style={[typography.labelCaps, { color: colors.onSurface }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.outlineVariant}
                value={dueDate}
                onChangeText={setDueDate}
              />
            </View>
          </View>

          {/* System Telemetry */}
          <View style={[styles.telemetryCard, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginBottom: 4 }]}>SYSTEM_TELEMETRY</Text>
            <Text style={[typography.labelSm, { color: colors.primaryFixedDim, fontSize: 10, opacity: 0.7 }]}>EDIT_MODE_ACTIVE</Text>
          </View>

          {/* Summary Info */}
          <View style={[styles.summaryBox, { backgroundColor: colors.surfaceContainer, borderLeftColor: colors.primary }]}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
              Committing these changes will update the task in the execution stack.
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.outlineVariant }]} onPress={() => navigation.goBack()}>
          <Text style={[typography.labelCaps, { color: colors.primary }]}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.commitBtn, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: 8 }]}>
            {loading ? 'SYNCING...' : 'COMMIT_CHANGES'}
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color={colors.onPrimary} />
          ) : (
            <MaterialIcons name="bolt" size={18} color={colors.onPrimary} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  mainContent: {},
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeOutline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeSolid: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  priorityGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telemetryCard: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  summaryBox: {
    padding: 24,
    borderLeftWidth: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    gap: 16,
  },
  cancelBtn: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commitBtn: {
    flex: 2,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default EditTaskScreen;
