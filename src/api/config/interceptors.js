import Toast from 'common/util/toast';
import { DEFAULT_ERROR_MESSAGE } from 'common/constants';
import * as RootNavigation from 'navigation/RootNavigation';

const handleError = (error, { toast = true }) => {
  const message = error.response?.data?.message;
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    RootNavigation.navigate('User', {
      screen: 'Login',
      params: { redirect: true },
    });
    Toast.error('Você precisa estar logado para realizar essa ação');
  } else if (toast) {
    if (message) {
      Toast.error(message);
    } else {
      Toast.error(DEFAULT_ERROR_MESSAGE);
    }
  }

  return Promise.reject({ ...error, status, message });
};
export { handleError };
