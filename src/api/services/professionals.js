import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
};

const professionalsService = {
  listRecent: () => baseApi.get(routes.listRecent),
  favorite: workerId => baseApi.post(routes.favorites, { workerId }),
  listFavorites: () => baseApi.get(routes.favorites),
};

export { routes as professionalsServiceRoutes };
export default professionalsService;
