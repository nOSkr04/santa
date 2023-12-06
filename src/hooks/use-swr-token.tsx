import {  useState } from "react";
import { useSelector } from "react-redux";
import swr, { KeyedMutator, SWRConfiguration } from "swr";
import { BaseModel } from "../models/base-model";
import { IAuth } from "../interfaces/auth";
const useSWRToken = <T extends BaseModel>(
  key: string | null,
  api: () => Promise<T>,
  options: SWRConfiguration = {},
): {
  data: T | null;
  error: unknown;
  mutate: KeyedMutator<T>;
  isLoading: boolean;
  isInitialLoading: boolean;
} => {

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { token } = useSelector((state: { auth: IAuth }) => state.auth);

  const { data, error, mutate } = swr(key === null ? null : [key, token], api, {
    shouldRetryOnError: false,
    ...options,
  });

  if (isInitialLoading && (data || error)) {
    setIsInitialLoading(false);
  }

  return { data: data || null, isInitialLoading, isLoading: !data && !error, error, mutate };
};

export { useSWRToken };