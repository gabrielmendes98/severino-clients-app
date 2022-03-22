import { baseApi } from '../apis';

const routes = {
  listMostSearched: '/services/most-searched',
  search: service => `/services?search=${service}`,
  searchWorkers: id => `/services/${id}`,
};

const servicesService = {
  listMostSearched: () => baseApi.get(routes.listMostSearched),
  search: value => baseApi.get(routes.search(value), { needLocation: true }),
  searchWorkers: id =>
    baseApi.get(routes.searchWorkers(id), { needLocation: true }),
};

export { routes as servicesRoutes };
export default servicesService;
