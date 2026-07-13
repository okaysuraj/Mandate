import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const AutomationRulesScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const rules = [
    {
      id: "#AC-00912",
      status: "Active",
      title: "Sync Inventory to Global Ledger",
      service: "PostgreSQL",
      serviceIcon: "database",
      time: "2m ago"
    },
    {
      id: "#AC-00845",
      status: "Failed",
      title: "External API Webhook Handshake",
      service: "API GW",
      serviceIcon: "hub",
      time: "14m ago"
    },
    {
      id: "#AC-00712",
      status: "Standby",
      title: "Nightly Cache Invalidation",
      service: "Redis Cluster",
      serviceIcon: "memory",
      time: "8h ago"
    },
    {
      id: "#AC-00629",
      status: "Active",
      title: "Log Rotation & Archival",
      service: "Syslog Engine",
      serviceIcon: "list-alt",
      time: "Now"
    },
    {
      id: "#AC-00511",
      status: "Active",
      title: "Auto-Scale Node Provisioning",
      service: "AWS Infra",
      serviceIcon: "cloud",
      time: "1h ago"
    },
    {
      id: "#AC-00488",
      status: "Failed",
      title: "Security Token Rotation",
      service: "IAM Vault",
      serviceIcon: "lock",
      time: "3m ago"
    }
  ];

  const filteredRules = rules.filter(rule => 
    rule.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rule.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rule.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return { bg: colors.tertiaryFixed, text: colors.onTertiaryFixed };
      case 'Failed': return { bg: colors.errorContainer, text: colors.onErrorContainer };
      case 'Standby': return { bg: colors.surfaceContainerHigh, text: colors.secondary };
      default: return { bg: colors.surfaceContainer, text: colors.secondary };
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={20} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>
            MANDATE OS
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="notifications" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <View style={styles.titleRow}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>Automation Rules</Text>
            <TouchableOpacity style={[styles.newRuleBtn, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
              <MaterialIcons name="add" size={16} color={colors.onPrimary} />
              <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 4 }]}>NEW RULE</Text>
            </TouchableOpacity>
          </View>
          <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14, marginTop: 8 }]}>
            Industrial ledger for process synchronization and trigger logic.
          </Text>
        </View>

        {/* Summary Metrics */}
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCardBig, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE INSTANCES</Text>
            <View style={styles.metricValueRow}>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 36, color: colors.primary }]}>1,284</Text>
              <View style={styles.trendRow}>
                <MaterialIcons name="trending-up" size={14} color={colors.onTertiaryContainer} />
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 2 }]}>12%</Text>
              </View>
            </View>
          </View>
          <View style={styles.metricsRowSmall}>
            <View style={[styles.metricCardSmall, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>VELOCITY</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 20, marginTop: 12 }]}>42 op/m</Text>
            </View>
            <View style={[styles.metricCardSmall, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SUCCESS RATE</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 20, marginTop: 12 }]}>99.8%</Text>
            </View>
          </View>
        </View>

        {/* Global Search/Filter */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surfaceContainer }]}>
          <MaterialIcons name="search" size={20} color={colors.secondary} />
          <TextInput 
            style={[styles.searchInput, typography.labelSm, { color: colors.primary }]}
            placeholder="FILTER BY ID, NAME, OR STATUS..."
            placeholderTextColor={colors.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Vertical Ledger (The Rules List) */}
        <View style={styles.ledgerList}>
          {filteredRules.map((rule, idx) => {
            const statusColors = getStatusColor(rule.status);
            return (
              <TouchableOpacity key={idx} style={[styles.ledgerRow, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.7}>
                <View style={styles.ledgerHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>{rule.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <Text style={[typography.labelCaps, { color: statusColors.text, fontSize: 10 }]}>{rule.status}</Text>
                  </View>
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 8 }]}>{rule.title}</Text>
                
                <View style={styles.ledgerFooter}>
                  <View style={styles.serviceInfo}>
                    <MaterialIcons name={rule.serviceIcon} size={14} color={colors.secondary} />
                    <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 4 }]}>{rule.service}</Text>
                  </View>
                  <View style={styles.timeInfo}>
                    <MaterialIcons name="schedule" size={14} color={colors.secondary} />
                    <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 4 }]}>{rule.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
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
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  newRuleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 24,
  },
  metricsGrid: {
    marginBottom: 24,
    gap: 12,
  },
  metricCardBig: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  metricsRowSmall: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCardSmall: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: 12,
  },
  ledgerList: {
    gap: 8,
  },
  ledgerRow: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ledgerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default AutomationRulesScreen;
