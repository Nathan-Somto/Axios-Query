import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AxiosQueryProviderProps, ToasterContainer } from "../types";
import { createToaster, loadCss, setAxiosReqInstance } from "../utils";
import { axiosInstance, defaultConfig } from "../config";
import { AxiosQueryContext } from "./AxiosQueryContext";
import { ErrorComp } from "../components/ErrorComp";
import { LoadingComp } from "../components/LoadingComp";
import { ToastContainer as RtContainer } from "react-toastify";
import {Toaster as SnToaster} from "sonner"
import { Toaster as RhToaster } from "react-hot-toast";
export function AxiosQueryProvider({
  children,
  config = defaultConfig,
}: AxiosQueryProviderProps) {
  const [ToastContainer, setToastContainer] =
    React.useState<ToasterContainer>(null);
  const queryClient = new QueryClient(config.reactQuerySettings);
  React.useEffect(() => {
    async function loadToaster() {
      if (!config.displayToast || !config.toastSettings) return;
      if (config.toastSettings.package === "react-toastify") {
       loadCss("react-toastify");
      }
    }
    loadToaster();
    return () => {
      setToastContainer(null);
    };
  }, [config.displayToast, config.toastSettings]);
  const renderToastContainer = () => {
    if (!config.toastSettings) return null;

    const toastOptions = config.toastSettings.options ?? {};
    switch (config.toastSettings.package) {
      case "react-toastify":
        return <RtContainer/>;
      case "react-hot-toast":
        return <RhToaster/>;
      case "sonner":
        return <SnToaster />;
      default:
        return null;
    }
  }
  return (
    <AxiosQueryContext.Provider
      value={{
        axiosInstance: setAxiosReqInstance(
          config.axiosSettings.axiosInstance ?? axiosInstance,
          config.axiosSettings.options   
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
