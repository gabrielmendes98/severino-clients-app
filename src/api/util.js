import MockAdapter from 'axios-mock-adapter';
import { baseApi } from './apis';

const parseParams = ({ order, ...other }) => {
  let params = {};

  if (order) {
    params = { ...params, sort: order };
  }

  return { ...params, ...other };
};

const apiMock = () => new MockAdapter(baseApi);

export { parseParams, apiMock };
