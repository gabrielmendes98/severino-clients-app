import axios from 'axios';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
  });

  api.interceptors.response.use(response => response.data);

  return api;
};

export default createApi;
