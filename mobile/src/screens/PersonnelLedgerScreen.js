import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const PersonnelLedgerScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  // Pulse animation for system active dot
  const opacity = useSharedValue(0.4);
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);
  const animatedDotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

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
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Section Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800' }]}>Personnel Ledger</Text>
          <View style={styles.statusIndicator}>
            <Animated.View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixedDim }, animatedDotStyle]} />
            <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 8 }]}>SYSTEM ACTIVE // ENCRYPTED ACCESS</Text>
          </View>
        </View>

        {/* Filter/Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
          <MaterialIcons name="search" size={20} color={colors.secondary} />
          <TextInput 
            style={[styles.searchInput, typography.labelSm, { color: colors.primary }]}
            placeholder="SEARCH OPERATOR ID..."
            placeholderTextColor={colors.secondaryFixedDim}
          />
          <MaterialIcons name="filter-list" size={20} color={colors.secondary} />
        </View>

        {/* High-Density Vertical List */}
        <View style={styles.operatorsList}>
          
          {/* Operator Card 1 */}
          <TouchableOpacity style={[styles.operatorCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.operatorTop}>
              <View style={styles.operatorIdentity}>
                <View style={[styles.avatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtafk9BIMGKwcAcSg1lVALOKTJOIAUJ74ea8TSUoKAvl2WbW4zhfUBONgayhWIBxZEzo2PdXseX10oEw8qwn4jMildgAGlNm7U0NMg4pi9xgdcA9UFeS7hBX_q0sW6lsrUAOnwrMhaM6m5_dOJ7GyJ0-yzgEf7Y69pBge3FzsP9cGtbu2p1zIOmhukX6QvwrSUu1DT59d5b6fGzne0zg2nVYwkiL-99EGf1kA8ojcuXNkJRLbnasnYIg' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>OPERATOR_ID</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, lineHeight: 22 }]}>UNIT-724-X</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryContainer }]}>
                <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer }]} />
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10, marginLeft: 4 }]}>ACTIVE</Text>
              </View>
            </View>
            <View style={[styles.operatorBottom, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>ASSIGNMENT</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>NEURAL_SYNC_A</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>UPTIME</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>142:12:04</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Operator Card 2 */}
          <TouchableOpacity style={[styles.operatorCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.operatorTop}>
              <View style={styles.operatorIdentity}>
                <View style={[styles.avatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_cxh1Bkhe0KMY8Jps6Ei7W2_sFw8y1cST0-NAbLIz1E579tX92mT-QYelN0453G9qS9Y00ggdn8zldQ-N0irzKX8wnnDp8j2KUZkI7GfgtvZZGmbsTv5NQ-Sao7yeWSHc6okX8i9bKBFWVVBXvoiVuQ06mGy05whpUIAwqeqDY329RwGPbMF8QQ_6ue096WfZhCU1ICFirwNIdmdQeVLhgT3nTfXv0avjyfxba69sfDJsMgXXF9QbWg' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>OPERATOR_ID</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, lineHeight: 22 }]}>UNIT-019-K</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, borderWidth: 1 }]}>
                <View style={[styles.statusDot, { backgroundColor: colors.secondary }]} />
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginLeft: 4 }]}>STANDBY</Text>
              </View>
            </View>
            <View style={[styles.operatorBottom, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>ASSIGNMENT</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>--NULL--</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>UPTIME</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>000:00:00</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Operator Card 3 */}
          <TouchableOpacity style={[styles.operatorCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.operatorTop}>
              <View style={styles.operatorIdentity}>
                <View style={[styles.avatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDt0tJ7jrmEHUtMZIEsu_vXqh68-33cC4OLr8Mc8X-Zas8ExTwmhVm0Gx1jDvzqV3YhjXwfbn4mGVi191uxbz_-2B5az83w_Bf8h8nySu_HgAApeMef615UL1jTYsgQYCuECYmFqcufsYiYKgds_4lwsr3fJTJGs3uM9mefH4DNG9Az--HUCyettKECoX3DC8Y3QMH9RWH7EMcpBJgE35VPbuOVvJ2DHABmFhWkYwkeSF3B1mzpcrsSg' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>OPERATOR_ID</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, lineHeight: 22 }]}>UNIT-882-L</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryContainer }]}>
                <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer }]} />
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10, marginLeft: 4 }]}>ACTIVE</Text>
              </View>
            </View>
            <View style={[styles.operatorBottom, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>ASSIGNMENT</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>CORE_STABILITY</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>UPTIME</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>012:45:33</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Operator Card 4 */}
          <TouchableOpacity style={[styles.operatorCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.operatorTop}>
              <View style={styles.operatorIdentity}>
                <View style={[styles.avatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBvo2HY0QGlMgXCzucTVJ3KVzFxPr_C-dAq2sIcvLmvk66scUBdty2NEMSbofcGhamzHIj0k8YG2WRWytMajMcV3VuKrE2POvohlN5HFPGxjfA9vd8Hgmj-JdadwHliEE3RZKECjlnC4X9kklZ99Iru5egegq_xAijrj9r9gBUYen6P9LF3dQ2xt0dhag6AmeX2NKWimMh1cSnLbobPyZXqh-DcDnm8rBuxpknaBbMvSaWDGOgftUMow' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>OPERATOR_ID</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, lineHeight: 22 }]}>UNIT-441-B</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryContainer }]}>
                <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer }]} />
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10, marginLeft: 4 }]}>ACTIVE</Text>
              </View>
            </View>
            <View style={[styles.operatorBottom, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>ASSIGNMENT</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>PERIMETER_SEC</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>UPTIME</Text>
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>089:14:11</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

        {/* Global Statistics Bento */}
        <View style={[styles.globalStatsSection, { borderTopColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 16 }]}>SYSTEM_METRICS</Text>
          
          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 10 }]}>TOTAL PERSONNEL</Text>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 32, color: colors.onPrimary, marginVertical: 4 }]}>1,204</Text>
              <Text style={[typography.labelSm, { color: colors.tertiaryFixedDim, fontSize: 10 }]}>+12 NEW THIS CYCLE</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, borderWidth: 1 }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>ACTIVE ASSIGNMENTS</Text>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 32, color: colors.primary, marginVertical: 4 }]}>82.4%</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>OPTIMAL FLOW</Text>
            </View>
          </View>

          <View style={[styles.fleetStatus, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>FLEET_STATUS</Text>
              <Text style={[typography.labelSm, { color: colors.primary, marginTop: 2 }]}>ALL SYSTEMS NOMINAL</Text>
            </View>
            <MaterialIcons name="check-circle" size={24} color={colors.tertiaryFixedDim} />
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
    padding: 16,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginHorizontal: 8,
    height: '100%',
  },
  operatorsList: {
    gap: 12,
  },
  operatorCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  operatorTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  operatorIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  operatorBottom: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  statCol: {
    flex: 1,
  },
  globalStatsSection: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
  },
  fleetStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  }
});

export default PersonnelLedgerScreen;
