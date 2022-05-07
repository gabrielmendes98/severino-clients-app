import { parseParams } from '../util';
import { baseApi } from '../apis';

const servicesEndpoints = {
  listMostSearched: '/services/most-searched',
  search: service => `/services?search=${service}`,
  searchWorkers: id => `/services/${id}`,
};

const servicesService = {
  listMostSearched: () => baseApi.get(servicesEndpoints.listMostSearched),
  search: value =>
    baseApi.get(servicesEndpoints.search(value), { needLocation: true }),
  searchWorkers: (id, params) =>
    baseApi.get(servicesEndpoints.searchWorkers(id), {
      needLocation: true,
      params: parseParams(params),
    }),
};

export { servicesEndpoints };
export default servicesService;
