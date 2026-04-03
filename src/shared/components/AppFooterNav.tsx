import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppRoute } from "../../app/types";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

const items: {
  route: AppRoute;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}[] = [
  { route: "home", label: "Home", icon: "flash-outline", activeIcon: "flash" },
  { route: "history", label: "Histórico", icon: "time-outline", activeIcon: "time" },
  { route: "settings", label: "Config", icon: "settings-outline", activeIcon: "settings" },
  { route: "about", label: "Sobre", icon: "information-circle-outline", activeIcon: "information-circle" }
];

export const AppFooterNav: React.FC<Props> = ({ route, onNavigate }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = item.route === route;

        return (
          <Pressable key={item.route} style={styles.item} onPress={() => onNavigate(item.route)}>
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={20}
              color={active ? colors.accentAlt : colors.textMuted}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xxs
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "700"
  },
  labelActive: {
    color: colors.accentAlt
  }
});
