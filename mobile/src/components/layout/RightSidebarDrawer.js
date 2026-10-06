import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useDrawer } from "../../context/DrawerContext";
import { navigate as globalNavigate, navigationRef } from "../../navigation/navigationRef";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = Math.min(width * 0.82, 320);

// Tab screens that live inside MainTabs
const TAB_SCREENS = ["Dashboard", "Today", "Kanban", "Calendar"];

// Exact navigation items matching frontend/src/components/layout/Sidebar.jsx
const navItems = [
  { screen: "Dashboard", icon: "dashboard", label: "Dashboard" },
  { screen: "Today", icon: "event-available", label: "Today" },
  { screen: "Kanban", icon: "view-kanban", label: "Kanban" },
  { screen: "Calendar", icon: "calendar-today", label: "Calendar" },
  { screen: "Backlog", icon: "inventory-2", label: "Backlog" },
  { screen: "ProjectsMain", icon: "account-tree", label: "Projects" },
  { screen: "Analytics", icon: "analytics", label: "Analytics" },
  { screen: "Inbox", icon: "inbox", label: "Inbox" },
  { screen: "TeamDashboard", icon: "groups", label: "Team" },
  { screen: "DailyPlanning", icon: "calendar-month", label: "Plan" },
  { screen: "FocusSummary", icon: "filter-center-focus", label: "Focus Stats" },
  { screen: "AutomationRules", icon: "bolt", label: "Automation" },
  { screen: "Billing", icon: "credit-card", label: "Billing" },
  { screen: "KeyboardShortcuts", icon: "keyboard", label: "Shortcuts" },
  { screen: "GlobalSearch", icon: "search", label: "Search" },
  { screen: "SavedViews", icon: "collections-bookmark", label: "Views" },
  { screen: "MonthlyReview", icon: "calendar-view-month", label: "Reviews" },
  { screen: "GoalProgressTracking", icon: "timeline", label: "Timeline" },
  { screen: "FocusMode", icon: "center-focus-strong", label: "Focus Mode" },
  { screen: "ProjectTimeline", icon: "view-timeline", label: "Sprint" },
  { screen: "CapacityView", icon: "splitscreen", label: "Streams" },
  { screen: "TeamActivity", icon: "group-work", label: "Customers" },
  { screen: "DeviationReport", icon: "support-agent", label: "Support" },
  { screen: "BurnoutInsights", icon: "account-balance", label: "Finance" },
  { screen: "PersonnelLedger", icon: "leaderboard", label: "Exec" },
  { screen: "TableView", icon: "apps", label: "Workspace" },
  { screen: "CriticalAlerts", icon: "monitor-heart", label: "Status" },
];

const RightSidebarDrawer = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { closeDrawer } = useDrawer();
  const { user, logout } = useAuth();
  const { colors, typography } = useTheme();

  const handleNavigate = (screen) => {
    closeDrawer();
    if (TAB_SCREENS.includes(screen)) {
      if (navigationRef.isReady()) {
        navigationRef.navigate("Tabs", { screen });
      }
    } else {
      if (navigation && navigation.navigate) {
        navigation.navigate(screen);
      } else {
        globalNavigate(screen);
      }
    }
  };

  const handleNewTask = () => {
    closeDrawer();
    if (navigation && navigation.navigate) {
      navigation.navigate("CreateTask");
    } else {
      globalNavigate("CreateTask");
    }
  };

  const handleLogout = async () => {
    closeDrawer();
    try {
      await logout();
    } catch (e) {
      console.warn("Logout error", e);
    }
  };

  return (
    <View
      style={[
        styles.drawer,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderLeftColor: colors.outlineVariant,
        },
      ]}
    >
      {/* Header: User Profile & Close Button - Full vertical expansion with safe top padding */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surfaceContainer,
            borderBottomColor: colors.outlineVariant,
            paddingTop: insets.top > 0 ? insets.top + 8 : 16,
          },
        ]}
      >
        <View style={styles.userSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.onPrimary }]}>
              {(user?.name || "U").slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[typography.labelCaps, { color: colors.onSurface, fontWeight: "bold" }]} numberOfLines={1}>
              {user?.name || "Workspace User"}
            </Text>
            <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]} numberOfLines={1}>
              {user?.email || "Active Member"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={closeDrawer}
          style={[styles.closeBtn, { borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="close" size={20} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      {/* Primary Action Button: New Task */}
      <View style={[styles.actionSection, { borderBottomColor: colors.outlineVariant }]}>
        <TouchableOpacity
          onPress={handleNewTask}
          style={[styles.newDirectiveBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
        >
          <MaterialIcons name="add" size={18} color={colors.onPrimary} style={{ marginRight: 6 }} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, fontWeight: "bold", fontSize: 11 }]}>
            NEW TASK
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Navigation Items */}
      <ScrollView
        style={styles.navList}
        contentContainerStyle={styles.navContent}
        showsVerticalScrollIndicator={false}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            onPress={() => handleNavigate(item.screen)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <MaterialIcons name={item.icon} size={20} color={colors.secondary} style={styles.navIcon} />
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 12 }]} numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer: Settings & Sign Out - Full safe bottom padding */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.surfaceContainer,
            borderTopColor: colors.outlineVariant,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleNavigate("SettingsMain")}
          style={styles.footerItem}
          activeOpacity={0.7}
        >
          <MaterialIcons name="settings" size={20} color={colors.secondary} style={styles.navIcon} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 11 }]}>
            SETTINGS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.footerItem}
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={20} color={colors.error} style={styles.navIcon} />
          <Text style={[typography.labelCaps, { color: colors.error, fontSize: 11 }]}>
            SIGN OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    height: "100%",
    borderLeftWidth: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  userInfo: {
    flex: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionSection: {
    padding: 12,
    borderBottomWidth: 1,
  },
  newDirectiveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  navList: {
    flex: 1,
  },
  navContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 2,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  navIcon: {
    marginRight: 12,
  },
  footer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    gap: 2,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default RightSidebarDrawer;
