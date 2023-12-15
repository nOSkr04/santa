import { useSWRConfig } from "swr";
import { useToken } from "./use-token";

const useMutate = () => {
  const { mutate } = useSWRConfig();

  const token = useToken();

  return (key: string, ...args: any | undefined) => {
    return mutate([key, token], ...args);
  };
};

export { useMutate };