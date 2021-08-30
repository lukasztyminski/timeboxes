import axios from 'axios';

const URL_API = 'http://localhost:4000';

const makeRequestAxios = axios.create({
  baseURL: URL_API,
});

makeRequestAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.contentType = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default makeRequestAxios;
