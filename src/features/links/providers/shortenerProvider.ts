import { CreateShortLinkInput, CreateShortLinkResult, ProviderMode } from "../types";

export type ShortenerProvider = {
  id: ProviderMode;
  label: string;
  description: string;
  createShortLink: (input: CreateShortLinkInput) => Promise<CreateShortLinkResult>;
};
