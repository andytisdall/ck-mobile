import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://portal.ckoakland.org/api'
    : 'http://localhost:3001/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ck-token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
