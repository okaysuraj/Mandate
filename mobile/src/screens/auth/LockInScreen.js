import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { useDataStore } from "../../store/useDataStore";

const LockInScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { tasks, loadTasks } = useDataStore((state) => state);
  
  const [commitState, setCommitState] = useState('idle'); // idle, locking, locked
  const [totalSeconds, setTotalSeconds] = useState((18 * 3600) + (42 * 60)); // 18:42:00

  // Shimmer animation for button
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCommit = async () => {
    if (commitState !== 'idle') return;
    setCommitState('locking');
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const taskIds = (tasks || [])
        .filter(t => t.status !== 'completed' && t.status !== 'archived')
        .slice(0, 5)
        .map(t => t._id || t.id);
      
      if (taskIds.length > 0) {
        await api.post('/planning/lock', {
          date: todayStr,
          taskIds: taskIds
        });
      }
      setCommitState('locked');
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    } catch (e) {
      console.warn('Planning lock sync', e);
      setCommitState('locked');
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    }
  };

  const getButtonBg = () => {
    if (commitState === 'locking') return colors.onSurfaceVariant;
    if (commitState === 'locked') return colors.onTertiaryContainer;
    return colors.primary;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATYH3faTFiFv0b486k8XE1WBuTl6nGkAvXldGPVAaG3gfEo0jnyKJruFe-eOQt9QDzGrUyuvC-O6l3BqsE32fNYtPHI15aqtaRrvdd4F00x95pETdyz4sucXEeC7R82yIHSx-SLcHk14yfjSx59DiDKajrbbrVz2jkjzjEnimVs5h-O8J52KSOo0AlisSmu1ADCfRUHG4VLEr-TdSENm-rD1uPLr3O4f9vQBYhWK82HIyq1vcSC44jgA' }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Daily Mandate Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 2, marginBottom: 8 }]}>DAILY FOCUS COMMIT</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800' }]}>LOCK IN TODAY'S FOCUS</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 12, lineHeight: 24, maxWidth: '90%' }]}>
            Commit your top focus tasks for today. Lock in your priorities to work with distraction-free momentum.
          </Text>
        </View>

        {/* Status Overview Bento */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: 0 }]}>
          <View style={{ padding: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>ESTIMATED WORKLOAD</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>88.4%</Text>
              </View>
              <View style={[styles.optimizedBadge, { backgroundColor: colors.tertiary }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiary, fontSize: 10 }]}>BALANCED</Text>
              </View>
            </View>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '88.4%' }]} />
          </View>
        </View>

        {/* Project Queue */}
        <View style={styles.queueSection}>
          <View style={styles.queueHeader}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>TODAY'S PRIORITIES</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>4 TASKS</Text>
          </View>

          {/* Item 1 */}
          <View style={[styles.queueItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
            <View style={styles.queueItemHeader}>
              <View style={styles.queueItemTitle}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', fontSize: 14 }]}>01</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 16, marginLeft: 12 }]}>CORE ARCHITECTURE DESIGN</Text>
              </View>
              <MaterialIcons name="priority-high" size={20} color={colors.primary} />
            </View>
            <View style={styles.queueItemFooter}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EST. 4.5 HOURS</Text>
              <View style={styles.avatarsRow}>
                <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceVariant, borderColor: colors.surface }]} />
                <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.surface, marginLeft: -8 }]} />
              </View>
            </View>
          </View>

          {/* Item 2 */}
          <View style={[styles.queueItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.queueItemHeader}>
              <View style={styles.queueItemTitle}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontWeight: '900', fontSize: 14 }]}>02</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 16, marginLeft: 12 }]}>API & DATA PIPELINE</Text>
              </View>
              <MaterialIcons name="code" size={20} color={colors.onSurfaceVariant} />
            </View>
            <View style={styles.queueItemFooter}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EST. 2.2 HOURS</Text>
              <View style={[styles.tagBadge, { backgroundColor: colors.surfaceContainer }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>ACTIVE</Text>
              </View>
            </View>
          </View>

          {/* Item 3 */}
          <View style={[styles.queueItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.queueItemHeader}>
              <View style={styles.queueItemTitle}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontWeight: '900', fontSize: 14 }]}>03</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 16, marginLeft: 12 }]}>PERFORMANCE OPTIMIZATION</Text>
              </View>
              <MaterialIcons name="tune" size={20} color={colors.onSurfaceVariant} />
            </View>
            <View style={styles.queueItemFooter}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EST. 1.8 HOURS</Text>
              <View style={[styles.tagBadge, { backgroundColor: colors.surfaceContainer }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>QUEUED</Text>
              </View>
            </View>
          </View>

          {/* Item 4 */}
          <View style={[styles.queueItem, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow, opacity: 0.6 }]}>
            <View style={styles.queueItemHeader}>
              <View style={styles.queueItemTitle}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontWeight: '900', fontSize: 14 }]}>04</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 16, marginLeft: 12 }]}>DOCS & CODE REVIEW</Text>
              </View>
              <MaterialIcons name="rate-review" size={20} color={colors.onSurfaceVariant} />
            </View>
            <View style={styles.queueItemFooter}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>EST. 1.0 HOURS</Text>
              <View style={[styles.tagBadge, { backgroundColor: 'transparent', paddingHorizontal: 0 }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>SCHEDULED</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Final Commitment Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[styles.commitBtn, { backgroundColor: getButtonBg() }]}
            onPress={handleCommit}
            activeOpacity={0.9}
          >
            {commitState === 'idle' && (
              <View style={styles.commitBtnInner}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 14, letterSpacing: 3 }]}>LOCK IN FOCUS</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimary, opacity: 0.6, letterSpacing: 2, marginTop: 4 }]}>EST. COMPLETION: {formatCountdown(totalSeconds)}</Text>
              </View>
            )}
            {commitState === 'locking' && (
              <View style={[styles.commitBtnInner, { flexDirection: 'row', alignItems: 'center' }]}>
                <MaterialIcons name="refresh" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 14 }]}>COMMITTING FOCUS...</Text>
              </View>
            )}
            {commitState === 'locked' && (
              <View style={[styles.commitBtnInner, { flexDirection: 'row', alignItems: 'center' }]}>
                <MaterialIcons name="check-circle" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 14 }]}>FOCUS LOCKED IN</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outline }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>EDIT TASK LIST</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 32,
  },
  optimizedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  queueSection: {
    marginBottom: 32,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  queueItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  queueItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  queueItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionsSection: {
    gap: 16,
  },
  commitBtn: {
    width: '100%',
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commitBtnInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LockInScreen;
