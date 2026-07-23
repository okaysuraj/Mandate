import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const LedgerItem = ({ icon, title, mac, status, statusStyle, location, lastVerified, isActive, opacity = 1 }) => {
  const { colors, typography } = useTheme();
  
  return (
    <View style={[styles.ledgerItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: isActive ? colors.primary : colors.outlineVariant, borderWidth: isActive ? 2 : 1, opacity }]}>
      <View style={styles.ledgerHeader}>
        <View style={styles.ledgerHeaderLeft}>
          <View style={[styles.ledgerIconBox, { backgroundColor: isActive ? colors.primary : 'transparent', borderColor: isActive ? 'transparent' : colors.outlineVariant, borderWidth: isActive ? 0 : 1 }]}>
            <MaterialIcons name={icon} size={20} color={isActive ? colors.onPrimary : colors.secondary} />
          </View>
          <View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{title}</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>MAC: {mac}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[typography.labelCaps, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>

      <View style={[styles.ledgerDetails, { borderTopColor: colors.outlineVariant }]}>
        <View style={styles.ledgerDetailCol}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>LOCATION VECTOR</Text>
          <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500' }]}>{location}</Text>
        </View>
        <View style={styles.ledgerDetailCol}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>LAST VERIFIED</Text>
          <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500' }]}>{lastVerified}</Text>
        </View>
      </View>
    </View>
  );
};

const DeviceManagementScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>
          MANDATE
        </Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Security Vital Signs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SECURITY VITAL SIGNS</Text>
            <View style={[styles.encryptedBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>ENCRYPTED</Text>
            </View>
          </View>

          <View style={styles.vitalsGrid}>
            <TouchableOpacity style={[styles.vitalCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
              <MaterialIcons name="shield" size={24} color={colors.primary} style={styles.vitalIcon} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>THREAT LEVEL</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>STABLE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.vitalCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
              <MaterialIcons name="hub" size={24} color={colors.primary} style={styles.vitalIcon} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>VERIFIED NODES</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12/12</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Authorized Nodes */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 12 }]}>AUTHORIZED NODES</Text>
          <View style={styles.nodesContainer}>
            <LedgerItem 
              icon="terminal" title="NODE-ALPHA-77" mac="00:1A:2B:3C:4D:5E" 
              status="ACTIVE" statusStyle={{ bg: colors.tertiaryFixed, text: colors.onTertiaryFixed }}
              location="37.7749° N, 122.4194° W" lastVerified="02:14:00 GMT"
              isActive={true}
            />
            <LedgerItem 
              icon="laptop-mac" title="MOBILE-STATION-04" mac="F4:A9:97:11:C2:8B" 
              status="STANDBY" statusStyle={{ bg: colors.surfaceVariant, text: colors.onSurfaceVariant }}
              location="Remote: Secure VPN" lastVerified="10:45:12 GMT"
              isActive={false}
            />
            <View style={[styles.ledgerItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderWidth: 1, opacity: 0.6 }]}>
              <View style={[styles.ledgerHeader, { paddingBottom: 0 }]}>
                <View style={styles.ledgerHeaderLeft}>
                  <View style={[styles.ledgerIconBox, { borderColor: colors.outlineVariant, borderWidth: 1 }]}>
                    <MaterialIcons name="router" size={20} color={colors.secondary} />
                  </View>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>RELAY-GATEWAY-19</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>MAC: 28:CF:E9:1A:05:32</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.errorContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onErrorContainer }]}>OFFLINE</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Auth Logs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>RECENT AUTH LOGS</Text>
            <TouchableOpacity>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.logsContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>BIO-METRIC SUCCESS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>User: ID_9921_OPERATOR</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>1m ago</Text>
            </View>
            <View style={[styles.logRow, { borderBottomColor: colors.surfaceContainerLow }]}>
              <View>
                <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>SESSION HANDSHAKE</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Node: ALPHA-77</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>14m ago</Text>
            </View>
            <View style={[styles.logRow, { borderBottomWidth: 0 }]}>
              <View>
                <Text style={[typography.labelSm, { color: colors.error, fontWeight: '700' }]}>UNKNOWN ACCESS ATTEMPT</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>IP: 192.168.1.201</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.error }]}>42m ago</Text>
            </View>
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
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  encryptedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  vitalsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  vitalCard: {
    flex: 1,
    borderWidth: 1,
    padding: 16,
    height: 128,
    justifyContent: 'space-between',
  },
  vitalIcon: {
    marginBottom: 16,
  },
  nodesContainer: {
    gap: 12,
  },
  ledgerItem: {
    padding: 16,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  ledgerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ledgerIconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ledgerDetails: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 16,
  },
  ledgerDetailCol: {
    flex: 1,
    gap: 4,
  },
  logsContainer: {
    borderWidth: 1,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  }
});

export default DeviceManagementScreen;
