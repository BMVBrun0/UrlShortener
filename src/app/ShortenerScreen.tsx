import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UrlForm } from "../components/UrlForm";
import { ShortenedList } from "../components/ShortenedList";
import { useUrlShortener } from "../hooks/useUrlShortener";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import { warmupServer } from "../services/warmup";

export const ShortenerScreen: React.FC = () => {
  const { inputUrl, setInputUrl, items, isLoading, error, shorten, clearError } = useUrlShortener();

  React.useEffect(() => {
    void warmupServer();
  }, []);

  const handleChange = React.useCallback(
    (value: string) => {
      if (error) clearError();
      setInputUrl(value);
    },
    [clearError, error, setInputUrl]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encurtador de URL</Text>

      <UrlForm value={inputUrl} onChange={handleChange} onSubmit={shorten} isLoading={isLoading} />

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ShortenedList items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text
  },
  errorBox: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.nubankPurpleDark,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 14
  },
  errorText: {
    color: colors.text,
    fontWeight: "700"
  }
});
