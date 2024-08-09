import { useMutation } from "@tanstack/react-query";
import { UseMutateProps } from "../@types";
import { useAxiosQuery } from "../context/AxiosQueryContext";
import { errorMessageFormatter, notifier, useConfigOptions } from "../utils";
import { AxiosError } from "axios";

export function useMutate<T, R>({
  method,
  route,
  customAxiosInstance,
  requestConfig,
  toastMessages,
  formatErrorMessage = true,
  customErrorComp,
  customLoadingComp,
  options,
  retryCount = 3,
  onError,
  displayToast,
  onSuccess,
}: UseMutateProps<T, R>) {
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

  const { isPending, isError, data, mutate, ...rest } = useMutation({
    mutationFn: (data) => {
      if (method === "delete") {
        return axiosInstance.delete(route, requestConfig);
      }
      return axiosInstance[method](route, data, requestConfig);
    },
    onSuccess: (res) => {
      if (shouldDisplayToast) {
        notifier(packageName, "success", toastMessages?.success ?? "Success");
      }
      if (onSuccess) {
        onSuccess(res.data);
      }
    },
    onError: (error) => {
      if (shouldDisplayToast) {
        notifier(packageName, "error", toastMessages?.error ?? "Error");
      }
      if (onError && error instanceof AxiosError) {
        onError(error);
      }
      if (shouldFormatErrorMessage) {
        console.error("[Axios Query Error]: ", errorMessageFormatter(error));
        return;
      }
      console.error("[Axios Query Error]: ", error);
    },
    retry: retryCount ?? undefined,
    ...options,
  });

  if (isPending) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
      mutate,
      ...rest,
    };
  }
  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
      mutate,
      ...rest,
    };
  }
  return { Loader: null, data, Error: null, mutate, ...rest };
}
