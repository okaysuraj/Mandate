import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useDataStore } from '../../store/useDataStore';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { API_URL } from '../../config';

const AiSmartReschedulingScreen = ({ navigation }) => {
  const { tasks, loadTasks } = useDataStore(state => state);
  const { user } = useAuth();
  const { colors, isDark } = useTheme();

  // Find overlapping/overdue tasks to represent "Conflicts"
  const now = new Date();
  const overdueTasks = useMemo(() => {
    return tasks.filter(t => {
      if (t.status === 'completed') return false;
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < now;
    }).slice(0, 3);
  }, [tasks, now]);

  const handleExecuteResolution = async () => {
    if (overdueTasks.length === 0) return;
    try {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);

      // Auto-reschedule overdue tasks to tomorrow
      for (const task of overdueTasks) {
        await axios.put(`${API_URL}/api/tasks/${task._id}`, { dueDate: tomorrow.toISOString() });
      }
      loadTasks();
      // Go back or show success
      navigation.goBack();
    } catch (error) {
      console.error('Failed to resolve conflicts', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerRightButton} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.primary }]}>MANDATE</Text>
          </View>
          <TouchableOpacity style={styles.headerRightButton}>
            <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          {/* Status Header */}
          <View style={styles.statusSection}>
            <View style={styles.alertBadge}>
              <View style={[styles.alertDot, { backgroundColor: overdueTasks.length > 0 ? colors.error : colors.primary }]} />
              <Text style={[styles.alertText, { color: overdueTasks.length > 0 ? colors.error : colors.primary }]}>
                {overdueTasks.length > 0 ? 'SYSTEM CONFLICT DETECTED' : 'SYSTEM OPTIMAL'}
              </Text>
            </View>
            <Text style={[styles.title, { color: colors.primary }]}>Temporal Shift Analysis</Text>
            <Text style={[styles.subtitle, { color: colors.secondary }]}>
              {overdueTasks.length > 0 
                ? `Resolving ${overdueTasks.length} scheduling overlaps. AI processing active.`
                : 'No timeline conflicts detected. All tasks aligned.'}
            </Text>
          </View>

          {/* Temporal Shift Timeline */}
          {overdueTasks.length > 0 && (
            <View style={styles.timelineSection}>
              <View style={[styles.timelineLine, { backgroundColor: colors.outlineVariant }]} />

              {overdueTasks.map((task, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <React.Fragment key={task._id}>
                    {/* Conflict Node */}
                    <View style={styles.timelineNodeContainer}>
                      <View style={[styles.timelineDotError, { backgroundColor: colors.error, borderColor: colors.background }]} />
                      <View style={[styles.timelineCardError, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.error }]}>
                        <View style={styles.cardHeader}>
                          <Text style={[styles.timeTextError, { color: colors.error }]}>OVERDUE</Text>
                          <View style={[styles.tagError, { backgroundColor: colors.errorContainer }]}>
                            <Text style={[styles.tagTextError, { color: colors.onErrorContainer }]}>OVERLAP</Text>
                          </View>
                        </View>
                        <Text style={[styles.taskTitle, { color: colors.primary }]}>TASK: {task.title.toUpperCase()}</Text>
                        <Text style={[styles.taskDesc, { color: colors.secondary }]}>Temporal violation detected. Scheduled time passed.</Text>
                      </View>
                    </View>

                    {/* Optimized Path */}
                    <View style={styles.timelineNodeContainer}>
                      <View style={[styles.timelineDotOptimized, { backgroundColor: colors.primary, borderColor: colors.background }]} />
                      <View style={[styles.timelineCardOptimized, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                        <View style={styles.cardHeader}>
                          <Text style={[styles.timeTextOptimized, { color: colors.primary }]}>TOMORROW 09:00 AM</Text>
                          <View style={[styles.tagOptimized, { backgroundColor: colors.primaryContainer }]}>
                            <Text style={[styles.tagTextOptimized, { color: colors.onPrimaryContainer }]}>OPTIMIZED</Text>
                          </View>
                        </View>
                        <Text style={[styles.taskTitle, { color: colors.primary }]}>PATH: SHIFT_OFFSET_+24H</Text>
                        <Text style={[styles.taskDesc, { color: colors.secondary }]}>Buffer re-allocation suggested to next available slot.</Text>
                      </View>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
          )}

          {/* Impact Analysis Bento Cards */}
          <View style={styles.bentoGrid}>
            <View style={[styles.bentoCardDark, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View>
                <MaterialIcons name="trending-down" size={24} color={colors.primary} />
                <Text style={[styles.bentoLabelDark, { color: colors.secondary }]}>DOWNTIME</Text>
              </View>
              <Text style={[styles.bentoValueDark, { color: colors.primary }]}>{overdueTasks.length > 0 ? '-34%' : '0%'}</Text>
              <Text style={[styles.bentoSubtextDark, { color: colors.outline }]}>PREDICTED SAVINGS</Text>
            </View>

            <View style={[styles.bentoCardLight, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View>
                <MaterialIcons name="analytics" size={24} color={colors.primary} />
                <Text style={[styles.bentoLabelLight, { color: colors.secondary }]}>RESOURCE</Text>
              </View>
              <Text style={[styles.bentoValueLight, { color: colors.primary }]}>{overdueTasks.length > 0 ? '98.2' : '45.1'}</Text>
              <Text style={[styles.bentoSubtextLight, { color: colors.outline }]}>UTILIZATION %</Text>
            </View>

            <View style={[styles.bentoCardFull, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoFullContent}>
                <View>
                  <Text style={[styles.bentoLabelLight, { color: colors.secondary }]}>SYSTEM INTEGRITY</Text>
                  <Text style={[styles.bentoValueLarge, { color: colors.primary }]}>Stable.</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <Text style={[styles.progressText, { color: colors.primary }]}>+1.2ms LATENCY OPTIMIZATION</Text>
                  <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <View style={[styles.progressBarFill, { backgroundColor: colors.primary }]} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Final Action CTA */}
          {overdueTasks.length > 0 && (
            <View style={styles.actionSection}>
              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={handleExecuteResolution}>
                <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>EXECUTE RESOLUTION</Text>
                <MaterialIcons name="bolt" size={24} color={colors.onPrimary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.outlineVariant }]} onPress={() => navigation.goBack()}>
                <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>IGNORE & OVERRIDE</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9fb', 
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c7c7', 
    backgroundColor: '#f9f9fb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'HankenGrotesk_800ExtraBold',
    fontSize: 24,
    color: '#000',
    letterSpacing: -0.5,
    marginLeft: 12,
  },
  headerRightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  statusSection: {
    marginBottom: 32,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  alertText: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.1,
  },
  title: {
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'HankenGrotesk_400Regular',
    fontSize: 16,
    color: '#5d5e60', 
  },
  timelineSection: {
    position: 'relative',
    marginBottom: 64,
  },
  timelineLine: {
    position: 'absolute',
    left: 24,
    top: 16,
    bottom: 16,
    width: 1,
    backgroundColor: '#c4c7c7',
  },
  timelineNodeContainer: {
    position: 'relative',
    paddingLeft: 48,
    marginBottom: 16,
  },
  timelineDotError: {
    position: 'absolute',
    left: 18,
    top: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ba1a1a',
    borderWidth: 2,
    borderColor: '#f9f9fb',
    shadowColor: '#ba1a1a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  timelineDotOptimized: {
    position: 'absolute',
    left: 18,
    top: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00983d',
    borderWidth: 2,
    borderColor: '#f9f9fb',
    shadowColor: '#00983d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  timelineCardError: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  timelineCardOptimized: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeTextError: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
  },
  timeTextOptimized: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
  },
  tagError: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagTextError: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
  },
  tagOptimized: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagTextOptimized: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
  },
  taskTitle: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  taskDesc: {
    fontFamily: 'HankenGrotesk_400Regular',
    fontSize: 14,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 64,
  },
  bentoCardDark: {
    width: '47%',
    aspectRatio: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoLabelDark: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    marginTop: 8,
  },
  bentoValueDark: {
    fontFamily: 'HankenGrotesk_800ExtraBold',
    fontSize: 40,
  },
  bentoSubtextDark: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
  },
  bentoCardLight: {
    width: '47%',
    aspectRatio: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoLabelLight: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    marginTop: 8,
  },
  bentoValueLight: {
    fontFamily: 'HankenGrotesk_800ExtraBold',
    fontSize: 40,
  },
  bentoSubtextLight: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
  },
  bentoCardFull: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  bentoFullContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bentoValueLarge: {
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 24,
  },
  progressBarContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  progressBarBg: {
    width: 128,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '92%',
    height: '100%',
  },
  actionSection: {
    gap: 16,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 16, 
    marginRight: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.1,
  }
});

export default AiSmartReschedulingScreen;
