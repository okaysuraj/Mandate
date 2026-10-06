import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const initialSubtasks = [
  {
    id: 's1',
    title: 'Review navigation and drawer UX',
    status: 'COMPLETED',
    statusType: 'success',
    desc: 'Verify smooth slide animation, full vertical expansion, and safe area insets on mobile.',
    operator: 'Alex Rivera',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZOAnepui1JTfrtu1x7pGIj32Hzb_yv84XdLhGEx69HvyM2u58hW9A-LB3VosRwVNTdRh_raTl3_Tn6Rm8pwJsp1590H_e22mFnAcQZfXks2amZMRVdNBljqsO-Zmc-t-uJwSyKMALB31bVEf7H0aKYZNvqJkiHnUlkYUtZcBLBNxKf-1jgrDbww2plGLMoA1CgJPsmhxX85MvVvW0eOeLhyU6NDG0TI-zhHQzF4L_vRY_EmVYI_mIA',
    checked: true,
  },
  {
    id: 's2',
    title: 'Harmonize color tokens and typography',
    status: 'IN PROGRESS',
    statusType: 'neutral',
    desc: 'Ensure unified contrast ratio and clean font scales across mobile and web.',
    operator: 'Sarah Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf7LmIBcSLNVx_EEfu1TsDHNgrRISWiMljLdgKZmhFAO2OlSTKfqPgyg1WPvX_nEOaIX0ZdUOuy6uRzRXwbX5jmoc6FGq_THy6K4-8TmwpSpPtImpY6FUNT6c2xxYzpJvtB3IytBdToROWhKJS5Q3Nf8DALfySylhI_abM60jO83FPesjqPTFbghcOFR1s6UEuiyWjYM_2rKwnYwnxaeghyOok5NqlKUMQs3UREMToYkm-IgsbcmLmHw',
    checked: false,
  },
  {
    id: 's3',
    title: 'Harden task creation schema validation',
    status: 'NEEDS REVIEW',
    statusType: 'error',
    desc: 'Add pre-save data sanitization and friendly error feedback for required fields.',
    operator: 'Marcus Vance',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCti4_hzY9TUHCkLZ8kheaK06t28tw4oU1aZVjffJ2Eiw87gFo86MDpmjsUzvsvkpYnBgfsQD2FiLpqgwMk_ePjTL38RUgsbCmqMTplfOcU7U-JEEQicTbx4uAhpZlfIoUnseIsGMx5s1kZUKLkPleQLtiS0x3mHB5z2H6ZRbzyf84XREHkqi7mmGh3avpAfxuM93nPiJ7Jksdpc5i1LnaBII03K-jGb05m6MHsY6LkmCZz4M3Fg3CcpA',
    checked: false,
  },
  {
    id: 's4',
    title: 'Deploy staging build & end-to-end check',
    status: 'PENDING',
    statusType: 'neutral',
    desc: 'Execute automated regression tests and verify production bundle readiness.',
    operator: 'Elena Rostova',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBwZX9I9h7tjRkeOersG-SqpmsJ0P0SMlLoDbkhyf6ZE-MbX_KemYTVFltVIz6kJMqwLgUEtt8uiaebkJlTteAFrpS0hdgiX4UnaYreEuYBKowsgEROhFl40z_DqGutsAixEFrKULK9Y1UnFjnW-s1nXw2icVrs3t95CyVFrrzuOG33bE6IOMOp8hE2igIR-ROgY7xihrJO074wug6gEoTcWbwfLZIMjGZevbiedAoyYIPOmGPwqd8PA',
    checked: false,
  }
];

const SubtaskManagementScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  const toggleSubtask = (id) => {
    setSubtasks(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()} style={{ marginRight: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700', letterSpacing: 1 }]}>
            TASK CHECKLIST
          </Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="more-vert" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Active Task Header */}
        <View style={[styles.mandateHeader, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
          <View style={styles.mandateStatusRow}>
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, letterSpacing: 1 }]}>CURRENT TASK</Text>
            <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginVertical: 12 }]}>
            Design System Refactor & Polish
          </Text>
          <View style={styles.mandateMetaRow}>
            <View style={styles.metaCol}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>PRIORITY</Text>
              <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>HIGH</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>DUE DATE</Text>
              <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>Today, 5:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Subtask Checklist */}
        <View style={styles.listContainer}>
          {subtasks.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.bentoCard, 
                { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant },
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
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 16, fontWeight: '700' }]}>
              ADD SUBTASK
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  mandateHeader: {
    padding: 20,
    borderBottomWidth: 1,
  },
  mandateStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  mandateMetaRow: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 8,
  },
  metaCol: {
    gap: 2,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  operatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  operatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 8,
  },
  operatorImg: {
    width: '100%',
    height: '100%',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default SubtaskManagementScreen;
