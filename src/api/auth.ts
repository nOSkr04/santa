import { ILoginForm } from "../components/auth/login-form";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};

export const login = async (data: ILoginForm) => {
  const res = await httpRequest.post("/users/login",data);
  return res;
};
export const deleteUser = async (id: string) => {
  const res = await httpRequest.del(`/users/${id}`);
  return res;
};
export const signUp = async (data: {name: string, password: string}) => {
  const res = await httpRequest.post("/users/register",data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/users/logout");
  return res;
};

