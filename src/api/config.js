import axios from 'axios';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import loader from 'common/util/loader';
import toast from 'common/util/toast';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
  });

  api.interceptors.request.use(
    request => {
      loader.show();
      return request;
    },
    error => {
      loader.hide();
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => {
      loader.hide();
      return response.data;
    },
    error => {
      loader.hide();
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
