import { baseApi } from '../apis';

const usersEndpoints = {
  customers: '/customers',
  login: '/customers/session',
};

const usersService = {
  create: data => baseApi.post(usersEndpoints.customers, { data }),
  login: data => baseApi.post(usersEndpoints.login, { data }),
  update: data => baseApi.put(usersEndpoints.customers, { data }),
};

export { usersEndpoints };
export default usersService;
