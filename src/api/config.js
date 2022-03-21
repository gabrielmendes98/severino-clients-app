import axios from 'axios';
import Loader from 'components/Loader';
import { handleError } from './interceptors';

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
      handleError(error);
      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
