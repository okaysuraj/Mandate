import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const timelineData = [
  {
    id: 'e1',
    type: 'CRITICAL',
    typeColor: 'error',
    icon: 'warning',
    time: '09:12:44',
    title: 'CORE_KERNEL_PANIC: SECTOR_4',
    desc: 'Automated bypass protocol initiated after unauthorized access attempt on main gateway. Secondary cooling systems engaged.',
    iconBg: 'errorContainer'
  },
  {
    id: 'e2',
    type: 'MODIFICATION',
    typeColor: 'onSecondaryContainer',
    icon: 'edit-document',
    time: '08:45:12',
    title: 'CONFIG_UPDATE: PERMISSIONS',
    desc: 'Operator J. ARCHER modified access levels for sub-grid 09. Verification token: #99402.',
    iconBg: 'secondaryContainer'
  },
  {
    id: 'e3',
    type: 'ROUTINE',
    typeColor: 'onSurfaceVariant',
    icon: 'sync',
    time: '08:00:00',
    title: 'SYSTEM_CHECK: COMPLETED',
    desc: 'Global diagnostics completed across all active nodes. 0 anomalies detected. Latency optimized to 4ms.',
    iconBg: 'surfaceContainer'
  },
  {
    id: 'e4',
    type: 'MODIFICATION',
    typeColor: 'onSecondaryContainer',
    icon: 'upload-file',
    time: '07:22:15',
    title: 'FIRMWARE_PUSH: NODE_X',
    desc: 'Automated update of firmware version 1.4.2 to isolated research cluster. Integrity verified.',
    iconBg: 'secondaryContainer'
  }
];

const TaskActivityHistoryScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJxB6xfML6bW79HKk1RF0d1K2R6Ga6dosjIc0xZ0pCPyl_0-P72M-jWJISYg3-M4Yy2ZFBj5Hsum-ZYwlHOLOwIOfGfNn8xy62UekliiNk21eUkQl9Q2TRthnQ3S2Zvysqh03AFcC76xYPZOgBE9bOKBOYNmHvHCwekRl75PE7XSJtFKwpSB3IQcK_q5sZqU69uafXThSknw8UolRVqu9AdCXrcjgtywBi2w1M8Zenso84hoQaqPxEaA' }} 
              style={styles.avatarImg} 
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginLeft: 8 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Summary Metrics */}
        <View style={styles.bentoGrid}>
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>TOTAL INTERACTIONS</Text>
            <View style={styles.metricValGroup}>
              <Text style={[typography.headlineLg, { color: colors.primary, fontSize: 36, lineHeight: 40 }]}>1,284</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>+12% LAST 24H</Text>
            </View>
          </View>

          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>ACTIVE OPERATORS</Text>
            <View style={styles.metricValGroup}>
              <Text style={[typography.headlineLg, { color: colors.primary, fontSize: 36, lineHeight: 40 }]}>08</Text>
              <View style={styles.avatarPile}>
                <View style={[styles.pileAvatarBox, { borderColor: colors.surface, backgroundColor: colors.surfaceVariant, zIndex: 3 }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDreeGhiJhp8QRYxzWwBdXjWrTZuXcOh9UZOkg8syvIklm794CzyXqy2BykNszrMimieQoXYbopYig1xh8BDmNA-I3SEpsVVLythHrUo73MoFKxKgyMHPg4qJ1qaPs5_vTxOn0_DYxFiVq8gJ-_gsg2_D7LqPvzcHKcwCHLF7SwH5J7-jq7BS_zHpVBWkeTXbZae2DhKfiDhedlLkxy2gRe1TPBJhs9BE20I6gPUYxPsVaR8NLciF1BVg' }} style={styles.avatarImg} />
                </View>
                <View style={[styles.pileAvatarBox, { borderColor: colors.surface, backgroundColor: colors.surfaceVariant, marginLeft: -8, zIndex: 2 }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5ytpzr8ligRAZu7RjgasfEG7TUNcX4g_9DhxAATrZRGXKLYelW7hCH5uj6AGLT7ffH68Cr39e9CgwCTzjrmdJalw5lUYqeqDFS7qQLJlZuhptnhrEXFR24PPVyB6nsvY752ctEKQ3jWh6jI1NLS37AHhH5KNcRvqpQCXkRm1mTLRFdBXHvWKht3LJUhxQfSBvyn3wtNljEAQPWLA9-D4XYfCTEpmTh7WjtDR_tUKHwL9A4Ol4tm-Rng' }} style={styles.avatarImg} />
                </View>
                <View style={[styles.pileAvatarBoxText, { borderColor: colors.surface, backgroundColor: colors.onSurfaceVariant, marginLeft: -8, zIndex: 1 }]}>
                  <Text style={{ color: colors.surface, fontSize: 8, fontWeight: 'bold' }}>+6</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Chronological Feed */}
        <View style={styles.feedSection}>
          <View style={[styles.feedHeader, { backgroundColor: colors.background }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>ACTIVITY LOG // 24H</Text>
            <TouchableOpacity>
              <MaterialIcons name="filter-list" size={20} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={styles.timelineWrapper}>
            <View style={[styles.timelineLine, { backgroundColor: colors.surfaceVariant }]} />
            
            {timelineData.map((item) => {
              const iconColor = colors[item.typeColor] || colors.primary;
              const badgeBg = colors[item.iconBg] || colors.surfaceContainer;
              
              return (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={[styles.timelineIconBox, { backgroundColor: badgeBg, borderColor: iconColor }]}>
                    <MaterialIcons name={item.icon} size={20} color={iconColor} />
                  </View>
                  <View style={[styles.timelineCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
                    <View style={styles.cardTop}>
                      <View style={[styles.typeBadge, { backgroundColor: `${iconColor}1A`, borderColor: `${iconColor}33` }]}>
                        <Text style={[typography.labelCaps, { color: iconColor, fontSize: 10 }]}>{item.type}</Text>
                      </View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{item.time}</Text>
                    </View>
                    <Text style={[typography.bodyMd, { color: colors.onSurface, fontWeight: 'bold', marginBottom: 4 }]}>{item.title}</Text>
                    <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, fontSize: 14 }]}>{item.desc}</Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.feedEnd}>
              <View style={[styles.endDot, { backgroundColor: colors.outlineVariant }]} />
              <View style={[styles.endDot, { backgroundColor: colors.outlineVariant }]} />
              <View style={[styles.endDot, { backgroundColor: colors.outlineVariant }]} />
            </View>

          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary, borderLeftColor: colors.outline, borderRightColor: colors.outline }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    padding: 8,
    marginRight: -8,
  },
  container: {
    paddingTop: 88, 
    paddingBottom: 112, 
    paddingHorizontal: 24,
  },
  bentoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  bentoCard: {
    flex: 1,
    borderWidth: 1,
    padding: 16,
    height: 128,
    justifyContent: 'space-between',
  },
  metricValGroup: {
    marginTop: 8,
  },
  avatarPile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pileAvatarBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pileAvatarBoxText: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedSection: {
    marginTop: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
    zIndex: 10,
  },
  timelineWrapper: {
    position: 'relative',
    paddingLeft: 48,
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 1,
    zIndex: 0,
  },
  timelineItem: {
    position: 'relative',
    marginBottom: 32,
    zIndex: 10,
  },
  timelineIconBox: {
    position: 'absolute',
    left: -48,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCard: {
    borderWidth: 1,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  feedEnd: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    marginLeft: -48,
  },
  endDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }
});

export default TaskActivityHistoryScreen;
