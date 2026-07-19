import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const EditTaskScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [computeVal, setComputeVal] = useState(75);
  const [archiveVal, setArchiveVal] = useState(24);
  const [netVal, setNetVal] = useState(100);
  const [priority, setPriority] = useState('STANDARD_05');

  // Simple mock slider component
  const MockSlider = ({ value, onValueChange }) => {
    return (
      <TouchableOpacity 
        style={styles.sliderContainer}
        activeOpacity={1}
        onPress={(e) => {
          // just mock a value change based on tap position (rough approx)
          // Since we can't easily get precise coordinates without onLayout/measure, we just toggle a bit or keep it static
        }}
      >
        <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceDim }]}>
          <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${value}%` }]} />
          <View style={[styles.sliderThumb, { backgroundColor: colors.primary, left: `${value}%` }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase', marginLeft: 8 }]}>EDIT_TASK</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <MaterialIcons name="settings" size={24} color={colors.onSurfaceVariant} style={{ marginRight: 16 }} />
          </TouchableOpacity>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw5eNTdQw3EawLC-vJs07ptKuUJnxVt_zoEPUfQynKiXet03FjSfzhogwlDpUhhWu3Sv7Wp6MZ0JTVrK494lVQGVFm5J4uMqyMpP7RQq9tff9ZIC6V23-2j1nwUL21zk4b658ugt65Of7beBFWH22DOc65BTS_mjiRnhIusz-I5sCtEvnbzSK2pGVmANV4nGQqJxdmML_Xe9bK2sEGh1CMjM5CnHYBdhEtNZBt8Cn_H2kWmhNNtvjeFQ' }}
              style={styles.avatar}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: 24 }]}>
          
          {/* Task Header Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.badgeRow}>
              <View style={[styles.badgeOutline, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>TASK_ID: 8824-A</Text>
              </View>
              <View style={[styles.badgeSolid, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>ACTIVE</Text>
              </View>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', marginTop: spacing.md }]}>NEURAL_SYNC_VALIDATION</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: spacing.xs }]}>Adjust execution parameters and resource limits for the current task sequence.</Text>
          </View>

          {/* Core Execution Parameters */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.sectionTitleRow}>
              <MaterialIcons name="terminal" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>CORE_EXECUTION</Text>
            </View>

            {/* Priority Dropdown (Mock) */}
            <View style={{ marginBottom: spacing.md }}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: 4, marginBottom: 4 }]}>PRIORITY_LEVEL</Text>
              <TouchableOpacity style={[styles.dropdownContainer, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>{priority}</Text>
                <MaterialIcons name="expand-more" size={20} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            {/* Execution Window */}
            <View>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: 4, marginBottom: 4 }]}>EXECUTION_WINDOW</Text>
              <View style={styles.datePickerRow}>
                <TouchableOpacity style={[styles.datePickerBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>START_DATE</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>2024.10.24</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.datePickerBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>END_DATE</Text>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>2024.10.31</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Resource Allocation */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.sectionTitleRow}>
              <MaterialIcons name="memory" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>RESOURCE_ALLOCATION</Text>
            </View>
            
            <View style={[styles.resourceCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              {/* Compute Node */}
              <View style={styles.sliderGroup}>
                <View style={styles.sliderHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.primary }]}>COMPUTE_NODE</Text>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>HIGH_PRECISION_UNIT</Text>
                  </View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>{computeVal}%</Text>
                </View>
                <MockSlider value={computeVal} onValueChange={setComputeVal} />
              </View>

              {/* Archive Node */}
              <View style={styles.sliderGroup}>
                <View style={styles.sliderHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.primary }]}>ARCHIVE_NODE</Text>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>COLD_STORAGE_SYNC</Text>
                  </View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>{archiveVal}%</Text>
                </View>
                <MockSlider value={archiveVal} onValueChange={setArchiveVal} />
              </View>

              {/* Network Priority */}
              <View style={styles.sliderGroup}>
                <View style={styles.sliderHeader}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.primary }]}>NETWORK_PRIORITY</Text>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>BANDWIDTH_THROTTLE</Text>
                  </View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>{netVal === 100 ? 'MAX' : `${netVal}%`}</Text>
                </View>
                <MockSlider value={netVal} onValueChange={setNetVal} />
              </View>
            </View>
          </View>

          {/* System Telemetry */}
          <View style={[styles.telemetryCard, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginBottom: 4 }]}>SYSTEM_TELEMETRY</Text>
            <Text style={[typography.labelSm, { color: colors.primaryFixedDim, fontSize: 10, opacity: 0.7 }]}>REAL_TIME_LOAD_SIMULATION_ACTIVE</Text>
          </View>

          {/* Summary Info */}
          <View style={[styles.summaryBox, { backgroundColor: colors.surfaceContainer, borderLeftColor: colors.primary }]}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
              Committing these changes will re-queue the task in the execution stack. High priority changes might incur additional compute tax.
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.primary }]}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.commitBtn, { backgroundColor: colors.primary }]}>
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: 8 }]}>COMMIT_CHANGES</Text>
          <MaterialIcons name="bolt" size={18} color={colors.onPrimary} />
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 120, // Space for bottom action bar
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
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 2,
    paddingHorizontal: 16,
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  datePickerBox: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  resourceCard: {
    padding: 32,
    borderWidth: 1,
    gap: 32,
  },
  sliderGroup: {
    gap: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sliderContainer: {
    height: 20,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 2,
    width: '100%',
    position: 'relative',
  },
  sliderFill: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -7,
    marginLeft: -8, // center the thumb on the value
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
