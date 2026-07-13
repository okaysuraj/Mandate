import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const initialLogs = [
  {
    id: '1',
    time: '2023-10-24 14:22:01.004',
    status: 'SUCCESS',
    rule: 'SYNC_DELTA_MAIN',
    path: '/usr/bin/local/exec/sync_engine --force'
  },
  {
    id: '2',
    time: '2023-10-24 14:21:58.892',
    status: 'FAILURE',
    rule: 'CRON_BACKUP_SQL',
    path: '/db/production/backup.sh',
    error: 'ERR: ConnectionRefusedError 111'
  },
  {
    id: '3',
    time: '2023-10-24 14:20:12.441',
    status: 'TIMEOUT',
    rule: 'FETCH_API_EXT',
    path: 'https://api.external-service.io/v1/stream'
  },
  {
    id: '4',
    time: '2023-10-24 14:18:00.001',
    status: 'SUCCESS',
    rule: 'PURGE_TMP_CACHE',
    path: 'rm -rf /tmp/cache/*'
  },
  {
    id: '5',
    time: '2023-10-24 14:15:33.210',
    status: 'SUCCESS',
    rule: 'NOTIFY_WEBHOOK',
    path: 'POST /api/v2/webhooks/discord'
  },
  {
    id: '6',
    time: '2023-10-24 14:12:01.442',
    status: 'FAILURE',
    rule: 'RESTART_NODE_INSTANCE',
    path: 'pm2 restart server-instance-0',
    error: 'ERR: PermissionDenied (sudo required)'
  }
];

const AutomationLogsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const rules = ['WATCHDOG_PING', 'CLEANUP_STALE_SESSIONS', 'INDEX_OPTIMIZER', 'ENCRYPT_SENSITIVE_BLOB'];
    const statuses = ['SUCCESS', 'FAILURE', 'TIMEOUT'];
    
    let timeoutId;
    
    const feedInterval = () => {
      const delay = Math.random() * (15000 - 8000) + 8000; // 8-15s
      timeoutId = setTimeout(() => {
        const now = new Date();
        const timeStr = now.toISOString().replace('T', ' ').replace('Z', '').substring(0, 23);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const rule = rules[Math.floor(Math.random() * rules.length)];
        
        const newLog = {
          id: Math.random().toString(),
          time: timeStr,
          status,
          rule,
          path: `/usr/local/bin/worker_${rule.toLowerCase()} --mode=silent`,
          ...(status === 'FAILURE' && { error: 'ERR: Unknown Execution Fault' })
        };
        
        setLogs(prev => {
          const updated = [newLog, ...prev];
          if (updated.length > 20) return updated.slice(0, 20);
          return updated;
        });
        
        feedInterval();
      }, delay);
    };

    feedInterval();

    return () => clearTimeout(timeoutId);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'SUCCESS': return { bg: colors.tertiaryFixed, text: colors.onTertiaryFixed };
      case 'FAILURE': return { bg: colors.errorContainer, text: colors.onErrorContainer };
      case 'TIMEOUT': return { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant };
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
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Live Header Status */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Automation Logs</Text>
          <View style={styles.liveIndicator}>
            <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
            <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>LIVE STREAM ACTIVE</Text>
          </View>
        </View>

        {/* Search & Filters */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="search" size={20} color={colors.secondary} />
            <TextInput 
              style={[styles.searchInput, typography.labelCaps, { color: colors.primary }]}
              placeholder="FILTER BY ID/PATH"
              placeholderTextColor={colors.outline}
            />
          </View>
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="filter-list" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Logs Feed */}
        <View style={styles.logsList}>
          {logs.map((log) => {
            const statusStyle = getStatusStyle(log.status);
            return (
              <View key={log.id} style={[styles.logEntry, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.logHeader}>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>{log.time}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[typography.labelCaps, { color: statusStyle.text, fontSize: 9 }]}>{log.status}</Text>
                  </View>
                </View>
                
                <View style={styles.logBody}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>RULE_ID: {log.rule}</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]} numberOfLines={1}>{log.path}</Text>
                </View>

                {log.error && (
                  <View style={[styles.errorBox, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.error }]}>
                    <Text style={[typography.labelSm, { color: colors.error }]}>{log.error}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* End of Feed Indicator */}
        <View style={styles.endIndicator}>
          <MaterialIcons name="inventory-2" size={24} color={colors.primary} style={{ marginBottom: 8 }} />
          <Text style={[typography.labelCaps, { color: colors.primary, opacity: 0.5 }]}>END OF CACHED HISTORY</Text>
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
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
    gap: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  searchBox: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: '100%',
  },
  filterBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  logsList: {
    marginBottom: 32,
  },
  logEntry: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 4,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  logBody: {
    gap: 2,
  },
  errorBox: {
    marginTop: 8,
    padding: 8,
    borderLeftWidth: 2,
  },
  endIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    opacity: 0.5,
  }
});

export default AutomationLogsScreen;
