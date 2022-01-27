import { baseApi } from '../apis';

const routes = {
  create: '/customers',
};

const usersService = {
  create: data => baseApi.post(routes.create, { data }),
};

export { routes as usersServiceRoutes };
export default usersService;
