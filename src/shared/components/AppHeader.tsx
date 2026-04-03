import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  title: string;
  subtitle: string;
  isOffline: boolean;
  onOpenMenu: () => void;
};

export const AppHeader: React.FC<Props> = ({ title, subtitle, isOffline, onOpenMenu }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onOpenMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={22} color={colors.text} />
      </Pressable>

      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={[styles.pill, isOffline ? styles.pillOffline : styles.pillOnline]}>
        <Text style={styles.pillText}>{isOffline ? "Offline" : "Online"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  copy: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12
  },
  pill: {
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  pillOnline: {
    backgroundColor: "rgba(43, 213, 118, 0.16)"
  },
  pillOffline: {
    backgroundColor: "rgba(255, 176, 32, 0.16)"
  },
  pillText: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 12
  }
});
