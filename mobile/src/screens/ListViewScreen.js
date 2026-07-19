import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useDataStore } from "../store/useDataStore";

const ListViewScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { tasks } = useDataStore(state => state);

  const activeTasks = tasks.filter(t => t.status.toLowerCase() !== "completed" && t.status.toLowerCase() !== "done");
  const criticalTasks = tasks.filter(t => t.priority === "urgent" || t.priority === "high");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.surfaceDim, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Metrics: Compact Grid */}
        <View style={styles.metricsGrid}>
          {/* Main Status */}
          <View style={[styles.bentoCard, styles.colSpan2, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>SYSTEM STATUS</Text>
              <MaterialIcons name="bolt" size={20} color={colors.onTertiaryContainer} />
            </View>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800' }]}>STABLE STATE</Text>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '88%' }]} />
              </View>
            </View>
          </View>

          {/* Active Tasks */}
          <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>ACTIVE TASKS</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', marginTop: 16 }]}>{activeTasks.length}</Text>
          </View>

          {/* Critical Path */}
          <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>CRITICAL PATH</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.error, fontWeight: '700', marginTop: 16 }]}>{criticalTasks.length}</Text>
          </View>
        </View>

        {/* Task Ledger Filter / Title */}
        <View style={styles.ledgerHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>ACTIVE LEDGER</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="filter-list" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="search" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Cards Ledger */}
        <View style={styles.tasksList}>
          {activeTasks.map((task, index) => {
            const isCritical = task.priority === "urgent" || task.priority === "high";
            const timeAgo = task.updatedAt ? new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Unknown";
            
            return (
              <TouchableOpacity key={task._id || index} style={[styles.taskCard, { backgroundColor: isCritical ? `${colors.error}0D` : colors.surfaceContainerLowest, borderColor: isCritical ? `${colors.error}4D` : colors.outlineVariant }]} activeOpacity={0.9}>
                <View style={styles.taskHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondaryFixedDim }]}>ID: #SYS-{(task._id || '000').substring(0,4).toUpperCase()}</Text>
                  <View style={[styles.statusChip, { backgroundColor: isCritical ? colors.errorContainer : colors.tertiaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: isCritical ? colors.onErrorContainer : colors.onTertiaryContainer, fontSize: 10 }]}>{task.status.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 16 }]}>
                  {task.title}
                </Text>
                <View style={[styles.taskFooter, { borderTopColor: colors.surfaceContainer }]}>
                  <View style={styles.assignee}>
                    <View style={[styles.avatar, { backgroundColor: colors.surfaceDim }]}>
                      <MaterialIcons name="person" size={20} color={colors.secondary} style={{ alignSelf: 'center', marginTop: 6 }} />
                    </View>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>{task.assignee?.name || "UNASSIGNED"}</Text>
                  </View>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>{timeAgo}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* FAB: New Entry */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

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
    paddingBottom: 96,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  colSpan2: {
    width: '100%',
    height: 128,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    gap: 16,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 50,
  }
});

export default ListViewScreen;
