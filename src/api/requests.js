import store from 'common/util/store';
import toast from 'common/util/toast';

const requests = baseApi => ({
  request(path, options) {
    return baseApi.request(path, options);
  },

  get(path, options = {}) {
    if (options.needLocation) {
      if (store.location) {
        path = `${path}&location=${store.location}`;
      } else {
        toast.error('Informe sua localização acima');
        return Promise.reject();
      }
    }

    return baseApi.request(path, { ...options, data: null });
  },

  post(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'POST' });
  },

  delete(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'DELETE' });
  },

  update(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'PUT' });
  },
});

export default requests;
