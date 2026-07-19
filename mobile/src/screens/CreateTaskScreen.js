import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { createTask } from '../services/taskService';
const CreateTaskScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('ALPHA');
  const [dueDate, setDueDate] = useState('');
  const [allocation, setAllocation] = useState(75);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title) return;
    setLoading(true);
    try {
      const taskData = {
        title,
        priority: priority === 'ALPHA' ? 'urgent' : priority === 'BETA' ? 'high' : 'normal',
        dueDate,
        status: 'todo',
        workspaceId: user?.activeWorkspace
      };
      await createTask(taskData);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      alert('Failed to create mandate');
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
            borderLeftWidth: label === 'BETA' ? 1 : 0,
            borderRightWidth: label === 'BETA' ? 1 : 0,
            borderColor: colors.outlineVariant
          }
        ]}
        onPress={() => setPriority(label)}
      >
        <Text style={[typography.labelCaps, { color: isActive ? colors.onPrimary : colors.onSurfaceVariant }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', marginLeft: spacing.sm }]}>CREATE TASK</Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3uS-AaCfL0hkObqtrHUJCH8xA3dLcvqrQSiZO7LTz68SbYJIOQKdHn5yp3AyG2RZCKQ9aeKJm-B2YSONGjI9dgzo0LA4cUiInusAZd8xttTPP3tMQOs5W4720Op8_w1TI6wf7Uh_t--ruFJTPfQtXQqPuVUByrMyNIE5K4byKQz9EFmo9OJvEj8rJJGbp0ChlkVs1MOyA6Id8fo90yuwkKKCGC_L1oYEnWpgKZ16rkUR7deqcKEl1MQ' }} 
            style={styles.avatarImage} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: 32 }]}>
          
          <View style={styles.formSpace}>
            
            {/* 01 MANDATE_NAME */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>01 // MANDATE_NAME</Text>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                <TextInput
                  style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}
                  placeholder="ENTER IDENTIFIER..."
                  placeholderTextColor={colors.outlineVariant}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* 02 PRIORITY_LEVEL */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>02 // PRIORITY_LEVEL</Text>
              <View style={[styles.priorityGroup, { borderColor: colors.outlineVariant }]}>
                {['ALPHA', 'BETA', 'GAMMA'].map(renderPriorityBtn)}
              </View>
            </View>

            {/* 03 TEMPORAL_PARAMETERS */}
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>03 // TEMPORAL_PARAMETERS</Text>
              <View style={styles.row}>
                <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md, marginRight: spacing.sm }]}>
                  <Text style={[typography.labelSm, { color: colors.outline, marginBottom: spacing.xs }]}>DATE</Text>
                  <TextInput
                    style={[typography.labelCaps, { color: colors.onSurface }]}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={colors.outlineVariant}
                    value={dueDate}
                    onChangeText={setDueDate}
                  />
                </View>
                <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                  <Text style={[typography.labelSm, { color: colors.outline, marginBottom: spacing.xs }]}>WINDOW</Text>
                  <TextInput
                    style={[typography.labelCaps, { color: colors.onSurface }]}
                    placeholder="00:00"
                    placeholderTextColor={colors.outlineVariant}
                  />
                </View>
              </View>
            </View>

            {/* 04 RESOURCE_ALLOCATION */}
            <View>
              <View style={styles.allocationHeader}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>04 // RESOURCE_ALLOCATION</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>{allocation}%</Text>
              </View>
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.lg }]}>
                {/* Mock Slider */}
                <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceDim, marginBottom: spacing.sm }]}>
                  <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${allocation}%` }]} />
                  <View style={[styles.sliderThumb, { backgroundColor: colors.primary, left: `${allocation}%`, marginLeft: -12 }]} />
                </View>
                <View style={styles.allocationLabels}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>MINIMAL</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>CRITICAL_LOAD</Text>
                </View>
              </View>
            </View>

            {/* Decorative Visual Token */}
            <View style={[styles.decorativeBox, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.systemStableBadge, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM_STABLE</Text>
              </View>
            </View>

            {/* Submit Button */}
            <View style={{ paddingTop: spacing.md }}>
              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
                onPress={handleCreate}
                disabled={loading}
              >
                <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.md }]}>
                  {loading ? 'INITIALIZING...' : 'INITIALIZE_MANDATE'}
                </Text>
                <MaterialIcons name="bolt" size={24} color={colors.onPrimary} />
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
  container: {
    flexGrow: 1,
    paddingBottom: 96,
  },
  mainContent: {},
  formSpace: {
    gap: 32,
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
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  sliderTrack: {
    width: '100%',
    height: 4,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
  },
  allocationLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  decorativeBox: {
    width: '100%',
    height: 128,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  systemStableBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 32,
  }
});

export default CreateTaskScreen;
