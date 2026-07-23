import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const AiTaskBreakdownScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvf1fCUCbJ2XAb-bjbDTlQqrp7om3Y4fkY8HsEnuIURai8kaSIiqTFGP4SS_r72TlIpX3HvrfC2istIFzR67TJscI7WtFiMolJhxnoco5gBMqVMI470pX3HUjoBlnL7FWxHwDrD_gtwmUSG8ZgresxTwf0VQpPmqXTESO7LJtKirTUH6hj1tT6SN_ZVU1ZeP1hNztiSgkoIosdjlLD0Lh4uUk8Or7I1r_Z1AwO63oSurb0SEt9wuYpKw' }} 
                style={styles.avatar}
              />
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontFamily: 'HankenGrotesk_800ExtraBold', letterSpacing: -0.5 }]}>MANDATE</Text>
          </View>
          <TouchableOpacity style={styles.headerRightButton}>
            <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
          {/* Mandate Header Info */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.mandateInfoRow}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>MANDATE_ID</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>MD-0842 / Neural_Sync</Text>
              </View>
              <View style={[styles.stableTag, { backgroundColor: colors.tertiaryFixed }]}>
                <MaterialIcons name="check-circle" size={14} color={colors.tertiaryContainer} />
                <Text style={[typography.labelCaps, { color: colors.tertiaryContainer, fontSize: 10, marginLeft: 4 }]}>STABLE_NODE</Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.surfaceContainerLow, marginVertical: spacing.md }]} />

            {/* Global Confidence Bento */}
            <View style={[styles.confidenceBento, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.lg, marginBottom: spacing.md }]}>
              <View style={styles.confidenceRow}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>AI_CONFIDENCE_SCORE</Text>
                  <View style={styles.scoreRow}>
                    <Text style={[typography.displayLg, { fontSize: 48, color: colors.primary, lineHeight: 48 }]}>98.4</Text>
                    <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 24, marginLeft: 2, marginBottom: 8 }]}>%</Text>
                  </View>
                </View>
                <MaterialIcons name="analytics" size={40} color={colors.tertiaryFixedDim} />
              </View>
              <View style={[styles.progressBarContainer, { backgroundColor: colors.surfaceContainer, marginTop: spacing.md }]}>
                <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '98.4%' }]} />
              </View>
            </View>

            {/* Resource Estimation Row */}
            <View style={styles.resourceRow}>
              <View style={[styles.resourceCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>COMPUTE_COST</Text>
                <View style={styles.resourceValueRow}>
                  <MaterialIcons name="memory" size={20} color={colors.primary} />
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary, marginLeft: spacing.sm }]}>1.24 TFLOPS</Text>
                </View>
              </View>
              <View style={[styles.resourceCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>EST_TIME</Text>
                <View style={styles.resourceValueRow}>
                  <MaterialIcons name="timer" size={20} color={colors.primary} />
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary, marginLeft: spacing.sm }]}>04:12 MS</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Subtask Decompositions */}
          <View style={styles.subtasksSection}>
            <View style={[styles.subtasksHeader, { paddingHorizontal: spacing.xs, marginBottom: spacing.sm }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>SUBTASK_DECOMPOSITION</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>4 TOTAL NODES</Text>
            </View>

            {/* Subtask 1 */}
            <View style={[styles.subtaskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, marginBottom: spacing.sm }]}>
              <View style={styles.subtaskTop}>
                <View style={styles.subtaskTitleRow}>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, marginRight: spacing.sm }]}>01</Text>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Lexical Normalization</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginTop: spacing.xs }]}>Sanitizing input vectors for sync</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="edit-note" size={18} color={colors.secondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.subtaskBottom, { borderTopColor: colors.surfaceContainer, marginTop: spacing.xs, paddingTop: spacing.sm }]}>
                <View style={styles.subtaskTags}>
                  <View style={styles.tagItem}>
                    <MaterialIcons name="bolt" size={14} color={colors.secondary} />
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginLeft: 4 }]}>LOW_EFFORT</Text>
                  </View>
                  <View style={[styles.tagItem, { marginLeft: spacing.md }]}>
                    <MaterialIcons name="verified" size={14} color={colors.tertiaryFixedDim} />
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, marginLeft: 4 }]}>99.8%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Subtask 2 */}
            <View style={[styles.subtaskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, marginBottom: spacing.sm }]}>
              <View style={styles.subtaskTop}>
                <View style={styles.subtaskTitleRow}>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, marginRight: spacing.sm }]}>02</Text>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Entropy Validation</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginTop: spacing.xs }]}>Calculating data decay patterns</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="edit-note" size={18} color={colors.secondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.subtaskBottom, { borderTopColor: colors.surfaceContainer, marginTop: spacing.xs, paddingTop: spacing.sm }]}>
                <View style={styles.subtaskTags}>
                  <View style={styles.tagItem}>
                    <MaterialIcons name="bolt" size={14} color={colors.secondary} />
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginLeft: 4 }]}>MED_EFFORT</Text>
                  </View>
                  <View style={[styles.tagItem, { marginLeft: spacing.md }]}>
                    <MaterialIcons name="verified" size={14} color={colors.tertiaryFixedDim} />
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, marginLeft: 4 }]}>97.2%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Subtask 3 */}
            <View style={[styles.subtaskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, marginBottom: spacing.sm }]}>
              <View style={styles.subtaskTop}>
                <View style={styles.subtaskTitleRow}>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, marginRight: spacing.sm }]}>03</Text>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Latency Mesh Routing</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginTop: spacing.xs }]}>Optimizing topological paths</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="edit-note" size={18} color={colors.secondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.subtaskBottom, { borderTopColor: colors.surfaceContainer, marginTop: spacing.xs, paddingTop: spacing.sm }]}>
                <View style={styles.subtaskTags}>
                  <View style={styles.tagItem}>
                    <MaterialIcons name="bolt" size={14} color={colors.secondary} />
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginLeft: 4 }]}>HIGH_EFFORT</Text>
                  </View>
                  <View style={[styles.tagItem, { marginLeft: spacing.md }]}>
                    <MaterialIcons name="warning" size={14} color={colors.onErrorContainer} />
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, marginLeft: 4 }]}>92.1%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Subtask 4 */}
            <View style={[styles.subtaskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT, padding: spacing.md, marginBottom: spacing.sm, opacity: 0.6 }]}>
              <View style={styles.subtaskTop}>
                <View style={styles.subtaskTitleRow}>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, marginRight: spacing.sm }]}>04</Text>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Protocol Handshake</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginTop: spacing.xs }]}>Finalizing node handoff</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="edit-note" size={18} color={colors.secondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.subtaskBottom, { borderTopColor: colors.surfaceContainer, marginTop: spacing.xs, paddingTop: spacing.sm }]}>
                <View style={styles.subtaskTags}>
                  <View style={styles.tagItem}>
                    <MaterialIcons name="bolt" size={14} color={colors.secondary} />
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginLeft: 4 }]}>LOW_EFFORT</Text>
                  </View>
                  <View style={[styles.tagItem, { marginLeft: spacing.md }]}>
                    <MaterialIcons name="verified" size={14} color={colors.tertiaryFixedDim} />
                    <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, marginLeft: 4 }]}>99.9%</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={[styles.actionFooter, { backgroundColor: colors.surfaceContainerLowest, borderTopColor: colors.outlineVariant, padding: spacing.md, gap: spacing.md }]}>
        <TouchableOpacity style={[styles.footerBtnSecondary, { borderColor: colors.outline }]}>
          <MaterialIcons name="refresh" size={18} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm }]}>Refine Model</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerBtnPrimary, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="backup" size={18} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: spacing.sm }]}>Commit to Backlog</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100, // Space for footer
  },
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerRightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
  },
  mandateInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stableTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  confidenceBento: {
    borderWidth: 1,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceCard: {
    width: '48%',
    borderWidth: 1,
  },
  resourceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtasksSection: {
  },
  subtasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtaskCard: {
    borderWidth: 1,
  },
  subtaskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subtaskTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtaskBottom: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtaskTags: {
    flexDirection: 'row',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: 24, // Safe area bottom padding
  },
  footerBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 32,
    paddingVertical: 12,
  },
  footerBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    paddingVertical: 12,
  }
});

export default AiTaskBreakdownScreen;
