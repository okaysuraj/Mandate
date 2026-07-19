import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const BurnoutInsightsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginLeft: spacing.sm, fontWeight: 'bold' }]}>MANDATE</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          
          {/* Section Header */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM DIAGNOSTICS</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Predictive Operator Health</Text>
          </View>

          {/* Live Neural Scan */}
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.lg, marginBottom: spacing.md }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>FOCUS INTENSITY MAP</Text>
              <View style={[styles.liveBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                <View style={[styles.liveDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10, marginLeft: 4 }]}>LIVE NEURAL SCAN</Text>
              </View>
            </View>

            <View style={[styles.mapContainer, { backgroundColor: colors.surfaceContainer, borderRadius: borderRadius.lg }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNCmin2TqkQK5PFt8hl_YFJqgtWLpaWvBiOdVrNLQBi2lTZBOYQEX1U5uHr2ZOCvwmVFooFTT5vq2tSu3WBS12BQpSd5IUf1gcWc_IVfe7igyTDGXvHiKV9tC2eu97HY5ddVtMYyBJwsqSEFHgMa6bq5cVDaZRShkHctGjhRrirWL586AD5Invcu4dtM2i7XrxJD1c57E_0plNtVTV5oNs6YjrS4LknBGh8uLYGRCoed2luWgfrc1s_w' }} 
                style={[styles.mapImage, { opacity: 0.8 }]} 
              />
              <View style={styles.mapOverlay}>
                <View style={[styles.pingCircle, { borderColor: 'rgba(0,0,0,0.1)' }]} />
              </View>
              <View style={styles.mapLabels}>
                <View style={[styles.mapLabelCard, { backgroundColor: 'rgba(255,255,255,0.9)', borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>PREFRONTAL</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>94.2% ACTIVE</Text>
                </View>
                <View style={[styles.mapLabelCard, { backgroundColor: 'rgba(255,255,255,0.9)', borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>OCCIPITAL</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>12.1% LOAD</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Sustainability Index */}
          <View style={styles.row}>
            <View style={[styles.halfCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>SUSTAINABILITY</Text>
                <Text style={[typography.displayLg, { color: colors.primary, fontSize: 48, lineHeight: 48 }]}>82</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>OPTIMAL</Text>
              </View>
              <View style={{ marginTop: spacing.lg }}>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '82%' }]} />
                </View>
              </View>
            </View>
            
            <View style={[styles.halfCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, justifyContent: 'space-between' }]}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>RECOVERY RATE</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>+1.4<Text style={[typography.labelSm, { color: colors.secondary }]}>/hr</Text></Text>
              </View>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>STRESS RATE</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.error }]}>2.8<Text style={[typography.labelSm, { color: colors.secondary }]}>/hr</Text></Text>
              </View>
            </View>
          </View>

          {/* Overload Warnings */}
          <View style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>OVERLOAD WARNINGS</Text>
            
            {/* Critical */}
            <View style={[styles.warningRow, { backgroundColor: 'rgba(255, 218, 214, 0.2)', borderColor: 'rgba(186, 26, 26, 0.2)' }]}>
              <View style={styles.warningLeft}>
                <MaterialIcons name="warning" size={20} color={colors.error} />
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500', marginLeft: spacing.md }]}>Decision Fatigue</Text>
              </View>
              <View style={[styles.criticalBadge, { borderColor: 'rgba(186, 26, 26, 0.3)' }]}>
                <Text style={[typography.labelCaps, { color: colors.error }]}>CRITICAL</Text>
              </View>
            </View>

            {/* Nominal */}
            <View style={[styles.warningRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, opacity: 0.6 }]}>
              <View style={styles.warningLeft}>
                <MaterialIcons name="visibility" size={20} color={colors.secondary} />
                <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: spacing.md }]}>Visual Strain</Text>
              </View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>NOMINAL</Text>
            </View>

            {/* Nominal */}
            <View style={[styles.warningRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, opacity: 0.6 }]}>
              <View style={styles.warningLeft}>
                <MaterialIcons name="memory" size={20} color={colors.secondary} />
                <Text style={[typography.bodyMd, { color: colors.secondary, marginLeft: spacing.md }]}>Memory Recall</Text>
              </View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>NOMINAL</Text>
            </View>
          </View>

          {/* Cognitive Load Forecast */}
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.lg, marginBottom: spacing.lg }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>COGNITIVE LOAD FORECAST</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>24H CYCLE</Text>
            </View>

            <View style={styles.forecastChart}>
              <View style={styles.chartBars}>
                <View style={[styles.bar, { height: '30%', backgroundColor: colors.surfaceContainer }]} />
                <View style={[styles.bar, { height: '60%', backgroundColor: colors.surfaceContainer }]} />
                <View style={[styles.bar, { height: '80%', backgroundColor: colors.surfaceContainer }]} />
                <View style={[styles.bar, { height: '70%', backgroundColor: colors.primary }]}>
                  <Text style={[typography.labelSm, styles.nowLabel]}>NOW</Text>
                </View>
                <View style={[styles.bar, { height: '90%', backgroundColor: colors.surfaceContainerHighest, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.2)' }]} />
                <View style={[styles.bar, { height: '100%', backgroundColor: colors.surfaceContainerHighest, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.2)' }]} />
                <View style={[styles.bar, { height: '60%', backgroundColor: colors.surfaceContainerHighest, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.2)' }]} />
                <View style={[styles.bar, { height: '40%', backgroundColor: colors.surfaceContainerHighest, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.2)' }]} />
              </View>
              <View style={styles.chartLabels}>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>0600</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>1200</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>1800</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>0000</Text>
              </View>
            </View>
          </View>

          {/* Mandate Queue */}
          <View style={[styles.queueContainer, { backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.DEFAULT, padding: spacing.lg }]}>
            <View style={[styles.cardHeader, { marginBottom: spacing.md }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>MANDATE QUEUE</Text>
              <View style={[styles.queueBadge, { backgroundColor: colors.onPrimary }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>12 PENDING</Text>
              </View>
            </View>
            
            <View style={styles.queueList}>
              <View style={[styles.queueItem, { borderBottomColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Alpha Protocol Sync</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>REQ: 1400ms Response</Text>
                </View>
                <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
              </View>
              <View style={[styles.queueItem, { borderBottomColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Thermal Drift Audit</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>LOW IMPACT</Text>
                </View>
                <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
              </View>
              <View style={[styles.queueItem, { borderBottomWidth: 0 }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>Neural Buffer Flush</Text>
                  <Text style={[typography.labelSm, { color: colors.error, fontSize: 10 }]}>REQUIRED NOW</Text>
                </View>
                <MaterialIcons name="error" size={16} color={colors.error} />
              </View>
            </View>

            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>EXECUTE ALL MANDATES</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 64,
  },
  mainContent: {},
  card: {
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  mapContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pingCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 1,
  },
  mapLabels: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapLabelCard: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    width: '48%',
    borderWidth: 1,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  warningLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criticalBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  forecastChart: {
    height: 160,
    width: '100%',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  bar: {
    width: '11%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  nowLabel: {
    position: 'absolute',
    top: -24,
    left: '50%',
    transform: [{ translateX: -12 }],
    fontSize: 10,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  queueContainer: {
  },
  queueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  queueList: {
    marginBottom: 16,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  primaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default BurnoutInsightsScreen;
