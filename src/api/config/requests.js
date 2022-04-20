const requests = baseApi => ({
  ...baseApi,
  request(path, options) {
    return baseApi.request(path, options);
  },

  get(path, options) {
    return baseApi.request(path, { loader: false, ...options, data: null });
  },

  post(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'POST' });
  },

  delete(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'DELETE' });
  },

  put(path, options = {}) {
    return baseApi.request(path, { ...options, method: 'PUT' });
  },
});

export default requests;
