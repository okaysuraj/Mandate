import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const EndOfDayReviewScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="account-circle" size={18} color={colors.onPrimary} />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>
            DAILY SUMMARY
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800', textTransform: 'uppercase' }]}>
            End of Day Review
          </Text>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
            TODAY'S ACTIVITY // DAILY DIGEST
          </Text>
        </View>

        {/* Primary Completion Rate Bento */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeaderRow}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>COMPLETION RATE</Text>
            <View style={[styles.optimizedBadge, { backgroundColor: colors.tertiaryFixedDim }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>EXCELLENT</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 72, color: colors.primary, letterSpacing: -2, lineHeight: 72 }]}>
              98.4
            </Text>
            <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 32, color: colors.primary }]}>%</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '98.4%' }]} />
          </View>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 16 }]}>
            Task completion rate is 4.2% higher than your daily target.
          </Text>
        </View>

        {/* Hourly Activity Graph */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeaderRow}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>HOURLY ACTIVITY</Text>
            <MaterialIcons name="monitoring" size={20} color={colors.primary} />
          </View>
          
          <View style={styles.chartContainer}>
            <Svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
              <Path 
                d="M0,80 L40,75 L80,85 L120,40 L160,50 L200,20 L240,60 L280,30 L320,10 L360,40 L400,35" 
                fill="none" 
                stroke={colors.primary} 
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <Path 
                d="M0,80 L40,75 L80,85 L120,40 L160,50 L200,20 L240,60 L280,30 L320,10 L360,40 L400,35 V100 H0 Z" 
                fill={`${colors.primary}10`} 
              />
            </Svg>
          </View>

          <View style={styles.chartLabels}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>09:00</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>13:00</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>18:00</Text>
          </View>
        </View>

        {/* Task Completion Log Table */}
        <View style={[styles.bentoCard, { padding: 0, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, overflow: 'hidden' }]}>
          <View style={[styles.tableHeader, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>TASK COMPLETION LOG</Text>
          </View>
          
          <View style={[styles.tableRow, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, flex: 1 }]}>TASK</Text>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, width: 80, textAlign: 'right' }]}>STATUS</Text>
          </View>

          <View style={[styles.tableRow, { borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelSm, { color: colors.primary, flex: 1 }]}>API Gateway Security Polish</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryFixedDim }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryFixed, fontSize: 10 }]}>DONE</Text>
            </View>
          </View>
          <View style={[styles.tableRow, { borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelSm, { color: colors.primary, flex: 1 }]}>Mobile Layout Polish</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryFixedDim }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryFixed, fontSize: 10 }]}>DONE</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text style={[typography.labelSm, { color: colors.primary, flex: 1 }]}>Database Migration Verification</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.errorContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onErrorContainer, fontSize: 10 }]}>PENDING</Text>
            </View>
          </View>
        </View>

        {/* Productivity Summary Bottom Cards */}
        <View style={styles.bottomCardsRow}>
          <View style={[styles.miniBento, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10, letterSpacing: 2 }]}>FOCUS TIME</Text>
              <MaterialIcons name="timer" size={16} color={colors.primary} />
            </View>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>5.4h</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10, marginTop: 4 }]}>DEEP WORK</Text>
            </View>
          </View>

          <View style={[styles.miniBento, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeaderRow}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10, letterSpacing: 2 }]}>REMAINING</Text>
              <MaterialIcons name="assignment-late" size={16} color={colors.primary} />
            </View>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>2</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10, marginTop: 4 }]}>MOVED TO TOMORROW</Text>
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
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  bentoCard: {
    borderWidth: 1,
    marginBottom: 16,
    padding: 24,
  },
  bentoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  optimizedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    marginTop: 16,
  },
  progressBarFill: {
    height: '100%',
  },
  chartContainer: {
    height: 128,
    width: '100%',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tableHeader: {
    padding: 16,
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 72,
    alignItems: 'center',
  },
  bottomCardsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  miniBento: {
    flex: 1,
    borderWidth: 1,
    padding: 16,
    height: 128,
    justifyContent: 'space-between',
  }
});

export default EndOfDayReviewScreen;
