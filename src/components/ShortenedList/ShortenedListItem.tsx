import React from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import * as Clipboard from "expo-clipboard";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import { ShortenedLink } from "../../state/shortenerTypes";

type Props = {
  item: ShortenedLink;
};

export const ShortenedListItem: React.FC<Props> = ({ item }) => {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    Animated.spring(scale, { toValue: 1.1, useNativeDriver: true }).start(() => {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    });

    await Clipboard.setStringAsync(item.shortUrl);

    setCopied(true);

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    resetTimerRef.current = setTimeout(() => {
      setCopied(false);
      resetTimerRef.current = null;
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.short}>{item.shortUrl}</Text>

      <Text numberOfLines={expanded ? undefined : 1} style={styles.original}>
        {item.originalUrl}
      </Text>

      <View style={styles.actions}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable onPress={handleCopy}>
            <Text style={[styles.copy, copied && styles.copied]}>
              {copied ? "Copiado" : "Copiar"}
            </Text>
          </Pressable>
        </Animated.View>

        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text style={styles.toggle}>{expanded ? "Ver menos" : "Ver mais"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm
  },
  short: {
    fontWeight: "bold",
    color: colors.nubankPurple
  },
  original: {
    color: colors.text
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  copy: {
    fontWeight: "bold",
    color: colors.nubankPurple
  },
  copied: {
    color: "#2ecc71"
  },
  toggle: {
    color: colors.muted
  }
});
