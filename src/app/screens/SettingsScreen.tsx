import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SurfaceCard } from "../../shared/components/SurfaceCard";
import { ToggleRow } from "../../shared/components/ToggleRow";
import { colors } from "../../shared/theme/colors";
import { spacing } from "../../shared/theme/spacing";
import { AppSettings } from "../../features/links/types";

type Props = {
  settings: AppSettings;
  onOfflineModeChange: (value: boolean) => void;
  onAutoSyncChange: (value: boolean) => void;
  onSyncNow: () => void;
  onClearHistory: () => void;
};

export const SettingsScreen: React.FC<Props> = ({
  settings,
  onOfflineModeChange,
  onAutoSyncChange,
  onSyncNow,
  onClearHistory
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>Modo de operação</Text>

        <ToggleRow
          title="Modo offline"
          description="Quando ativo, novos links entram em uma fila local até você sincronizar."
          value={settings.offlineMode}
          onValueChange={onOfflineModeChange}
        />

        <ToggleRow
          title="Auto sync"
          description="Ao voltar para o modo online, tenta sincronizar tudo automaticamente."
          value={settings.autoSync}
          onValueChange={onAutoSyncChange}
        />
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>Provider</Text>
        <Text style={styles.description}>
          O projeto usa um provider demo local para evitar dependência de serviços externos e manter o
          repositório público mais coerente.
        </Text>
        <Text style={styles.providerValue}>demo local</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>Ações locais</Text>

        <Pressable style={styles.actionButton} onPress={onSyncNow}>
          <Text style={styles.actionText}>Sincronizar fila pendente</Text>
        </Pressable>

        <Pressable style={[styles.actionButton, styles.dangerButton]} onPress={onClearHistory}>
          <Text style={styles.actionText}>Limpar cache e histórico</Text>
        </Pressable>
      </SurfaceCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg
  },
  card: {
    gap: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  description: {
    color: colors.textMuted,
    lineHeight: 22
  },
  providerValue: {
    color: colors.accentAlt,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  actionButton: {
    minHeight: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  dangerButton: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.danger
  },
  actionText: {
    color: colors.white,
    fontWeight: "900"
  }
});
