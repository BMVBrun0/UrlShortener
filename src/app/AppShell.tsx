import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppRoute } from "./types";
import { AppHeader } from "../shared/components/AppHeader";
import { AppFooterNav } from "../shared/components/AppFooterNav";
import { AppSidebar } from "../shared/components/AppSidebar";
import { useLinkManager } from "../features/links/hooks/useLinkManager";
import { colors } from "../shared/theme/colors";
import { HomeScreen } from "./screens/HomeScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { AboutScreen } from "./screens/AboutScreen";

const routeCopy: Record<AppRoute, { title: string; subtitle: string }> = {
  home: {
    title: "Pocket Links",
    subtitle: "Encurtador autoral para portfólio público"
  },
  history: {
    title: "Histórico",
    subtitle: "Busca local, favoritos e cache persistido"
  },
  settings: {
    title: "Configurações",
    subtitle: "Controle de modo offline e ações locais"
  },
  about: {
    title: "Sobre",
    subtitle: "Objetivo técnico e arquitetura do projeto"
  }
};

export const AppShell: React.FC = () => {
  const [route, setRoute] = React.useState<AppRoute>("home");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const controller = useLinkManager();

  if (!controller.isHydrated) {
    return (
      <SafeAreaView style={styles.loadingState}>
        <ActivityIndicator color={colors.accentAlt} />
        <Text style={styles.loadingText}>Carregando cache local...</Text>
      </SafeAreaView>
    );
  }

  const currentRouteCopy = routeCopy[route];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={currentRouteCopy.title}
        subtitle={currentRouteCopy.subtitle}
        isOffline={controller.settings.offlineMode}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <View style={styles.content}>
        {route === "home" ? (
          <HomeScreen
            inputUrl={controller.inputUrl}
            onChangeInput={controller.setInputUrl}
            onSubmit={controller.shortenCurrentUrl}
            isLoading={controller.isLoading}
            isOfflineMode={controller.settings.offlineMode}
            error={controller.error}
            onClearError={controller.clearError}
            totalLinks={controller.totalLinks}
            pendingCount={controller.pendingCount}
            favoriteCount={controller.favoriteCount}
            totalCopies={controller.totalCopies}
            recentLinks={controller.recentLinks}
            onToggleFavorite={controller.toggleFavorite}
            onDelete={controller.removeLink}
            onCopy={controller.markCopied}
            onRetry={controller.syncPending}
          />
        ) : null}

        {route === "history" ? (
          <HistoryScreen
            filters={controller.filters}
            onQueryChange={controller.setQuery}
            onStatusChange={controller.setStatusFilter}
            onFavoritesOnlyChange={controller.setFavoritesOnly}
            items={controller.filteredLinks}
            onToggleFavorite={controller.toggleFavorite}
            onDelete={controller.removeLink}
            onCopy={controller.markCopied}
            onRetry={controller.syncPending}
          />
        ) : null}

        {route === "settings" ? (
          <SettingsScreen
            settings={controller.settings}
            onOfflineModeChange={controller.setOfflineMode}
            onAutoSyncChange={controller.setAutoSync}
            onSyncNow={controller.syncPending}
            onClearHistory={controller.clearHistory}
          />
        ) : null}

        {route === "about" ? <AboutScreen /> : null}
      </View>

      <AppFooterNav route={route} onNavigate={setRoute} />

      <AppSidebar
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        route={route}
        onNavigate={setRoute}
        pendingCount={controller.pendingCount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1
  },
  loadingState: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  loadingText: {
    color: colors.text
  }
});
