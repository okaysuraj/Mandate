import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import AppHeader from "../../components/layout/AppHeader";
import api from "../../services/api";

const InboxScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { user } = useAuth();
  const { tasks, loadTasks } = useDataStore((state) => state);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInbox = async () => {
    try {
      setLoading(true);
      const [notifsRes] = await Promise.all([
        api.get("/notifications").catch(() => ({ data: [] })),
        loadTasks().catch(() => {}),
      ]);
      setNotifications(Array.isArray(notifsRes?.data) ? notifsRes.data : []);
    } catch (e) {
      console.warn("Failed to load notifications", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) fetchInbox();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInbox();
  };

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read").catch(() => {});
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (e) {
      console.warn("Could not mark all read", e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="INBOX & ALERTS" navigation={navigation} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header Section matching web InboxPage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              OPERATIONS QUEUE · DISPATCH LOG
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Inbox &amp; Alerts
          </Text>

          <TouchableOpacity
            onPress={markAllRead}
            style={[styles.markReadBtn, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLow }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.markReadBtnText, { color: colors.onSurface }]}>MARK ALL READ</Text>
          </TouchableOpacity>
        </View>

        {/* 3 Summary Cards matching web InboxPage.jsx */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>UNREAD ALERTS</Text>
            <Text style={[styles.summaryValue, { color: colors.onSurface }]}>{unreadCount}</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>ACTIVE TASKS</Text>
            <Text style={[styles.summaryValue, { color: colors.onSurface }]}>{tasks.length}</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>WORKSPACE STATUS</Text>
            <View style={styles.liveStatusRow}>
              <View style={[styles.liveDot, { backgroundColor: colors.tertiary }]} />
              <Text style={[styles.liveText, { color: colors.onSurface }]}>LIVE</Text>
            </View>
          </View>
        </View>

        {/* Notification Feed */}
        <View style={[styles.feedCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.feedHeader}>
            <Text style={[styles.feedTitle, { color: colors.onSurface }]}>NOTIFICATION FEED</Text>
            <Text style={[styles.feedRealtime, { color: colors.onSurfaceVariant }]}>REALTIME</Text>
          </View>

          <View style={styles.feedList}>
            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="inbox" size={40} color={colors.outlineVariant} />
                <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                  NO NOTIFICATIONS YET
                </Text>
              </View>
            ) : (
              notifications.map((item, idx) => {
                const isRead = item.isRead;
                return (
                  <View 
                    key={item._id || item.id || idx}
                    style={[
                      styles.notifItem,
                      {
                        backgroundColor: isRead ? colors.surfaceContainerLowest : colors.surfaceContainerLow,
                        borderColor: isRead ? colors.outlineVariant : colors.primary,
                      },
                    ]}
                  >
                    <View style={styles.notifTop}>
                      <View style={styles.notifTitleRow}>
                        <View style={[styles.notifDot, { backgroundColor: isRead ? colors.outline : colors.primary }]} />
                        <Text style={[styles.notifTitle, { color: colors.onSurface }]}>
                          {item.title || "Task Update"}
                        </Text>
                      </View>
                      <Text style={[styles.notifTime, { color: colors.onSurfaceVariant }]}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString([], { month: "short", day: "numeric" }) : "Recent"}
                      </Text>
                    </View>
                    <Text style={[styles.notifMessage, { color: colors.onSurfaceVariant }]}>
                      {item.message || item.snippet || "Task updated in your workspace."}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageHeader: { marginBottom: 16 },
  breadcrumbRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  brandDot: { width: 8, height: 8, borderRadius: 4 },
  breadcrumbText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  title: { fontFamily: "HankenGrotesk-Bold", fontSize: 24, textTransform: "uppercase", letterSpacing: -0.5 },
  markReadBtn: { paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderRadius: 8, alignSelf: "flex-start", marginTop: 10 },
  markReadBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 10, letterSpacing: 1 },
  summaryGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  summaryCard: { flex: 1, borderWidth: 1, borderRadius: 12, padding: 12 },
  summaryLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 },
  summaryValue: { fontFamily: "JetBrainsMono-Bold", fontSize: 22 },
  liveStatusRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4 },
  liveText: { fontFamily: "JetBrainsMono-Bold", fontSize: 16 },
  feedCard: { borderWidth: 1, borderRadius: 14, padding: 16 },
  feedHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14, borderBottomWidth: 1, borderBottomColor: "rgba(150,150,150,0.15)", paddingBottom: 8 },
  feedTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, letterSpacing: 1 },
  feedRealtime: { fontFamily: "JetBrainsMono-Regular", fontSize: 10 },
  feedList: { gap: 10 },
  notifItem: { borderWidth: 1, borderRadius: 10, padding: 12 },
  notifTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  notifTitleRow: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  notifDot: { width: 6, height: 6, borderRadius: 3 },
  notifTitle: { fontFamily: "HankenGrotesk-Bold", fontSize: 13 },
  notifTime: { fontFamily: "JetBrainsMono-Regular", fontSize: 10 },
  notifMessage: { fontFamily: "HankenGrotesk-Regular", fontSize: 12, lineHeight: 16, marginTop: 2 },
  emptyContainer: { alignItems: "center", paddingVertical: 36, gap: 8 },
  emptyText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1 },
});

export default InboxScreen;
