import base from './base';
import requests from './requests';

const createApi = (baseUrl, config) => {
  const baseApi = base(baseUrl, config);

  return requests(baseApi);
};

export default createApi;
