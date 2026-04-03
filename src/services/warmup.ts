import { createHttpClient } from "./http";

const API_ORIGIN = "https://url-shortener-server.onrender.com";
const WARMUP_COOLDOWN_MS = 5 * 60 * 1000;

let lastWarmupAt = 0;
let inFlight: Promise<void> | null = null;

export const warmupServer = (): Promise<void> => {
  const now = Date.now();

  if (inFlight) return inFlight;
  if (now - lastWarmupAt < WARMUP_COOLDOWN_MS) return Promise.resolve();

  lastWarmupAt = now;

  const http = createHttpClient(API_ORIGIN);

  inFlight = http
    .get("/")
    .then(() => undefined)
    .catch(() => undefined)
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};
