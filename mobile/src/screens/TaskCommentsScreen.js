import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const TaskCommentsScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerAvatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHighest }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGpL-sI7zLNK_j1YFaPeM8zxY7tNlf1-j723upmO9iAxPrcWseczGQqMZtcHPyGdVeynzzufVSFFSRECmUADZcR_JYpkiwGaQqaIzJWok2sovrbwkNlcMI2lpXPpoJQsjuxgzOpzn6wsMT4eqTe79dxZ9HSZ7JzeHPzBWJDTIhamlDYyo1iNgK8pnAPq3LbTmPCXp08ZYF6Ue-bTcxou5zGZVP8YNHehBg0o5xjL-0UsoShiqooQ_0Mw' }}
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
        
        {/* System Protocol Status Banner */}
        <View style={[styles.statusBanner, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
          <View style={styles.bannerLeft}>
            <MaterialIcons name="verified-user" size={18} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, marginLeft: 8, textTransform: 'uppercase' }]}>System Protocol: Encryption Active</Text>
          </View>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, opacity: 0.7 }]}>L-7 AUTH</Text>
        </View>

        {/* Threaded Chat Interface */}
        <View style={styles.chatWrapper}>
          
          {/* Message Block: System */}
          <View style={styles.msgBlock}>
            <View style={styles.msgMeta}>
              <Text style={[typography.labelCaps, { color: colors.primary, textTransform: 'uppercase' }]}>SYSTEM_DAEMON</Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, opacity: 0.5, marginLeft: 8, fontSize: 10 }]}>14:20:01</Text>
            </View>
            <View style={[styles.msgContentSystem, { backgroundColor: 'rgba(225, 226, 228, 0.3)', borderLeftColor: colors.primary }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface }]}>
                Task <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>#TRX-992</Text> status changed to <Text style={{ color: colors.onTertiaryContainer, fontWeight: 'bold' }}>OPERATIONAL</Text>. All nodes synchronized.
              </Text>
            </View>
          </View>

          {/* Message Block: Operator A */}
          <View style={styles.msgBlock}>
            <View style={styles.msgMeta}>
              <Text style={[typography.labelCaps, { color: colors.primary, textTransform: 'uppercase' }]}>OPERATOR_01</Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, opacity: 0.5, marginLeft: 8, fontSize: 10 }]}>14:22:15</Text>
            </View>
            <View style={[styles.msgContentUser, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface }]}>
                Confirming data packet integrity. See attached schematic for the server room reconfiguration.
              </Text>
              
              {/* File Attachment Preview */}
              <View style={styles.attachmentsGrid}>
                <TouchableOpacity style={[styles.attachmentImgBox, { borderColor: colors.outlineVariant }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxpQOW-RZ3-eIWN7HhUmHDl1KJEsYEhbjkNEOy9_PuYQ2Ra8iQP4Qkm8p5QDpLcZ1fEyDPVVdfsJfxx1MMGx1nnWO7V1ML4Ctrs2utNuJVQGH4Jf5AVHJBHXecatyukHwDdvowm-kViw4xW7R6KeZEcC5K0otNfbb0zjn17-uG8ggY2Y9wXt2yMJkeKqDZOk42r1W9KfrDk7tk1SeRnErvcWBwJB0IMFFepmpSWjdn43wnjJAYNJlp1Q' }} style={styles.avatarImg} />
                  <View style={styles.attachmentImgLabel}>
                    <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 9 }]}>SCHEMATIC_A.PNG</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.attachmentFileBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="description" size={24} color={colors.outline} />
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 9, marginTop: 4 }]}>LOG_DUMP.TXT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Threaded Reply: Operator B */}
          <View style={[styles.threadedReply, { borderLeftColor: colors.outlineVariant }]}>
            <View style={styles.msgMeta}>
              <Text style={[typography.labelCaps, { color: colors.primary, opacity: 0.8 }]}>OPERATOR_04</Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, opacity: 0.5, marginLeft: 8, fontSize: 10 }]}>14:25:30</Text>
            </View>
            <View style={[styles.msgContentUser, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface }]}>
                Wait, I'm seeing a discrepancy in the power distribution on Row 4. Are we sure the cooling units can handle the surge?
              </Text>
            </View>
          </View>

          {/* Message Block: Operator A (Closing) */}
          <View style={styles.msgBlock}>
            <View style={styles.msgMeta}>
              <Text style={[typography.labelCaps, { color: colors.primary, textTransform: 'uppercase' }]}>OPERATOR_01</Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, opacity: 0.5, marginLeft: 8, fontSize: 10 }]}>14:28:10</Text>
            </View>
            <View style={[styles.msgContentUser, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface }]}>
                Verified. Surge protection is set to 150%. Proceeding with deployment.
              </Text>
            </View>
          </View>

        </View>

      </ScrollView>

      {/* Input & Nav Container */}
      <View style={styles.fixedBottomBox}>
        {/* Command Line Input */}
        <View style={[styles.cmdInputSection, { backgroundColor: colors.primary, borderTopColor: colors.outline }]}>
          <Text style={[typography.labelCaps, { color: colors.tertiaryFixed, fontWeight: 'bold' }]}>$</Text>
          <View style={styles.cmdInputWrapper}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>EXECUTE:</Text>
            <TextInput 
              style={[typography.labelCaps, styles.textInput, { color: colors.onPrimary }]}
              placeholder="enter_command_or_comment"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />
          </View>
          <View style={styles.cmdActions}>
            <TouchableOpacity style={styles.cmdBtn}>
              <MaterialIcons name="attach-file" size={20} color={colors.onPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cmdBtn}>
              <MaterialIcons name="send" size={20} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>

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
    paddingTop: 64, 
    paddingBottom: 160, // Space for cmd input + bottom nav
    paddingHorizontal: 24,
  },
  statusBanner: {
    marginTop: 16,
    marginBottom: 32,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatWrapper: {
    gap: 32,
  },
  msgBlock: {
    gap: 4,
  },
  msgMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgContentSystem: {
    borderLeftWidth: 2,
    padding: 16,
    maxWidth: '90%',
  },
  msgContentUser: {
    borderWidth: 1,
    padding: 16,
    maxWidth: '90%',
  },
  attachmentsGrid: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
    height: 120,
  },
  attachmentImgBox: {
    flex: 1,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  attachmentImgLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 4,
  },
  attachmentFileBox: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadedReply: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    marginLeft: 8,
    gap: 4,
  },
  fixedBottomBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  cmdInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    gap: 16,
  },
  cmdInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  cmdActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cmdBtn: {
    padding: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 64,
    borderTopWidth: 1,
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

export default TaskCommentsScreen;
