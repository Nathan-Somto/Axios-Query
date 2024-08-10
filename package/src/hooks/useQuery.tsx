import { UseQueryResult, useQuery as useReactQuery } from "@tanstack/react-query";
import {
  errorMessageFormatter,
  notifier,
  useConfigOptions,
  validateData,
} from "../utils";
import { Result, UseQueryProps } from "../types";
import React from "react";
import { AxiosError, AxiosResponse } from "axios";

export function useQuery<R>({
  route,
  queryKey,
  customAxiosInstance,
  displayToast,
  formatErrorMessage,
  requestConfig,
  options,
  customErrorComp,
  customLoadingComp,
  onError,
  toastMessages,
}: UseQueryProps<any, AxiosResponse<R>>): Result<R> {
  const {
    axiosInstance,
    packageName,
    errorComp,
    loadingComp,
    shouldDisplayToast,
    shouldFormatErrorMessage,
  } = useConfigOptions({
    customAxiosInstance,
    displayToast,
    formatErrorMessage,
  });
  const {
    isLoading,
    isError,
    data: response,
    error,
  } = useReactQuery({
    queryKey,
    queryFn: () => axiosInstance.get(route, requestConfig),
    ...options,
  });
  React.useEffect(() => {
    if (isError && onError && error instanceof AxiosError) {
      onError(error);
    }
    if (isError && shouldFormatErrorMessage) {
      console.error("[Axios Query Error]: ", errorMessageFormatter(error));
    }
    if (isError && shouldDisplayToast) {
      notifier(packageName, "error", toastMessages?.error ?? "Error");
    }
  }, [isError, error]);
  const validData = validateData(response?.data ?? null);
  if (isLoading) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
    };
  }
  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
    };
  }
  return {
    Loader: null,
    data: validData,
    Error: null,
  };
}
type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

