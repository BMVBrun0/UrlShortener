import { createAliasFromUrl } from "../../src/features/links/utils/createAlias";

describe("createAliasFromUrl", () => {
  it("uses host information in alias", () => {
    const alias = createAliasFromUrl("https://www.example.com/resource");

    expect(alias.startsWith("exampl-")).toBe(true);
  });

  it("creates only lowercase safe characters", () => {
    const alias = createAliasFromUrl("https://Meu-Site.com.br/recurso");

    expect(alias).toMatch(/^[a-z0-9-]+$/);
  });
});
