import { baseApi } from './apis';

const setApiHeaders = (header, value) => {
  baseApi.defaults.headers[header] = value;
};

const parseParams = ({ order, ...other }) => {
  let params = {};

  if (order) {
    params = { ...params, sort: order };
  }

  return { ...params, ...other };
};

export { setApiHeaders, parseParams };
