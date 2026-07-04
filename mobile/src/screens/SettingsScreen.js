import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Switch
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { colors, typography, spacing, borderRadius, isDark, toggleTheme } = useTheme();

  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>SYSTEM</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>PROFILE IDENTITY</Text>
          
          <View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View style={[styles.avatar, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="person" size={32} color={colors.secondary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 20 }]}>{user?.name || "Operator"}</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>{user?.email || "operator@mandate.systems"}</Text>
            </View>
            <TouchableOpacity style={[styles.editBtn, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="edit" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Preferences */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>DISPLAY PREFERENCES</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View style={styles.settingText}>
              <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Dark Mode</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Toggle industrial high-contrast theme</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
              thumbColor={colors.onPrimary}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>SYSTEM NOTIFICATIONS</Text>
          
          <View style={[styles.settingGroup, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <View style={[styles.settingRow, { borderBottomColor: colors.outlineVariant, borderBottomWidth: 1 }]}>
              <View style={styles.settingText}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Critical Alerts</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Immediate notification for system failures</Text>
              </View>
              <Switch
                value={criticalAlerts}
                onValueChange={setCriticalAlerts}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.onPrimary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingText}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Weekly Reports</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Digest of workspace activity every Monday</Text>
              </View>
              <Switch
                value={weeklyReports}
                onValueChange={setWeeklyReports}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.onPrimary}
              />
            </View>
          </View>
        </View>

        {/* Navigation Links */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.md }]}>WORKSPACE CONFIGURATION</Text>
          
          <View style={[styles.settingGroup, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
            <TouchableOpacity 
              style={[styles.linkRow, { borderBottomColor: colors.outlineVariant, borderBottomWidth: 1 }]}
              onPress={() => navigation.navigate("TeamSettings")}
            >
              <View style={styles.linkLeft}>
                <MaterialIcons name="group" size={20} color={colors.secondary} />
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Team Settings</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.linkRow, { borderBottomColor: colors.outlineVariant, borderBottomWidth: 1 }]}
              onPress={() => navigation.navigate("Admin")}
            >
              <View style={styles.linkLeft}>
                <MaterialIcons name="admin-panel-settings" size={20} color={colors.secondary} />
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Admin Operations</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkRow}
              onPress={() => navigation.navigate("Pricing")}
            >
              <View style={styles.linkLeft}>
                <MaterialIcons name="credit-card" size={20} color={colors.secondary} />
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Billing & Allocation</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.logoutBtn, { borderColor: colors.error }]}
          onPress={logout}
        >
          <MaterialIcons name="logout" size={20} color={colors.error} />
          <Text style={[typography.labelCaps, { color: colors.error }]}>TERMINATE SESSION</Text>
        </TouchableOpacity>

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
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
  },
  settingGroup: {
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingText: {
    flex: 1,
    paddingRight: 16,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
    marginTop: 16,
  }
});

export default SettingsScreen;
