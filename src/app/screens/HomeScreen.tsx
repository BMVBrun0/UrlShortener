import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinkComposerCard } from "../../features/links/components/LinkComposerCard";
import { LinkList } from "../../features/links/components/LinkList";
import { StatsCards } from "../../features/links/components/StatsCards";
import { InfoChip } from "../../shared/components/InfoChip";
import { SurfaceCard } from "../../shared/components/SurfaceCard";
import { colors } from "../../shared/theme/colors";
import { spacing } from "../../shared/theme/spacing";
import { typography } from "../../shared/theme/typography";
import { ShortenedLink } from "../../features/links/types";

type Props = {
  inputUrl: string;
  onChangeInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isOfflineMode: boolean;
  error: string | null;
  onClearError: () => void;
  totalLinks: number;
  pendingCount: number;
  favoriteCount: number;
  totalCopies: number;
  recentLinks: ShortenedLink[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onRetry: () => void;
};

export const HomeScreen: React.FC<Props> = ({
  inputUrl,
  onChangeInput,
  onSubmit,
  isLoading,
  isOfflineMode,
  error,
  onClearError,
  totalLinks,
  pendingCount,
  favoriteCount,
  totalCopies,
  recentLinks,
  onToggleFavorite,
  onDelete,
  onCopy,
  onRetry
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SurfaceCard style={styles.hero}>
        <Text style={styles.title}>Encurtador mobile com foco em arquitetura e portfólio.</Text>
        <Text style={styles.description}>
          Esta versão abandona o contexto de teste técnico fechado e vira um app-demo autoral, com
          cache local, fila offline e organização por feature.
        </Text>

        <View style={styles.chips}>
          <InfoChip label="Expo" />
          <InfoChip label="React Native" />
          <InfoChip label="TypeScript" />
          <InfoChip label="AsyncStorage" />
        </View>
      </SurfaceCard>

      <LinkComposerCard
        value={inputUrl}
        onChange={onChangeInput}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isOfflineMode={isOfflineMode}
        error={error}
        onClearError={onClearError}
      />

      <StatsCards
        totalLinks={totalLinks}
        pendingCount={pendingCount}
        favoriteCount={favoriteCount}
        totalCopies={totalCopies}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links recentes</Text>
        <Text style={styles.sectionDescription}>
          Últimos itens do histórico local, persistidos entre execuções da aplicação.
        </Text>
      </View>

      <LinkList
        items={recentLinks}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
        onCopy={onCopy}
        onRetry={onRetry}
        emptyTitle="Ainda não há links no histórico"
        emptyDescription="Crie o primeiro link ou ative o modo offline para enfileirar novas solicitações."
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
  hero: {
    gap: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: "900",
    lineHeight: 30
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
  section: {
    gap: spacing.xs
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: "900"
  },
  sectionDescription: {
    color: colors.textMuted,
    lineHeight: 21
  }
});
