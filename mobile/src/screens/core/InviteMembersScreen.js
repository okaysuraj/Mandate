import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, TextInput, ActivityIndicator, Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const InviteMembersScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const { user } = useAuth();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer'); // 'Viewer', 'Editor', 'Admin'
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleInvite = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid operator email address.');
      return;
    }

    if (!user?.activeWorkspace) {
      Alert.alert('Context Error', 'No active workspace selected.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      await api.post(`/workspaces/${user.activeWorkspace}/members`, {
        email: email.trim().toLowerCase(),
        role
      });
      Alert.alert('Provisioned', `Operator credentials granted for ${email} with role [${role.toUpperCase()}].`, [
        { text: 'Done', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to provision operator';
      Alert.alert('Provisioning Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Navigation Shell */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="security" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>
            CREDENTIAL PROVISIONING
          </Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 4 }]}>
            Invite Operator
          </Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, opacity: 0.8 }]}>
            Initialize workspace credential authorization protocol.
          </Text>
        </View>

        {/* Steps Container */}
        <View style={styles.stepsContainer}>
          {/* STEP 01: Credential Provisioning */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.stepHeader}>
              <MaterialIcons name="badge" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary }]}>01 CREDENTIAL PROVISIONING</Text>
            </View>
            
            <View style={styles.stepContent}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>
                  OPERATOR IDENTIFIER (EMAIL)
                </Text>
                <TextInput 
                  style={[styles.textInput, typography.labelSm, { borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                  placeholder="operator@mandate.sys"
                  placeholderTextColor={colors.outline}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Cluster Workspace Context */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>
                  ACTIVE WORKSPACE
                </Text>
                <View style={[styles.clusterBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 11 }]}>
                    {user?.activeWorkspace ? `WORKSPACE_ID: ${user.activeWorkspace.substring(0, 10).toUpperCase()}` : 'DEFAULT_CLUSTER'}
                  </Text>
                  <MaterialIcons name="verified-user" size={16} color={colors.onTertiaryContainer} />
                </View>
              </View>

              {/* Clearance Level */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 12 }]}>
                  CLEARANCE ROLE
                </Text>
                <View style={styles.clearanceGrid}>
                  {[
                    { key: 'Viewer', label: 'L1_VIEWER' },
                    { key: 'Editor', label: 'L2_EDITOR' },
                    { key: 'Admin', label: 'L3_ADMIN' }
                  ].map((lvl) => {
                    const isSelected = role === lvl.key;
                    return (
                      <TouchableOpacity 
                        key={lvl.key}
                        style={[
                          styles.clearanceBtn, 
                          isSelected 
                            ? { backgroundColor: colors.primary, borderColor: colors.primary } 
                            : { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }
                        ]}
                        onPress={() => setRole(lvl.key)}
                      >
                        <Text style={[typography.labelCaps, { color: isSelected ? colors.onPrimary : colors.secondary, fontSize: 10 }]}>
                          {lvl.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          {/* STEP 02: Permission Matrix */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.stepHeader}>
              <MaterialIcons name="security" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary }]}>02 PERMISSION MATRIX</Text>
            </View>

            <View style={styles.protocolList}>
              <View style={[styles.protocolItem, { borderBottomColor: colors.outlineVariant }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="visibility" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>Read Telemetry & Mandates</Text>
                </View>
                <MaterialIcons name="check-circle" size={16} color={colors.onTertiaryContainer} />
              </View>
              <View style={[styles.protocolItem, { borderBottomColor: colors.outlineVariant }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="edit" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>Execute & Create Tasks</Text>
                </View>
                <MaterialIcons 
                  name={role === 'Editor' || role === 'Admin' ? 'check-circle' : 'cancel'} 
                  size={16} 
                  color={role === 'Editor' || role === 'Admin' ? colors.onTertiaryContainer : colors.outlineVariant} 
                />
              </View>
              <View style={[styles.protocolItem, { borderBottomColor: colors.outlineVariant }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="admin-panel-settings" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>Workspace Administration</Text>
                </View>
                <MaterialIcons 
                  name={role === 'Admin' ? 'check-circle' : 'cancel'} 
                  size={16} 
                  color={role === 'Admin' ? colors.onTertiaryContainer : colors.outlineVariant} 
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomActionBar, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity 
          style={[styles.executeBtn, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]}
          onPress={handleInvite}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.onPrimary} />
          ) : (
            <>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>
                EXECUTE INVITE
              </Text>
              <MaterialIcons name="send" size={16} color={colors.onPrimary} style={{ marginLeft: 8 }} />
            </>
          )}
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
    paddingHorizontal: 20,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  pageHeader: {
    marginVertical: 16,
  },
  stepsContainer: {
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepContent: {
    gap: 16,
  },
  inputGroup: {
    width: '100%',
  },
  textInput: {
    height: 44,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  clusterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  clearanceGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  clearanceBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  protocolList: {
    gap: 8,
  },
  protocolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  protocolItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomActionBar: {
    padding: 16,
    borderTopWidth: 1,
  },
  executeBtn: {
    height: 48,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InviteMembersScreen;
