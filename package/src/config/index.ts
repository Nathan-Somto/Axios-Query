import axios from "axios";
import { AxiosQueryConfig } from "../types";
import { ToasterProps as RHToasterProps } from 'react-hot-toast';
import { ToastContainerProps as RToasterProps } from 'react-toastify';
import { ToasterProps as SnToasterProps } from 'sonner';
export const axiosInstance = axios.create({
  baseURL: window.location.origin,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const defaultSnConfig:SnToasterProps = {
  position: "top-right",
  duration: 5000,
  theme: "light",
}
export const defaultRhConfig:RHToasterProps = {
  position: "top-right",
  toastOptions: {
    duration: 5000,
  },
}
export const defaultRtConfig:RToasterProps = {
  position: "top-right",
  autoClose: 5000,
}
export const defaultConfig: AxiosQueryConfig = {
  axiosSettings: {
    axiosInstance,
  },
  reactQuerySettings: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  },
  toastSettings: {
    package: "react-hot-toast",
    options: {
      position: "top-right",
      toastOptions: {
        duration: 5000,
      },
    },
  },
  displayToast: true,
  formatErrorMessage: true,
};
