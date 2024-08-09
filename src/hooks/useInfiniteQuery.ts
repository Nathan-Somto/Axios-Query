import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery as useReactInfiniteQuery,
} from "@tanstack/react-query";
import {
  addQuestionMarkToRoute,
  errorMessageFormatter,
  notifier,
  useConfigOptions,
} from "../utils";
import { UseInfiniteQueryProps } from "../@types";
import React from "react";
import { AxiosError, AxiosResponse } from "axios";

export function useInfiniteQuery<R>({
  route,
  cursor,
  queryKey,
  customAxiosInstance,
  displayToast,
  formatErrorMessage,
  requestConfig,
  options,
  customErrorComp,
  customLoadingComp,
  getNextPageParam,
  onError,
  toastMessages,
  initialPageParam, // Add this line
}: UseInfiniteQueryProps<R>) {
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
  const queryFn: QueryFunction<R, QueryKey, unknown> = async ({
    pageParam,
  }) => {
    const response = await axiosInstance.get(
      `${addQuestionMarkToRoute(route)}${cursor}=${pageParam}`,
      requestConfig
    );
    return response.data as R;
  };
  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    ...rest
  } = useReactInfiniteQuery({
    initialPageParam,
    queryKey,
    queryFn,
    getNextPageParam: (lastPage, pages) => getNextPageParam(lastPage, pages),
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

  if (isLoading) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
      fetchNextPage,
      hasNextPage,
      ...rest,
    };
  }

  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
      fetchNextPage,
      hasNextPage,
      ...rest,
    };
  }

  return {
    Loader: null,
    data,
    Error: null,
    fetchNextPage,
    hasNextPage,
    ...rest,
  };
}
