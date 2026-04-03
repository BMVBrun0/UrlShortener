import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export const SurfaceCard: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View {...props} style={[styles.card, style]} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: spacing.lg
  }
});
