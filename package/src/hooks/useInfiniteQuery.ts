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
  validateData,
} from "../utils";
import { UseInfiniteQueryProps, UseInfiniteResult } from "../types";
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
  initialPageParam, 
}: UseInfiniteQueryProps<AxiosResponse<R>>): UseInfiniteResult<R> {
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
  const queryFn: QueryFunction<AxiosResponse<R>, QueryKey, unknown> = async ({
    pageParam,
  }) => {
    const response = await axiosInstance.get(
      `${addQuestionMarkToRoute(route)}${cursor}=${pageParam}`,
      requestConfig
    );
    return response;
  };
  const {
    isLoading,
    isError,
    data: response,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
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
  const validData = validateData(response?.data);
  if (isLoading) {
    return {
      Loader: customLoadingComp ?? loadingComp,
      data: null,
      Error: null,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage
    };
  }

  if (isError) {
    return {
      Loader: null,
      data: null,
      Error: shouldDisplayToast ? null : customErrorComp ?? errorComp,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage
    };
  }

  return {
    Loader: null,
    data: [validData],
    Error: null,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  };
}
