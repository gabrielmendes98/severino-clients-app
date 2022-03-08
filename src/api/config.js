import axios from 'axios';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import toast from 'common/util/toast';
import Loader from 'components/Loader';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
  });

  api.interceptors.request.use(
    request => {
      Loader.show();
      return request;
    },
    error => {
      Loader.hide();
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => {
      Loader.hide();
      return response.data;
    },
    error => {
      Loader.hide();
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
