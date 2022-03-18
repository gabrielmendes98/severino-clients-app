import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import toast from 'common/util/toast';
import * as RootNavigation from 'navigation/RootNavigation';
import { baseApi } from './apis';

const setApiHeaders = (header, value) => {
  baseApi.defaults.headers[header] = value;
};

const handleError = error => {
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
};

export { setApiHeaders, handleError };
