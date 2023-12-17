import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getNotificaiton = async ({ page, limit=10 }: {page: number, limit?: number}) => {
  const res = await httpRequest.get("/notification", {
    page : page, 
    limit: limit,
    sort : "-createdAt"
  });
  return res;
};
