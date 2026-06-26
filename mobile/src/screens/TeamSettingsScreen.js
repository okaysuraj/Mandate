import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useWorkspace } from "../context/WorkspaceContext";
import { API_URL } from "../config";
import { colors, fonts, spacing, borderRadius } from "../theme";

const TeamSettingsScreen = ({ navigation }) => {
  const { activeWorkspace, fetchWorkspaces } = useWorkspace();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/workspaces/${activeWorkspace._id}/invite`, {
        email: email.trim(),
      });
      Alert.alert("Success", "Invitation sent!");
      setEmail("");
      fetchWorkspaces();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← BACK</Text>
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={styles.heroTitle}>TEAM</Text>
          <Text style={styles.heroSubtitle}>{activeWorkspace?.name?.toUpperCase() || "WORKSPACE"}</Text>
        </View>

        {/* Members */}
        <Text style={styles.sectionTitle}>MEMBERS</Text>
        {activeWorkspace?.members?.map((member, idx) => (
          <View key={idx} style={styles.memberItem}>
            <View style={styles.memberAvatar}>
              <Text style={styles.memberAvatarText}>
                {member.user?.name?.charAt(0)?.toUpperCase() || member.role?.charAt(0) || "M"}
              </Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.user?.name || "Team Member"}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
        ))}

        {/* Invite */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>INVITE MEMBER</Text>
        <View style={styles.inviteRow}>
          <TextInput
            style={styles.inviteInput}
            value={email}
            onChangeText={setEmail}
            placeholder="colleague@company.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.inviteBtn, loading && { opacity: 0.5 }]}
            onPress={handleInvite}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={styles.inviteBtnText}>INVITE</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  backButton: { marginTop: spacing.lg },
  backText: { ...fonts.tiny, color: colors.textSecondary },
  headerSection: { marginTop: spacing.md, marginBottom: spacing.xl },
  heroTitle: { fontSize: 48, fontWeight: "900", color: colors.primary, letterSpacing: -2 },
  heroSubtitle: { ...fonts.tiny, marginTop: spacing.xs },
  sectionTitle: { ...fonts.tiny, marginBottom: spacing.md },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: spacing.md,
  },
  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  memberAvatarText: { color: colors.white, fontSize: 14, fontWeight: "700" },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  memberRole: { ...fonts.tiny, marginTop: 2 },
  inviteRow: { flexDirection: "row", gap: spacing.sm },
  inviteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 13,
    color: colors.textPrimary,
  },
  inviteBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
    justifyContent: "center",
  },
  inviteBtnText: { ...fonts.tiny, color: colors.white },
});

export default TeamSettingsScreen;
