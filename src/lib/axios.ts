import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_URL,
  timeout: 2000
});

export default axiosInstance;
