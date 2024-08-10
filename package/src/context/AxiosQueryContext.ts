import { createContext, useContext } from "react";
import { AxiosContextType } from "../types";

export const AxiosQueryContext =
  createContext<Required<AxiosContextType> | null>(null);
export const useAxiosQuery = () => {
  const context = useContext(AxiosQueryContext);
  if (!context) {
    throw new Error("useAxios must be used within AxiosProvider");
  }
  return context;
};
