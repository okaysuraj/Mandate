import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const ToggleSwitch = ({ label, isEnabled, onToggle }) => {
  const { colors, typography } = useTheme();
  
  return (
    <View style={styles.toggleRow}>
      <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{label}</Text>
      <TouchableOpacity 
        style={[styles.toggleTrack, isEnabled ? { backgroundColor: colors.primary, justifyContent: 'flex-end' } : { backgroundColor: colors.surfaceContainerHighest, justifyContent: 'flex-start' }]} 
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <View style={[styles.toggleThumb, isEnabled ? { backgroundColor: colors.onPrimary } : { backgroundColor: colors.onSurfaceVariant, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1 }]} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileSettingsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { user } = useAuth();
  const [showKey, setShowKey] = useState(false);

  // Toggles
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
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{user?.name || "OPERATOR"} SETTINGS</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }]}>ID: MN-0982-X</Text>
          </View>
          <View style={[styles.avatar, { borderColor: colors.primary }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAulB7hV3bWJOfIOtbCPQWodgUNAIfn20bVSJrKQboUelKevzDSQiuNtzRpzoiwhkewERqpe8hogOO4ozTxxDpYLePAsys-gHZDBCoSkPtQ1hseAea1rzKzsZa8RkMoY00SA7L_a3BWPGsbTRoPdFknZ3rC__zvrJEO8IrXbhsNBWUmtatljhQbYetqD895qHBCWIKpafFbakp2s2-ZtxZJX5V524MDx5BpubGH454sr2A6hN-WosRNhQ' }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />

        {/* System Credentials Module */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>SYSTEM CREDENTIALS</Text>
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            
            <View style={styles.fieldGroup}>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 4 }]}>Access Key</Text>
              <View style={[styles.inputRow, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{showKey ? 'MNDT-77A9-XQ22-9L1P' : '********************'}</Text>
                <TouchableOpacity onPress={() => setShowKey(!showKey)}>
                  <MaterialIcons name={showKey ? "visibility-off" : "visibility"} size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 4 }]}>Signature Hash</Text>
              <View style={[styles.inputRow, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]} numberOfLines={1}>sha256:8f4e2...f3a9</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>ROTATE CREDENTIALS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Duty Station Module */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>DUTY STATION</Text>
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, padding: 0, overflow: 'hidden' }]}>
            <View style={{ padding: 24, paddingBottom: 16 }}>
              <View style={styles.activeBadgeContainer}>
                <View style={[styles.activeBadge, { backgroundColor: colors.tertiaryFixed }]}>
                  <Text style={[typography.labelSm, { color: colors.onTertiaryFixed, fontSize: 10 }]}>ACTIVE</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>PRIMARY HUB</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>NORTH-SECTOR 04</Text>
            </View>

            <View style={[styles.mapContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
              {/* Map Placeholder Image with Filters */}
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMNy142g38-n0ynBIgdZtfGvZynsHpiv8QwaHzdw26BTSOoP5_PjGJLfv03BJgxv7hc4JdmSPtRy3Ze-RyzvprUNUsLhWuLLif24Gi6CppOXzKoFAlJ_Wrf_hz8APNf6DEG1RHeJ460FJzId3cI3Jr51k4obAAUPkD1XO4fp7DsSGZVwLnwrPw9eCpi1cXE-aEkcp5Zh0Qf2MWddZwtoDWsA00LJDYL_cBM7xerH6Kol64u2tdspJrrA' }}
                style={[styles.mapImage, { opacity: 0.4 }]}
              />
              <View style={styles.mapOverlay}>
                <View style={[styles.radarRing, { borderColor: colors.primary }]} />
                <View style={[styles.radarDot, { backgroundColor: colors.primary }]} />
              </View>
            </View>

            <View style={styles.coordsGrid}>
              <View style={styles.coordCol}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>COORDS</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>52.5200° N</Text>
              </View>
              <View style={styles.coordCol}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>PING</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>12ms</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Security Matrix Module */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>SECURITY MATRIX</Text>
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, padding: 0, overflow: 'hidden' }]}>
            <View style={[styles.matrixHeader, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer }]}>AUTH LEVEL 4</Text>
              <MaterialIcons name="lock" size={20} color={colors.onPrimaryContainer} />
            </View>
            <View style={{ padding: 24, gap: 16 }}>
              <ToggleSwitch label="Biometric Bypass" isEnabled={biometric} onToggle={() => setBiometric(!biometric)} />
              <View style={[styles.thinDivider, { backgroundColor: colors.outlineVariant }]} />
              <ToggleSwitch label="Encrypted Comms" isEnabled={encrypted} onToggle={() => setEncrypted(!encrypted)} />
              <View style={[styles.thinDivider, { backgroundColor: colors.outlineVariant }]} />
              <ToggleSwitch label="Remote Killswitch" isEnabled={killswitch} onToggle={() => setKillswitch(!killswitch)} />
            </View>
          </View>
        </View>

        {/* Access Logs */}
        <View style={[styles.section, { marginBottom: 32 }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>ACCESS LOGS</Text>
          <View style={[styles.logsList, { borderColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
            
            <TouchableOpacity style={styles.logItem} activeOpacity={0.7}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Login: Terminal-7</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10, marginTop: 2 }]}>14:23:01 UTC — 10.0.0.45</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <View style={[styles.logDivider, { backgroundColor: colors.surfaceContainerLow }]} />

            <TouchableOpacity style={styles.logItem} activeOpacity={0.7}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Update: Security Matrix</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10, marginTop: 2 }]}>09:12:45 UTC — System Admin</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <View style={[styles.logDivider, { backgroundColor: colors.surfaceContainerLow }]} />

            <TouchableOpacity style={styles.logItem} activeOpacity={0.7}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Alert: Failed Auth Attempt</Text>
                <Text style={[typography.labelSm, { color: colors.error, fontSize: 10, marginTop: 2, fontWeight: '700' }]}>04:55:22 UTC — 192.168.1.1</Text>
              </View>
              <MaterialIcons name="warning" size={20} color={colors.error} />
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16, // using slightly rounded instead of sharp corners
    padding: 24,
    backgroundColor: '#fff',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  activeBadgeContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 1,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mapContainer: {
    width: '100%',
    height: 128,
    position: 'relative',
    marginTop: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    opacity: 0.25,
    position: 'absolute',
  },
  radarDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  coordsGrid: {
    flexDirection: 'row',
    padding: 24,
    paddingTop: 16,
  },
  coordCol: {
    flex: 1,
  },
  matrixHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  thinDivider: {
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  logsList: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logDivider: {
    height: 1,
    width: '100%',
  }
});

export default ProfileSettingsScreen;
