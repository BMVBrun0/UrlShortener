import { isValidHttpUrl } from "../../src/utils/validators";

describe("validators - security cases", () => {
  it("rejects javascript scheme", () => {
    expect(isValidHttpUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects data scheme", () => {
    expect(isValidHttpUrl("data:text/html;base64,xxx")).toBe(false);
  });

  it("rejects missing protocol", () => {
    expect(isValidHttpUrl("www.google.com")).toBe(false);
  });

  it("accepts https", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true);
  });

  it("accepts http", () => {
    expect(isValidHttpUrl("http://example.com")).toBe(true);
  });
});
