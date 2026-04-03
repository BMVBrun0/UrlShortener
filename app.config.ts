import type { ExpoConfig, ConfigContext } from "expo/config";

const APP_NAME = "URL Shortener";
const SLUG = "url-shortener";
const SCHEME = "urlshortener";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: APP_NAME,
  slug: SLUG,
  version: "1.0.0",

  platforms: ["ios", "android"],

  orientation: "portrait",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  scheme: SCHEME,

  icon: "./assets/icon.png",

  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF"
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.urlshortener",
    buildNumber: "1"
  },

  android: {
    package: "com.anonymous.urlshortener",
    versionCode: 1,
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },

  extra: {
    appVariant: "development",
    eas: {
      projectId: "00000000-0000-0000-0000-000000000000"
    }
  },

  experiments: {
    typedRoutes: false
  }
});
