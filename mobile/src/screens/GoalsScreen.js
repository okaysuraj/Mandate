import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

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
      <View style={styles.headerSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={[typography.headlineLg, { color: colors.primary }]}>GOALS</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>QUARTERLY OBJECTIVES</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: colors.surfaceContainer, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.outlineVariant }}
          >
            <Text style={[typography.labelCaps, { color: colors.primary }]}>BACK TO DOCS</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList 
        data={goals}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => {
          const progress = item.progress || 0;
          return (
            <TouchableOpacity style={[styles.goalCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.goalHeader}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{item.title}</Text>
                <Text style={[typography.labelCaps, { color: progress >= 100 ? colors.onTertiaryContainer : colors.secondary }]}>
                  {progress}%
                </Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginBottom: 12 }]}>{item.description}</Text>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: progress >= 100 ? colors.onTertiaryContainer : colors.primary }]} />
              </View>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>No goals found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerSection: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  listContent: { paddingHorizontal: 24, paddingBottom: 100 },
  goalCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  goalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressBarBg: { height: 6, borderRadius: 3, width: "100%", overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  emptyState: { paddingVertical: 48, alignItems: "center" }
});

export default GoalsScreen;
