import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const DigestPreviewScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKJixxTEvxF91uNgzguZZ2ZQJC_e6wj2LNKWuwsXPkmOUENNHDdBFKpFy1pR7UUqwlTUMdEToWK6LkMjUBK13_ICPjdQJGdmLRhi77qq95KaYpIoa-a5xxBtrV0D334n2aTD620gdipuGV9vUmI6lHP0iYSKJ6U5F2bvlcaM-Wh5tP8yHOabO_N11tFtabbUPsonKyFdzn5Z52jMhd03GsFWIZj3-WH35IbLFK5kenl_mT0D68gjgZ7g' }}
              style={styles.avatar}
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Dashboard Header */}
          <View style={styles.dashboardHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 2, textTransform: 'uppercase' }]}>Performance Digest</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>08/NOV/24_SYS_RPT</Text>
            </View>
            <View style={[styles.liveStatusBadge, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>LIVE STATUS</Text>
            </View>
          </View>

          {/* Summary Bento Grid */}
          <View style={styles.bentoGrid}>
            
            {/* Mandates Resolved */}
            <View style={[styles.bentoCardFull, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardTopRow}>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                <View style={[styles.statusChip, { backgroundColor: colors.tertiaryFixed }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>EXCEPTIONAL</Text>
                </View>
              </View>
              <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginBottom: spacing.xs }]}>Mandates Resolved</Text>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48, letterSpacing: -2 }]}>1,204</Text>
              <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer, marginTop: spacing.md }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '88%' }]} />
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: spacing.sm }]}>+12% from previous cycle</Text>
            </View>

            <View style={styles.rowGrid}>
              {/* Efficiency Variance */}
              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginBottom: spacing.sm }]}>Efficiency</Text>
                <View style={styles.metricValueRow}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, letterSpacing: -1 }]}>94.2</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary }]}>%</Text>
                </View>
                <View style={styles.trendRow}>
                  <MaterialIcons name="arrow-upward" size={14} color={colors.onTertiaryContainer} />
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>0.4% var</Text>
                </View>
              </View>

              {/* Missed Milestones */}
              <View style={[styles.bentoCardHalf, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginBottom: spacing.sm }]}>Missed</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.error, letterSpacing: -1 }]}>03</Text>
                <View style={styles.trendRow}>
                  <MaterialIcons name="warning" size={14} color={colors.error} />
                  <Text style={[typography.labelSm, { color: colors.error }]}>Critical path</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Throughput Chart Area */}
          <View style={{ marginTop: spacing.xl }}>
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeaderRow}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, letterSpacing: -1 }]}>Throughput</Text>
                <View style={styles.dotRow}>
                  <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                  <View style={[styles.dot, { backgroundColor: colors.surfaceContainer }]} />
                </View>
              </View>

              {/* Chart Mockup */}
              <View style={styles.chartContainer}>
                {[40, 65, 55, 85, 45, 95, 70, 60, 50, 80].map((val, idx) => (
                  <View key={idx} style={[styles.bar, { height: `${val}%`, backgroundColor: idx % 2 === 0 ? colors.surfaceContainerHigh : colors.primary }]} />
                ))}
              </View>

              <View style={[styles.statsRow, { borderTopColor: colors.outlineVariant }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>PEAK CAPACITY</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>14,200 req/s</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>LATENCY P99</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>42ms</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Operational Ledger */}
          <View style={{ marginTop: spacing.xl }}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>OPERATIONAL LEDGER</Text>
              <MaterialIcons name="filter-list" size={20} color={colors.secondary} />
            </View>
            <View style={[styles.ledgerCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.ledgerList}>
                
                {/* Transaction Item 1 */}
                <View style={[styles.ledgerItem, { borderBottomColor: colors.surfaceContainer }]}>
                  <View style={styles.ledgerItemTop}>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>TX_8923441_ALPHA</Text>
                      <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold', marginTop: 4 }]}>Resource Allocation: Cluster C-9</Text>
                    </View>
                    <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>FINALIZED</Text>
                  </View>
                  <View style={styles.ledgerItemBottom}>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>14:22:01 UTC</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>NODE_SEC_4</Text>
                  </View>
                </View>

                {/* Transaction Item 2 */}
                <View style={[styles.ledgerItem, { borderBottomColor: colors.surfaceContainer }]}>
                  <View style={styles.ledgerItemTop}>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>TX_8923442_BETA</Text>
                      <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold', marginTop: 4 }]}>Shard Migration: Region EU-W</Text>
                    </View>
                    <Text style={[typography.labelCaps, { color: colors.secondary }]}>PENDING</Text>
                  </View>
                  <View style={styles.ledgerItemBottom}>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>14:25:32 UTC</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>NODE_SEC_1</Text>
                  </View>
                </View>

                {/* Transaction Item 3 */}
                <View style={[styles.ledgerItem, { borderBottomColor: colors.surfaceContainer }]}>
                  <View style={styles.ledgerItemTop}>
                    <View>
                      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>TX_8923443_GAMMA</Text>
                      <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold', marginTop: 4 }]}>Protocol Handshake: External API</Text>
                    </View>
                    <Text style={[typography.labelCaps, { color: colors.error }]}>REJECTED</Text>
                  </View>
                  <View style={styles.ledgerItemBottom}>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>14:30:11 UTC</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>GATEWAY_0</Text>
                  </View>
                </View>

              </View>
              <TouchableOpacity style={[styles.expandBtn, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>EXPAND FULL HISTORY</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Industrial System Graphic */}
          <View style={{ marginTop: spacing.xl, marginBottom: spacing.lg }}>
            <View style={[styles.graphicContainer, { borderColor: colors.outlineVariant }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2wmEyUiosB0l5JzHeodvYw1BQHTWcAc6p8Q2cWuuo8_yrmrwyIKnYj0R30QK9zpVfl_JW67SIaN6fMhGZw0R9MknwUrWoNXD6W7igjuxOcPOWJK4a7lhjZ5Nr7V3DjgK-vylaVT0k2LBxdab23tcSzJSpHz8AZQ1ZBO8AmvM5suE3RXepEC00_uY-ohfqDOXGKDzEFYuK1NJdnSVoeyaihkEkdfigzcVBYRRM6uSdMWgbxvehNZXEuA' }}
                style={styles.graphicImg}
              />
              <View style={[styles.graphicOverlay, { backgroundColor: 'rgba(0,0,0,0.05)' }]} />
              <View style={[styles.graphicBadge, { backgroundColor: '#fff', borderColor: '#000' }]}>
                <Text style={[typography.labelCaps, { color: '#000' }]}>SCHEMATIC: SEC_CORE_v4.2</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="track-changes" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>Network</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="terminal" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>Config</Text>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100, // Bottom nav
  },
  mainContent: {},
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  liveStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  bentoGrid: {
    gap: 16,
  },
  bentoCardFull: {
    padding: 32,
    borderWidth: 1,
    borderRadius: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  bentoCardHalf: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  bentoCard: {
    padding: 32,
    borderWidth: 1,
    borderRadius: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chartContainer: {
    height: 192,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  bar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 32,
    borderTopWidth: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ledgerCard: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ledgerList: {
    flexDirection: 'column',
  },
  ledgerItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  ledgerItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ledgerItemBottom: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  expandBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  graphicImg: {
    width: '100%',
    height: '100%',
  },
  graphicOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  graphicBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
  }
});

export default DigestPreviewScreen;
