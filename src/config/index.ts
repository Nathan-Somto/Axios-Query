import axios from "axios";
import { AxiosQueryConfig } from "../@types";

const axiosInstance = axios.create({
    baseURL: window.location.origin,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});
export const defaultConfig: AxiosQueryConfig = {
    axiosSettings: {
        axiosInstance
    },
    reactQuerySettings: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false
            }
        }
    },
    toastSettings: {
        package: 'react-hot-toast',
        options: {   
            position: 'top-right',
            toastOptions: {
                duration: 5000
            }
        }
    },
    displayToast: true,
    formatErrorMessage: true
}