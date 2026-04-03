import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppShell } from "./src/app/AppShell";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppShell />
    </SafeAreaProvider>
  );
}
