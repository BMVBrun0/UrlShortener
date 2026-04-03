import { filterLinks } from "../../src/features/links/utils/filterLinks";
import { ShortenedLink } from "../../src/features/links/types";

const baseItem = (overrides: Partial<ShortenedLink>): ShortenedLink => ({
  id: overrides.id ?? "1",
  alias: overrides.alias ?? "demo-link",
  originalUrl: overrides.originalUrl ?? "https://example.com",
  shortUrl: overrides.shortUrl ?? "https://pocket-links.demo/s/demo-link",
  createdAt: overrides.createdAt ?? "2026-01-01T00:00:00.000Z",
  provider: overrides.provider ?? "demo",
  status: overrides.status ?? "ready",
  favorite: overrides.favorite ?? false,
  copyCount: overrides.copyCount ?? 0,
  queuedAt: overrides.queuedAt,
  syncedAt: overrides.syncedAt,
  errorMessage: overrides.errorMessage
});

describe("filterLinks", () => {
  const items = [
    baseItem({ id: "1", alias: "alpha", favorite: true, status: "ready" }),
    baseItem({ id: "2", alias: "beta", status: "pending", shortUrl: "" }),
    baseItem({ id: "3", alias: "gamma", status: "failed" })
  ];

  it("filters by text query", () => {
    const result = filterLinks(items, { query: "alp", status: "all", favoritesOnly: false });
    expect(result).toHaveLength(1);
    expect(result[0].alias).toBe("alpha");
  });

  it("filters by status", () => {
    const result = filterLinks(items, { query: "", status: "pending", favoritesOnly: false });
    expect(result).toHaveLength(1);
    expect(result[0].alias).toBe("beta");
  });

  it("filters favorites only", () => {
    const result = filterLinks(items, { query: "", status: "all", favoritesOnly: true });
    expect(result).toHaveLength(1);
    expect(result[0].alias).toBe("alpha");
  });
});
