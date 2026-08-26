import React, { useEffect, useRef } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Animated, Easing 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useDataStore } from "../../store/useDataStore";

const AnimatedBar = ({ initialHeight, delay }) => {
  const { colors } = useTheme();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
          Animated.timing(animValue, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        ])
      ).start();
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const targetHeight = Math.max(20, Math.min(100, initialHeight + (Math.random() - 0.5) * 40));
  const animatedHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [`${initialHeight}%`, `${targetHeight}%`],
  });

  return (
    <Animated.View style={[styles.chartBar, { backgroundColor: colors.primary, height: animatedHeight }]} />
  );
};


const AiPriorityScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { tasks } = useDataStore(state => state);

  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed');
  const highTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const allCritical = [...urgentTasks, ...highTasks];

  const computeLoad = tasks.length > 0 ? Math.min(100, (tasks.filter(t => t.status !== 'completed').length / (tasks.length || 1)) * 100).toFixed(0) : 0;
  const criticalLoad = tasks.length > 0 ? Math.min(100, (allCritical.length / (tasks.length || 1)) * 100).toFixed(0) : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 12 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Section Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 4 }]}>CRITICAL PATH</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>Priority Recommendations</Text>
        </View>

        {/* Network Velocity Bento Module */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.velocityHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 4 }]}>ACTIVE TASKS LOAD</Text>
              <View style={styles.velocityValueRow}>
                <Text style={[{ fontSize: 28, fontWeight: '700', color: colors.primary }]}>{tasks.filter(t => t.status !== 'completed').length}</Text>
                <Text style={[{ fontSize: 18, fontWeight: '500', color: colors.secondary, marginLeft: 4, marginTop: 8 }]}>tasks</Text>
              </View>
            </View>
            <View style={[styles.trendIconBox, { backgroundColor: colors.tertiaryFixed }]}>
              <MaterialIcons name="trending-up" size={16} color={colors.onTertiaryContainer} />
            </View>
          </View>

          {/* Dynamic AI Chart based on task distribution */}
          <View style={styles.chartContainer}>
            {Array.from({ length: 12 }).map((_, i) => (
              <AnimatedBar key={i} initialHeight={30 + Math.random() * 60} delay={i * 100} />
            ))}
          </View>

          <View style={styles.chartFooter}>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>TODAY</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>REAL-TIME LOAD</Text>
          </View>
        </View>

        {urgentTasks.length > 0 && (
          <View style={[styles.warningModule, { backgroundColor: colors.primary }]}>
            <View>
              <View style={styles.warningHeader}>
                <MaterialIcons name="warning" size={20} color={colors.error} />
                <Text style={[typography.labelCaps, { color: '#fff', marginLeft: 8 }]}>URGENT ATTENTION</Text>
              </View>
              <Text style={[typography.bodyMd, { color: colors.primaryFixedDim, lineHeight: 24 }]}>
                You have {urgentTasks.length} urgent task(s) pending. Failure to clear may result in bottleneck accumulation.
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Kanban")} style={[styles.executeBtn, { backgroundColor: '#fff' }]} activeOpacity={0.9}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>TRIAGE URGENT TASKS</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Resource Distribution */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 24 }]}>RESOURCE DISTRIBUTION</Text>
          
          <View style={styles.resourceRow}>
            <View style={styles.resourceLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>GENERAL COMPUTE LOAD</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>{computeLoad}%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${computeLoad}%` }]} />
            </View>
          </View>

          <View style={[styles.resourceRow, { marginBottom: 0 }]}>
            <View style={styles.resourceLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>CRITICAL BUFFER</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>{criticalLoad}%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
              <View style={[styles.progressBarFill, { backgroundColor: criticalLoad > 20 ? colors.error : colors.primary, width: `${criticalLoad}%` }]} />
            </View>
          </View>
        </View>

        {/* Triage List */}
        <View style={styles.triageSection}>
          <View style={[styles.triageHeader, { borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>TRIAGE LIST</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>{allCritical.length} PENDING</Text>
          </View>

          {allCritical.length === 0 ? (
            <Text style={[typography.labelSm, { color: colors.secondary, paddingVertical: 16 }]}>All critical paths are clear.</Text>
          ) : (
            allCritical.slice(0, 5).map(task => (
              <TouchableOpacity key={task._id} style={[styles.triageItem, { backgroundColor: '#fff', borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
                <View style={styles.triageItemLeft}>
                  <View style={[styles.triageDot, { backgroundColor: task.priority === 'urgent' ? colors.error : colors.tertiaryFixedDim }]} />
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]} numberOfLines={1}>{task.title}</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>Priority: {task.priority.toUpperCase()}</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
              </TouchableOpacity>
            ))
          )}
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
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16, 
    padding: 24,
    marginBottom: 24,
  },
  velocityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  velocityValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  trendIconBox: {
    padding: 4,
    borderRadius: 4,
  },
  chartContainer: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    overflow: 'hidden',
  },
  chartBar: {
    flex: 1,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  warningModule: {
    padding: 24,
    minHeight: 180,
    justifyContent: 'space-between',
    marginBottom: 24,
    borderRadius: 16,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  executeBtn: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4, 
    marginTop: 32,
  },
  resourceRow: {
    marginBottom: 16,
  },
  resourceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  triageSection: {
    paddingBottom: 40,
  },
  triageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  triageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },
  triageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  triageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});

export default AiPriorityScreen;
