import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGifts = async ({page}: {page:number}) => {
  const res = await httpRequest.get("/gifts", {
    page: page, limit:10, 
  });
  return res
};

