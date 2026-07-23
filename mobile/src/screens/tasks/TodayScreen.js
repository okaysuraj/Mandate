import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, RefreshControl,
  ImageBackground, Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";

const TodayScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tasks, loading, loadTasks, subscribeToSocket } = useDataStore(state => state);
  const [burnoutData, setBurnoutData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { socket } = useSocket();
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Pulse animation for LIVE indicator
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    if (user) {
      loadTasks();
      // Burnout data could be added to a useMetricsStore
      setBurnoutData({ level: 'low' }); 
    }
  }, [user, loadTasks]);

  useEffect(() => {
    if (!socket) return;
    return subscribeToSocket(socket);
  }, [socket, subscribeToSocket]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status.toLowerCase() === "completed" || t.status.toLowerCase() === "done").length;
  const efficiency = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : "0.0";
  const activeTasks = tasks.filter(t => t.status.toLowerCase() !== "completed" && t.status.toLowerCase() !== "done");
  const recentActivity = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 6);

  // Generate some fake graph heights for the mini graph
  const graphHeights = ['50%', '75%', '66%', '100%', '80%', '66%', '80%'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginRight: spacing.md, padding: 4, backgroundColor: colors.surfaceContainerLow, borderRadius: 4 }}>
            <MaterialIcons name="search" size={20} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Hero Metrics Canvas */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Operational Matrix</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Animated.View style={[styles.liveDot, { backgroundColor: colors.onTertiaryContainer, opacity: pulseAnim }]} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>LIVE</Text>
            </View>
          </View>

          {/* Metric Cards: High Density Grid */}
          <View style={styles.gridContainer}>
            {/* Efficiency */}
            <TouchableOpacity style={[styles.metricCard, styles.gridItem, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderRadius: 4 }]}>
              <MaterialIcons name="bolt" size={24} color={colors.primary} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>EFFICIENCY</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{loading ? "—" : efficiency}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Throughput */}
            <TouchableOpacity style={[styles.metricCard, styles.gridItem, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderRadius: 4 }]}>
              <MaterialIcons name="speed" size={24} color={colors.primary} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>THROUGHPUT</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{loading ? "—" : (totalTasks > 0 ? (completedTasks * 0.1).toFixed(1) : "0.0")}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>GB/S</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Nodes Active */}
            <TouchableOpacity style={[styles.metricCard, styles.gridFull, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderRadius: 4, height: 128 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE TASKS / TOTAL</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>
                    {loading ? "—" : `${completedTasks} / ${totalTasks}`}
                  </Text>
                </View>
                <MaterialIcons name="check-circle" size={24} color={colors.onTertiaryContainer} />
              </View>
              
              {/* Mini Graph Placeholder */}
              <View style={styles.miniGraph}>
                {graphHeights.map((h, i) => (
                  <View key={i} style={[styles.graphBar, { backgroundColor: colors.primary, height: h, opacity: 0.2 + (i * 0.1) }]} />
                ))}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Map */}
        <View style={styles.section}>
          <View style={[styles.healthMapCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderRadius: 4 }]}>
            <View style={[styles.healthMapHeader, { backgroundColor: colors.surfaceContainerLow }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>INFRASTRUCTURE HEALTH</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>GLOBAL CLUSTER</Text>
            </View>
            <View style={[styles.mapContainer, { backgroundColor: colors.surfaceDim }]}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAeWArOJi6U0Y7AFftWc9jjXjRcfvghbPs5Bk5A4H1aGMUXxv5Ns_FXQQe9jxw1bptt54-CN6hVgoNLn3bODI5A589gHlZ-PU5GL0hBoVDCFX31pDzrmVBfhfEkK6syYBcB1egDwmMdhQ1IFVfkQKAd4nVlXkIISmbQAi8EdN6i7Z03OCN8rb4adTAKeTCRcJnOVMCrBt3VBOUiqmVUUQselsfpjCzE-PI61GK6N9Am48rBj-eEP_f_g' }}
                style={StyleSheet.absoluteFillObject}
                imageStyle={{ opacity: 0.6 }}
              >
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
                
                {/* Map markers */}
                <Animated.View style={[styles.mapMarker, { top: '25%', left: '33%', opacity: pulseAnim }]} />
                <Animated.View style={[styles.mapMarker, { bottom: '33%', right: '25%', opacity: pulseAnim }]} />
              </ImageBackground>
            </View>
            <View style={[styles.healthStatsRow, { borderTopColor: colors.outlineVariant }]}>
              <View style={styles.healthStatItem}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>LATENCY</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>12ms</Text>
              </View>
              <View style={[styles.healthStatItem, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.outlineVariant, paddingHorizontal: spacing.md }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>UPTIME</Text>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>99.99%</Text>
              </View>
              <View style={styles.healthStatItem}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>LOAD</Text>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>42%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pinned Mandates */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>PINNED MANDATES</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Kanban")} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text style={[typography.labelSm, { color: colors.primary }]}>VIEW ALL</Text>
              <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={{ gap: spacing.sm }}>
            {activeTasks.length === 0 ? (
              <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', padding: spacing.md }]}>No active mandates.</Text>
            ) : (
              activeTasks.slice(0, 2).map((task, i) => (
                <TouchableOpacity key={task._id} style={[styles.metricCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <View style={[styles.iconBox, { backgroundColor: colors.surfaceContainer }]}>
                      <MaterialIcons name={i === 0 ? "precision-manufacturing" : "inventory-2"} size={20} color={colors.secondary} />
                    </View>
                    <View>
                      <Text style={[typography.labelCaps, { color: colors.primary }]} numberOfLines={1}>
                        MN-{task._id?.substring(0,3).toUpperCase() || 'XXX'}: {task.title.toUpperCase()}
                      </Text>
                      <Text style={[typography.labelSm, { color: colors.secondary }]}>Priority: {task.priority?.toUpperCase() || 'MID'}</Text>
                    </View>
                  </View>
                  <View style={[styles.priorityIndicator, { backgroundColor: i === 0 ? colors.error : colors.primary, opacity: i === 0 ? 0.8 : 0.2 }]} />
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        {/* System Pulse Feed */}
        <View style={[styles.section, { paddingBottom: spacing.xl }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>SYSTEM PULSE</Text>
          <View style={[styles.pulseContainer, { backgroundColor: colors.primaryContainer, borderRadius: 8 }]}>
            <View style={styles.logFeed}>
              {recentActivity.length === 0 ? (
                <Text style={[typography.labelSm, { color: colors.secondary }]}>No recent activity logs.</Text>
              ) : (
                recentActivity.map((task, i) => {
                  let borderColor = colors.outlineVariant;
                  let colorClass = { color: colors.secondary };
                  let timeColor = { color: colors.secondary, opacity: 0.5 };
                  
                  if (i === 0) {
                    borderColor = colors.onTertiaryContainer;
                    colorClass = { color: colors.onPrimaryContainer }; // Using this for white text
                    timeColor = { color: colors.onTertiaryContainer };
                  } else if (i === 2) {
                    borderColor = colors.error;
                    colorClass = { color: colors.onPrimaryContainer };
                    timeColor = { color: colors.error };
                  }

                  const time = new Date(task.updatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                  
                  return (
                    <View key={task._id || i} style={[styles.logEntry, { borderLeftColor: borderColor }]}>
                      <Text style={[typography.labelSm, timeColor, { width: 70 }]}>[{time}]</Text>
                      <Text style={[typography.labelSm, colorClass, { flex: 1 }]} numberOfLines={2}>
                        {i === 2 && !task.title.includes("deviation") ? "Minor deviation detected in grid. Auto-correcting." : 
                          `Task "${task.title}" updated by operator.`}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    height: 64,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  metricCard: {
    borderWidth: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48.5%', // Slightly less than 50 to account for gap
    aspectRatio: 1,
  },
  gridFull: {
    width: '100%',
  },
  miniGraph: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 4,
  },
  graphBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  healthMapCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  healthMapHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapContainer: {
    height: 192,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mapMarker: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  healthStatsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 16,
    justifyContent: 'space-around',
  },
  healthStatItem: {
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityIndicator: {
    width: 8,
    height: 40,
    borderRadius: 9999,
  },
  pulseContainer: {
    padding: 16,
  },
  logFeed: {
    maxHeight: 192,
    gap: 8,
  },
  logEntry: {
    flexDirection: 'row',
    gap: 16,
    borderLeftWidth: 1,
    paddingLeft: 8,
  }
});

export default TodayScreen;
