import { AxiosInstance } from "axios";
import { CreateAliasRequest, CreateAliasResponse } from "../../state/shortenerTypes";

export type UrlShortenerApi = {
  createAlias: (req: CreateAliasRequest) => Promise<CreateAliasResponse>;
};

export const createUrlShortenerApi = (http: AxiosInstance): UrlShortenerApi => {
  return {
    async createAlias(req) {
      const { data } = await http.post<CreateAliasResponse>("/api/alias", req);
      return data;
    }
  };
};
