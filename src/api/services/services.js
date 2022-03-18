import { baseApi } from '../apis';

const routes = {
  listMostSearched: '/general-services/most-searched',
  search: '/general-services?search=',
};

const servicesService = {
  listMostSearched: () => baseApi.get(routes.listMostSearched),
  search: value =>
    baseApi.get(`${routes.search}${value}`, { needLocation: true }),
};

export { routes as servicesRoutes };
export default servicesService;
