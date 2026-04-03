import { ShortenerProvider } from "./shortenerProvider";
import { createAliasFromUrl } from "../utils/createAlias";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createDemoShortenerProvider = (): ShortenerProvider => {
  return {
    id: "demo",
    label: "Demo local",
    description: "Provider autoral para portfólio, sem dependência de API externa.",
    async createShortLink({ originalUrl }) {
      await sleep(350);

      const alias = createAliasFromUrl(originalUrl);

      return {
        alias,
        shortUrl: `https://pocket-links.demo/s/${alias}`
      };
    }
  };
};
