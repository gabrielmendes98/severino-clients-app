import { locationInterceptor } from './interceptors';

const requests = baseApi => ({
  request(path, options) {
    return baseApi.request(path, options);
  },

  get(path, options = {}) {
    const newPath = locationInterceptor(path, options);
    if (!newPath) {
      return Promise.reject();
    }
    return baseApi.request(newPath, { ...options, data: null });
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
