import { storage } from "../../../infrastructure/storage/storage";
import { StoredLinksState } from "../types";

const STORAGE_KEY = "@pocket-links/state";

export const loadStoredLinksState = async (): Promise<StoredLinksState | null> => {
  const raw = await storage.getItem(STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredLinksState;
  } catch {
    return null;
  }
};

export const saveStoredLinksState = async (value: StoredLinksState): Promise<void> => {
  await storage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const clearStoredLinksState = async (): Promise<void> => {
  await storage.removeItem(STORAGE_KEY);
};
