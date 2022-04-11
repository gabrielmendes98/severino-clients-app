import { parseParams } from 'api/util';
import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
  profile: workerId => `/workers/${workerId}/profile`,
  reviews: '/reviews',
  listReviews: workerId => `/reviews/${workerId}`,
};

const workersService = {
  listRecent: () => baseApi.get(routes.listRecent),
  favorite: workerId => baseApi.post(routes.favorites, { data: { workerId } }),
  listFavorites: () => baseApi.get(routes.favorites),
  getProfile: workerId => baseApi.get(routes.profile(workerId)),
  createReview: data => baseApi.post(routes.reviews, { data }),
  listReviews: (workerId, params) =>
    baseApi.get(routes.listReviews(workerId), {
      params: parseParams(params),
    }),
};

export { routes as workersServiceRoutes };
export default workersService;
