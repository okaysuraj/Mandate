import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config";
import { useTheme } from "../../context/ThemeContext";

const GoalsScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/goals`, { params: { workspaceId: user.activeWorkspace } })
        .then(res => setGoals(res.data || []))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Aggregate metrics
  const activeCount = goals.length;
  const avgProgress = goals.length ? Math.round(goals.reduce((acc, g) => acc + (g.progress || 0), 0) / goals.length) : 0;
  const urgentCount = 3; // Mocked for now since backend might not have 'urgent' goal flags
  const mttr = 4.2; // Mocked MTTR

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Telemetry Header */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM TELEMETRY</Text>
            <View style={[styles.liveBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>LIVE_FEED</Text>
            </View>
          </View>
          
          <View style={styles.bentoGrid}>
            <View style={[styles.bentoCell, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>ACTIVE_OBJECTIVES</Text>
              <View style={styles.metricValue}>
                <Text style={[typography.displayLg, { fontSize: 40, color: colors.primary }]}>{activeCount}</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>units</Text>
              </View>
            </View>
            <View style={[styles.bentoCell, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>SYS_EFFICIENCY</Text>
              <View style={styles.metricValue}>
                <Text style={[typography.displayLg, { fontSize: 40, color: colors.primary }]}>{avgProgress}</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>%</Text>
              </View>
            </View>
            <View style={[styles.bentoCell, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>URGENT_DIRECTIVES</Text>
              <View style={styles.metricValue}>
                <Text style={[typography.displayLg, { fontSize: 40, color: colors.error }]}>0{urgentCount}</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>hot</Text>
              </View>
            </View>
            <View style={[styles.bentoCell, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>MEAN_T_RESOLUTION</Text>
              <View style={styles.metricValue}>
                <Text style={[typography.displayLg, { fontSize: 40, color: colors.primary }]}>{mttr}</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Bar */}
        <View style={styles.section}>
          <TouchableOpacity style={[styles.primaryActionBtn, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]} activeOpacity={0.8}>
            <MaterialIcons name="add-circle" size={24} color={colors.onPrimary} />
            <Text style={[typography.labelSm, { color: colors.onPrimary, letterSpacing: 2 }]}>INITIALIZE_GOAL</Text>
          </TouchableOpacity>
        </View>

        {/* Ledger List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>OBJECTIVE_LEDGER</Text>
            <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>SORT: PRIORITY_DESC</Text>
          </View>

          {goals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>No objectives found.</Text>
            </View>
          ) : (
            goals.map((item, index) => {
              const progress = item.progress || 0;
              // Mock priorities based on index for visual variety
              const priority = index % 3 === 0 ? 'CRITICAL' : index % 3 === 1 ? 'HIGH' : 'MEDIUM';
              const pColor = priority === 'CRITICAL' ? colors.error : priority === 'HIGH' ? colors.primary : colors.secondary;
              const dueStr = item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0].replace(/-/g, '.') : '2024.12.31';

              return (
                <TouchableOpacity 
                  key={item._id} 
                  style={[styles.goalCard, { 
                    backgroundColor: colors.surfaceContainerLowest, 
                    borderColor: colors.outlineVariant,
                    borderLeftColor: pColor
                  }]}
                  activeOpacity={0.7}
                  onPress={() => { navigation.navigate('GoalDetail', { goal: item }) }}
                >
                  <View style={styles.goalHeaderRow}>
                    <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>
                      #G-{item._id.substring(0, 4).toUpperCase()}
                    </Text>
                    <View style={[styles.priorityBadge, { borderColor: pColor }]}>
                      <Text style={[typography.labelCaps, { fontSize: 9, color: pColor }]}>{priority}</Text>
                    </View>
                  </View>
                  
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.md }]}>
                    {item.title}
                  </Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressLabelRow}>
                      <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>PROGRESS</Text>
                      <Text style={[typography.labelSm, { fontSize: 10, color: colors.primary }]}>{progress}%</Text>
                    </View>
                    <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${progress}%` }]} />
                    </View>
                    
                    <View style={styles.goalFooter}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <MaterialIcons name="calendar-today" size={14} color={colors.secondary} />
                        <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary }]}>DUE: {dueStr}</Text>
                      </View>
                      <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderRadius: 8,
  },
  content: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 80, // Space for BottomNavBar if present
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  liveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoCell: {
    width: '48%',
    borderWidth: 1,
    padding: 16,
    justifyContent: 'space-between',
    height: 128,
  },
  metricValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  emptyState: { 
    paddingVertical: 48, 
    alignItems: "center" 
  },
  goalCard: {
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 16,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  priorityBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressContainer: {
    gap: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  }
});

export default GoalsScreen;
