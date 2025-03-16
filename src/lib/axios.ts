import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY
  },
  timeout: 2000
});

export default axiosInstance;
