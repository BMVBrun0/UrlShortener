export type ShortenedLink = {
  id: string;
  alias: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
};

export type CreateAliasRequest = {
  url: string;
};

export type CreateAliasResponse = {
  alias: string;
  _links: {
    self: string;
    short: string;
  };
};
