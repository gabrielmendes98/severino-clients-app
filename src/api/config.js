import axios from 'axios';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
  });

  api.interceptors.response.use(
    response => response.data,
    error => {
      const message = error.response?.data?.message;
      console.log(message);
      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
