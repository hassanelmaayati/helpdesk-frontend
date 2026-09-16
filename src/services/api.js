import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    error.message = data?.error || data?.err || error.message;
    return Promise.reject(error);
  }
);

export default api;
