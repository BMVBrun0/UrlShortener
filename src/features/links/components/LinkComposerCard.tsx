import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SurfaceCard } from "../../../shared/components/SurfaceCard";
import { InfoChip } from "../../../shared/components/InfoChip";
import { colors } from "../../../shared/theme/colors";
import { spacing } from "../../../shared/theme/spacing";
import { typography } from "../../../shared/theme/typography";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isOfflineMode: boolean;
  error: string | null;
  onClearError: () => void;
};

export const LinkComposerCard: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  isOfflineMode,
  error,
  onClearError
}) => {
  return (
    <SurfaceCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar novo link</Text>
        <Text style={styles.description}>
          Gere um link curto no provider demo ou adicione a solicitação na fila offline.
        </Text>
      </View>

      <View style={styles.chips}>
        <InfoChip label="Sem API externa" />
        <InfoChip label="Histórico em cache" />
        <InfoChip label="Fila offline" />
      </View>

      <TextInput
        value={value}
        onChangeText={(nextValue) => {
          if (error) onClearError();
          onChange(nextValue);
        }}
        placeholder="https://meusite.com/recurso/importante"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        style={styles.input}
      />

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Pressable style={[styles.button, isLoading && styles.buttonDisabled]} onPress={onSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? "Processando..." : isOfflineMode ? "Adicionar à fila" : "Encurtar agora"}
        </Text>
      </Pressable>
    </SurfaceCard>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  header: {
    gap: spacing.xs
  },
  title: {
    color: colors.text,
    fontWeight: "900",
    fontSize: typography.h2
  },
  description: {
    color: colors.textMuted,
    lineHeight: 22
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  input: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border
  },
  errorBox: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 16,
    backgroundColor: "rgba(255,107,107,0.12)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  errorText: {
    color: colors.white,
    fontWeight: "700"
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  buttonDisabled: {
    opacity: 0.75
  },
  buttonText: {
    color: colors.white,
    fontWeight: "900"
  }
});
