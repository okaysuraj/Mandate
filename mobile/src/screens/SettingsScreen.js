import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Switch, Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { colors, typography, spacing, borderRadius, isDark, toggleTheme } = useTheme();

  const [biometric, setBiometric] = useState(true);
  const [encrypted, setEncrypted] = useState(true);
  const [killswitch, setKillswitch] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
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
        
        {/* Profile Header Module */}
        <View style={styles.section}>
          <View style={styles.profileHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>OPERATOR SETTINGS</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, letterSpacing: 2, marginTop: 4 }]}>
                ID: MN-0982-X
              </Text>
              <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>
                {user?.name || "Operator"}
              </Text>
            </View>
            <View style={[styles.avatarContainer, { borderColor: colors.primary }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAulB7hV3bWJOfIOtbCPQWodgUNAIfn20bVSJrKQboUelKevzDSQiuNtzRpzoiwhkewERqpe8hogOO4ozTxxDpYLePAsys-gHZDBCoSkPtQ1hseAea1rzKzsZa8RkMoY00SA7L_a3BWPGsbTRoPdFknZ3rC__zvrJEO8IrXbhsNBWUmtatljhQbYetqD895qHBCWIKpafFbakp2s2-ZtxZJX5V524MDx5BpubGH454sr2A6hN-WosRNhQ' }}
                style={styles.avatarImg}
              />
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />
        </View>

        {/* System Credentials */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>SYSTEM CREDENTIALS</Text>
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={{ marginBottom: 16 }}>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 4 }]}>Access Key</Text>
              <View style={[styles.credBox, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>********************</Text>
                <MaterialIcons name="visibility" size={20} color={colors.primary} />
              </View>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 4 }]}>Signature Hash</Text>
              <View style={[styles.credBox, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>sha256:8f4e2...f3a9</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.rotateBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>ROTATE CREDENTIALS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Matrix */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>SECURITY MATRIX</Text>
          <View style={[styles.bentoCard, { padding: 0, overflow: 'hidden', backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={[styles.matrixHeader, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer }]}>AUTH LEVEL 4</Text>
              <MaterialIcons name="lock" size={20} color={colors.onPrimaryContainer} />
            </View>
            
            <View style={{ padding: 24, gap: 16 }}>
              <View style={styles.switchRow}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Dark Interface</Text>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                  thumbColor={isDark ? colors.onPrimary : colors.onSurfaceVariant}
                />
              </View>
              <View style={[styles.divider, { backgroundColor: colors.outlineVariant, opacity: 0.5 }]} />
              
              <View style={styles.switchRow}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Biometric Bypass</Text>
                <Switch
                  value={biometric}
                  onValueChange={setBiometric}
                  trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                  thumbColor={biometric ? colors.onPrimary : colors.onSurfaceVariant}
                />
              </View>
              <View style={[styles.divider, { backgroundColor: colors.outlineVariant, opacity: 0.5 }]} />
              
              <View style={styles.switchRow}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Encrypted Comms</Text>
                <Switch
                  value={encrypted}
                  onValueChange={setEncrypted}
                  trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                  thumbColor={encrypted ? colors.onPrimary : colors.onSurfaceVariant}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Workspace Configuration (From old settings) */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>WORKSPACE LINKS</Text>
          <View style={[styles.bentoCard, { padding: 0, overflow: 'hidden', backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
            
            <TouchableOpacity 
              style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}
              onPress={() => navigation.navigate("TeamSettings")}
            >
              <View>
                <Text style={[typography.labelSm, { color: colors.primary, fontSize: 14 }]}>Team Settings</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Manage operators and invites</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}
              onPress={() => navigation.navigate("Admin")}
            >
              <View>
                <Text style={[typography.labelSm, { color: colors.primary, fontSize: 14 }]}>Admin Operations</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Workspace global config</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logRow}
              onPress={() => navigation.navigate("Pricing")}
            >
              <View>
                <Text style={[typography.labelSm, { color: colors.primary, fontSize: 14 }]}>Billing & Allocation</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Subscription and limits</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
            </TouchableOpacity>

          </View>
        </View>

        {/* Access Logs */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>ACCESS LOGS</Text>
          <View style={[styles.bentoCard, { padding: 0, overflow: 'hidden', backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
            
            <View style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Login: Terminal-7</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>14:23:01 UTC — 10.0.0.45</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
            </View>

            <View style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Update: Security Matrix</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>09:12:45 UTC — System Admin</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
            </View>

            <View style={styles.logRow}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Alert: Failed Auth Attempt</Text>
                <Text style={[typography.labelSm, { color: colors.error, fontSize: 10, fontWeight: '700' }]}>04:55:22 UTC — 192.168.1.1</Text>
              </View>
              <MaterialIcons name="warning" size={20} color={colors.error} />
            </View>
            
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.logoutBtn, { borderColor: colors.error, backgroundColor: colors.errorContainer }]}
          onPress={logout}
          activeOpacity={0.8}
        >
          <MaterialIcons name="power-settings-new" size={20} color={colors.error} />
          <Text style={[typography.labelCaps, { color: colors.error, letterSpacing: 2 }]}>TERMINATE SESSION</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[typography.labelCaps, { color: colors.primary }]}>MANDATE INDUSTRIAL</Text>
          <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8, marginTop: 8 }]}>© 2024 MANDATE INDUSTRIAL</Text>
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
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: '100%',
    height: 1,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  credBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  rotateBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 32,
    gap: 8,
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  }
});

export default SettingsScreen;
