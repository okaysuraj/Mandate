import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, TextInput, Alert, Image,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { colors, fonts, spacing, borderRadius } from "../theme";

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace } = useWorkspace();
  const [showNewWorkspace, setShowNewWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return;
    try {
      await createWorkspace(newWorkspaceName.trim());
      setNewWorkspaceName("");
      setShowNewWorkspace(false);
    } catch {}
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.heroTitle}>SETTINGS</Text>
          <Text style={styles.heroSubtitle}>ACCOUNT & WORKSPACE</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || "M"}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Workspace Switcher */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>WORKSPACES</Text>
          <TouchableOpacity onPress={() => setShowNewWorkspace(!showNewWorkspace)}>
            <Text style={styles.addButton}>+ NEW</Text>
          </TouchableOpacity>
        </View>

        {showNewWorkspace && (
          <View style={styles.newWorkspaceRow}>
            <TextInput
              style={styles.newWorkspaceInput}
              value={newWorkspaceName}
              onChangeText={setNewWorkspaceName}
              placeholder="Workspace name..."
              placeholderTextColor={colors.textMuted}
              autoFocus
            />
            <TouchableOpacity style={styles.createBtn} onPress={handleCreateWorkspace}>
              <Text style={styles.createBtnText}>CREATE</Text>
            </TouchableOpacity>
          </View>
        )}

        {workspaces.map((ws) => (
          <TouchableOpacity
            key={ws._id}
            style={[styles.workspaceItem, activeWorkspace?._id === ws._id && styles.workspaceActive]}
            onPress={() => switchWorkspace(ws._id)}
          >
            <View style={[styles.workspaceDot, activeWorkspace?._id === ws._id && styles.workspaceDotActive]} />
            <Text style={[styles.workspaceName, activeWorkspace?._id === ws._id && styles.workspaceNameActive]}>
              {ws.name}
            </Text>
            {activeWorkspace?._id === ws._id && (
              <Text style={styles.activeLabel}>ACTIVE</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Navigation Links */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MORE</Text>
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("TeamSettings")}>
          <Text style={styles.menuItemText}>Team Settings</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Pricing")}>
          <Text style={styles.menuItemText}>Pricing Plans</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  headerSection: { marginTop: spacing.lg, marginBottom: spacing.xl },
  heroTitle: { fontSize: 48, fontWeight: "900", color: colors.primary, letterSpacing: -2 },
  heroSubtitle: { ...fonts.tiny, marginTop: spacing.xs },
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.xl,
  },
  avatarRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: colors.white, fontSize: 18, fontWeight: "800" },
  userName: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  userEmail: { ...fonts.small, marginTop: 2 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: { ...fonts.tiny },
  addButton: { ...fonts.tiny, color: colors.primary },
  newWorkspaceRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  newWorkspaceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textPrimary,
  },
  createBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    justifyContent: "center",
  },
  createBtnText: { ...fonts.tiny, color: colors.white },
  workspaceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: spacing.md,
  },
  workspaceActive: {},
  workspaceDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  workspaceDotActive: { backgroundColor: colors.primary },
  workspaceName: { flex: 1, fontSize: 14, fontWeight: "600", color: colors.textSecondary },
  workspaceNameActive: { color: colors.primary, fontWeight: "700" },
  activeLabel: { ...fonts.tiny, color: colors.primary },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemText: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  menuArrow: { fontSize: 16, color: colors.textMuted },
  logoutButton: {
    marginTop: spacing.xl,
    backgroundColor: "transparent",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: { color: colors.danger, fontSize: 11, fontWeight: "700", letterSpacing: 2 },
});

export default SettingsScreen;
