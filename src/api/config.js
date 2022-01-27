import axios from 'axios';
import toast from 'common/util/toast';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
  });

  api.interceptors.response.use(
    response => response.data,
    error => {
      const message = error.response?.data?.message;
      toast.error(message);
      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
