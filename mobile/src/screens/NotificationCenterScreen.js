import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

const NotificationCenterScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { colors, typography } = useTheme();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/notifications`);
        setNotifications(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const markAllRead = async () => {
    try {
      await axios.put(`${API_URL}/api/notifications/read`);
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}> 
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Notification Center</Text>
        <TouchableOpacity onPress={markAllRead}>
          <MaterialIcons name="done-all" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id || `${item.title}-${Math.random()}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}> 
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: "700" }]}>{item.title || "System update"}</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>{item.message || "No details provided"}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={[typography.labelSm, { color: colors.secondary, textAlign: "center", marginTop: 24 }]}>No notifications.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1 },
  list: { padding: 16, paddingBottom: 100 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 12 },
});

export default NotificationCenterScreen;
