import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { ShortenerScreen } from "../../src/app/ShortenerScreen";
import { __axiosPost } from "../__mocks__/axios";
import * as Clipboard from "expo-clipboard";

jest.mock("axios");

describe("ShortenerScreen copy flow", () => {
  beforeEach(() => {
    __axiosPost.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("copies shortened url and shows feedback", async () => {
    __axiosPost.mockResolvedValueOnce({
      status: 201,
      data: {
        alias: "abc",
        _links: { self: "https://example.com", short: "https://short/abc" }
      }
    });

    const spy = jest.spyOn(Clipboard, "setStringAsync").mockResolvedValueOnce(true);

    const { getByTestId, getByText, queryByText } = render(<ShortenerScreen />);

    fireEvent.changeText(getByTestId("url-input"), "https://example.com");
    fireEvent.press(getByTestId("shorten-button"));

    await waitFor(() => {
      expect(getByText("https://short/abc")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(getByText("Copiar"));
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("https://short/abc");
    });

    expect(getByText("Copiado")).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(1600);
    });

    expect(queryByText("Copiado")).toBeNull();
  });
});
