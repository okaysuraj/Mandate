import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const DeviationReportScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [selectedCause, setSelectedCause] = useState('latency');
  const [logText, setLogText] = useState('');
  const [signed, setSigned] = useState(false);

  const causes = [
    { id: 'latency', label: 'SYSTEM LATENCY', icon: 'bolt' },
    { id: 'sensor', label: 'SENSOR MISALIGNMENT', icon: 'visibility-off' },
    { id: 'human', label: 'HUMAN INTERVENTION', icon: 'person' },
    { id: 'override', label: 'EXTERNAL OVERRIDE', icon: 'priority-high' }
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* TopAppBar Shell */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAzgiCE7FWHOswsGZ4JAcMa64Jo3nKzSrDkTuAnwqRD7bk8phdju86irzK4I-LZhGP-gdRbrKSECyQbBZknd80jrT2zuZ1pEx4xMFYIteYUdqPCDQ_uNMow9adf-AjK7FV6SKsRUq55XDm4Sgc6K6PAEhWx0ZaDYiJwsNmaVhw51IswGNxdSgLCWTHuzrlLDLOgFTJciSXzb1LZpXKHzMOYh5i-ooJFIHi7yYnHvGvuvJadE3rTBZPQ' }}
              style={styles.avatar}
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase', marginLeft: spacing.sm }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Header Section */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={styles.deviationBadge}>
              <View style={[styles.pulseDot, { backgroundColor: colors.error }]} />
              <Text style={[typography.labelCaps, { color: colors.error, marginLeft: 8 }]}>DEVIATION DETECTED</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>Missed Mandate Explanation</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: spacing.xs }]}>Protocol deviation report for industrial compliance logs. Complete all fields for system re-validation.</Text>
          </View>

          <View style={{ gap: spacing.md }}>
            
            {/* Reference ID Module */}
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>REFERENCE ID</Text>
              <View style={styles.refRow}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 20, fontWeight: 'bold', letterSpacing: -1 }]}>DR-992-KAPPA</Text>
                <MaterialIcons name="fingerprint" size={24} color={colors.outline} />
              </View>
            </View>

            {/* Cause Categorization Module */}
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.md }]}>CAUSE CATEGORIZATION</Text>
              <View style={{ gap: spacing.sm }}>
                {causes.map((cause) => {
                  const isActive = selectedCause === cause.id;
                  return (
                    <TouchableOpacity
                      key={cause.id}
                      style={[
                        styles.causeOption,
                        { borderColor: colors.outlineVariant },
                        isActive && { backgroundColor: colors.primary, borderColor: colors.primary }
                      ]}
                      onPress={() => setSelectedCause(cause.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={[typography.labelCaps, { color: isActive ? colors.onPrimary : colors.primary }]}>{cause.label}</Text>
                      <MaterialIcons name={cause.icon} size={16} color={isActive ? colors.onPrimary : colors.primary} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Technical Log Area */}
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>TECHNICAL LOG ENTRY</Text>
              <TextInput
                style={[typography.labelCaps, styles.textArea, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outline, color: colors.primary }]}
                placeholder="INITIATE DETAILED EXPLANATION..."
                placeholderTextColor={colors.outlineVariant}
                multiline
                numberOfLines={4}
                value={logText}
                onChangeText={setLogText}
                maxLength={500}
                textAlignVertical="top"
              />
              <View style={styles.logFooter}>
                <Text style={[typography.labelCaps, { color: colors.outline, fontSize: 10 }]}>TIMESTAMP: 2023.10.27_14:02:55</Text>
                <Text style={[typography.labelCaps, { color: logText.length >= 500 ? colors.error : colors.outline, fontSize: 10 }]}>CHARS: {logText.length}/500</Text>
              </View>
            </View>

            {/* Auth Signature Block */}
            <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: 'rgba(231, 232, 234, 0.5)', borderStyle: 'dashed' }]}>
              <View style={styles.authHeader}>
                <View style={[styles.authIconContainer, { backgroundColor: colors.primary }]}>
                  <MaterialIcons name="draw" size={20} color={colors.onPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 4 }]}>AUTH SIGNATURE REQUIRED</Text>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10, lineHeight: 12 }]}>Digital hash generation requires biometric confirmation or manual passcode entry. By signing, you verify the technical accuracy of this deviation report.</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.signatureArea, { borderBottomColor: colors.primary }]}
                onPress={() => setSigned(true)}
                activeOpacity={0.8}
              >
                {!signed ? (
                  <Text style={[typography.labelCaps, { color: colors.outlineVariant, fontSize: 12 }]}>TAP TO SIGN DIGITALLY</Text>
                ) : (
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontStyle: 'italic', transform: [{ rotate: '-2deg' }] }]}>J. Anderson_Secure_778</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Submit Actions */}
            <View style={styles.actionGroup}>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2, marginRight: 8 }]}>EXECUTE SUBMISSION</Text>
                <MaterialIcons name="send" size={20} color={colors.onPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>DISCARD DRAFT</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav Shell */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant, borderRightWidth: 1 }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant, borderRightWidth: 1 }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4 }]}>SYSTEM</Text>
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
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100, // Space for bottom nav
  },
  mainContent: {},
  deviationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bentoCard: {
    padding: 24,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  causeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  textArea: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    minHeight: 100,
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  authHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  authIconContainer: {
    padding: 4,
  },
  signatureArea: {
    marginTop: 16,
    height: 48,
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  actionGroup: {
    marginTop: 8,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  secondaryBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default DeviationReportScreen;
