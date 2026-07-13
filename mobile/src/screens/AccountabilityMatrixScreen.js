import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const RaciIndicator = ({ type }) => {
  const { colors, typography } = useTheme();
  
  const getTypeStyle = () => {
    switch (type) {
      case 'R': return { bg: colors.onSecondaryFixed, text: colors.onSecondary, border: 'transparent' };
      case 'A': return { bg: 'transparent', text: colors.onSecondaryFixed, border: colors.onSecondaryFixed };
      case 'C': return { bg: colors.surfaceContainer, text: colors.secondary, border: 'transparent' };
      case 'I': return { bg: colors.surfaceContainerLowest, text: colors.outlineVariant, border: colors.outlineVariant, dashed: true };
      default: return { bg: 'transparent', text: colors.primary, border: 'transparent' };
    }
  };

  const style = getTypeStyle();

  return (
    <View style={[
      styles.raciIndicator, 
      { 
        backgroundColor: style.bg, 
        borderColor: style.border, 
        borderWidth: style.border !== 'transparent' ? 2 : 0,
        borderStyle: style.dashed ? 'dashed' : 'solid'
      }
    ]}>
      <Text style={[typography.labelSm, { color: style.text, fontWeight: '700' }]}>{type}</Text>
    </View>
  );
};

const RaciRow = ({ roleCode, roleName, raciType, roleBg, roleText }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={styles.raciRow}>
      <View style={styles.raciRowLeft}>
        <View style={[styles.roleAvatar, { backgroundColor: roleBg }]}>
          <Text style={[typography.labelCaps, { color: roleText, fontSize: 10 }]}>{roleCode}</Text>
        </View>
        <Text style={[typography.labelSm, { color: colors.primary }]}>{roleName}</Text>
      </View>
      <RaciIndicator type={raciType} />
    </View>
  );
};

const AccountabilityMatrixScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

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
        
        {/* Page Title */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Accountability Matrix</Text>
          <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.6 }]}>VER 2.0.4</Text>
        </View>

        {/* Live Handshake Status */}
        <View style={[styles.handshakeCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          {/* Fake scanline could be an animated View */}
          <View style={styles.handshakeHeader}>
            <View style={styles.handshakeHeaderText}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, letterSpacing: 2 }]}>LIVE HANDSHAKE STATUS</Text>
              <View style={styles.statusRow}>
                <View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>SYNCHRONIZED</Text>
              </View>
            </View>
            <MaterialIcons name="handshake" size={32} color={colors.onTertiaryContainer} />
          </View>
          
          <View style={styles.handshakeStats}>
            <View style={styles.statBox}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE PROTOCOLS</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>12/12</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>LATENCY</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>42ms</Text>
            </View>
          </View>
        </View>

        {/* RACI Task Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE MANDATES</Text>
            <MaterialIcons name="filter-list" size={20} color={colors.secondary} />
          </View>

          <View style={styles.cardsContainer}>
            {/* Card 1 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.taskCardHeader, { borderBottomColor: colors.surfaceContainer }]}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>TASK FLOW</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>System Architecture Review</Text>
                </View>
                <MaterialIcons name="more-vert" size={20} color={colors.secondary} />
              </View>
              <View style={styles.taskCardBody}>
                <RaciRow roleCode="AD" roleName="Admin" raciType="A" roleBg={colors.secondaryContainer} roleText={colors.onSecondaryContainer} />
                <RaciRow roleCode="LE" roleName="Lead" raciType="R" roleBg={colors.primaryContainer} roleText={colors.onPrimary} />
                <RaciRow roleCode="OP" roleName="Operator" raciType="C" roleBg={colors.surfaceContainerHigh} roleText={colors.secondary} />
              </View>
            </View>

            {/* Card 2 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.taskCardHeader, { borderBottomColor: colors.surfaceContainer }]}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>TASK FLOW</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Database Schema Migration</Text>
                </View>
                <MaterialIcons name="more-vert" size={20} color={colors.secondary} />
              </View>
              <View style={styles.taskCardBody}>
                <RaciRow roleCode="AD" roleName="Admin" raciType="I" roleBg={colors.secondaryContainer} roleText={colors.onSecondaryContainer} />
                <RaciRow roleCode="LE" roleName="Lead" raciType="A" roleBg={colors.primaryContainer} roleText={colors.onPrimary} />
                <RaciRow roleCode="OP" roleName="Operator" raciType="R" roleBg={colors.surfaceContainerHigh} roleText={colors.secondary} />
              </View>
            </View>

            {/* Card 3 */}
            <View style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.taskCardHeader, { borderBottomColor: colors.surfaceContainer }]}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>TASK FLOW</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Security Protocol Audit</Text>
                </View>
                <MaterialIcons name="more-vert" size={20} color={colors.secondary} />
              </View>
              <View style={styles.taskCardBody}>
                <RaciRow roleCode="AD" roleName="Admin" raciType="R" roleBg={colors.secondaryContainer} roleText={colors.onSecondaryContainer} />
                <RaciRow roleCode="LE" roleName="Lead" raciType="C" roleBg={colors.primaryContainer} roleText={colors.onPrimary} />
                <RaciRow roleCode="OP" roleName="Operator" raciType="I" roleBg={colors.surfaceContainerHigh} roleText={colors.secondary} />
              </View>
            </View>
          </View>
        </View>

        {/* Industrial Legend */}
        <View style={[styles.legendBox, { backgroundColor: colors.surfaceContainer, borderColor: colors.outline }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>RACI KEY</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <View style={styles.legendIconScale}><RaciIndicator type="R" /></View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>Responsible</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendIconScale}><RaciIndicator type="A" /></View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>Accountable</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendIconScale}><RaciIndicator type="C" /></View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>Consulted</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendIconScale}><RaciIndicator type="I" /></View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>Informed</Text>
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
    paddingHorizontal: 16,
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
    gap: 24,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  handshakeCard: {
    borderWidth: 1,
    padding: 24,
  },
  handshakeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  handshakeHeaderText: {
    gap: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  handshakeStats: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 24,
  },
  statBox: {
    gap: 4,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cardsContainer: {
    gap: 16,
  },
  taskCard: {
    borderWidth: 1,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  taskCardBody: {
    padding: 16,
    gap: 16,
  },
  raciRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raciRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raciIndicator: {
    width: 32,
    height: 32,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '40%',
  },
  legendIconScale: {
    transform: [{ scale: 0.75 }],
  }
});

export default AccountabilityMatrixScreen;
