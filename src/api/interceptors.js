import store from 'common/util/store';
import toast from 'common/util/toast';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import * as RootNavigation from 'navigation/RootNavigation';

const locationInterceptor = options => {
  if (options.needLocation) {
    if (store.location) {
      return {
        ...options,
        params: { ...options.params, location: store.location },
      };
    }

    toast.error('Informe sua localização acima');
    return null;
  }

  return options;
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

export { locationInterceptor, handleError };
