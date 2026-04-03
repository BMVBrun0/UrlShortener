import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ShortenerScreen } from "../../src/app/ShortenerScreen";

describe("ShortenerScreen invalid flow", () => {
  it("shows error when invalid url submitted", async () => {
    const { getByTestId, findByText } = render(<ShortenerScreen />);

    fireEvent.changeText(getByTestId("url-input"), "notaurl");
    fireEvent.press(getByTestId("shorten-button"));

    expect(await findByText("Digite uma URL válida (http/https).")).toBeTruthy();
  });
});
