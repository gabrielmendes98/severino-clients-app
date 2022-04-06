import { baseApi } from '../apis';

const routes = {
  customers: '/customers',
  login: '/customers/session',
};

const usersService = {
  create: data => baseApi.post(routes.customers, data),
  login: data => baseApi.post(routes.login, data),
  update: data => baseApi.put(routes.customers, data),
};

export { routes as usersServiceRoutes };
export default usersService;
