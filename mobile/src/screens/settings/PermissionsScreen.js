import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const permissionsData = [
  {
    id: "001",
    node: "SYSTEM.LOGGING.*",
    actions: [
      { name: "Read Logs", admin: true, lead: true, operator: true },
      { name: "Purge Logs", admin: true, lead: false, operator: false },
      { name: "Export .CSV", admin: true, lead: true, operator: false },
    ]
  },
  {
    id: "002",
    node: "CORE.NETWORK.IO",
    actions: [
      { name: "Flush Buffers", admin: true, lead: false, operator: false },
      { name: "Update Routing", admin: true, lead: false, operator: false },
    ]
  },
  {
    id: "003",
    node: "USER.AUTH.LEVEL_4",
    actions: [
      { name: "Revoke Keys", admin: true, lead: true, operator: false },
    ]
  }
];

const PermissionsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  
  const [expandedId, setExpandedId] = useState("001");
  const [permissions, setPermissions] = useState(permissionsData);

  const toggleAccordion = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const togglePermission = (nodeId, actionName, role) => {
    setPermissions(prev => prev.map(node => {
      if (node.id === nodeId) {
        return {
          ...node,
          actions: node.actions.map(action => {
            if (action.name === actionName) {
              return { ...action, [role]: !action[role] };
            }
            return action;
          })
        };
      }
      return node;
    }));
  };

  const CustomCheckbox = ({ checked, color, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.checkbox, 
        { borderColor: color },
        checked && { backgroundColor: color }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && <MaterialIcons name="check" size={14} color={colors.onPrimary} />}
    </TouchableOpacity>
  );

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
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Access Matrix</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Search & Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={20} color={colors.secondary} style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, typography.labelSm, { color: colors.primary, borderBottomColor: colors.outlineVariant }]}
              placeholder="SEARCH PERMISSIONS..."
              placeholderTextColor={colors.outline}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
            <View style={[styles.chip, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>ALL NODES</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM.*</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>USER.*</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>CORE.*</Text>
            </View>
          </ScrollView>
        </View>

        {/* Role Legend */}
        <View style={[styles.legendCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>ADMIN</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.outline }]} />
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>LEAD</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.outlineVariant }]} />
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>OPERATOR</Text>
          </View>
        </View>

        {/* Matrix Accordion */}
        <View style={styles.accordionContainer}>
          {permissions.map((node) => {
            const isExpanded = expandedId === node.id;
            return (
              <View key={node.id} style={[styles.accordionItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <TouchableOpacity 
                  style={styles.accordionHeader} 
                  onPress={() => toggleAccordion(node.id)}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={[typography.labelSm, { color: colors.secondary, letterSpacing: 2, textTransform: 'uppercase' }]}>ID: {node.id}</Text>
                    <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '700' }]}>{node.node}</Text>
                  </View>
                  <MaterialIcons 
                    name="expand-more" 
                    size={24} 
                    color={colors.primary} 
                    style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={[styles.accordionContent, { borderTopColor: colors.outlineVariant }]}>
                    {node.actions.map((action, idx) => (
                      <View key={idx} style={[styles.actionRow, idx > 0 && { borderTopWidth: 1, borderTopColor: colors.outlineVariant }]}>
                        <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{action.name}</Text>
                        <View style={styles.checkboxGroup}>
                          <CustomCheckbox 
                            checked={action.admin} 
                            color={colors.primary} 
                            onPress={() => togglePermission(node.id, action.name, 'admin')}
                          />
                          <CustomCheckbox 
                            checked={action.lead} 
                            color={colors.outline} 
                            onPress={() => togglePermission(node.id, action.name, 'lead')}
                          />
                          <CustomCheckbox 
                            checked={action.operator} 
                            color={colors.outlineVariant} 
                            onPress={() => togglePermission(node.id, action.name, 'operator')}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* Global Save Action */}
      <View style={[styles.bottomContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
          <MaterialIcons name="save" size={18} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: 8 }]}>COMMIT CHANGES</Text>
        </TouchableOpacity>
      </View>
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
    width: 60,
  },
  iconButton: {
    padding: 8,
    width: 60,
    alignItems: 'flex-end',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  searchSection: {
    marginBottom: 24,
    gap: 16,
  },
  searchInputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
  },
  searchInput: {
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    borderBottomWidth: 2,
    textTransform: 'uppercase',
  },
  filterChips: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  legendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
  },
  legendItem: {
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  accordionContainer: {
    gap: 8,
  },
  accordionItem: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  accordionContent: {
    borderTopWidth: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  checkboxGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
  }
});

export default PermissionsScreen;
