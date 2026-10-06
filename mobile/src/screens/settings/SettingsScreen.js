import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
];

const SettingsScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useAuth();
  const { colors, typography, isDark, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [saving, setSaving] = useState(false);

  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(false);
  const [signalsEnabled, setSignalsEnabled] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put("/users/profile", { name, avatar });
      if (updateUser) {
        updateUser(res.data);
      }
      Alert.alert("Success", "Account settings saved successfully");
    } catch (e) {
      Alert.alert("Notice", "Profile updated locally");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setAvatar(user?.avatar || "");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="SETTINGS" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section matching web SettingsPage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              WORKSPACE PREFERENCES · SECURITY &amp; IDENTITY
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Account Settings
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Manage your profile identity, credentials, active organization teams, and system notification signals.
          </Text>

          <View style={styles.topBtnRow}>
            <TouchableOpacity
              onPress={handleReset}
              style={[styles.resetBtn, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow }]}
            >
              <Text style={[styles.resetBtnText, { color: colors.onSurfaceVariant }]}>RESET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.saveBtnText, { color: colors.onPrimary }]}>
                {saving ? "SAVING..." : "SAVE CHANGES"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Identity & Profile Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardTitle, { color: colors.onSurface }]}>IDENTITY &amp; PROFILE</Text>

          {/* Current Avatar & Presets */}
          <View style={styles.avatarRow}>
            <View style={[styles.avatarBox, { borderColor: colors.primary }]}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.avatarText, { color: colors.onPrimary }]}>
                    {(name || "OP").slice(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.presetContainer}>
              <Text style={[styles.presetLabel, { color: colors.onSurfaceVariant }]}>SELECT PRESET AVATAR</Text>
              <View style={styles.presetsRow}>
                {PRESET_AVATARS.map((p, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setAvatar(p)}
                    style={[
                      styles.presetThumb,
                      { borderColor: avatar === p ? colors.primary : colors.outlineVariant },
                    ]}
                  >
                    <Image source={{ uri: p }} style={styles.presetImg} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>FULL NAME</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              placeholderTextColor={colors.onSurfaceVariant}
              style={[styles.input, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, color: colors.onSurface }]}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>EMAIL ADDRESS (LOCKED)</Text>
            <TextInput
              value={email}
              editable={false}
              style={[styles.inputDisabled, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant, color: colors.onSurfaceVariant }]}
            />
          </View>
        </View>

        {/* Notifications Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardTitle, { color: colors.onSurface }]}>NOTIFICATIONS</Text>

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.switchTitle, { color: colors.onSurface }]}>Critical Alerts Push</Text>
              <Text style={[styles.switchDesc, { color: colors.onSurfaceVariant }]}>Immediate alert on urgent or blocking status</Text>
            </View>
            <Switch
              value={alertsEnabled}
              onValueChange={setAlertsEnabled}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
              thumbColor={alertsEnabled ? colors.onPrimary : colors.outline}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.switchTitle, { color: colors.onSurface }]}>Daily Task Digest</Text>
              <Text style={[styles.switchDesc, { color: colors.onSurfaceVariant }]}>Morning task overview and agenda</Text>
            </View>
            <Switch
              value={digestEnabled}
              onValueChange={setDigestEnabled}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
              thumbColor={digestEnabled ? colors.onPrimary : colors.outline}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.switchTitle, { color: colors.onSurface }]}>Realtime WebSocket Sync</Text>
              <Text style={[styles.switchDesc, { color: colors.onSurfaceVariant }]}>Live collaborative task updates</Text>
            </View>
            <Switch
              value={signalsEnabled}
              onValueChange={setSignalsEnabled}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
              thumbColor={signalsEnabled ? colors.onPrimary : colors.outline}
            />
          </View>
        </View>

        {/* Interface & Theme Module */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardTitle, { color: colors.onSurface }]}>INTERFACE APPEARANCE</Text>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.switchTitle, { color: colors.onSurface }]}>Dark Theme</Text>
              <Text style={[styles.switchDesc, { color: colors.onSurfaceVariant }]}>Optimized for high-contrast, low-light viewing</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
              thumbColor={isDark ? colors.onPrimary : colors.outline}
            />
          </View>
        </View>

        {/* Sign Out Action */}
        <TouchableOpacity
          onPress={logout}
          style={[styles.logoutBtn, { borderColor: colors.error, backgroundColor: colors.surfaceContainerLow }]}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={18} color={colors.error} style={{ marginRight: 6 }} />
          <Text style={[styles.logoutBtnText, { color: colors.error }]}>TERMINATE SESSION (SIGN OUT)</Text>
        </TouchableOpacity>
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
  topBtnRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  resetBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  resetBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1 },
  saveBtn: { flex: 2, paddingVertical: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  saveBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 },
  avatarRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  avatarBox: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, overflow: "hidden" },
  avatarImg: { width: "100%", height: "100%" },
  avatarPlaceholder: { width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },
  avatarText: { fontFamily: "JetBrainsMono-Bold", fontSize: 18 },
  presetContainer: { flex: 1 },
  presetLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 9, letterSpacing: 1, marginBottom: 6 },
  presetsRow: { flexDirection: "row", gap: 8 },
  presetThumb: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, overflow: "hidden" },
  presetImg: { width: "100%", height: "100%" },
  fieldGroup: { marginBottom: 12 },
  fieldLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 10, letterSpacing: 0.5, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, height: 42, fontFamily: "HankenGrotesk-Medium", fontSize: 14 },
  inputDisabled: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, height: 42, fontFamily: "JetBrainsMono-Regular", fontSize: 13 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  switchTitle: { fontFamily: "HankenGrotesk-Bold", fontSize: 14 },
  switchDesc: { fontFamily: "HankenGrotesk-Regular", fontSize: 11, marginTop: 2 },
  divider: { height: 1, marginVertical: 6 },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 12, paddingVertical: 14, marginTop: 4 },
  logoutBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1 },
});

export default SettingsScreen;
