import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ToggleCard = ({ title, subtitle, badges, isEnabled, onToggle }) => {
  const { colors, typography } = useTheme();
  
  return (
    <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
      <View style={styles.toggleHeaderRow}>
        <View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18 }]}>{title}</Text>
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>{subtitle}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.toggleTrack, { backgroundColor: isEnabled ? colors.primary : colors.surfaceContainerHigh, borderColor: isEnabled ? colors.primary : colors.outlineVariant, borderWidth: isEnabled ? 0 : 1 }]}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <View style={[styles.toggleThumb, { backgroundColor: isEnabled ? '#fff' : colors.outline, transform: [{ translateX: isEnabled ? 24 : 2 }] }]} />
        </TouchableOpacity>
      </View>
      {badges && badges.length > 0 && (
        <View style={styles.badgesRow}>
          {badges.map((badge, idx) => (
            <View key={idx} style={[styles.badge, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{badge}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const ChannelRow = ({ source, push, sms, log, isLast }) => {
  const { colors, typography } = useTheme();
  
  const getIcon = (val) => val ? "check-circle" : "radio-button-unchecked";
  const getColor = (val) => val ? colors.primary : colors.outlineVariant;

  return (
    <View style={[styles.channelRow, !isLast && { borderBottomColor: colors.outlineVariant, borderBottomWidth: 1 }]}>
      <Text style={[typography.labelSm, styles.colSource, { color: colors.primary, fontWeight: '700' }]}>{source}</Text>
      <View style={styles.colCheck}><MaterialIcons name={getIcon(push)} size={16} color={getColor(push)} /></View>
      <View style={styles.colCheck}><MaterialIcons name={getIcon(sms)} size={16} color={getColor(sms)} /></View>
      <View style={styles.colCheck}><MaterialIcons name={getIcon(log)} size={16} color={getColor(log)} /></View>
    </View>
  );
};

const NotificationPrefsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [critical, setCritical] = useState(true);
  const [standard, setStandard] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgZhVIFRmZLlsVwlBqQqOZWS6xoEj3x7wdkwvNybKQaReCAglQvXI3nT9U9NOpM7iIM1wGHdaicwnZMcsg0uD__HdgeGQkQHbm90KeishIayzKpCC3-ZqZsjwrHnLWRKezMrXEa_Nix9ztd2IM7reZhLciBuNCloYCKAQyW_Sq6WkBL_AFGRP3-xriMG-1l7lBz_qJYPAI9DZSCBrOew3Qe79jLKdp7zAJ-oe2jQpRcNBTtihT1u7Ntg' }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 12 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' }]}>System Configuration</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 8 }]}>Global Preferences</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4 }]}>Calibrate notification density and delivery protocols across all operational channels.</Text>
        </View>

        {/* Mandate Transitions */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>MANDATE TRANSITIONS</Text>
            <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>AUTO_SYNC</Text>
            </View>
          </View>
          
          <View style={styles.togglesContainer}>
            <ToggleCard 
              title="Critical Priority" subtitle="Direct bypass for all quiet hours" 
              badges={['HAPTIC: HIGH', 'AUDIO: OVERRIDE']}
              isEnabled={critical} onToggle={() => setCritical(!critical)}
            />
            <ToggleCard 
              title="Standard Sync" subtitle="Batch delivery every 15 minutes" 
              isEnabled={standard} onToggle={() => setStandard(!standard)}
            />
          </View>
        </View>

        {/* Quiet Hours Chart */}
        <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.quietHeaderRow}>
            <View style={styles.quietHeaderLeft}>
              <MaterialIcons name="bedtime" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>QUIET HOURS</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.primary, fontFamily: 'JetBrains Mono' }]}>22:00 — 06:00</Text>
          </View>
          
          <View style={styles.chartContainer}>
            <View style={[styles.chartBarsArea, { backgroundColor: colors.surfaceContainer }]}>
              {[40, 35, 30, 10, 5, 5, 5, 5, 5, 10, 45, 60, 80, 90, 85, 70, 50, 40].map((h, i) => (
                <View key={i} style={[styles.chartBar, { height: `${h}%`, backgroundColor: h <= 10 ? colors.primary : colors.primaryFixedDim }]} />
              ))}
            </View>
            <View style={styles.chartLabels}>
              <Text style={[typography.labelSm, { color: colors.outline, fontSize: 10 }]}>00:00</Text>
              <Text style={[typography.labelSm, { color: colors.outline, fontSize: 10 }]}>12:00</Text>
              <Text style={[typography.labelSm, { color: colors.outline, fontSize: 10 }]}>23:59</Text>
            </View>
          </View>

          <View style={[styles.quietFooterRow, { borderTopColor: colors.outlineVariant }]}>
            <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14 }]}>Weekend override enabled</Text>
            <TouchableOpacity>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>Edit Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Channel Matrix */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 12 }]}>CHANNEL MATRIX</Text>
          <View style={[styles.matrixTable, { borderColor: colors.outlineVariant }]}>
            <View style={[styles.matrixHeaderRow, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, styles.colSource, { color: colors.secondary, fontSize: 10 }]}>Source</Text>
              <Text style={[typography.labelCaps, styles.colCheck, { color: colors.secondary, fontSize: 10, textAlign: 'center' }]}>Push</Text>
              <Text style={[typography.labelCaps, styles.colCheck, { color: colors.secondary, fontSize: 10, textAlign: 'center' }]}>SMS</Text>
              <Text style={[typography.labelCaps, styles.colCheck, { color: colors.secondary, fontSize: 10, textAlign: 'center' }]}>Log</Text>
            </View>
            <View>
              <ChannelRow source="Network" push={true} sms={false} log={true} />
              <ChannelRow source="Terminal" push={true} sms={true} log={true} />
              <ChannelRow source="Security" push={true} sms={true} log={true} />
              <ChannelRow source="Marketing" push={false} sms={false} log={true} isLast={true} />
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <TouchableOpacity style={styles.dangerBtn} activeOpacity={0.8}>
            <View style={styles.dangerBtnLeft}>
              <MaterialIcons name="warning" size={20} color={colors.error} />
              <Text style={[typography.labelCaps, { color: colors.error, marginLeft: 8 }]}>PURGE NOTIFICATION HISTORY</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.error} />
          </TouchableOpacity>
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
    height: 72,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
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
  pageHeader: {
    marginBottom: 8,
  },
  section: {
    gap: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  togglesContainer: {
    gap: 8,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
  },
  toggleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  quietHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quietHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    height: 128,
    marginBottom: 16,
  },
  chartBarsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 4,
  },
  chartBar: {
    flex: 1,
    marginHorizontal: 1,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  quietFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  matrixTable: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  matrixHeaderRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  channelRow: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  colSource: {
    flex: 2,
  },
  colCheck: {
    flex: 1,
    alignItems: 'center',
  },
  dangerSection: {
    paddingTop: 32,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.2)',
    backgroundColor: 'rgba(186, 26, 26, 0.05)',
    borderRadius: 8,
  },
  dangerBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default NotificationPrefsScreen;
