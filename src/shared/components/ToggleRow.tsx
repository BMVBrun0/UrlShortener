import React from "react";
import { Switch, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const ToggleRow: React.FC<Props> = ({ title, description, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.white}
        trackColor={{ false: colors.border, true: colors.accent }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  copy: {
    flex: 1,
    gap: spacing.xxs
  },
  title: {
    color: colors.text,
    fontWeight: "800"
  },
  description: {
    color: colors.textMuted,
    lineHeight: 20
  }
});
