import { AxiosDefaults, AxiosError, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults } from 'axios';
import { ToastOptions } from 'react-toastify';
import { ComponentType, ReactNode } from 'react';
import { ToasterProps as RHToasterProps } from 'react-hot-toast';
import { ToastContainerProps as RToasterProps } from 'react-toastify';
import { ToasterProps as SnToasterProps } from 'sonner';
import { UseMutationOptions, QueryClientConfig, Query, QueryKey, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type ToasterContainer =  React.FC<RHToasterProps> | ((props: RToasterProps) => React.JSX.Element) | ((props: SnToasterProps) => JSX.Element) | null
export type packageType = 'react-hot-toast' | 'react-toastify' | 'sonner';
// Define the toast settings
export type  ToastSettings =  {
  package: "react-toastify";
  options?: RToasterProps;
 } | {
  package: 'react-hot-toast';
  options?: RHToasterProps;
} 
| {
  package: "sonner";
  options?: SnToasterProps;
}
export type Styles ={
  [key: string]: React.CSSProperties;
}
export type AxiosInstanceOptions = Omit<AxiosDefaults<any>, "headers"> & {
  headers?: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
  };
};
export interface AxiosSettings {
  axiosInstance?: AxiosInstance;
  options?: AxiosInstanceOptions;
}
export interface AxiosContextType {
  axiosInstance: AxiosInstance;
  packageName: packageType;
  errorComp?: ComponentType;
  loadingComp?: ComponentType;
  displayToast?: boolean;
  formatErrorMessage?: boolean;
}
export interface AxiosQueryConfig extends Omit<AxiosContextType, "axiosInstance" | "packageName"> {
  reactQuerySettings?: QueryClientConfig;
  axiosSettings: AxiosSettings;
  toastSettings?: ToastSettings;
}
export interface UseConfigOptions {
  customAxiosInstance?: AxiosInstance;
  displayToast?: boolean;
  formatErrorMessage?: boolean;
}
export interface AxiosQueryProviderProps {
  config: AxiosQueryConfig;
  children: ReactNode;
}
export interface CommonQueryProps {
  toastMessages?: {
    success?: string;
    error?: string;
  };
  displayToast?: boolean;
  formatErrorMessage?: boolean;
  customErrorComp?: ComponentType;
  customLoadingComp?: ComponentType;
  customAxiosInstance?: AxiosInstance;
  requestConfig?: AxiosRequestConfig;
  onError?: (error: AxiosError) => void;
  }
export interface UseMutateProps<T, R> extends CommonQueryProps {
    method: 'post' | 'put' | 'delete' | 'patch';
    route: string;
    options?:Omit<UseMutationOptions<R, Error, T>, 'onSuccess' | "onError">;
    onSuccess?: (data: R) => void;
    retryCount?: number;
  }
export interface UseQueryProps<T,R> extends CommonQueryProps {
  route: string;
  queryKey: QueryKey;
  options?:Omit<UseQueryOptions<AxiosResponse<R>, Error, R>, 'queryKey' | 'queryFn'>;
}
export interface UseInfiniteQueryProps<R>  extends CommonQueryProps {
  route: string;
  cursor:string; // cursor for pagination
  queryKey: QueryKey;
  initialPageParam: number;
  getNextPageParam: (lastPage: R, pages:R[]) => number | null;
  options?: Omit<UseInfiniteQueryOptions<R, Error>, 'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'queryKey'>;
}
export interface Result<R> {
  Loader: React.ComponentType | null;
  data: R | null;
  Error: React.ComponentType | null;
};
export interface UseInfiniteResult<R> extends Result<R[]> {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isFetching: boolean;
}
export interface UseMutateResult<T,R> extends Result<R> {
  mutate: (data: T) => void;
  mutateAsync: (data: T) => Promise<R>;
}