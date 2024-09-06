import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://10.10.102.115:8080/api", // IP Mirza
  // baseURL: "http://10.10.102.137:8080/api", // IP PM Iklil
  // baseURL: "http://localhost:8080/api", // My IP
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");
    const token = JSON.parse(loggedInUser)?.data.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

