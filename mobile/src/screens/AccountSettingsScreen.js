import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const CustomToggleRow = ({ icon, title, subtitle, isEnabled, onToggle }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.toggleRowContainer, { borderBottomColor: colors.surfaceContainer }]}>
      <View style={styles.toggleRowLeft}>
        <MaterialIcons name={icon} size={24} color={colors.secondary} />
        <View style={styles.toggleRowText}>
          <Text style={[typography.bodyMd, { color: colors.primary }]}>{title}</Text>
          <Text style={[typography.labelSm, { color: colors.secondary }]}>{subtitle}</Text>
        </View>
      </View>
      <Switch 
        trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
        thumbColor={colors.onPrimary}
        ios_backgroundColor={colors.surfaceContainerHigh}
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

const CustomActionRow = ({ icon, title, subtitle, onPress }) => {
  const { colors, typography } = useTheme();
  return (
    <TouchableOpacity style={[styles.toggleRowContainer, { borderBottomColor: colors.surfaceContainer }]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.toggleRowLeft}>
        <MaterialIcons name={icon} size={24} color={colors.secondary} />
        <View style={styles.toggleRowText}>
          <Text style={[typography.bodyMd, { color: colors.primary }]}>{title}</Text>
          <Text style={[typography.labelSm, { color: colors.secondary }]}>{subtitle}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.outlineVariant} />
    </TouchableOpacity>
  );
};

const AccountSettingsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [biometric, setBiometric] = useState(true);
  const [autoTerm, setAutoTerm] = useState(false);
  const [satellite, setSatellite] = useState(true);
  const [gridSync, setGridSync] = useState(false);

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
        
        {/* Identity Summary Module */}
        <View style={[styles.identityCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.identityHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.surfaceContainer }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6tt1gbBfhlsy1cq0C9nhgUrZW9QEtzgS0z4nKj6WR5WnKGnzhlPVnK4XSN3-QvRQIlzGCnpPcBdQSioEGW-m8mXDRhdKsXcmooBj7PbCDJmkx4vcqzfDbZOINqKDxcSTdPL9hDjoYUvSbc9nSAQ_FHhev9rYyY2GmfvE9FLRkcRm5re3-n19JsAMdEPEgMxH5nmuis38s3M1wL2rOaoiqcHYYhtozrwNoxDWOJgijN-6l-0vPlowD1Q' }}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={styles.identityHeaderText}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Operative 7412</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }]}>Level 4 Administrator</Text>
            </View>
          </View>
          
          <View style={styles.identityDetails}>
            <View style={[styles.identityRow, { borderBottomColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>ORGANIZATION</Text>
              <Text style={[typography.bodyMd, { color: colors.primary }]}>MANDATE INDUSTRIAL</Text>
            </View>
            <View style={[styles.identityRow, { borderBottomColor: colors.surfaceContainer, borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>UPLINK STATUS</Text>
              <View style={styles.uplinkStatus}>
                <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>ENCRYPTED</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Governance Controls Stack */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, paddingHorizontal: 8, marginBottom: 8 }]}>CREDENTIAL GOVERNANCE</Text>
          <View style={[styles.stackContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <CustomToggleRow 
              icon="fingerprint" title="Biometric Bypass" subtitle="Primary terminal access" 
              isEnabled={biometric} onToggle={setBiometric} 
            />
            <CustomActionRow 
              icon="key" title="Hardware Key" subtitle="Physical mandate token" 
              onPress={() => {}}
            />
            <CustomToggleRow 
              icon="timer-off" title="Auto-Termination" subtitle="Timeout after 120s" 
              isEnabled={autoTerm} onToggle={setAutoTerm} 
            />
          </View>
        </View>

        {/* Communication Uplinks */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, paddingHorizontal: 8, marginBottom: 8 }]}>COMMUNICATION UPLINKS</Text>
          <View style={[styles.stackContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <CustomToggleRow 
              icon="satellite-alt" title="Satellite Telemetry" subtitle="Critical system alerts" 
              isEnabled={satellite} onToggle={setSatellite} 
            />
            <CustomToggleRow 
              icon="lan" title="Grid Sync" subtitle="Mesh network propagation" 
              isEnabled={gridSync} onToggle={setGridSync} 
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.error, paddingHorizontal: 8, marginBottom: 8 }]}>SYSTEM TERMINAL</Text>
          <View style={[styles.stackContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: 'rgba(186, 26, 26, 0.2)' }]}>
            <TouchableOpacity style={styles.dangerRow} activeOpacity={0.7}>
              <MaterialIcons name="dangerous" size={24} color={colors.error} />
              <View style={styles.toggleRowText}>
                <Text style={[typography.bodyMd, { color: colors.error, fontWeight: '700' }]}>WIPE DATA CORE</Text>
                <Text style={[typography.labelSm, { color: colors.error, opacity: 0.8 }]}>Irreversible identity erasure</Text>
              </View>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: 'rgba(186, 26, 26, 0.1)' }} />
            <TouchableOpacity style={styles.dangerRow} activeOpacity={0.7}>
              <MaterialIcons name="logout" size={24} color={colors.secondary} />
              <View style={styles.toggleRowText}>
                <Text style={[typography.bodyMd, { color: colors.secondary }]}>Close Secure Session</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Terminate current uplink</Text>
              </View>
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
    borderRadius: 20,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
    gap: 32,
  },
  identityCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  identityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  identityHeaderText: {
    flex: 1,
  },
  identityDetails: {
    gap: 8,
  },
  identityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  uplinkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  section: {
    gap: 8,
  },
  stackContainer: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  toggleRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  toggleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  toggleRowText: {
    flex: 1,
    gap: 2,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  }
});

export default AccountSettingsScreen;
