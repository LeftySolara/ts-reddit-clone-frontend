import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 3000,
});

export default axiosClient;
