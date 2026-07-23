import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const TeamSettingsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [inviteEmail, setInviteEmail] = useState("");

  const members = [
    { id: '1', name: 'Alexander Sterling', email: 'alex@mandate.systems', role: 'Admin' },
    { id: '2', name: 'Elena Rostova', email: 'elena@mandate.systems', role: 'Operator' },
    { id: '3', name: 'Marcus Chen', email: 'marcus@mandate.systems', role: 'Observer' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>TEAM SETUP</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Invite Section */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>INVITE OPERATOR</Text>
          
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 8 }]}>Enter email to dispatch invitation</Text>
            <View style={styles.inviteRow}>
              <TextInput
                style={[
                  styles.input, 
                  typography.bodyMd, 
                  { 
                    backgroundColor: colors.surfaceContainer, 
                    borderColor: colors.outlineVariant,
                    color: colors.primary
                  }
                ]}
                placeholder="new.operator@domain.com"
                placeholderTextColor={colors.outline}
                value={inviteEmail}
                onChangeText={setInviteEmail}
                autoCapitalize="none"
              />
              <TouchableOpacity style={[styles.inviteBtn, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>SEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Active Roster */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>ACTIVE ROSTER</Text>
          
          <View style={[styles.listGroup, { borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            {members.map((member, index) => (
              <View 
                key={member.id} 
                style={[
                  styles.memberRow, 
                  { backgroundColor: colors.surfaceContainerLowest },
                  index !== members.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.outlineVariant }
                ]}
              >
                <View style={[styles.avatar, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>{member.name.charAt(0)}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{member.name}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>{member.role} • {member.email}</Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={20} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            ))}
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
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  card: {
    padding: 16,
    borderWidth: 1,
  },
  inviteRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inviteBtn: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  listGroup: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  memberInfo: {
    flex: 1,
  }
});

export default TeamSettingsScreen;
