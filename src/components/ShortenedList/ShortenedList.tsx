import React from "react";
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { ShortenedLink } from "../../state/shortenerTypes";
import { spacing } from "../../theme/spacing";
import { ShortenedListItem } from "./ShortenedListItem";

type Props = {
  items: ShortenedLink[];
};

const PAGE_SIZE = 10;

export const ShortenedList: React.FC<Props> = ({ items }) => {
  const [visibleCount, setVisibleCount] = React.useState<number>(PAGE_SIZE);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [items.length]);

  const data = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = React.useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, items.length));
  }, [hasMore, items.length]);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhum link encurtado ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <ShortenedListItem item={item} />}
      onEndReachedThreshold={0.6}
      onEndReached={loadMore}
      initialNumToRender={PAGE_SIZE}
      maxToRenderPerBatch={PAGE_SIZE}
      windowSize={7}
      removeClippedSubviews
      ListFooterComponent={
        hasMore ? (
          <Pressable onPress={loadMore} style={styles.moreBtn}>
            <Text style={styles.moreText}>Carregar mais</Text>
          </Pressable>
        ) : (
          <View style={styles.footerSpace} />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  list: { gap: spacing.sm, paddingBottom: spacing.xl },
  empty: { paddingVertical: spacing.lg },
  emptyText: { opacity: 0.7 },
  moreBtn: {
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12
  },
  moreText: { fontWeight: "700" },
  footerSpace: { height: spacing.lg }
});
