import React from "react";
import { render } from "@testing-library/react-native";
import { ShortenerScreen } from "../../src/app/ShortenerScreen";

describe("ShortenerScreen", () => {
  it("renders title", () => {
    const { getByText } = render(<ShortenerScreen />);
    expect(getByText("Encurtador de URL")).toBeTruthy();
  });
});
