import { locationInterceptor } from './interceptors';

const requests = baseApi => ({
  request(path, options) {
    return baseApi.request(path, options);
  },

  get(path, options = {}) {
    const newOptions = locationInterceptor(options);
    if (!newOptions) {
      return Promise.reject();
    }

    return baseApi.request(path, { ...newOptions, data: null });
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

  ...baseApi,
});

export default requests;
