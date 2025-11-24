import axios from "axios";

// اگر .env نبود، fallback بده
const BASE_URL = process.env.REACT_APP_API_URL || "http://193.151.150.156/api";

const API = axios.create({
  baseURL: 'http://193.151.150.156/api'
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
