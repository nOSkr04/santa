import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};

export const checkLoginPhone = async (data: {
  phone: string,
  expoPushToken: string
}) => {
  const res = await httpRequest.post("/users/loginCheckPhone", data);
  return res;
};
export const checkLoginPassword = async (password: string) => {
  const res = await httpRequest.post("/users/loginCheckPassword", { password });
  return res;
};
export const checkRegisterPhone = async (data: {
  phone: string,
  expoPushToken: string
}) => {
  const res = await httpRequest.post("/users/registerCheckPhone", data);
  return res;
};
export const checkRegisterPassword = async (password: string) => {
  const res = await httpRequest.post("/users/registerCheckPassword", { password });
  return res;
};

export const login = async (data: {
  phone: string,
  expoPushToken: string
}) => {
  const res = await httpRequest.post("/users/login", data);
  return res;
};
export const deleteUser = async () => {
  const res = await httpRequest.del("/users/delete");
  return res;
};
export const signUp = async (data: {
  phone: string,
  expoPushToken: string
}) => {
  const res = await httpRequest.post("/users/register", data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/users/logout");
  return res;
};


