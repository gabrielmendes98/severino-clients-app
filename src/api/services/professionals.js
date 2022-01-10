import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
};

const professionalsService = {
  listRecent: () => baseApi.get(routes.listRecent),
};

export { routes as professionalsServiceRoutes };
export default professionalsService;
