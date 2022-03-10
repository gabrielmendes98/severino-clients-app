import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
  favorite: '/favorites',
};

const professionalsService = {
  listRecent: () => baseApi.get(routes.listRecent),
  favorite: workerId => baseApi.post(routes.favorite, { workerId }),
};

export { routes as professionalsServiceRoutes };
export default professionalsService;
