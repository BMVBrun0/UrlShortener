import { isValidHttpUrl } from "../../src/utils/validators";

describe("isValidHttpUrl", () => {
  it("returns false for empty", () => {
    expect(isValidHttpUrl("")).toBe(false);
  });

  it("returns true for https", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true);
  });

  it("returns false for non-http protocols", () => {
    expect(isValidHttpUrl("ftp://example.com")).toBe(false);
  });
});
