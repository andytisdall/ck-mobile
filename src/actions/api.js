import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const baseURL = 'https://portal.ckoakland.org
const baseURL = 'http://192.168.0.104:3001/api';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('ck-token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
