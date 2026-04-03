import { renderHook, act } from "@testing-library/react-native";
import { useUrlShortener } from "../../src/hooks/useUrlShortener";
import { __axiosPost } from "../__mocks__/axios";

jest.mock("axios");

describe("useUrlShortener", () => {
  beforeEach(() => {
    __axiosPost.mockReset();
  });

  it("does not call api when invalid", async () => {
    const { result } = renderHook(() => useUrlShortener());

    act(() => {
      result.current.setInputUrl("notaurl");
    });

    await act(async () => {
      await result.current.shorten();
    });

    expect(__axiosPost).not.toHaveBeenCalled();
    expect(result.current.items).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  it("adds item when api succeeds and clears input", async () => {
    __axiosPost.mockResolvedValueOnce({
      status: 201,
      data: {
        alias: "abc",
        _links: {
          self: "https://example.com",
          short: "https://short/abc"
        }
      }
    });

    const { result } = renderHook(() => useUrlShortener());

    act(() => {
      result.current.setInputUrl("https://example.com");
    });

    await act(async () => {
      await result.current.shorten();
    });

    expect(__axiosPost).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.inputUrl).toBe("");
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].shortUrl).toBe("https://short/abc");
  });

  it("sets error when api fails", async () => {
    __axiosPost.mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useUrlShortener());

    act(() => {
      result.current.setInputUrl("https://example.com");
    });

    await act(async () => {
      await result.current.shorten();
    });

    expect(__axiosPost).toHaveBeenCalledTimes(1);
    expect(result.current.items).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});
