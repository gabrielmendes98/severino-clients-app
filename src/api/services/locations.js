import { baseApi } from '../apis';

const routes = {
  search: '/locations/cities',
};

const locationsService = {
  search: value => baseApi.get(`${routes.search}/${value}`),
};

export { routes as locationsRoutes };
export default locationsService;
