import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useDrawer } from "../../context/DrawerContext";

const AppHeader = ({ title, showBack = false, navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { openDrawer } = useDrawer();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
      {/* Left: Brand or Back Button */}
      <View style={styles.headerLeft}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.brandRow}>
          <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.brandText, { color: colors.primary }]}>
            {title ? title.toUpperCase() : "MANDATE"}
          </Text>
        </View>
      </View>

      {/* Right Controls: Search, Theme Toggle, and Right Sidebar Menu Button */}
      <View style={styles.headerRight}>
        {/* Search */}
        <TouchableOpacity
          onPress={() => navigation?.navigate("GlobalSearch")}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MaterialIcons name="search" size={18} color={colors.secondary} />
        </TouchableOpacity>

        {/* Theme Toggle (Dark / Light) */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MaterialIcons
            name={isDark ? "light-mode" : "dark-mode"}
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>

        {/* Right Sidebar Menu Button */}
        <TouchableOpacity
          onPress={openDrawer}
          style={[styles.menuBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <MaterialIcons name="menu" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  brandText: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 18,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppHeader;
