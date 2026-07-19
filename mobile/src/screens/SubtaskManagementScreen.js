import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const initialSubtasks = [
  {
    id: 's1',
    title: 'DP-902-EXTERN',
    status: 'VERIFIED',
    statusType: 'success',
    desc: 'External telemetry calibration and synchronization with orbital relay.',
    operator: 'OP_ARIS_7',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZOAnepui1JTfrtu1x7pGIj32Hzb_yv84XdLhGEx69HvyM2u58hW9A-LB3VosRwVNTdRh_raTl3_Tn6Rm8pwJsp1590H_e22mFnAcQZfXks2amZMRVdNBljqsO-Zmc-t-uJwSyKMALB31bVEf7H0aKYZNvqJkiHnUlkYUtZcBLBNxKf-1jgrDbww2plGLMoA1CgJPsmhxX85MvVvW0eOeLhyU6NDG0TI-zhHQzF4L_vRY_EmVYI_mIA',
    checked: true,
  },
  {
    id: 's2',
    title: 'NX-44-LOGISTICS',
    status: 'PENDING',
    statusType: 'neutral',
    desc: 'Resource allocation for sector 7 containment field generators.',
    operator: 'OP_HENDRIX',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf7LmIBcSLNVx_EEfu1TsDHNgrRISWiMljLdgKZmhFAO2OlSTKfqPgyg1WPvX_nEOaIX0ZdUOuy6uRzRXwbX5jmoc6FGq_THy6K4-8TmwpSpPtImpY6FUNT6c2xxYzpJvtB3IytBdToROWhKJS5Q3Nf8DALfySylhI_abM60jO83FPesjqPTFbghcOFR1s6UEuiyWjYM_2rKwnYwnxaeghyOok5NqlKUMQs3UREMToYkm-IgsbcmLmHw',
    checked: false,
  },
  {
    id: 's3',
    title: 'SY-01-INTEGRITY',
    status: 'FAILED',
    statusType: 'error',
    desc: 'Integrity check on secondary core cooling manifold—leak detected.',
    operator: 'OP_ELARA_9',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCti4_hzY9TUHCkLZ8kheaK06t28tw4oU1aZVjffJ2Eiw87gFo86MDpmjsUzvsvkpYnBgfsQD2FiLpqgwMk_ePjTL38RUgsbCmqMTplfOcU7U-JEEQicTbx4uAhpZlfIoUnseIsGMx5s1kZUKLkPleQLtiS0x3mHB5z2H6ZRbzyf84XREHkqi7mmGh3avpAfxuM93nPiJ7Jksdpc5i1LnaBII03K-jGb05m6MHsY6LkmCZz4M3Fg3CcpA',
    checked: false,
  },
  {
    id: 's4',
    title: 'BT-001-BOOTSTRAP',
    status: 'PENDING',
    statusType: 'neutral',
    desc: 'Manual override sequence for thermal shielding deployment.',
    operator: 'OP_VANCE',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBwZX9I9h7tjRkeOersG-SqpmsJ0P0SMlLoDbkhyf6ZE-MbX_KemYTVFltVIz6kJMqwLgUEtt8uiaebkJlTteAFrpS0hdgiX4UnaYreEuYBKowsgEROhFl40z_DqGutsAixEFrKULK9Y1UnFjnW-s1nXw2icVrs3t95CyVFrrzuOG33bE6IOMOp8hE2igIR-ROgY7xihrJO074wug6gEoTcWbwfLZIMjGZevbiedAoyYIPOmGPwqd8PA',
    checked: false,
  }
];

const SubtaskManagementScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [subtasks, setSubtasks] = useState(initialSubtasks);

  const toggleSubtask = (id) => {
    setSubtasks(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yvKgNrlZiToivIWg_Bv62EkxtANmkK8lYe9noIG5SYgaOVM6hyVMzITLSMGCD80O80mAg9qWqyuJFPIxGQVTA2bmPJZbvqrc2PxIZmZV4nfYpW9dPoYyMvsZ9ck49Ae6T1mqyuPQYVV4s7cahSIWGFoUdttw3tKPdkADsu6Y_QfSHMCOjkoB_05sdJdC6IcCsjA3xP6o34MN_Cdn_5ueOIu9cSrn6PzUXXz-fUc8O-An0hEQQFIJLQ' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Active Mandate Header */}
        <View style={[styles.mandateHeader, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
          <View style={styles.mandateStatusRow}>
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, letterSpacing: 1 }]}>ACTIVE MANDATE</Text>
            <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginVertical: 16, textTransform: 'uppercase' }]}>
            SUB-PROTOCOL_KRONOS_09
          </Text>
          <View style={styles.mandateMetaRow}>
            <View style={styles.metaCol}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>PRIORITY</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>CRITICAL_A1</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>DEADLINE</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>T-MINUS 04:22:10</Text>
            </View>
          </View>
        </View>

        {/* Sub-Protocol List */}
        <View style={styles.listContainer}>
          {subtasks.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.bentoCard, 
                { backgroundColor: '#ffffff', borderColor: colors.outlineVariant },
                item.statusType === 'error' && { backgroundColor: 'rgba(255, 218, 214, 0.1)', borderColor: 'rgba(186, 26, 26, 0.3)' }
              ]}
              onPress={() => toggleSubtask(item.id)}
            >
              <View style={styles.cardHeader}>
                <View style={[
                  styles.checkbox, 
                  { borderColor: item.statusType === 'error' ? colors.error : colors.outline },
                  item.checked && { backgroundColor: item.statusType === 'error' ? colors.error : colors.primary, borderColor: item.statusType === 'error' ? colors.error : colors.primary }
                ]}>
                  {item.checked && <MaterialIcons name="check" size={16} color={colors.onPrimary} />}
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={[
                      typography.labelCaps, 
                      { color: item.statusType === 'error' ? colors.error : colors.primary },
                      item.statusType === 'error' && { fontWeight: 'bold' }
                    ]}>{item.title}</Text>
                    
                    {/* Status Pill */}
                    {item.statusType === 'success' && (
                      <View style={[styles.statusPill, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                        <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onTertiaryContainer }]}>{item.status}</Text>
                      </View>
                    )}
                    {item.statusType === 'neutral' && (
                      <View style={[styles.statusPill, { backgroundColor: colors.surfaceContainerHighest }]}>
                        <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onSurfaceVariant }]}>{item.status}</Text>
                      </View>
                    )}
                    {item.statusType === 'error' && (
                      <View style={[styles.statusPill, { backgroundColor: colors.error }]}>
                        <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onError }]}>{item.status}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 8, lineHeight: 22 }]}>
                    {item.desc}
                  </Text>

                  <View style={styles.operatorRow}>
                    <View style={[styles.operatorAvatar, { borderColor: colors.outlineVariant }]}>
                      <Image source={{ uri: item.avatar }} style={styles.operatorImg} />
                    </View>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{item.operator}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="add" size={20} color={colors.onPrimary} />
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 16 }]}>ADD SUB-PROTOCOL</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 9 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 9 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 9 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 9 }]}>SYSTEM</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
    borderWidth: 1,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    padding: 8,
    marginRight: -8,
  },
  container: {
    paddingTop: 64, 
    paddingBottom: 100, // to clear bottom nav
  },
  mandateHeader: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  mandateStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  mandateMetaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaCol: {
    gap: 4,
  },
  listContainer: {
    padding: 24,
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  operatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  operatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  operatorImg: {
    width: '100%',
    height: '100%',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    marginTop: 8,
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
    borderRightWidth: 1,
  }
});

export default SubtaskManagementScreen;
