import axios from 'axios';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
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

      if (message) {
        toast.error(message);
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
