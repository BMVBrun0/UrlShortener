import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet, Animated } from "react-native";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import { LoadingRing } from "../LoadingRing";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export const UrlForm: React.FC<Props> = ({ value, onChange, onSubmit, isLoading }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const pressIn = React.useCallback(() => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  }, [scale]);

  const pressOut = React.useCallback(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  }, [scale]);

  const disabled = isLoading;

  return (
    <View style={styles.container}>
      <TextInput
        testID="url-input"
        value={value}
        onChangeText={onChange}
        placeholder="Cole aqui a URL (https://...)"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        style={styles.input}
        editable={!disabled}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          testID="shorten-button"
          onPress={onSubmit}
          disabled={disabled}
          onPressIn={pressIn}
          onPressOut={pressOut}
          style={[styles.button, disabled && styles.buttonDisabled]}
        >
          {isLoading ? (
            <View style={styles.loadingRow}>
              <LoadingRing size={18} />
              <Text style={styles.buttonText}>Encurtando...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Encurtar</Text>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text
  },
  button: {
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.nubankPurple,
    backgroundColor: colors.nubankPurple
  },
  buttonDisabled: { opacity: 0.75 },
  buttonText: { fontWeight: "900", color: "#FFFFFF" },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm }
});
