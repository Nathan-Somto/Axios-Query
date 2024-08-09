import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AxiosQueryProviderProps, ToasterContainer } from "../@types";
import { createToaster, setAxiosReqInstance } from "../utils";
import { defaultConfig } from "../config";
import { AxiosQueryContext } from "./AxiosQueryContext";
import { ErrorComp } from "../components/ErrorComp";
import { LoadingComp } from "../components/LoadingComp";
import { defaultProps } from 'react-toastify/dist/components/ToastContainer';
import { ToastContainerProps } from "react-toastify";
type ValidTheme = "light" | "dark" | "system";

// Type guard to ensure valid theme
const isValidTheme = (theme: any): theme is ValidTheme => {
  return theme === "light" || theme === "dark" || theme === "system";
};
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
      const { ToastContainer } = await createToaster(
        config.toastSettings.package
      );
      setToastContainer(ToastContainer);
    }
    loadToaster();
    return () => {
      setToastContainer(null);
    };
  }, [config.displayToast, config.toastSettings]);
  return (
    <AxiosQueryContext.Provider
      value={{
        axiosInstance: setAxiosReqInstance(
          config.axiosSettings.axiosInstance,
          config.axiosSettings.options ?? {}
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
        {ToastContainer && config.toastSettings && (
          <>
            {config.toastSettings.package === "react-toastify" && (
              <ToastContainer  />
            )}
            {config.toastSettings.package === "react-hot-toast" && (
              <ToastContainer {...config.toastSettings.options} />
            )}
            {config.toastSettings.package === "sonner" && (
              <ToastContainer {...config.toastSettings.options} />
            )}
          </>
        )}
      </QueryClientProvider>
    </AxiosQueryContext.Provider>
  );
}
