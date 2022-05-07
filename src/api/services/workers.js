import { parseParams } from 'api/util';
import { baseApi } from '../apis';

const workersEndpoints = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
  profile: workerId => `/workers/${workerId}/profile`,
  reviews: '/reviews',
  listReviews: workerId => `/reviews/${workerId}`,
};

const workersService = {
  listRecent: () => baseApi.get(workersEndpoints.listRecent),
  favorite: workerId =>
    baseApi.post(workersEndpoints.favorites, { data: { workerId } }),
  listFavorites: () => baseApi.get(workersEndpoints.favorites),
  getProfile: workerId => baseApi.get(workersEndpoints.profile(workerId)),
  createReview: data => baseApi.post(workersEndpoints.reviews, { data }),
  listReviews: (workerId, params) =>
    baseApi.get(workersEndpoints.listReviews(workerId), {
      params: parseParams(params),
    }),
};

export { workersEndpoints };
export default workersService;
