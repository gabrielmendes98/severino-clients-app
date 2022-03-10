import axios from 'axios';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import toast from 'common/util/toast';
import Loader from 'components/Loader';
import * as RootNavigation from 'navigation/RootNavigation';

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
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        RootNavigation.navigate('User', {
          screen: 'Login',
          params: { redirect: true },
        });
      }

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
