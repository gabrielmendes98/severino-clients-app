import { baseApi } from '../apis';

const endpoints = {
  search: cityName => `/locations/cities/${cityName}`,
};

const locationsService = {
  search: cityName => baseApi.get(endpoints.search(cityName)),
};

export { endpoints as locationsEndpoints };
export default locationsService;
