export type ProviderMode = "demo";
export type LinkStatus = "ready" | "pending" | "failed";

export type ShortenedLink = {
  id: string;
  alias: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  provider: ProviderMode;
  status: LinkStatus;
  favorite: boolean;
  copyCount: number;
  queuedAt?: string;
  syncedAt?: string;
  errorMessage?: string;
};

export type AppSettings = {
  offlineMode: boolean;
  autoSync: boolean;
  selectedProvider: ProviderMode;
};

export type StoredLinksState = {
  links: ShortenedLink[];
  settings: AppSettings;
};

export type LinkFilters = {
  query: string;
  status: "all" | LinkStatus;
  favoritesOnly: boolean;
};

export type CreateShortLinkInput = {
  originalUrl: string;
};

export type CreateShortLinkResult = {
  alias: string;
  shortUrl: string;
};

export const defaultSettings: AppSettings = {
  offlineMode: false,
  autoSync: true,
  selectedProvider: "demo"
};

export const defaultFilters: LinkFilters = {
  query: "",
  status: "all",
  favoritesOnly: false
};
