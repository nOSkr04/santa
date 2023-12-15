import { useSelector } from "react-redux";
import { IAuth } from "../interfaces/auth";

const useToken = (): string | null => {
  const { token } = useSelector((state: { auth: IAuth }) => state.auth);

  return token;
};

export { useToken };