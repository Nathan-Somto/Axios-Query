import { Axios, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { packageType, ToastSettings, UseConfigOptions } from "../@types";
import rhToast from 'react-hot-toast';
import { toast as snToast } from 'sonner';
import {toast as rtToast} from 'react-toastify';
import { useAxiosQuery } from "../context/AxiosQueryContext";
export  async function createToaster(packageName: ToastSettings['package']) {
    // chooses the correct package and returns the ToastContainer and also adds the options plus loading of the css
    switch (packageName) {
        case 'react-hot-toast':
            const {Toaster} = await import ('react-hot-toast');
            return {
                ToastContainer: Toaster
            }
        case 'react-toastify':
            const {ToastContainer} = await import ('react-toastify');
            await loadCss('react-toastify');
            return {
                ToastContainer
            }
        case 'sonner':
            const {Toaster: Sonner} = await import ('sonner');
            return {
                ToastContainer: Sonner
            }
        default:
            return {
                ToastContainer: null
            }
    }
}
async function loadCss(packageName: 'react-toastify') {
   return await import('react-toastify/dist/ReactToastify.css');
  }
  
export function setAxiosReqInstance(axiosInstance: AxiosInstance, options: AxiosRequestConfig): AxiosInstance {
    axiosInstance.request(options);
    return axiosInstance;
}
export function notifier(packageName:packageType, type: "success" | "error", message: string){
    switch (packageName) {
        case 'react-hot-toast':
            if(type === 'success'){
                rhToast.success(message);
            }
            if(type === 'error'){
                rhToast.error(message);
            }
            break;
        case 'react-toastify':
            if(type === 'success'){
                rtToast.success(message);
            }
            if(type === 'error'){
                rtToast.error(message);
            }
            break;
        case 'sonner':
            if(type === 'success'){
               snToast.success(message);
            }
            if(type === 'error'){
                snToast.error(message);
            }
            break;
        default:
            break;
    }
}
export function errorMessageFormatter(error: Error | AxiosError){
    if(error instanceof AxiosError){
        return error.response?.data.message;
    }
    if(error instanceof Error){
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
    if(!route.length) return route;
    if (route[route.length - 1] !== '?') {
      route += '?';
    }
  
    return route;
  }