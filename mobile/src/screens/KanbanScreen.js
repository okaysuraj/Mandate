import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, FlatList, RefreshControl, Modal, TextInput
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

const KanbanScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { user } = useAuth();
  const { socket } = useSocket();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks`, {
        params: { limit: 100 },
      });
      setTasks(data.data || data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return { bg: colors.onTertiaryContainer, text: colors.onTertiary, dot: colors.onTertiary, label: 'COMPLETE' };
      case 'in-progress': return { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant, dot: colors.onTertiaryContainer, label: 'ACTIVE', isPulse: true };
      default: return { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant, dot: colors.outline, label: 'PENDING' };
    }
  };

  const renderItem = ({ item, index }) => {
    const sStyle = getStatusStyle(item.status);
    
    return (
      <TouchableOpacity 
        style={[styles.taskCard, { borderBottomColor: colors.surfaceContainer }]}
        activeOpacity={0.7}
      >
        <View style={styles.taskHeader}>
          <Text style={[typography.labelSm, { color: colors.secondary }]}>
            #MN-{String(9000 - index).padStart(4, '0')}
          </Text>
          <MaterialIcons name="more-horiz" size={20} color={colors.secondary} />
        </View>
        
        <View style={styles.taskBody}>
          <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 2 }]}>
            {item.title}
          </Text>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
            {item.description || "No description"}
          </Text>
        </View>

        <View style={styles.taskFooter}>
          <View style={[styles.statusChip, { backgroundColor: sStyle.bg, borderColor: colors.outlineVariant, borderWidth: item.status !== 'completed' ? 1 : 0 }]}>
            <View style={[styles.statusDot, { backgroundColor: sStyle.dot }]} />
            <Text style={[typography.labelCaps, { color: sStyle.text, fontSize: 9 }]}>{sStyle.label}</Text>
          </View>
          
          <Text style={[typography.labelCaps, { color: item.priority === 'urgent' ? colors.error : colors.secondary, fontSize: 10 }]}>
            {(item.priority || 'MEDIUM').toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>BACKLOG</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <MaterialIcons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subHeader}>
        <Text style={[typography.labelCaps, { color: colors.secondary }]}>CORE DATABASE / V.24</Text>
        <View style={styles.activeCount}>
          <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
          <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>
            {tasks.filter(t => t.status !== 'completed').length} ACTIVE ENTITIES
          </Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        ListEmptyComponent={
          <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center', marginTop: 40 }]}>NO ENTITIES FOUND</Text>
        }
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>
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
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  subHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  listContent: {
    paddingBottom: 80,
  },
  taskCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskBody: {
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
});

export default KanbanScreen;
