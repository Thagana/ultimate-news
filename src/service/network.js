import axios from 'axios';
import configs from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = '';

const instance = axios.create({
  validateStatus: (status) => {
    let correct = false;

    if (status >= 200 && status < 300) {
      correct = true;
    } else if (
      status === 401 ||
      status === 400 ||
      status === 403 ||
      status === 503 ||
      status === 422
    ) {
      correct = true;
    }

    return correct;
  },
})
  
instance.interceptors.request.use(async config => {
  if (config.url && config.url.charAt(0) === '/') {
    config.url = `${baseURL}${config.url}`;
  }
  const token = await AsyncStorage.getItem('token') || "";
  config.headers.authorization = `Bearer ${token}`;

  return config;
}, error => Promise.reject(error));
  
instance.interceptors.request.use(async config => {
    const user = await AsyncStorage.getItem('token') || "";
    const baseURL = `${configs['APPLICATION_URL']}`
    const token = user;
    if (config.url && config.url.charAt(0) === '/') {
      config.url = `${baseURL}${config.url}`;
    }
    
    config.headers.authorization = `Bearer ${token}`;
   
    return config;
   }, error => Promise.reject(error));


   export default instance;