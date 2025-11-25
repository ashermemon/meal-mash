import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
const API_URL = __DEV__
  ? "http://127.0.0.1:5000"          // local
  : "https://meal-mash.onrender.com/"; // deployed backend
*/

const API_URL = "https://meal-mash.onrender.com/";

const httpClient = axios.create({
  baseURL: API_URL
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
