import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const IntegrationsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>INTEGRATIONS</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.content}>
        <MaterialIcons name="cable" size={64} color={colors.secondary} style={{ marginBottom: 16 }} />
        <Text style={[typography.headlineLg, { color: colors.primary, textAlign: 'center' }]}>SYSTEM HOOKS</Text>
        <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', marginTop: 8 }]}>
          Third-party integrations will be available in the next deployment cycle.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: { flex: 1, alignItems: 'flex-start' },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }
});

export default IntegrationsScreen;
