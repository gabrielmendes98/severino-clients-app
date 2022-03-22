import store from 'common/util/store';
import toast from 'common/util/toast';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import * as RootNavigation from 'navigation/RootNavigation';

const locationInterceptor = (path, options) => {
  if (options.needLocation) {
    if (store.location) {
      if (path.includes('?')) {
        path = `${path}&location=${store.location}`;
      } else {
        path = `${path}?location=${store.location}`;
      }
      return path;
    }

    toast.error('Informe sua localização acima');
    return null;
  }
  console.log(path);

  return path;
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
