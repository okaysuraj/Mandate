import React, { useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from 'react-native-reanimated';

const AnimatedBar = ({ initialHeight, delay }) => {
  const { colors } = useTheme();
  const height = useSharedValue(initialHeight);

  useEffect(() => {
    const startAnimation = () => {
      height.value = withRepeat(
        withTiming(Math.max(20, Math.min(100, initialHeight + (Math.random() - 0.5) * 40)), { 
          duration: 1500, 
          easing: Easing.inOut(Easing.ease) 
        }),
        -1,
        true
      );
    };
    setTimeout(startAnimation, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`
  }));

  return (
    <Animated.View style={[styles.chartBar, { backgroundColor: colors.primary }, animatedStyle]} />
  );
};

const AiPriorityScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe86-Nr6aOhg8_jsbX5KGG_o4iQRm30gNlqEhh7sz78UQhmulo21KRQxU8adCqT8-3qCiq8sma29tTh0JgnUBtG93lvpxz5AiFE1PphwS927b-OxkX9i2glPmA4ELsb0MTy4qhKGk69oZwGdhfi-E9nR6ixyCoji4fQZxGaP8Z9gdOi_FBC65GlgvubLsN4stvo-pziYOyRfJ4EZkJuckQPmlaMutM6-DbpjxHnQHPRF3IQ-wUn7U3eA' }}
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
        
        {/* Section Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 4 }]}>CRITICAL PATH</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>Priority Recommendations</Text>
        </View>

        {/* Network Velocity Bento Module */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.velocityHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 4 }]}>NETWORK VELOCITY</Text>
              <View style={styles.velocityValueRow}>
                <Text style={[{ fontSize: 28, fontWeight: '700', color: colors.primary }]}>94.2</Text>
                <Text style={[{ fontSize: 18, fontWeight: '500', color: colors.secondary, marginLeft: 4, marginTop: 8 }]}>gb/s</Text>
              </View>
            </View>
            <View style={[styles.trendIconBox, { backgroundColor: colors.tertiaryFixed }]}>
              <MaterialIcons name="trending-up" size={16} color={colors.onTertiaryContainer} />
            </View>
          </View>

          {/* Mock Chart */}
          <View style={styles.chartContainer}>
            <AnimatedBar initialHeight={40} delay={0} />
            <AnimatedBar initialHeight={65} delay={100} />
            <AnimatedBar initialHeight={50} delay={200} />
            <AnimatedBar initialHeight={85} delay={300} />
            <AnimatedBar initialHeight={70} delay={400} />
            <AnimatedBar initialHeight={95} delay={500} />
            <AnimatedBar initialHeight={60} delay={600} />
            <AnimatedBar initialHeight={75} delay={700} />
            <AnimatedBar initialHeight={80} delay={800} />
            <AnimatedBar initialHeight={100} delay={900} />
            <AnimatedBar initialHeight={85} delay={1000} />
            <AnimatedBar initialHeight={90} delay={1100} />
          </View>

          <View style={styles.chartFooter}>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>08:00 AM</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>REAL-TIME FEED</Text>
          </View>
        </View>

        {/* Mandatory Shift Warning */}
        <View style={[styles.warningModule, { backgroundColor: colors.primary }]}>
          <View>
            <View style={styles.warningHeader}>
              <MaterialIcons name="warning" size={20} color={colors.error} />
              <Text style={[typography.labelCaps, { color: '#fff', marginLeft: 8 }]}>MANDATORY SHIFT</Text>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primaryFixedDim, lineHeight: 24 }]}>
              Resource deficit detected in Cluster 09. Reallocation required to maintain node integrity. Action is non-optional.
            </Text>
          </View>
          <TouchableOpacity style={[styles.executeBtn, { backgroundColor: '#fff' }]} activeOpacity={0.9}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>EXECUTE REALLOCATION</Text>
          </TouchableOpacity>
        </View>

        {/* Resource Distribution */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 24 }]}>RESOURCE DISTRIBUTION</Text>
          
          <View style={styles.resourceRow}>
            <View style={styles.resourceLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>COMPUTE LOAD</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>88%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '88%' }]} />
            </View>
          </View>

          <View style={styles.resourceRow}>
            <View style={styles.resourceLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>MEMORY INDEX</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>62%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '62%' }]} />
            </View>
          </View>

          <View style={[styles.resourceRow, { marginBottom: 0 }]}>
            <View style={styles.resourceLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>LATENCY BUFFER</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>14%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.error, width: '14%' }]} />
            </View>
          </View>
        </View>

        {/* Triage List */}
        <View style={styles.triageSection}>
          <View style={[styles.triageHeader, { borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>TRIAGE LIST</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>5 PENDING</Text>
          </View>

          <TouchableOpacity style={[styles.triageItem, { backgroundColor: '#fff', borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.triageItemLeft}>
              <View style={[styles.triageDot, { backgroundColor: colors.error }]} />
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Overflow: Node-S4</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Critical Path Obstruction</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.triageItem, { backgroundColor: '#fff', borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.triageItemLeft}>
              <View style={[styles.triageDot, { backgroundColor: colors.tertiaryFixedDim }]} />
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Latency: Gateway-Prime</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Minor Sync Required</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.triageItem, { backgroundColor: '#fff', borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.triageItemLeft}>
              <View style={[styles.triageDot, { backgroundColor: colors.surfaceDim }]} />
              <View>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Backup: Archive-01</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Scheduled Transfer</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
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
    paddingHorizontal: 24,
    height: 64,
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16, // Adjusted rounded-none to slightly rounded based on standard RN patterns, but keeping boxy
    padding: 24,
    marginBottom: 24,
  },
  velocityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  velocityValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  trendIconBox: {
    padding: 4,
    borderRadius: 4,
  },
  chartContainer: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    overflow: 'hidden',
  },
  chartBar: {
    flex: 1,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  warningModule: {
    padding: 24,
    minHeight: 180,
    justifyContent: 'space-between',
    marginBottom: 24,
    borderRadius: 16,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  executeBtn: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4, // More industrial
    marginTop: 32,
  },
  resourceRow: {
    marginBottom: 16,
  },
  resourceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  triageSection: {
    paddingBottom: 40,
  },
  triageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  triageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },
  triageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  triageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});

export default AiPriorityScreen;
