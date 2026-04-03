import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  label: string;
};

export const InfoChip: React.FC<Props> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700"
  }
});
