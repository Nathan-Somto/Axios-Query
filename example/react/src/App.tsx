import {  AxiosQueryProvider, AxiosQueryConfig } from "axios-query";
import './App.css'
import { Todos } from './Todos';
const config: AxiosQueryConfig = {
  axiosSettings:{
    options: {
      baseURL: "https://jsonplaceholder.typicode.com",
    }
  },
  reactQuerySettings: {
  },
  toastSettings: {
    package: "react-hot-toast",
    options: {}
  },
  displayToast: true, 
  formatErrorMessage: true, 
};
function App() {
  return (
    <AxiosQueryProvider config={config}>
    <>
      <Todos />
    </>
  </AxiosQueryProvider>
  )
}

export default App
