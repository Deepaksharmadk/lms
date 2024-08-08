import axios from "axios";

const BASE_URL = import.meta.env.VITE_Frontend;
console.log(BASE_URL);
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
