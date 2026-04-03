import React from "react";
import { createDemoShortenerProvider } from "../providers/demoShortenerProvider";
import {
  AppSettings,
  defaultFilters,
  defaultSettings,
  LinkFilters,
  ShortenedLink
} from "../types";
import { filterLinks } from "../utils/filterLinks";
import { isValidHttpUrl } from "../../../shared/utils/validators";
import {
  clearStoredLinksState,
  loadStoredLinksState,
  saveStoredLinksState
} from "../storage/linkHistoryStorage";

const createId = (): string => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createPendingLink = (originalUrl: string, provider: AppSettings["selectedProvider"]): ShortenedLink => ({
  id: createId(),
  alias: "pending",
  originalUrl,
  shortUrl: "",
  createdAt: new Date().toISOString(),
  provider,
  status: "pending",
  favorite: false,
  copyCount: 0,
  queuedAt: new Date().toISOString()
});

type UseLinkManagerValue = {
  inputUrl: string;
  setInputUrl: (value: string) => void;
  links: ShortenedLink[];
  filteredLinks: ShortenedLink[];
  filters: LinkFilters;
  setQuery: (value: string) => void;
  setStatusFilter: (value: LinkFilters["status"]) => void;
  setFavoritesOnly: (value: boolean) => void;
  settings: AppSettings;
  setOfflineMode: (value: boolean) => void;
  setAutoSync: (value: boolean) => void;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  clearError: () => void;
  shortenCurrentUrl: () => Promise<void>;
  syncPending: (force?: boolean) => Promise<void>;
  clearHistory: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  removeLink: (id: string) => void;
  markCopied: (id: string) => void;
  totalLinks: number;
  readyCount: number;
  pendingCount: number;
  favoriteCount: number;
  totalCopies: number;
  recentLinks: ShortenedLink[];
};

export const useLinkManager = (): UseLinkManagerValue => {
  const [inputUrl, setInputUrl] = React.useState("");
  const [links, setLinks] = React.useState<ShortenedLink[]>([]);
  const [filters, setFilters] = React.useState(defaultFilters);
  const [settings, setSettings] = React.useState(defaultSettings);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const provider = React.useMemo(() => createDemoShortenerProvider(), []);

  React.useEffect(() => {
    const hydrate = async () => {
      const stored = await loadStoredLinksState();

      if (stored) {
        setLinks(stored.links ?? []);
        setSettings(stored.settings ?? defaultSettings);
      }

      setIsHydrated(true);
    };

    void hydrate();
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;

    void saveStoredLinksState({ links, settings });
  }, [isHydrated, links, settings]);

  const clearError = React.useCallback(() => setError(null), []);

  const syncPending = React.useCallback(async (force = false) => {
    if (settings.offlineMode && !force) return;

    const queuedItems = links.filter((item) => item.status !== "ready");
    if (queuedItems.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const replacements = await Promise.all(
        queuedItems.map(async (item) => {
          try {
            const result = await provider.createShortLink({ originalUrl: item.originalUrl });

            return {
              ...item,
              alias: result.alias,
              shortUrl: result.shortUrl,
              status: "ready" as const,
              syncedAt: new Date().toISOString(),
              errorMessage: undefined
            };
          } catch {
            return {
              ...item,
              status: "failed" as const,
              errorMessage: "Falha ao sincronizar item pendente."
            };
          }
        })
      );

      setLinks((current) =>
        current.map((item) => replacements.find((replacement) => replacement.id === item.id) ?? item)
      );
    } finally {
      setIsLoading(false);
    }
  }, [links, provider, settings.offlineMode]);

  const shortenCurrentUrl = React.useCallback(async () => {
    const trimmed = inputUrl.trim();

    if (!isValidHttpUrl(trimmed)) {
      setError("Digite uma URL válida usando http:// ou https://.");
      return;
    }

    setError(null);

    if (settings.offlineMode) {
      setLinks((current) => [createPendingLink(trimmed, settings.selectedProvider), ...current]);
      setInputUrl("");
      return;
    }

    setIsLoading(true);

    try {
      const result = await provider.createShortLink({ originalUrl: trimmed });

      const link: ShortenedLink = {
        id: createId(),
        alias: result.alias,
        originalUrl: trimmed,
        shortUrl: result.shortUrl,
        createdAt: new Date().toISOString(),
        provider: settings.selectedProvider,
        status: "ready",
        favorite: false,
        copyCount: 0,
        syncedAt: new Date().toISOString()
      };

      setLinks((current) => [link, ...current]);
      setInputUrl("");
    } catch {
      setError("Não foi possível gerar o link curto agora.");
    } finally {
      setIsLoading(false);
    }
  }, [inputUrl, provider, settings.offlineMode, settings.selectedProvider]);

  const setOfflineMode = React.useCallback(
    (value: boolean) => {
      setSettings((current) => ({ ...current, offlineMode: value }));

      if (!value && settings.autoSync) {
        void syncPending(true);
      }
    },
    [settings.autoSync, syncPending]
  );

  const setAutoSync = React.useCallback(
    (value: boolean) => {
      setSettings((current) => ({ ...current, autoSync: value }));

      if (value && !settings.offlineMode) {
        void syncPending(true);
      }
    },
    [settings.offlineMode, syncPending]
  );

  const clearHistory = React.useCallback(async () => {
    setLinks([]);
    await clearStoredLinksState();
  }, []);

  const toggleFavorite = React.useCallback((id: string) => {
    setLinks((current) =>
      current.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item))
    );
  }, []);

  const removeLink = React.useCallback((id: string) => {
    setLinks((current) => current.filter((item) => item.id !== id));
  }, []);

  const markCopied = React.useCallback((id: string) => {
    setLinks((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, copyCount: item.copyCount + 1, syncedAt: item.syncedAt ?? new Date().toISOString() }
          : item
      )
    );
  }, []);

  const setQuery = React.useCallback((value: string) => {
    setFilters((current) => ({ ...current, query: value }));
  }, []);

  const setStatusFilter = React.useCallback((value: LinkFilters["status"]) => {
    setFilters((current) => ({ ...current, status: value }));
  }, []);

  const setFavoritesOnly = React.useCallback((value: boolean) => {
    setFilters((current) => ({ ...current, favoritesOnly: value }));
  }, []);

  const filteredLinks = React.useMemo(() => filterLinks(links, filters), [filters, links]);
  const readyCount = React.useMemo(() => links.filter((item) => item.status === "ready").length, [links]);
  const pendingCount = React.useMemo(() => links.filter((item) => item.status === "pending").length, [links]);
  const favoriteCount = React.useMemo(() => links.filter((item) => item.favorite).length, [links]);
  const totalCopies = React.useMemo(
    () => links.reduce((sum, item) => sum + item.copyCount, 0),
    [links]
  );

  return {
    inputUrl,
    setInputUrl,
    links,
    filteredLinks,
    filters,
    setQuery,
    setStatusFilter,
    setFavoritesOnly,
    settings,
    setOfflineMode,
    setAutoSync,
    isLoading,
    isHydrated,
    error,
    clearError,
    shortenCurrentUrl,
    syncPending,
    clearHistory,
    toggleFavorite,
    removeLink,
    markCopied,
    totalLinks: links.length,
    readyCount,
    pendingCount,
    favoriteCount,
    totalCopies,
    recentLinks: links.slice(0, 3)
  };
};
