import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ShortenerScreen } from "../../src/app/ShortenerScreen";
import { __axiosPost } from "../__mocks__/axios";

jest.mock("axios");

describe("ShortenerScreen happy flow", () => {
  beforeEach(() => {
    __axiosPost.mockReset();
  });

  it("adds shortened link to list", async () => {
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

    const { getByTestId, getByText } = render(<ShortenerScreen />);

    fireEvent.changeText(getByTestId("url-input"), "https://example.com");
    fireEvent.press(getByTestId("shorten-button"));

    await waitFor(() => {
      expect(getByText("https://short/abc")).toBeTruthy();
    });
  });
});
