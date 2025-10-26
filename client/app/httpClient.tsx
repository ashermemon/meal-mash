import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpClient = axios.create({
  baseURL: "http://10.0.0.37:5000",
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
