import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, RefreshControl, Dimensions, Animated, Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { useDataStore } from "../store/useDataStore";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get('window');

const KanbanScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { tasks, loading, loadTasks, subscribeToSocket } = useDataStore(state => state);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const scrollViewRef = useRef(null);
  const { socket } = useSocket();
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (user) loadTasks();
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

  const backlogTasks = tasks.filter(t => t.status.toLowerCase() === 'todo' || t.status.toLowerCase() === 'pending');
  const inProgressTasks = tasks.filter(t => t.status.toLowerCase() === 'in progress' || t.status.toLowerCase() === 'in-progress');
  const validationTasks = tasks.filter(t => t.status.toLowerCase() === 'done' || t.status.toLowerCase() === 'completed');

  const scrollToTab = (index) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(x / width);
    if (activeIndex !== activeTab) {
      setActiveTab(activeIndex);
    }
  };

  const renderPriority = (priority) => {
    let pBg = colors.surfaceContainerHigh;
    let pText = colors.onSecondaryContainer;
    let pLabel = (priority || 'MED').toUpperCase();
    
    if (priority === 'urgent' || priority === 'high') {
      pBg = colors.tertiaryFixed;
      pText = colors.onTertiaryContainer;
    }
    
    return (
      <View style={[styles.priorityChip, { backgroundColor: pBg }]}>
        <Text style={[typography.labelCaps, { color: pText }]}>{pLabel}</Text>
      </View>
    );
  };

  const renderTaskCard = (task, type) => {
    const timeAgo = (dateStr) => {
      if (!dateStr) return 'Unknown';
      const hours = Math.floor((new Date() - new Date(dateStr)) / 3600000);
      return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
    };

    let cardBorder = colors.outlineVariant;
    if (type === 'in-progress') cardBorder = colors.primary;

    return (
      <TouchableOpacity 
        key={task._id || task.id} 
        style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: cardBorder, borderRadius: borderRadius.DEFAULT }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("TaskDetail", { task })}
      >
        {type === 'in-progress' && (
          <View style={[styles.activeStrip, { backgroundColor: colors.primary }]} />
        )}
        
        <View style={styles.cardHeader}>
          <Text style={[typography.labelSm, { color: colors.onPrimaryContainer }]}>
            #MN-{(task._id || task.id || 'XXX').substring(0,3).toUpperCase()}
          </Text>
          {type === 'completed' ? (
            <View style={[styles.priorityChip, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>DONE</Text>
            </View>
          ) : renderPriority(task.priority)}
        </View>
        
        <Text style={[typography.headlineLgMobile, { fontSize: 18, marginBottom: spacing.md, color: colors.primary }]} numberOfLines={2}>
          {task.title}
        </Text>
        
        {type === 'in-progress' && (
          <View style={styles.progressSection}>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '65%' }]} />
            </View>
            <View style={styles.progressFooter}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>65% Complete</Text>
              <View style={styles.avatarStack}>
                <View style={[styles.avatarMini, { borderColor: colors.surface, backgroundColor: colors.surfaceDim }]} />
                <View style={[styles.avatarMini, { borderColor: colors.surface, backgroundColor: colors.secondary, marginLeft: -8 }]} />
              </View>
            </View>
          </View>
        )}
        
        {type !== 'in-progress' && (
          <View style={styles.cardFooter}>
            {type === 'completed' ? (
              <View style={styles.approvedBadge}>
                <MaterialIcons name="check-circle" size={14} color={colors.onTertiaryContainer} style={{ marginRight: 4 }} />
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 12 }]}>Approved</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="history" size={16} color={colors.secondary} style={{ marginRight: 4 }} />
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 12 }]}>Updated {timeAgo(task.updatedAt)}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderColumn = (tasks, id, type) => (
    <ScrollView 
      style={styles.columnContainer}
      contentContainerStyle={styles.columnContent}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      {tasks.length === 0 ? (
        <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center', marginTop: spacing.xl }]}>
          NO TASKS IN {id}
        </Text>
      ) : (
        tasks.map(t => renderTaskCard(t, type))
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: 'transparent' }]}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC13kNXtfuyZkOF9Irh5XlWloe5gUNmYCU0oX5W9IG2dkmAfnxfoSUdDIQGZDFkDMF0jcSYO-8X7W7BaIG9hXCjwd4JGvdqTwH_Z3VuKM-sVj3DFEIr9aJ1Rhykj6QXHYmtmQlwO1ASS_lg8vfedVtiSoC-jogC9xLfDks13phUon0keEIDbk7Lj8Q4I436LmXq98T4iFJDWyiVcJrX5qqzEN65QDNf7rZ36FZG8UBAZJloLz0Uz5HeAQ' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      {/* Board Header / Tab Switcher */}
      <View style={styles.tabScrollWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
          {['BACKLOG', 'IN PROGRESS', 'VALIDATION'].map((tab, idx) => {
            const counts = [backlogTasks.length, inProgressTasks.length, validationTasks.length];
            const isActive = activeTab === idx;
            
            return (
              <TouchableOpacity 
                key={tab}
                style={[
                  styles.tabButton, 
                  { 
                    backgroundColor: isActive ? colors.primary : colors.surfaceContainerLowest,
                    borderColor: isActive ? colors.primary : colors.outlineVariant
                  }
                ]}
                onPress={() => scrollToTab(idx)}
              >
                <Text style={[
                  typography.labelCaps, 
                  { color: isActive ? colors.onPrimary : colors.secondary }
                ]}>
                  {tab} ({counts[idx]})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Swipeable Kanban Container */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.kanbanContainer}
      >
        {renderColumn(backlogTasks, "BACKLOG", "pending")}
        {renderColumn(inProgressTasks, "IN PROGRESS", "in-progress")}
        {renderColumn(validationTasks, "VALIDATION", "completed")}
      </ScrollView>

      {/* Deploy Action Footer */}
      <View style={styles.actionFooter}>
        <TouchableOpacity style={[styles.deployButton, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]} activeOpacity={0.8}>
          <MaterialIcons name="rocket-launch" size={20} color={colors.onPrimary} style={{ marginRight: spacing.sm }} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>DEPLOY BATCH</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: -8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  tabScrollWrapper: {
    paddingVertical: 16,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  kanbanContainer: {
    flex: 1,
  },
  columnContainer: {
    width: width,
  },
  columnContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for footer
    gap: 16,
  },
  taskCard: {
    padding: 24,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  activeStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  priorityChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMini: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardFooter: {
    marginTop: 8,
  },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionFooter: {
    position: 'absolute',
    bottom: 24, // App.js has BottomNav taking bottom, so this goes above it (usually 64px, but SafeArea handles some of it)
    left: 0,
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 40,
  },
  deployButton: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  }
});

export default KanbanScreen;
