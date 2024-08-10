import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AxiosQueryProviderProps } from "../types";
import { loadCss, setAxiosReqInstance } from "../utils";
import {
  axiosInstance,
  defaultConfig,
  defaultRhConfig,
  defaultRtConfig,
  defaultSnConfig,
} from "../config";
import { AxiosQueryContext } from "./AxiosQueryContext";
import { ErrorComp } from "../components/ErrorComp";
import { LoadingComp } from "../components/LoadingComp";
import { ToastContainer as RtContainer } from "react-toastify";
import { Toaster as SnToaster, ToasterProps } from "sonner";
import { Toaster as RhToaster } from "react-hot-toast";
export function AxiosQueryProvider({
  children,
  config = defaultConfig,
}: AxiosQueryProviderProps) {
  const queryClient = new QueryClient(
    config?.reactQuerySettings ?? defaultConfig.reactQuerySettings
  );
  const packageName = config.toastSettings?.package ?? "react-hot-toast";
  React.useEffect(() => {
    async function loadToaster() {
      if (!config.displayToast || !config.toastSettings) return;
      if (packageName === "react-toastify") {
        loadCss("react-toastify");
      }
    }
    loadToaster();
  }, [config.displayToast, config.toastSettings]);
  const renderToastContainer = () => {
    const toastOptions = config?.toastSettings?.options ?? null;
    switch (packageName) {
      case "react-toastify":
        return <RtContainer {...(toastOptions || defaultRtConfig)} />;
      case "react-hot-toast":
        return <RhToaster {...(toastOptions || defaultRhConfig)} />;
      case "sonner":
        return (
          <SnToaster {...((toastOptions || defaultSnConfig) as ToasterProps)} />
        );
      default:
        return null;
    }
  };
  return (
    <AxiosQueryContext.Provider
      value={{
        axiosInstance: setAxiosReqInstance(
          config?.axiosSettings?.axiosInstance ?? axiosInstance,
          config?.axiosSettings?.options
        ),
        packageName: config.toastSettings?.package ?? "react-hot-toast",
        errorComp: config.errorComp ?? ErrorComp,
        loadingComp: config.loadingComp ?? LoadingComp,
        displayToast: config.displayToast ?? true,
        formatErrorMessage: config.formatErrorMessage ?? true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        {renderToastContainer()}
      </QueryClientProvider>
    </AxiosQueryContext.Provider>
  );
}
