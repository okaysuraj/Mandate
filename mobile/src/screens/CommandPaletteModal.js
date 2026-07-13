import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const CommandPaletteModal = ({ visible, onClose, navigation }) => {
  const { colors, typography, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const commands = [
    { id: 1, title: 'CREATE NEW MANDATE', icon: 'add-box', shortcut: ['CTRL', 'N'], type: 'default' },
    { id: 2, title: 'OPTIMIZE NODE', icon: 'analytics', shortcut: ['ALT', 'O'], type: 'default' },
    { id: 3, title: 'SHIFT HANDOVER', icon: 'sync-alt', shortcut: ['CTRL', 'S'], type: 'default' },
    { id: 4, title: 'EXIT SYSTEM', icon: 'power-settings-new', shortcut: ['ALT', 'X'], type: 'destructive' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(25, 28, 30, 0.5)' }]}>
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          
          {/* Top App Bar */}
          <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                <MaterialIcons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
                MANDATE
              </Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="account-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Search Canvas */}
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.contentWrapper}>
              
              {/* Search Input */}
              <View style={[styles.searchContainer, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
                <MaterialIcons name="search" size={24} color={colors.outline} style={styles.searchIcon} />
                <TextInput 
                  style={[styles.searchInput, typography.labelCaps, { color: colors.primary }]}
                  placeholder="SEARCH SYSTEM COMMANDS"
                  placeholderTextColor={colors.outlineVariant}
                  autoFocus
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Shortcuts List */}
              <View style={styles.listSection}>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>GLOBAL COMMANDS</Text>
                
                {commands.map((cmd) => (
                  <TouchableOpacity 
                    key={cmd.id} 
                    style={[
                      styles.commandItem, 
                      { 
                        backgroundColor: colors.surfaceContainerLowest, 
                        borderColor: cmd.type === 'destructive' ? 'transparent' : colors.outlineVariant 
                      },
                      cmd.type === 'destructive' && { borderWidth: 1, borderColor: `${colors.error}40` }
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.commandLeft}>
                      <MaterialIcons name={cmd.icon} size={24} color={cmd.type === 'destructive' ? colors.error : colors.primary} />
                      <Text style={[typography.labelCaps, { color: cmd.type === 'destructive' ? colors.error : colors.primary, marginLeft: 12 }]}>
                        {cmd.title}
                      </Text>
                    </View>
                    <View style={styles.shortcuts}>
                      {cmd.shortcut.map((key, i) => (
                        <View key={i} style={[styles.keyBadge, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                          <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{key}</Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Dynamic Search Suggestion */}
              <View style={[styles.suggestionBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="keyboard-command-key" size={36} color={colors.outline} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 16 }]}>PRECISION NAVIGATION</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', marginTop: 4 }]}>
                  Start typing to filter industrial commands or access machine-specific controls.
                </Text>
              </View>

            </View>
          </ScrollView>

          {/* System Status Footer */}
          <View style={[styles.footer, { backgroundColor: colors.surfaceContainer, borderTopColor: colors.outlineVariant }]}>
            <View style={styles.statusRow}>
              <View style={[styles.dot, { backgroundColor: colors.tertiaryFixedDim }]} />
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, marginLeft: 6 }]}>OPERATIONAL</Text>
              <Text style={[typography.labelCaps, { color: colors.outlineVariant, marginHorizontal: 8 }]}>|</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>NODE_014_ACTIVE</Text>
            </View>
            <View style={styles.footerLinks}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8, marginTop: 16, fontSize: 10 }]}>
              © 2024 MANDATE INDUSTRIAL
            </Text>
          </View>

        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
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
    paddingBottom: 40,
  },
  contentWrapper: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: 32,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  listSection: {
    marginBottom: 32,
  },
  commandItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  commandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shortcuts: {
    flexDirection: 'row',
    gap: 4,
  },
  keyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 4,
  },
  suggestionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 32,
  }
});

export default CommandPaletteModal;
