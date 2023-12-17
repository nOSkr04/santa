import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGifts = async ({ page,limit= 10 }: {page:number, limit?: number}) => {
  const res = await httpRequest.get("/gifts", {
    page: page, limit: limit, productType: "Өндөг"
  });
  return res;
};
export const getVouchers = async ({ page,limit= 10 }: {page:number, limit?: number}) => {
  const res = await httpRequest.get("/vouchers", {
    page: page, limit: limit, productType: "Хөнгөлөлт"
  });
  return res;
};

