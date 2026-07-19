import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const attachments = [
  { id: 'a1', name: 'system_architecture_v4.pdf', meta: '12.4 MB • PDF • 14:20:01', icon: 'description' },
  { id: 'a2', name: 'sensor_calibration_logs.csv', meta: '1.2 MB • CSV • 12:05:44', icon: 'table-chart' },
  { id: 'a3', name: 'deployment_script.sh', meta: '45 KB • SH • 09:12:30', icon: 'terminal' },
  { id: 'a4', name: 'schematic_alpha_01.png', meta: '8.9 MB • PNG • 08:33:12', icon: 'image' },
];

const TaskAttachmentsScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerAvatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwonplebLW_YrKvUWVuBZ50CjPfgF7Hf45dnJC6e2nANCRRLqrRqybCIcUX0Vat0d63PHB8jfQ4WLNhf-wrTYZ2MsZsEi3BXBsteWZdorVL2iLBbEPM1DN2lUQkty1pDK3mVjOvTbQTyU0pDHMigPBc2SAywCrAORc5yWTpxmsLPFcQ9TZXj2pdf_JxOzlpIW-4fHZZfvlwnTNESOGr_PNN5CSQctWmRvuOJwl2KAKuy8s7VHnwXMuUQ' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginLeft: 12 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Screen Title */}
        <View style={styles.titleSection}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>TASK_CONTEXT / ASSETS</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, letterSpacing: -0.5 }]}>Attachment Protocol</Text>
        </View>

        {/* Upload Drop Zone */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={[styles.dropZone, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={[styles.uploadIconBox, { backgroundColor: colors.surfaceContainer }]}>
              <MaterialIcons name="upload-file" size={24} color={colors.primary} />
            </View>
            <Text style={[typography.labelCaps, { color: colors.primary, textAlign: 'center', marginTop: 16 }]}>UPLOAD TECHNICAL ASSETS</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 8 }]}>MAX FILE SIZE: 256MB / SECURE TUNNEL</Text>
          </TouchableOpacity>
        </View>

        {/* Linked Documentation List */}
        <View style={styles.docSection}>
          <View style={styles.docHeader}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>LINKED DOCUMENTATION [04]</Text>
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>SORTED: RECENT</Text>
          </View>

          <View style={styles.docList}>
            {attachments.map((file) => (
              <View key={file.id} style={[styles.fileCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
                <View style={[styles.fileIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <MaterialIcons name={file.icon} size={24} color={colors.primary} />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]} numberOfLines={1}>{file.name}</Text>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 2 }]}>{file.meta}</Text>
                </View>
                <TouchableOpacity style={styles.fileActionBtn}>
                  <MaterialIcons name="more-vert" size={24} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Access Logs */}
        <View style={styles.logsSection}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 12 }]}>ACCESS LOGS / SECURITY</Text>
          <View style={[styles.logTerminal, { backgroundColor: colors.primary }]}>
            <View style={[styles.logRow, { opacity: 0.7 }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>AUTH_NODE_09: ACCESS GRANTED</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>NOW</Text>
            </View>
            <View style={[styles.logRow, { borderLeftWidth: 2, borderLeftColor: colors.surfaceVariant, paddingLeft: 12, marginTop: 12 }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>USER_01 DOWNLOADED 'architecture.pdf'</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>14:25</Text>
            </View>
            <View style={[styles.logRow, { borderLeftWidth: 2, borderLeftColor: colors.surfaceVariant, paddingLeft: 12, marginTop: 12 }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>MD5 CHECKSUM VERIFIED: SUCCESS</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>14:20</Text>
            </View>
            <View style={[styles.logRow, { borderLeftWidth: 2, borderLeftColor: colors.surfaceVariant, paddingLeft: 12, marginTop: 12, opacity: 0.5 }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>REMOTE ATTACHMENT SYNC INITIALIZED</Text>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>14:15</Text>
            </View>
            
            <View style={[styles.logFooter, { borderTopColor: 'rgba(255,255,255,0.1)' }]}>
              <TouchableOpacity style={[styles.auditBtn, { borderColor: 'rgba(255,255,255,0.2)' }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>View Full Security Audit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary, borderLeftColor: colors.outline, borderRightColor: colors.outline }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
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
    paddingTop: 88, 
    paddingBottom: 112, 
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  uploadSection: {
    marginBottom: 24,
  },
  dropZone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docSection: {
    marginBottom: 32,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  docList: {
    gap: 8,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    gap: 16,
  },
  fileIconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
    overflow: 'hidden',
  },
  fileActionBtn: {
    padding: 4,
  },
  logsSection: {
    marginBottom: 24,
  },
  logTerminal: {
    padding: 24,
  },
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logFooter: {
    borderTopWidth: 1,
    marginTop: 16,
    paddingTop: 16,
  },
  auditBtn: {
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }
});

export default TaskAttachmentsScreen;
