jest.mock("expo-clipboard", () => ({
  setStringAsync: jest.fn(async () => undefined)
}));

jest.mock("expo-linking", () => ({
  openURL: jest.fn(async () => undefined)
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props: any) => React.createElement("Ionicons", props, null)
  };
});
