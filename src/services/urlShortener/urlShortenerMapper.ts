import { CreateAliasResponse, ShortenedLink } from "../../state/shortenerTypes";

export const mapCreateAliasResponseToLink = (res: CreateAliasResponse): ShortenedLink => {
  const createdAt = new Date().toISOString();
  const uniqueId = `${res.alias}-${createdAt}-${Math.random().toString(16).slice(2)}`;

  return {
    id: uniqueId,
    alias: res.alias,
    originalUrl: res._links.self,
    shortUrl: res._links.short,
    createdAt
  };
};
