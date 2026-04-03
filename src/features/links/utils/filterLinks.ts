import { LinkFilters, ShortenedLink } from "../types";

export const filterLinks = (links: ShortenedLink[], filters: LinkFilters): ShortenedLink[] => {
  const query = filters.query.trim().toLowerCase();

  return links.filter((item) => {
    const matchesQuery =
      !query ||
      item.alias.toLowerCase().includes(query) ||
      item.originalUrl.toLowerCase().includes(query) ||
      item.shortUrl.toLowerCase().includes(query);

    const matchesStatus = filters.status === "all" || item.status === filters.status;
    const matchesFavorite = !filters.favoritesOnly || item.favorite;

    return matchesQuery && matchesStatus && matchesFavorite;
  });
};
