import axios from 'axios';
import defaultsDeep from 'lodash.defaultsdeep';
import store from 'common/util/store';
import toast from 'common/util/toast';
import Loader from 'components/Loader';
import { handleError } from './interceptors';

const getConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.jwt,
  },
  loader: true,
});

const base = (baseURL, config = {}) => {
  const axiosApi = axios.create({
    mode: 'cors',
    baseURL,
    ...config,
  });

  axiosApi.request = (path, options) => {
    console.log(options);
    const mergedOptions = defaultsDeep(options, getConfig());
    if (mergedOptions.loader) {
      Loader.show();
    }

    if (mergedOptions.needLocation) {
      if (store.location) {
        if (mergedOptions.params) {
          mergedOptions.params.location = store.location;
        } else {
          mergedOptions.params = { location: store.location };
        }
      } else {
        toast.error('Informe sua localização acima');
        return Promise.reject();
      }
    }

    return axiosApi(path, mergedOptions)
      .then(resp => (mergedOptions.respHeaders ? resp : resp.data))
      .catch(error => handleError(error, mergedOptions))
      .finally(() => mergedOptions.loader && Loader.hide());
  };

  return axiosApi;
};

export default base;
