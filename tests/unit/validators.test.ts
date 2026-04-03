import { isValidHttpUrl } from "../../src/shared/utils/validators";

describe("isValidHttpUrl", () => {
  it("returns true for http url", () => {
    expect(isValidHttpUrl("http://example.com")).toBe(true);
  });

  it("returns true for https url", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true);
  });

  it("returns false for invalid input", () => {
    expect(isValidHttpUrl("notaurl")).toBe(false);
    expect(isValidHttpUrl("")).toBe(false);
  });

  it("returns false for non http protocols", () => {
    expect(isValidHttpUrl("ftp://example.com")).toBe(false);
  });
});
