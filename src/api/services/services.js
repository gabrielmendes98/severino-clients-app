import { baseApi } from '../apis';

const routes = {
  listMostSearched: '/services/most-searched',
  search: '/services?search=',
};

const servicesService = {
  listMostSearched: () => baseApi.get(routes.listMostSearched),
  search: value =>
    baseApi.get(`${routes.search}${value}`, { needLocation: true }),
};

export { routes as servicesRoutes };
export default servicesService;
