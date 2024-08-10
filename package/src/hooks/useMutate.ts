import { useMutation } from "@tanstack/react-query";
import { UseMutateProps, UseMutateResult } from "../types";
import { errorMessageFormatter, notifier, useConfigOptions, validateData } from "../utils";
import { AxiosError, AxiosResponse } from "axios";

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
}: UseMutateProps<T, AxiosResponse<R>>): UseMutateResult<T, R> {
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

  const { isPending, isError, data: response, mutateAsync: rMutateAsync, mutate: rMutate, } = useMutation({
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
        onSuccess(res);
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
  const validData = validateData(response?.data ?? null);
  const mutate = (data: T) => rMutate(data);
  const mutateAsync = async (data: T) =>  (await rMutateAsync(data)).data;
  if (isPending) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
      mutate,
      mutateAsync
    };
  }
  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
      mutate,
      mutateAsync,
    };
  }
  return { Loader: null, data:validData, Error: null, mutate, mutateAsync };
}
