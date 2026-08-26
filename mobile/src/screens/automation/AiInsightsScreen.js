import React, { useEffect, useRef, useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Animated, ActivityIndicator 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useDataStore } from "../../store/useDataStore";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_URL } from "../../config/config";

const AiInsightsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { user } = useAuth();
  const { tasks } = useDataStore(state => state);
  
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pulse effect for live indicator
  const liveOpacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(liveOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(liveOpacity, { toValue: 0.7, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/ai/detect-burnout`);
        setInsightData(data);
      } catch (error) {
        console.warn('Failed to fetch AI insights', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchInsights();
  }, [user]);

  const bottleneckTasks = tasks.filter(t => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed').slice(0, 3);
  
  // Calculate dynamic consistency score based on completed tasks
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const consistencyScore = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <View style={styles.headerTextRow}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM STATUS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', letterSpacing: -0.5 }]}>Executive Report</Text>
            </View>
            <Animated.View style={[styles.liveBadge, { backgroundColor: colors.tertiaryFixed, opacity: liveOpacity }]}>
              <MaterialIcons name="bolt" size={14} color={colors.onTertiaryContainer} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>Live</Text>
            </Animated.View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.outlineVariant, marginTop: 16 }]} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.grid}>
            {/* Consistency Score Gauge */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, alignItems: 'center' }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 24 }]}>CONSISTENCY_SCORE</Text>
              
              <View style={styles.gaugeContainer}>
                <View style={[styles.gaugeBg, { borderColor: colors.surfaceContainerLow }]} />
                <View style={[styles.gaugeFill, { borderColor: colors.primary, transform: [{ rotate: `${45 + (consistencyScore * 1.8)}deg` }] }]} />
              </View>

              <View style={styles.scoreText}>
                <Text style={[{ fontSize: 48, fontWeight: '900', color: colors.primary }]}>{consistencyScore}</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.onPrimaryContainer, marginTop: 12, marginLeft: 2 }]}>%</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 8 }]}>Based on {tasks.length} total tasks</Text>
            </View>

            {/* AI Burnout Report */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>BURNOUT PREDICTION</Text>
                <MaterialIcons name={insightData?.burnoutRisk === 'High' ? "warning" : "health-and-safety"} size={20} color={insightData?.burnoutRisk === 'High' ? colors.error : colors.tertiaryFixedDim} />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>RISK LEVEL</Text>
                <Text style={[typography.headlineLgMobile, { color: insightData?.burnoutRisk === 'High' ? colors.error : colors.primary, fontWeight: '900', textTransform: 'uppercase' }]}>
                  {insightData?.burnoutRisk || 'UNKNOWN'}
                </Text>
              </View>
              
              <Text style={[typography.bodyMd, { color: colors.primary, lineHeight: 22 }]}>
                {insightData?.advice || "Insufficient data to provide workflow advice."}
              </Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.outlineVariant }}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>EST. WORKLOAD</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{insightData?.estimatedMinutes || 0} mins</Text>
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>TASKS TODAY</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{insightData?.tasksCount || 0}</Text>
                </View>
              </View>
            </View>

            {/* Bottleneck Alerts List */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>BOTTLENECK ALERTS</Text>
                <MaterialIcons name="crisis-alert" size={20} color={bottleneckTasks.length > 0 ? colors.error : colors.secondary} />
              </View>

              <View style={styles.alertsList}>
                {bottleneckTasks.length === 0 ? (
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>No critical bottlenecks detected.</Text>
                ) : (
                  bottleneckTasks.map((t, idx) => (
                    <View key={t._id || idx} style={styles.alertItem}>
                      <View style={[styles.alertMarker, { backgroundColor: colors.error }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', fontSize: 13 }]} numberOfLines={1}>{t.title}</Text>
                        <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>Status: {t.status}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Kanban")} style={[styles.actionBtn, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>VIEW TOPOLOGY</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  headerTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  grid: {
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  gaugeContainer: {
    position: 'relative',
    width: 140,
    height: 70,
    overflow: 'hidden',
    marginBottom: 8,
  },
  gaugeBg: {
    width: 140,
    height: 140,
    borderWidth: 12,
    borderRadius: 70,
  },
  gaugeFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 140,
    height: 140,
    borderWidth: 12,
    borderRadius: 70,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  scoreText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  alertsList: {
    gap: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16,
  },
  alertMarker: {
    width: 4,
    borderRadius: 2,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  }
});

export default AiInsightsScreen;
