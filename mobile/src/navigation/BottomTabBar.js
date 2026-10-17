import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";

const TAB_CONFIG = {
  Dashboard: { label: "DASHBOARD", icon: "dashboard" },
  Today: { label: "TODAY", icon: "event-available" },
  Kanban: { label: "KANBAN", icon: "view-kanban" },
  Calendar: { label: "CALENDAR", icon: "calendar-today" },
};

// Custom bottom tab bar showing complete labels without truncation, and no active indicator bar
export default function BottomTabBar({ state, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset =
    insets.bottom > 0 ? insets.bottom : Platform.OS === "android" ? 12 : 8;

  return (
    <View
      style={[
        styles.customTabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant,
          paddingBottom: bottomInset,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: route.name,
          icon: "circle",
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.customTabItem}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={config.icon}
              size={24}
              color={isFocused ? colors.primary : colors.secondary}
            />
            <Text
              style={[
                styles.customTabLabel,
                { color: isFocused ? colors.primary : colors.secondary },
              ]}
              numberOfLines={1}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  customTabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
  },
  customTabLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.2,
    marginTop: 3,
    textTransform: "uppercase",
  },
});
