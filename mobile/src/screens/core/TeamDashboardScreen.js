import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import AppHeader from "../../components/layout/AppHeader";

const DEFAULT_TEAM_MEMBERS = [
  { id: "m1", name: "Alex Chen", email: "alex.chen@mandate.internal", role: "Frontend Lead", status: "Active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { id: "m2", name: "Sarah Jenkins", email: "sarah.j@mandate.internal", role: "DevOps Specialist", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { id: "m3", name: "David Miller", email: "david.m@mandate.internal", role: "Product Manager", status: "Away", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { id: "m4", name: "Elena Rostova", email: "elena.r@mandate.internal", role: "Backend Architect", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
];

const TeamDashboardScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { user } = useAuth();
  const rawTasks = useDataStore((state) => state.tasks);
  const tasks = Array.isArray(rawTasks) ? rawTasks : (Array.isArray(rawTasks?.data) ? rawTasks.data : []);
  const [searchTerm, setSearchTerm] = useState("");

  const activeTasks = tasks.filter((t) => t && t.status !== "completed" && t.status !== "done").length;
  const completedTasks = tasks.filter((t) => t && (t.status === "completed" || t.status === "done")).length;

  const currentUserMember = {
    id: user?._id || user?.id || "current-user",
    name: user?.name || "Team Lead",
    email: user?.email || "user@mandate.app",
    role: "Workspace Manager (You)",
    status: "Active",
    avatar: user?.avatar || "",
  };

  const allMembers = [currentUserMember, ...DEFAULT_TEAM_MEMBERS];

  const filteredMembers = allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="TEAM WORKSPACE" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dashboard Header matching web TeamWorkspacePage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              ORGANIZATION &amp; COLLABORATION
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Team Workspace
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            View active team members, roles, permissions, and workspace resource distribution.
          </Text>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity 
              onPress={() => navigation?.navigate("Analytics")}
              style={[styles.outlineBtn, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow }]}
            >
              <Text style={[styles.outlineBtnText, { color: colors.onSurface }]}>TEAM ANALYTICS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation?.navigate("Settings")}
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.primaryBtnText, { color: colors.onPrimary }]}>MANAGE WORKSPACE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Workspace Roster Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.rosterHeader}>
            <Text style={[styles.rosterTitle, { color: colors.onSurface }]}>
              Workspace Roster ({allMembers.length} Members)
            </Text>
            <Text style={[styles.rosterSubtitle, { color: colors.onSurfaceVariant }]}>
              Core Engineering &amp; Operations Distribution
            </Text>

            {/* Search Input */}
            <View style={[styles.searchBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="search" size={18} color={colors.secondary} />
              <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search by name, role, email..."
                placeholderTextColor={colors.onSurfaceVariant}
                style={[styles.searchInput, { color: colors.onSurface }]}
              />
            </View>
          </View>

          {/* Members List */}
          <View style={styles.memberList}>
            {filteredMembers.map((member) => (
              <View 
                key={member.id} 
                style={[styles.memberItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
              >
                <View style={styles.memberLeft}>
                  {member.avatar ? (
                    <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                  ) : (
                    <View style={[styles.memberAvatarPlaceholder, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.memberAvatarText, { color: colors.onPrimary }]}>
                        {member.name.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <View style={styles.memberInfo}>
                    <Text style={[styles.memberName, { color: colors.onSurface }]}>{member.name}</Text>
                    <Text style={[styles.memberEmail, { color: colors.onSurfaceVariant }]}>{member.email}</Text>
                    <Text style={[styles.memberRole, { color: colors.secondary }]}>{member.role}</Text>
                  </View>
                </View>
                <View style={styles.memberRight}>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: member.status === "Active" ? colors.tertiaryContainer : colors.surfaceContainerHigh,
                    borderColor: colors.outlineVariant 
                  }]}>
                    <View style={[styles.statusDot, { backgroundColor: member.status === "Active" ? colors.tertiary : colors.outline }]} />
                    <Text style={[styles.statusText, { color: member.status === "Active" ? colors.onTertiaryContainer : colors.onSurfaceVariant }]}>
                      {member.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 01 Member Status Card */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>TEAM OVERVIEW</Text>
            <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryContainer }]}>
              <Text style={[styles.tagBadgeText, { color: colors.onTertiaryContainer }]}>REALTIME</Text>
            </View>
          </View>
          <View style={styles.splitRow}>
            <View style={[styles.splitCol, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderWidth: 1, borderRadius: 8 }]}>
              <Text style={[{ fontFamily: 'HankenGrotesk-Bold', fontSize: 32, color: colors.primary }]}>{String(activeTasks).padStart(2, '0')}</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>ACTIVE TASKS</Text>
            </View>
            <View style={[styles.splitCol, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderWidth: 1, borderRadius: 8 }]}>
              <Text style={[{ fontFamily: 'HankenGrotesk-Bold', fontSize: 32, color: colors.outline }]}>{String(completedTasks).padStart(2, '0')}</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>COMPLETED</Text>
            </View>
          </View>
        </View>

        {/* 02 Aggregate Output Sparkline */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>AGGREGATE WORKSPACE OUTPUT</Text>
          <View style={styles.sparklineContainer}>
            <Svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
              <Path 
                d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,10" 
                fill="none" 
                stroke={colors.primary} 
                strokeWidth="3" 
              />
              <Path 
                d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,10 V100 H0 Z" 
                fill={`${colors.primary}15`} 
              />
            </Svg>
          </View>
          <View style={styles.sparklineFooter}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>CYCLE START</Text>
            <View style={styles.trendIndicator}>
              <MaterialIcons name="trending-up" size={14} color={colors.primary} />
              <Text style={[typography.labelSm, { color: colors.primary, marginLeft: 4 }]}>+12.4% VELOCITY</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>CYCLE END</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageHeader: { marginBottom: 16 },
  breadcrumbRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  brandDot: { width: 8, height: 8, borderRadius: 4 },
  breadcrumbText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  title: { fontFamily: "HankenGrotesk-Bold", fontSize: 24, textTransform: "uppercase", letterSpacing: -0.5 },
  subtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 13, marginTop: 4, lineHeight: 18 },
  actionButtonsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  outlineBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  outlineBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 0.5 },
  primaryBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  primaryBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 0.5 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  rosterHeader: { marginBottom: 12 },
  rosterTitle: { fontFamily: "HankenGrotesk-Bold", fontSize: 18 },
  rosterSubtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 12, marginTop: 2 },
  searchBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, height: 40, marginTop: 12 },
  searchInput: { flex: 1, marginLeft: 8, fontFamily: "HankenGrotesk-Regular", fontSize: 13 },
  memberList: { gap: 10 },
  memberItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderRadius: 10, padding: 12 },
  memberLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20 },
  memberAvatarPlaceholder: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  memberAvatarText: { fontFamily: "JetBrainsMono-Bold", fontSize: 14 },
  memberInfo: { flex: 1 },
  memberName: { fontFamily: "HankenGrotesk-Bold", fontSize: 14 },
  memberEmail: { fontFamily: "JetBrainsMono-Regular", fontSize: 11 },
  memberRole: { fontFamily: "HankenGrotesk-Medium", fontSize: 11, marginTop: 2 },
  memberRight: {},
  statusBadge: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, gap: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontFamily: "JetBrainsMono-Bold", fontSize: 9, letterSpacing: 0.5 },
  bentoCard: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  bentoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  tagBadgeText: { fontFamily: "JetBrainsMono-Bold", fontSize: 10 },
  splitRow: { flexDirection: "row", gap: 12 },
  splitCol: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 16 },
  sparklineContainer: { height: 90, width: "100%", marginVertical: 8 },
  sparklineFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  trendIndicator: { flexDirection: "row", alignItems: "center" },
});

export default TeamDashboardScreen;
