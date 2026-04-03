import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type Props = {
  message: string;
};

export const FormError: React.FC<Props> = ({ message }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Ionicons name="alert-circle" size={18} color={colors.nubankPurple} />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: colors.nubankPurple
  },
  text: {
    flex: 1,
    fontWeight: "700",
    color: colors.nubankPurple
  }
});
