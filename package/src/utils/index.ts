import { Axios, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosInstanceOptions, packageType, ToastSettings, UseConfigOptions } from "../types";
import rhToast from "react-hot-toast";
import { toast as snToast } from "sonner";
import { toast as rtToast } from "react-toastify";
import { useAxiosQuery } from "../context/AxiosQueryContext";
export async function createToaster(packageName: ToastSettings["package"]) {
  try {
    switch (packageName) {
      case "react-hot-toast":
        const { Toaster: HotToastToaster } = await import("react-hot-toast");
        return {
          ToastContainer: HotToastToaster,
        };
      case "react-toastify":
        const { ToastContainer: ReactToastifyContainer } = await import("react-toastify");
        await loadCss("react-toastify");
        return {
          ToastContainer: ReactToastifyContainer,
        };
      case "sonner":
        const { Toaster: SonnerToaster } = await import("sonner");
        return {
          ToastContainer: SonnerToaster,
        };
      default:
        return {
          ToastContainer: null,
        };
    }
  } catch (error) {
    console.error("Failed to load toaster package:", error);
    return {
      ToastContainer: null,
    };
  }
}

export async function loadCss(packageName: "react-toastify") {
  return await import("react-toastify/dist/ReactToastify.css");
}

export function setAxiosReqInstance(
  axiosInstance: AxiosInstance,
  options: AxiosInstanceOptions
): AxiosInstance {
  if (axiosInstance) {
    Object.keys(options ?? {}).forEach((key) => {
      axiosInstance.defaults[key] = options[key];
    });
  }
  return axiosInstance;
}
export function notifier(
  packageName: packageType,
  type: "success" | "error",
  message: string
) {
  switch (packageName) {
    case "react-hot-toast":
      if (type === "success") {
        rhToast.success(message);
      }
      if (type === "error") {
        rhToast.error(message);
      }
      break;
    case "react-toastify":
      if (type === "success") {
        rtToast.success(message);
      }
      if (type === "error") {
        rtToast.error(message);
      }
      break;
    case "sonner":
      if (type === "success") {
        snToast.success(message);
      }
      if (type === "error") {
        snToast.error(message);
      }
      break;
    default:
      break;
  }
}
export function errorMessageFormatter(error: Error | AxiosError) {
  if (error instanceof AxiosError) {
    return error.response?.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return error;
}

export function useConfigOptions({
  customAxiosInstance,
  displayToast,
  formatErrorMessage,
}: UseConfigOptions) {
  const {
    axiosInstance: defaultAxiosInstance,
    packageName,
    errorComp,
    loadingComp,
    displayToast: globalDT,
    formatErrorMessage: globalFEM,
  } = useAxiosQuery();

  const axiosInstance = customAxiosInstance || defaultAxiosInstance;
  const shouldDisplayToast = displayToast ?? globalDT;
  const shouldFormatErrorMessage = formatErrorMessage ?? globalFEM;

  return {
    axiosInstance,
    packageName,
    errorComp,
    loadingComp,
    shouldDisplayToast,
    shouldFormatErrorMessage,
  };
}
export function addQuestionMarkToRoute(route: string): string {
  route = route.trim();
  if (!route.length) return route;
  if (route[route.length - 1] !== "?") {
    route += "?";
  }

  return route;
}
export function validateData<T>(data: T | null): T | null{
  const isObjectOrArray = data !== null && (typeof data === 'object' || Array.isArray(data));
  return isObjectOrArray ? data : null;
}
export function injectKeyframes() {
  if (document.getElementById('keyframes-injector')) return;

  const style = document.createElement('style');
  style.id = 'keyframes-injector';
  style.type = 'text/css';
  style.innerHTML = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}
