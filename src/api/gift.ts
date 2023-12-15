import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGifts = async ({ page }: {page:number}) => {
  const res = await httpRequest.get("/gifts/filtered", {
    page: page, limit: 50, 
  });
  return res;
};

