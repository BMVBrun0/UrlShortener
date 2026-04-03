import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  title: string;
  description: string;
};

export const EmptyState: React.FC<Props> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="sparkles-outline" size={22} color={colors.accentAlt} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    alignItems: "center"
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  description: {
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20
  }
});
