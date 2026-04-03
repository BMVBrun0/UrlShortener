import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SurfaceCard } from "../../../shared/components/SurfaceCard";
import { colors } from "../../../shared/theme/colors";
import { spacing } from "../../../shared/theme/spacing";

type Props = {
  totalLinks: number;
  pendingCount: number;
  favoriteCount: number;
  totalCopies: number;
};

export const StatsCards: React.FC<Props> = ({ totalLinks, pendingCount, favoriteCount, totalCopies }) => {
  const items = [
    { label: "Links salvos", value: String(totalLinks) },
    { label: "Pendentes", value: String(pendingCount) },
    { label: "Favoritos", value: String(favoriteCount) },
    { label: "Cópias", value: String(totalCopies) }
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <SurfaceCard key={item.label} style={styles.card}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </SurfaceCard>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  card: {
    width: "47%",
    minWidth: 150,
    gap: spacing.xs
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  label: {
    color: colors.textMuted,
    fontWeight: "700"
  }
});
