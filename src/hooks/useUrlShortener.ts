import React from "react";
import { createHttpClient } from "../services/http";
import { createUrlShortenerApi, mapCreateAliasResponseToLink } from "../services/urlShortener";
import { ShortenedLink } from "../state/shortenerTypes";
import { isValidHttpUrl } from "../utils/validators";

type State = {
  inputUrl: string;
  items: ShortenedLink[];
  isLoading: boolean;
  error: string | null;
};

type Actions = {
  setInputUrl: (value: string) => void;
  shorten: () => Promise<void>;
  clearError: () => void;
};

const API_BASE_URL = "https://url-shortener-server.onrender.com";

export const useUrlShortener = (): State & Actions => {
  const [inputUrl, setInputUrl] = React.useState<string>("");
  const [items, setItems] = React.useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const http = React.useMemo(() => createHttpClient(API_BASE_URL), []);
  const api = React.useMemo(() => createUrlShortenerApi(http), [http]);

  const clearError = React.useCallback(() => setError(null), []);

  const shorten = React.useCallback(async () => {
    const url = inputUrl.trim();
    if (!isValidHttpUrl(url)) {
      setError("Digite uma URL válida (http/https).");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.createAlias({ url });
      const link = mapCreateAliasResponseToLink(res);
      setItems((prev) => [link, ...prev]);
      setInputUrl("");
    } catch {
      setError("Não foi possível encurtar. Verifique a URL e tente de novo.");
    } finally {
      setIsLoading(false);
    }
  }, [api, inputUrl]);

  return { inputUrl, setInputUrl, items, isLoading, error, shorten, clearError };
};
