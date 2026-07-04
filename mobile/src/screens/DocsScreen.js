import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

const DocsScreen = ({ navigation }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/documents`, { params: { workspaceId: user.activeWorkspace } })
        .then(res => setDocs(res.data || res.data.data || []))
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
            <Text style={[typography.headlineLg, { color: colors.primary }]}>KNOWLEDGE</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>WORKSPACE WIKI & DOCS</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Goals")}
            style={{ backgroundColor: colors.surfaceContainer, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.outlineVariant }}
          >
            <Text style={[typography.labelCaps, { color: colors.primary }]}>GO TO GOALS</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList 
        data={docs}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <TouchableOpacity style={[styles.docCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 4 }]}>{item.title}</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Last updated: {new Date(item.updatedAt).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>No documents found.</Text>
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
  docCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  emptyState: { paddingVertical: 48, alignItems: "center" },
});

export default DocsScreen;
