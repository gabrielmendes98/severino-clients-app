import { parseParams } from 'api/util';
import { baseApi } from '../apis';

const routes = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
  profile: workerId => `/workers/${workerId}/profile`,
  reviews: '/reviews',
  listReviews: professionalId => `/reviews/${professionalId}`,
};

const professionalsService = {
  listRecent: () => baseApi.get(routes.listRecent),
  favorite: workerId => baseApi.post(routes.favorites, { workerId }),
  listFavorites: () => baseApi.get(routes.favorites),
  getProfile: workerId => baseApi.get(routes.profile(workerId)),
  createReview: data => baseApi.post(routes.reviews, data),
  listReviews: (professionalId, params) =>
    baseApi.get(routes.listReviews(professionalId), {
      params: parseParams(params),
    }),
};

export { routes as professionalsServiceRoutes };
export default professionalsService;
