import { parseParams } from 'api/util';
import { baseApi } from '../apis';

const endpoints = {
  listRecent: '/workers/recent',
  favorites: '/favorites',
  profile: workerId => `/workers/${workerId}/profile`,
  reviews: '/reviews',
  listReviews: workerId => `/reviews/${workerId}`,
};

const workersService = {
  listRecent: () => baseApi.get(endpoints.listRecent),
  favorite: workerId =>
    baseApi.post(endpoints.favorites, { data: { workerId } }),
  listFavorites: () => baseApi.get(endpoints.favorites),
  getProfile: workerId => baseApi.get(endpoints.profile(workerId)),
  createReview: data => baseApi.post(endpoints.reviews, { data }),
  listReviews: (workerId, params) =>
    baseApi.get(endpoints.listReviews(workerId), {
      params: parseParams(params),
    }),
};

export { endpoints as workersEndpoints };
export default workersService;
