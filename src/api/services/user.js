import { baseApi } from '../apis';

const routes = {
  create: '/customers',
  login: '/customers/session',
};

const usersService = {
  create: data => baseApi.post(routes.create, data),
  login: data => baseApi.post(routes.login, data),
};

export { routes as usersServiceRoutes };
export default usersService;
