import React from "react";
import { StyleSheet, View } from "react-native";
import { EmptyState } from "../../../shared/components/EmptyState";
import { spacing } from "../../../shared/theme/spacing";
import { ShortenedLink } from "../types";
import { LinkCard } from "./LinkCard";

type Props = {
  items: ShortenedLink[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onRetry: () => void;
  emptyTitle: string;
  emptyDescription: string;
};

export const LinkList: React.FC<Props> = ({
  items,
  onToggleFavorite,
  onDelete,
  onCopy,
  onRetry,
  emptyTitle,
  emptyDescription
}) => {
  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <LinkCard
          key={item.id}
          item={item}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onCopy={onCopy}
          onRetry={onRetry}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  }
});
