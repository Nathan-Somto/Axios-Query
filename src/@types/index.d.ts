import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ReactQueryConfig } from 'react-query';
import { ToastOptions } from 'react-toastify';
import { ComponentType, ReactNode } from 'react';
import { ToasterProps as RHToasterProps } from 'react-hot-toast';
import { ToastContainerProps as RToasterProps } from 'react-toastify';

import { ToasterProps as SnToasterProps } from 'sonner';
import { UseMutationOptions, QueryClientConfig, Query, QueryKey, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
type ToasterContainer =  React.FC<RHToasterProps> | ((props: RToasterProps) => React.JSX.Element) | ((props: SnToasterProps) => JSX.Element) | null
type packageType = 'react-hot-toast' | 'react-toastify' | 'sonner';
// Define the toast settings
type  ToastSettings =  {
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


interface AxiosSettings {
  axiosInstance: AxiosInstance;
  options?: AxiosRequestConfig;
}
interface AxiosContextType {
  axiosInstance: AxiosInstance;
  packageName: packageType;
  errorComp?: ComponentType;
  loadingComp?: ComponentType;
  displayToast?: boolean;
  formatErrorMessage?: boolean;
}
interface AxiosQueryConfig extends Omit<AxiosContextType, "axiosInstance" | "packageName"> {
  reactQuerySettings?: QueryClientConfig;
  axiosSettings: AxiosSettings;
  toastSettings?: ToastSettings;
}
interface UseConfigOptions {
  customAxiosInstance?: AxiosInstance;
  displayToast?: boolean;
  formatErrorMessage?: boolean;
}
interface AxiosQueryProviderProps {
  config: AxiosQueryConfig;
  children: ReactNode;
}
interface CommonQueryProps {
  toastMessages?: {
    success?: string;
    error?: string;
  };
  displayToast: boolean;
  formatErrorMessage: boolean;
  customErrorComp?: ComponentType;
  customLoadingComp?: ComponentType;
  customAxiosInstance?: AxiosInstance;
  requestConfig?: AxiosRequestConfig;
  onError?: (error: AxiosError) => void;
  }
  interface UseMutateProps<T, R> extends CommonQueryProps {
    method: 'post' | 'put' | 'delete' | 'patch';
    route: string;
    options?:Omit<UseMutationOptions<AxiosResponse<R>, Error, T>, 'onSuccess' | "onError">;
    onSuccess?: (data: R) => void;
    retryCount?: number;
  }
interface UseQueryProps<R> extends CommonQueryProps {
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
