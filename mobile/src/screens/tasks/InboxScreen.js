import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, 
  TextInput, Image, Modal, Platform 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useDataStore } from "../../store/useDataStore";

const MOCK_MESSAGES = [
  {
    id: '1',
    type: 'PROTOCOL ALERT',
    typeColor: 'error',
    time: '08:42 AM',
    title: 'Kernel Integrity Shift Detected',
    snippet: 'Telemetry report #9928 indicates a non-standard entropy shift in Sector 7-B. Immediate verification required.',
    senderIcon: 'bolt',
    sender: 'SYSTEM MONITOR',
    read: false,
    content: {
      location: 'SECTOR 7-B CORE',
      log: '[08:42:00] LOG: START KERNEL_SCAN\n[08:42:01] ERR: ENTROPY_VAL_LIMIT_EXCEEDED\n[08:42:01] ADDR: 0x7FF-0000-A21\n[08:42:01] STATE: CRITICAL_SHIFTER\n[08:42:01] DUMP: 44 f3 a2 b1 00 ff ee ...'
    }
  },
  {
    id: '2',
    type: 'TEAM MENTION',
    typeColor: 'onTertiaryContainer',
    time: 'YESTERDAY',
    title: 'Asset Reallocation: Forge-9',
    snippet: '@User, please confirm the throughput adjustments for the automated smelting units before the shift end.',
    senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSXLajf-zKXTbqNtN7mMfIpCNIgluEFxTCve7nWjKIG6EVvGMgm9ELkwZDJdmZj2F487vIWxG4F_Z8N-SGDHZOr5hV3FSew9yN4twhG5JzYfD628IvLl386NdRIxuhooNfwiGoA0ryr6rcGMGrPmubeupEPftm-O1KvSeGnOqX7w7ypP0aDaHtPZ7nNT6ctKv2OJ4OUMDYETHTHW_nQc2HJ1OUFktLsuDvI4cAsEKxlOsABpy1FMeseQ',
    sender: 'SARAH CHEN',
    read: true,
  },
  {
    id: '3',
    type: 'SYSTEM UPDATE',
    typeColor: 'secondary',
    time: 'YESTERDAY',
    title: 'Weekly Diagnostics Summary',
    snippet: 'All primary systems operating within nominal parameters. 3 secondary nodes scheduled for maintenance.',
    senderIcon: 'settings',
    sender: 'CORE OS',
    read: true,
  }
];

const InboxScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { notifications } = useDataStore(state => state);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Use store notifications if available, else fallback to mock for UI dev
  const displayMessages = notifications?.length > 0 ? notifications : MOCK_MESSAGES;

  const filters = ['ALL', 'ALERTS', 'MENTIONS', 'SYSTEM'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications" size={24} color={colors.secondary} />
            <View style={[styles.notificationDot, { backgroundColor: colors.error }]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search & Filters */}
      <View style={[styles.searchSection, { backgroundColor: colors.surface }]}>
        <View style={styles.searchBarContainer}>
          <MaterialIcons name="search" size={20} color={colors.secondary} style={styles.searchIcon} />
          <TextInput 
            style={[styles.searchInput, { backgroundColor: colors.surfaceContainerLow, color: colors.primary }]}
            placeholder="SEARCH COMMUNICATIONS..."
            placeholderTextColor={colors.secondary}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(f => (
            <TouchableOpacity 
              key={f}
              style={[
                styles.filterChip, 
                { 
                  backgroundColor: selectedFilter === f ? colors.primary : colors.surfaceContainer,
                  borderColor: selectedFilter === f ? colors.primary : colors.outlineVariant,
                }
              ]}
              onPress={() => setSelectedFilter(f)}
            >
              <Text style={[
                typography.labelCaps, 
                { color: selectedFilter === f ? colors.onPrimary : colors.secondary }
              ]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Message List */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {displayMessages.map((msg) => (
          <TouchableOpacity 
            key={msg.id} 
            style={[
              styles.messageItem, 
              { backgroundColor: msg.read ? 'transparent' : colors.surfaceContainerLow },
              !msg.read && { borderLeftWidth: 4, borderLeftColor: colors.primary }
            ]}
            onPress={() => setSelectedMessage(msg)}
          >
            <View style={styles.msgHeaderRow}>
              <View style={[styles.typeBadge, { backgroundColor: `${colors[msg.typeColor]}20` }]}>
                <Text style={[typography.labelCaps, { color: colors[msg.typeColor], fontSize: 10 }]}>{msg.type}</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{msg.time}</Text>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 4 }]}>{msg.title}</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]} numberOfLines={2}>{msg.snippet}</Text>
            
            <View style={styles.senderRow}>
              {msg.senderAvatar ? (
                <View style={[styles.senderAvatar, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: msg.senderAvatar }} style={{ width: '100%', height: '100%' }} />
                </View>
              ) : (
                <View style={[styles.senderAvatar, { backgroundColor: colors.surfaceDim }]}>
                  <MaterialIcons name={msg.senderIcon} size={14} color={colors.primary} />
                </View>
              )}
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10, letterSpacing: 1 }]}>{msg.sender}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selectedMessage} animationType="slide" presentationStyle="formSheet">
        {selectedMessage && (
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.surfaceContainerLowest }]}>
            
            {/* Modal Header */}
            <View style={[styles.modalHeader, { borderBottomColor: colors.outlineVariant }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <TouchableOpacity style={styles.iconButton} onPress={() => setSelectedMessage(null)}>
                  <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <View style={{ marginLeft: 8 }}>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{selectedMessage.type}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ID: 0x9928-SHIFT</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="archive" size={20} color={colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="delete" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800', marginBottom: 16 }]}>
                {selectedMessage.title}
              </Text>
              
              <View style={[styles.senderIdentity, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={[styles.identityIcon, { backgroundColor: colors.primary }]}>
                  <MaterialIcons name="security" size={20} color={colors.onPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', fontSize: 14 }]}>System Monitor Node 04</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>Sent to Primary Admin Cluster</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>8:42:01 AM</Text>
              </View>

              <Text style={[typography.bodyMd, { color: colors.primary, marginTop: 24, lineHeight: 24 }]}>
                During the routine cycle scan of <Text style={{ fontWeight: '700' }}>Sector 7-B</Text>, an anomalous kernel integrity signature was captured. The entropy level shifted by <Text style={{ color: colors.error, fontWeight: '700' }}>+14.2%</Text> within a 400ms window.
              </Text>

              <View style={[styles.alertBlock, { backgroundColor: colors.primaryContainer, borderLeftColor: colors.error }]}>
                <Text style={[typography.bodyMd, { color: colors.onPrimaryContainer, fontWeight: '700', marginBottom: 4 }]}>IMMEDIATE ACTION REQUIRED</Text>
                <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.8 }]}>
                  Manual verification of hardware security modules in sub-level 3 is requested to prevent potential cascading buffer overflows.
                </Text>
              </View>

              <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 24, marginBottom: 8 }]}>TELEMETRY DATA</Text>
              <View style={[styles.codeBlock, { backgroundColor: colors.surfaceContainerHigh }]}>
                <Text style={[typography.labelSm, { color: colors.primary, fontFamily: 'monospace' }]}>
                  {selectedMessage.content?.log || "No telemetry available."}
                </Text>
              </View>

              <View style={[styles.assetLink, { borderColor: colors.outlineVariant }]}>
                <View style={[styles.assetImg, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU-EZtoG51q1AR9V0BZd865oyniTvXecYXaBQ60NY5wp5JhumQ-w7cGmfTlhDMSC44vuajmD3leGMYBMxZsAtzcLBGBAU0VO0sbomz3gdJoujEDuNmHpYOxDGnbXEJCW3NzX0eRLZp0xoKblhCYkUxLqHH4gCyyX4JvJ7RWeGdcK5-MKZYq6muCiHShOMGNaIvaorZDE8rn0Xf5fGyuwhAa2G7L2qnffTqS1jfq31LAVKw9Q_j6vELKg' }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>SOURCE LOCATION</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{selectedMessage.content?.location || 'UNKNOWN'}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
              </View>
            </ScrollView>

            <View style={[styles.modalActionbar, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
              <TouchableOpacity style={[styles.ackBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8} onPress={() => setSelectedMessage(null)}>
                <MaterialIcons name="reply" size={18} color={colors.onPrimary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>ACKNOWLEDGE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.moreBtn, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="more-horiz" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        )}
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
    borderRadius: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchSection: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 16,
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  messageList: {
    paddingBottom: 40,
  },
  messageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  msgHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  senderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalContent: {
    padding: 16,
    paddingBottom: 40,
  },
  senderIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    gap: 12,
  },
  identityIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBlock: {
    marginTop: 16,
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  assetLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 16,
  },
  assetImg: {
    width: 48,
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
  },
  modalActionbar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  ackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 48,
  },
  moreBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default InboxScreen;
