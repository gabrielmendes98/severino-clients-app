import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
  profile: workerId => `/workers/${workerId}/profile`,
  reviews: '/reviews',
};

const professionalsService = {
  listRecent: () => baseApi.get(routes.listRecent),
  favorite: workerId => baseApi.post(routes.favorites, { workerId }),
  listFavorites: () => baseApi.get(routes.favorites),
  getProfile: workerId => baseApi.get(routes.profile(workerId)),
  createReview: data => baseApi.post(routes.reviews, data),
};

export { routes as professionalsServiceRoutes };
export default professionalsService;
