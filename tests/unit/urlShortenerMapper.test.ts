import { mapCreateAliasResponseToLink } from "../../src/services/urlShortener/urlShortenerMapper";

describe("mapCreateAliasResponseToLink", () => {
  it("maps api response and generates unique id", () => {
    const link1 = mapCreateAliasResponseToLink({
      alias: "abc",
      _links: { self: "https://example.com", short: "https://short/abc" }
    });

    const link2 = mapCreateAliasResponseToLink({
      alias: "abc",
      _links: { self: "https://example.com", short: "https://short/abc" }
    });

    expect(link1.alias).toBe("abc");
    expect(link1.originalUrl).toBe("https://example.com");
    expect(link1.shortUrl).toBe("https://short/abc");
    expect(link1.id).not.toBe(link2.id);
  });
});
