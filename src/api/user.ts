import { User } from "../models/user";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return User.fromJson(res.data);
};

export const postInvoice = async (id: string, money:number) => {
  const res = await httpRequest.post(`/users/invoice/${id}`, { amount: money } );
  return res;
};

export const getWallet = async (id: string) => {
  const res = await httpRequest.get(`/wallets/${id}`);
  return res;
};

export const checkInvoince = async(id: string, numId: string) => {
  const res  = await httpRequest.get(`/users/check/challbacks/${id}/${numId}`);
  return res;

};
