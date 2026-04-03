import React from "react";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { ShortenedLink } from "../types";
import { SurfaceCard } from "../../../shared/components/SurfaceCard";
import { colors } from "../../../shared/theme/colors";
import { spacing } from "../../../shared/theme/spacing";
import { formatDateTime } from "../../../shared/utils/date";

type Props = {
  item: ShortenedLink;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onRetry: () => void;
};

export const LinkCard: React.FC<Props> = ({ item, onToggleFavorite, onDelete, onCopy, onRetry }) => {
  const handleCopy = React.useCallback(async () => {
    if (!item.shortUrl) return;
    await Clipboard.setStringAsync(item.shortUrl);
    onCopy(item.id);
  }, [item.id, item.shortUrl, onCopy]);

  const handleOpen = React.useCallback(async () => {
    await Linking.openURL(item.originalUrl);
  }, [item.originalUrl]);

  const handleShare = React.useCallback(async () => {
    const message = item.shortUrl || item.originalUrl;
    await Share.share({ message });
  }, [item.originalUrl, item.shortUrl]);

  const statusColor =
    item.status === "ready" ? colors.success : item.status === "pending" ? colors.warning : colors.danger;

  return (
    <SurfaceCard style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          <Text style={styles.alias}>{item.alias}</Text>
          <Text style={styles.meta}>{formatDateTime(item.createdAt)}</Text>
        </View>

        <View style={[styles.statusPill, { backgroundColor: statusColor + "22" }]}>
          <Text style={styles.statusText}>
            {item.status === "ready" ? "Pronto" : item.status === "pending" ? "Pendente" : "Falhou"}
          </Text>
        </View>
      </View>

      <Text style={styles.shortUrl}>{item.shortUrl || "Aguardando sincronização..."}</Text>
      <Text style={styles.originalUrl}>{item.originalUrl}</Text>

      <View style={styles.metrics}>
        <Text style={styles.metricText}>Cópias: {item.copyCount}</Text>
        <Text style={styles.metricText}>{item.favorite ? "Favorito" : "Normal"}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => onToggleFavorite(item.id)}>
          <Ionicons name={item.favorite ? "star" : "star-outline"} size={18} color={colors.text} />
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleCopy} disabled={!item.shortUrl}>
          <Ionicons name="copy-outline" size={18} color={item.shortUrl ? colors.text : colors.textMuted} />
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={18} color={colors.text} />
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleOpen}>
          <Ionicons name="open-outline" size={18} color={colors.text} />
        </Pressable>

        {item.status !== "ready" ? (
          <Pressable style={styles.actionButton} onPress={onRetry}>
            <Ionicons name="sync-outline" size={18} color={colors.text} />
          </Pressable>
        ) : null}

        <Pressable style={styles.actionButton} onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </Pressable>
      </View>
    </SurfaceCard>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  copy: {
    flex: 1,
    gap: spacing.xxs
  },
  alias: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  statusText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "800"
  },
  shortUrl: {
    color: colors.accentAlt,
    fontWeight: "800"
  },
  originalUrl: {
    color: colors.textMuted,
    lineHeight: 21
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  metricText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700"
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted
  }
});
