import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const RuleBuilderScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [ruleName, setRuleName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [retries, setRetries] = useState(3);

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

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title Section */}
          <View style={styles.pageHeader}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>Rule Builder</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4 }]}>System Automation Protocol v4.2</Text>
          </View>

          {/* STEP 01: Metadata */}
          <View style={styles.builderSection}>
            <View style={styles.stepHeader}>
              <Text style={[{ fontFamily: 'JetBrainsMono-Bold', fontSize: 48, color: colors.primary, opacity: 0.3 }]}>01</Text>
              <View style={[styles.stepTitleWrapper, { borderBottomColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>METADATA</Text>
              </View>
            </View>

            <View style={styles.sectionBody}>
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>RULE NAME</Text>
                <TextInput 
                  style={[styles.textInput, typography.labelSm, { color: colors.primary, borderBottomColor: colors.outlineVariant }]}
                  placeholder="e.g., SYNC_L2_CACHE_UPSTREAM"
                  placeholderTextColor={colors.secondary}
                  value={ruleName}
                  onChangeText={setRuleName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>DESCRIPTION</Text>
                <TextInput 
                  style={[styles.textArea, typography.bodyMd, { backgroundColor: colors.surfaceContainerLow, color: colors.primary }]}
                  placeholder="Define objective of the automation sequence..."
                  placeholderTextColor={colors.secondary}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={[styles.statusCard, { borderColor: colors.outlineVariant, borderStyle: 'dashed' }]}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>STATUS</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>Awaiting initial deployment</Text>
                </View>
                <View style={[styles.statusIndicatorBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.statusIndicatorDot, { backgroundColor: colors.outline }]} />
                </View>
              </View>
            </View>
          </View>

          {/* STEP 02: Parameters */}
          <View style={[styles.builderSection, { backgroundColor: colors.surfaceContainerLowest, padding: 16, borderRadius: 8, marginHorizontal: -16 }]}>
            <View style={styles.stepHeader}>
              <Text style={[{ fontFamily: 'JetBrainsMono-Bold', fontSize: 48, color: colors.primary, opacity: 0.3 }]}>02</Text>
              <View style={[styles.stepTitleWrapper, { borderBottomColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>PARAMETERS</Text>
              </View>
            </View>

            <View style={styles.sectionBody}>
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>PRIORITY HIERARCHY</Text>
                <View style={[styles.segmentedControl, { backgroundColor: colors.surfaceContainerLow }]}>
                  {['LOW', 'MED', 'HIGH', 'CRIT'].map(p => (
                    <TouchableOpacity 
                      key={p} 
                      style={[styles.segmentBtn, priority === p && { backgroundColor: colors.primary }]}
                      onPress={() => setPriority(p)}
                    >
                      <Text style={[typography.labelCaps, { color: priority === p ? colors.onPrimary : colors.secondary }]}>{p}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.paramsGrid}>
                <View style={[styles.paramCard, { borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>TIMEOUT</Text>
                  <View style={styles.valRow}>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 24 }]}>300</Text>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 4 }]}>MS</Text>
                  </View>
                  {/* Fake Slider */}
                  <View style={[styles.fakeSlider, { backgroundColor: colors.surfaceContainerHigh, marginTop: 16 }]}>
                    <View style={[styles.fakeSliderFill, { backgroundColor: colors.primary, width: '60%' }]} />
                    <View style={[styles.fakeSliderThumb, { backgroundColor: colors.primary, left: '60%' }]} />
                  </View>
                </View>

                <View style={[styles.paramCard, { borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>RETRIES</Text>
                  <View style={styles.valRow}>
                    <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 24 }]}>0{retries}</Text>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 4 }]}>ATT</Text>
                  </View>
                  <View style={styles.stepperRow}>
                    <TouchableOpacity style={[styles.stepperBtn, { borderColor: colors.outlineVariant }]} onPress={() => setRetries(Math.max(0, retries - 1))}>
                      <MaterialIcons name="remove" size={16} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.stepperBtn, { borderColor: colors.outlineVariant }]} onPress={() => setRetries(retries + 1)}>
                      <MaterialIcons name="add" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={[styles.isolationModeCard, { backgroundColor: colors.surfaceContainerLow }]}>
                <MaterialIcons name="security" size={24} color={colors.primary} />
                <View style={{ marginLeft: 16 }}>
                  <Text style={[typography.labelCaps, { color: colors.primary }]}>ISOLATION MODE</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>Run in secure sandbox environment</Text>
                </View>
              </View>
            </View>
          </View>

          {/* STEP 03: Logic Sequence */}
          <View style={styles.builderSection}>
            <View style={styles.stepHeader}>
              <Text style={[{ fontFamily: 'JetBrainsMono-Bold', fontSize: 48, color: colors.primary, opacity: 0.3 }]}>03</Text>
              <View style={[styles.stepTitleWrapper, { borderBottomColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>LOGIC SEQUENCE</Text>
              </View>
            </View>

            <View style={styles.logicSequence}>
              {/* Trigger */}
              <View style={[styles.logicStep, { borderLeftColor: colors.outlineVariant }]}>
                <View style={[styles.logicNode, { backgroundColor: colors.primary, borderColor: colors.background }]} />
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>TRIGGER</Text>
                <View style={[styles.logicBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>WEBHOOK_INBOUND</Text>
                  <MaterialIcons name="expand-more" size={20} color={colors.secondary} />
                </View>
              </View>

              {/* Condition */}
              <View style={[styles.logicStep, { borderLeftColor: colors.outlineVariant }]}>
                <View style={[styles.logicNode, { backgroundColor: colors.surfaceDim, borderColor: colors.background }]} />
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>CONDITION</Text>
                <View style={[styles.logicBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>PAYLOAD.SIZE > 512KB</Text>
                  <MaterialIcons name="edit" size={20} color={colors.secondary} />
                </View>
              </View>

              {/* Action */}
              <View style={[styles.logicStep, { borderLeftColor: 'transparent' }]}>
                <View style={[styles.logicNode, { backgroundColor: colors.tertiary, borderColor: colors.background }]} />
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>ACTION EXECUTION</Text>
                <View style={styles.terminalBox}>
                  <View style={[styles.terminalHeader, { borderBottomColor: colors.onSecondaryFixedVariant }]}>
                    <View style={styles.macButtons}>
                      <View style={[styles.macBtn, { backgroundColor: '#ef4444' }]} />
                      <View style={[styles.macBtn, { backgroundColor: '#eab308' }]} />
                      <View style={[styles.macBtn, { backgroundColor: '#22c55e' }]} />
                    </View>
                    <Text style={[{ fontFamily: 'JetBrainsMono-Regular', fontSize: 10, color: 'rgba(255,255,255,0.5)' }]}>main.protocol.sh</Text>
                  </View>
                  <Text style={[{ fontFamily: 'JetBrainsMono-Regular', fontSize: 12, color: '#fff', lineHeight: 20 }]}>
                    <Text style={{ color: '#fff' }}>if </Text>
                    (event.payload_size > <Text style={{ color: colors.tertiaryFixedDim }}>524288</Text>) {'{\n'}
                    <Text style={{ color: colors.secondaryFixedDim }}>  // Initialize upstream sync{'\n'}</Text>
                    {'  '}await <Text style={{ color: '#fff' }}>dispatch</Text>(<Text style={{ color: colors.tertiaryFixedDim }}>'SYNC_L2'</Text>, {'{\n'}
                    {'    '}origin: event.source_id,{'\n'}
                    {'    '}mode: <Text style={{ color: colors.tertiaryFixedDim }}>'SECURE'</Text>{'\n'}
                    {'  }'});{'\n'}
                    {'}'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Deploy Button */}
            <View style={styles.deploySection}>
              <TouchableOpacity style={[styles.deployBtn, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
                <Text style={[typography.headlineLgMobile, { color: colors.onPrimary, fontSize: 18, fontWeight: '700' }]}>DEPLOY PROTOCOL</Text>
              </TouchableOpacity>
              <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center', marginTop: 16, fontSize: 10, letterSpacing: 2 }]}>ENCRYPTED TRANSMISSION READY</Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
  },
  builderSection: {
    marginBottom: 48,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepTitleWrapper: {
    borderBottomWidth: 2,
    marginLeft: 12,
    paddingBottom: 4,
  },
  sectionBody: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    textTransform: 'uppercase',
  },
  textArea: {
    padding: 16,
    borderRadius: 0,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
  },
  statusIndicatorBg: {
    width: 48,
    height: 24,
    borderRadius: 12,
    position: 'relative',
  },
  statusIndicatorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    left: 4,
    top: 4,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  paramsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  paramCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 0, // bento
  },
  valRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  fakeSlider: {
    height: 4,
    width: '100%',
    position: 'relative',
  },
  fakeSliderFill: {
    height: '100%',
  },
  fakeSliderThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    top: -4,
    marginLeft: -6,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isolationModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 0,
  },
  logicSequence: {
    paddingLeft: 4,
  },
  logicStep: {
    borderLeftWidth: 2,
    paddingLeft: 24,
    paddingBottom: 32,
    position: 'relative',
  },
  logicNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    position: 'absolute',
    left: -9,
    top: 0,
  },
  logicBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 0,
  },
  terminalBox: {
    backgroundColor: '#1c1b1b',
    padding: 16,
    borderRadius: 0,
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  macButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  macBtn: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deploySection: {
    marginTop: 32,
  },
  deployBtn: {
    paddingVertical: 24,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RuleBuilderScreen;
