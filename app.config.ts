import type { ExpoConfig, ConfigContext } from "expo/config";

const APP_NAME = "Pocket Links";
const SLUG = "pocket-links";
const SCHEME = "pocketlinks";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  version: "1.1.0",
  platforms: ["ios", "android", "web"],
  orientation: "portrait",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  scheme: SCHEME,
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#0B1020"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "io.bmvbruno.pocketlinks",
    buildNumber: "1"
  },
  android: {
    package: "io.bmvbruno.pocketlinks",
    versionCode: 1,
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0B1020"
    }
  },
  experiments: {
    typedRoutes: false
  }
});
