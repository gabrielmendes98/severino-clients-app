import { baseApi } from './apis';

const setApiHeaders = (header, value) => {
  baseApi.defaults.headers[header] = value;
};

export { setApiHeaders };
