import { useQuery as useReactQuery } from "@tanstack/react-query";
import { errorMessageFormatter, notifier, useConfigOptions } from "../utils";
import { UseQueryProps } from "../@types";
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
}: UseQueryProps<R>) {
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
  const { isLoading, isError, data, error, ...rest } = useReactQuery({
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
  }}, [isError, error]);
  if (isLoading) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
      ...rest,
    };
  }
  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
      ...rest,
    };
  }
  return { Loader: null, data, Error: null, ...rest };
}
