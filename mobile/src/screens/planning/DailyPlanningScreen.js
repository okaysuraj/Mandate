import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const DailyPlanningScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjNe21TYsXpuojrX1tJppz2eeBkaFsG-XeLpYxqCzqMPwMdJvG3X4M3qpoYsx8_jAfkbmAuR4s1JxGTsXmt6_32m807pjHdNoD4-eONbXOOIqyA_r4QmPLhQpLGLpOKjonig9uUXUHnSn6AFzbRpvTswKs1sGYOJ1gd9pXXewV7e28f2BNkJ6844UzvHSHdEJCjMy8i4olFQL5v20wGw3jWHT0Rijz48IQU7FQFTYzxy5TPJWcOxJBeA' }}
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
        
        {/* Terminal Briefing Section */}
        <View style={styles.briefingSection}>
          <View style={styles.briefingHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM_STATUS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Daily Briefing</Text>
            </View>
            <View style={[styles.optimizedBadge, { backgroundColor: `${colors.tertiaryFixedDim}33` }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>OPTIMIZED</Text>
            </View>
          </View>

          {/* Dashboard Summary Bento */}
          <View style={styles.bentoGrid}>
            {/* Throughput Card */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>THROUGHPUT</Text>
                <MaterialIcons name="speed" size={20} color={colors.primary} />
              </View>
              <View style={styles.bentoCardBody}>
                <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 36, color: colors.primary }]}>94.2%</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 4 }]}>+2.4% vs Yesterday</Text>
              </View>
            </View>

            {/* Switching Risk Card (Histogram) */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.bentoCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>SWITCHING_RISK</Text>
                <MaterialIcons name="warning" size={20} color={colors.error} />
              </View>
              <View style={styles.histogramContainer}>
                <View style={[styles.histoBar, { height: '20%', backgroundColor: colors.surfaceDim }]} />
                <View style={[styles.histoBar, { height: '40%', backgroundColor: colors.surfaceDim }]} />
                <View style={[styles.histoBar, { height: '30%', backgroundColor: colors.surfaceDim }]} />
                <View style={[styles.histoBar, { height: '80%', backgroundColor: colors.primary }]} />
                <View style={[styles.histoBar, { height: '95%', backgroundColor: colors.primary }]} />
                <View style={[styles.histoBar, { height: '60%', backgroundColor: colors.error }]} />
                <View style={[styles.histoBar, { height: '20%', backgroundColor: colors.surfaceDim }]} />
                <View style={[styles.histoBar, { height: '15%', backgroundColor: colors.surfaceDim }]} />
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 8 }]}>Critical density peak: 14:00 — 16:00</Text>
            </View>
          </View>
        </View>

        {/* Suggested Focus Windows */}
        <View style={styles.windowsSection}>
          <View style={styles.windowsHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>FOCUS_WINDOWS_STREAMS</Text>
            <TouchableOpacity>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>RECALCULATE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.windowsList}>
            {/* Window 1 */}
            <View style={[styles.windowItem, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.primary }]}>
              <View style={[styles.windowTime, { borderRightColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700', fontSize: 14 }]}>09:00</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>START</Text>
              </View>
              <View style={styles.windowContent}>
                <View style={styles.windowRow1}>
                  <View style={[styles.tagBadge, { backgroundColor: colors.primary }]}>
                    <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>ALPHA</Text>
                  </View>
                  <MaterialIcons name="more-vert" size={16} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Strategic Kernel Review</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Deep Work Block • No Comms</Text>
              </View>
              <View style={styles.windowIcon}>
                <MaterialIcons name="bolt" size={20} color={colors.primary} />
              </View>
            </View>

            {/* Window 2 */}
            <View style={[styles.windowItem, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.tertiaryFixedDim }]}>
              <View style={[styles.windowTime, { borderRightColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700', fontSize: 14 }]}>11:30</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>START</Text>
              </View>
              <View style={styles.windowContent}>
                <View style={styles.windowRow1}>
                  <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>HIGH FLOW</Text>
                  </View>
                  <MaterialIcons name="more-vert" size={16} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Systems Integration Dev</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Terminal Locked • Priority A</Text>
              </View>
              <View style={styles.windowIcon}>
                <MaterialIcons name="water-drop" size={20} color={colors.onTertiaryContainer} />
              </View>
            </View>

            {/* Window 3 */}
            <View style={[styles.windowItem, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.secondary }]}>
              <View style={[styles.windowTime, { borderRightColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700', fontSize: 14 }]}>14:00</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>START</Text>
              </View>
              <View style={styles.windowContent}>
                <View style={styles.windowRow1}>
                  <View style={[styles.tagBadge, { backgroundColor: colors.secondaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>BETA</Text>
                  </View>
                  <MaterialIcons name="more-vert" size={16} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Stakeholder Sync</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>External Comms Allowed</Text>
              </View>
              <View style={styles.windowIcon}>
                <MaterialIcons name="groups" size={20} color={colors.secondary} />
              </View>
            </View>

            {/* Window 4 */}
            <View style={[styles.windowItem, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.tertiaryFixedDim, opacity: 0.6 }]}>
              <View style={[styles.windowTime, { borderRightColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700', fontSize: 14 }]}>16:30</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>START</Text>
              </View>
              <View style={styles.windowContent}>
                <View style={styles.windowRow1}>
                  <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryContainer }]}>
                    <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>HIGH FLOW</Text>
                  </View>
                  <MaterialIcons name="lock" size={16} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Documentation Sprint</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Pending completion of Slot 2</Text>
              </View>
              <View style={styles.windowIcon}>
                <MaterialIcons name="pending" size={20} color={colors.secondary} />
              </View>
            </View>
          </View>
        </View>

        {/* Dynamic Ambient Visualization */}
        <View style={[styles.ambientBlock, { backgroundColor: colors.primaryContainer, borderColor: colors.outline }]}>
          <View style={{ flex: 1, justifyContent: 'flex-end', padding: 16 }}>
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 10 }]}>COGNITIVE_LOAD_STREAM</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <View style={[styles.dot, { backgroundColor: colors.tertiaryFixedDim }]} />
              <Text style={[typography.labelSm, { color: colors.primaryFixedDim, textTransform: 'uppercase', letterSpacing: 2, marginLeft: 8 }]}>STEADY STATE</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    overflow: 'hidden',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  briefingSection: {
    marginBottom: 32,
  },
  briefingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  optimizedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoGrid: {
    gap: 16,
  },
  bentoCard: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  bentoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
    width: '100%',
  },
  histoBar: {
    flex: 1,
    marginHorizontal: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  windowsSection: {
    marginBottom: 32,
  },
  windowsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  windowsList: {
    gap: 8,
  },
  windowItem: {
    flexDirection: 'row',
    borderLeftWidth: 4,
    padding: 16,
  },
  windowTime: {
    alignItems: 'center',
    minWidth: 56,
    paddingRight: 16,
    borderRightWidth: 1,
  },
  windowContent: {
    flex: 1,
    paddingLeft: 16,
  },
  windowRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  windowIcon: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  ambientBlock: {
    height: 128,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});

export default DailyPlanningScreen;
