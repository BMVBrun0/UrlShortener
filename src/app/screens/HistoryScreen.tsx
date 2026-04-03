import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinkList } from "../../features/links/components/LinkList";
import { LinkFilters, ShortenedLink } from "../../features/links/types";
import { SurfaceCard } from "../../shared/components/SurfaceCard";
import { ToggleRow } from "../../shared/components/ToggleRow";
import { colors } from "../../shared/theme/colors";
import { spacing } from "../../shared/theme/spacing";

type Props = {
  filters: LinkFilters;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: LinkFilters["status"]) => void;
  onFavoritesOnlyChange: (value: boolean) => void;
  items: ShortenedLink[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onRetry: () => void;
};

const statusFilters: { label: string; value: LinkFilters["status"] }[] = [
  { label: "Todos", value: "all" },
  { label: "Prontos", value: "ready" },
  { label: "Pendentes", value: "pending" },
  { label: "Falhos", value: "failed" }
];

export const HistoryScreen: React.FC<Props> = ({
  filters,
  onQueryChange,
  onStatusChange,
  onFavoritesOnlyChange,
  items,
  onToggleFavorite,
  onDelete,
  onCopy,
  onRetry
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SurfaceCard style={styles.filtersCard}>
        <Text style={styles.title}>Histórico persistido</Text>
        <Text style={styles.description}>
          Use a busca local e os filtros para navegar pelos links salvos em cache.
        </Text>

        <TextInput
          value={filters.query}
          onChangeText={onQueryChange}
          placeholder="Buscar por alias, URL original ou link curto"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />

        <View style={styles.chips}>
          {statusFilters.map((item) => {
            const active = filters.status === item.value;

            return (
              <Pressable
                key={item.value}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => onStatusChange(item.value)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <ToggleRow
          title="Somente favoritos"
          description="Exibe apenas itens marcados com estrela."
          value={filters.favoritesOnly}
          onValueChange={onFavoritesOnlyChange}
        />
      </SurfaceCard>

      <LinkList
        items={items}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
        onCopy={onCopy}
        onRetry={onRetry}
        emptyTitle="Nenhum item encontrado"
        emptyDescription="Ajuste os filtros ou crie novos links para preencher o histórico."
      />
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
  filtersCard: {
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
  input: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceMuted
  },
  chipActive: {
    borderColor: colors.accentAlt,
    backgroundColor: colors.surfaceAlt
  },
  chipText: {
    color: colors.textMuted,
    fontWeight: "800"
  },
  chipTextActive: {
    color: colors.text
  }
});
