import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDataStore } from '../../store/useDataStore';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config/config';

const AiSmartReschedulingScreen = ({ navigation }) => {
  const { tasks, loadTasks } = useDataStore(state => state);
  const { user } = useAuth();

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerRightButton} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>MANDATE</Text>
          </View>
          <TouchableOpacity style={styles.headerRightButton}>
            <MaterialIcons name="smart-toy" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          {/* Status Header */}
          <View style={styles.statusSection}>
            <View style={styles.alertBadge}>
              <View style={[styles.alertDot, { backgroundColor: overdueTasks.length > 0 ? '#ba1a1a' : '#00983d' }]} />
              <Text style={[styles.alertText, { color: overdueTasks.length > 0 ? '#ba1a1a' : '#00983d' }]}>
                {overdueTasks.length > 0 ? 'SYSTEM CONFLICT DETECTED' : 'SYSTEM OPTIMAL'}
              </Text>
            </View>
            <Text style={styles.title}>Temporal Shift Analysis</Text>
            <Text style={styles.subtitle}>
              {overdueTasks.length > 0 
                ? `Resolving ${overdueTasks.length} scheduling overlaps. AI processing active.`
                : 'No timeline conflicts detected. All tasks aligned.'}
            </Text>
          </View>

          {/* Temporal Shift Timeline */}
          {overdueTasks.length > 0 && (
            <View style={styles.timelineSection}>
              <View style={styles.timelineLine} />

              {overdueTasks.map((task, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <React.Fragment key={task._id}>
                    {/* Conflict Node */}
                    <View style={styles.timelineNodeContainer}>
                      <View style={styles.timelineDotError} />
                      <View style={styles.timelineCardError}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.timeTextError}>OVERDUE</Text>
                          <View style={styles.tagError}>
                            <Text style={styles.tagTextError}>OVERLAP</Text>
                          </View>
                        </View>
                        <Text style={styles.taskTitle}>TASK: {task.title.toUpperCase()}</Text>
                        <Text style={styles.taskDesc}>Temporal violation detected. Scheduled time passed.</Text>
                      </View>
                    </View>

                    {/* Optimized Path */}
                    <View style={styles.timelineNodeContainer}>
                      <View style={styles.timelineDotOptimized} />
                      <View style={styles.timelineCardOptimized}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.timeTextOptimized}>TOMORROW 09:00 AM</Text>
                          <View style={styles.tagOptimized}>
                            <Text style={styles.tagTextOptimized}>OPTIMIZED</Text>
                          </View>
                        </View>
                        <Text style={styles.taskTitle}>PATH: SHIFT_OFFSET_+24H</Text>
                        <Text style={styles.taskDesc}>Buffer re-allocation suggested to next available slot.</Text>
                      </View>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
          )}

          {/* Impact Analysis Bento Cards */}
          <View style={styles.bentoGrid}>
            <View style={styles.bentoCardDark}>
              <View>
                <MaterialIcons name="trending-down" size={24} color="#69ff87" />
                <Text style={styles.bentoLabelDark}>DOWNTIME</Text>
              </View>
              <Text style={styles.bentoValueDark}>{overdueTasks.length > 0 ? '-34%' : '0%'}</Text>
              <Text style={styles.bentoSubtextDark}>PREDICTED SAVINGS</Text>
            </View>

            <View style={styles.bentoCardLight}>
              <View>
                <MaterialIcons name="analytics" size={24} color="#000" />
                <Text style={styles.bentoLabelLight}>RESOURCE</Text>
              </View>
              <Text style={styles.bentoValueLight}>{overdueTasks.length > 0 ? '98.2' : '45.1'}</Text>
              <Text style={styles.bentoSubtextLight}>UTILIZATION %</Text>
            </View>

            <View style={styles.bentoCardFull}>
              <View style={styles.bentoFullContent}>
                <View>
                  <Text style={styles.bentoLabelLight}>SYSTEM INTEGRITY</Text>
                  <Text style={styles.bentoValueLarge}>Stable.</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <Text style={styles.progressText}>+1.2ms LATENCY OPTIMIZATION</Text>
                  <View style={styles.progressBarBg}>
                    <View style={styles.progressBarFill} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Final Action CTA */}
          {overdueTasks.length > 0 && (
            <View style={styles.actionSection}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleExecuteResolution}>
                <Text style={styles.primaryButtonText}>EXECUTE RESOLUTION</Text>
                <MaterialIcons name="bolt" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
                <Text style={styles.secondaryButtonText}>IGNORE & OVERRIDE</Text>
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.3)',
    borderRadius: 16,
  },
  timelineCardOptimized: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c4c7c7',
    borderRadius: 16,
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
    color: '#93000a',
  },
  timeTextOptimized: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    color: '#00983d',
  },
  tagError: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffdad6',
    borderRadius: 4,
  },
  tagTextError: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#93000a',
  },
  tagOptimized: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#69ff87',
    borderRadius: 4,
  },
  tagTextOptimized: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#002108',
  },
  taskTitle: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
  },
  taskDesc: {
    fontFamily: 'HankenGrotesk_400Regular',
    fontSize: 14,
    color: '#5d5e60',
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
    backgroundColor: '#1c1b1b', 
    borderRadius: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoLabelDark: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    color: '#c8c6c5',
    marginTop: 8,
  },
  bentoValueDark: {
    fontFamily: 'HankenGrotesk_800ExtraBold',
    fontSize: 40,
    color: '#ffffff',
  },
  bentoSubtextDark: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#858383',
  },
  bentoCardLight: {
    width: '47%',
    aspectRatio: 1,
    padding: 16,
    backgroundColor: '#edeef0', 
    borderWidth: 1,
    borderColor: '#c4c7c7',
    borderRadius: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoLabelLight: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    color: '#5d5e60',
    marginTop: 8,
  },
  bentoValueLight: {
    fontFamily: 'HankenGrotesk_800ExtraBold',
    fontSize: 40,
    color: '#000',
  },
  bentoSubtextLight: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#5d5e60',
  },
  bentoCardFull: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f3f3f5',
    borderWidth: 1,
    borderColor: '#c4c7c7',
    borderRadius: 16,
  },
  bentoFullContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bentoValueLarge: {
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 24,
    color: '#000',
  },
  progressBarContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: '#00983d',
    marginBottom: 4,
  },
  progressBarBg: {
    width: 128,
    height: 4,
    backgroundColor: '#c4c7c7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '92%',
    height: '100%',
    backgroundColor: '#00983d',
  },
  actionSection: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 16, 
    color: '#ffffff',
    marginRight: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#747878',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 11,
    color: '#000',
    letterSpacing: 1.1,
  }
});

export default AiSmartReschedulingScreen;
