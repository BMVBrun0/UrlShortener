import { createDemoShortenerProvider } from "../../src/features/links/providers/demoShortenerProvider";

describe("createDemoShortenerProvider", () => {
  it("returns a provider with predictable shape", async () => {
    const provider = createDemoShortenerProvider();

    const result = await provider.createShortLink({
      originalUrl: "https://example.com/article"
    });

    expect(provider.id).toBe("demo");
    expect(result.alias).toContain("exampl");
    expect(result.shortUrl).toContain("https://pocket-links.demo/s/");
  });
});
