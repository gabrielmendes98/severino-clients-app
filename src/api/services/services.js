import { baseApi } from '../apis';

const routes = {
  listMostSearched: '/general-services/most-searched',
};

const servicesService = {
  listMostSearched: () => baseApi.get(routes.listMostSearched),
};

export { routes as servicesRoutes };
export default servicesService;
