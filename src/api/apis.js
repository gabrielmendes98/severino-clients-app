import { API_URL, IBGE_API_URL } from '@env';
import createApi from './config';

const baseApi = createApi(API_URL, {
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  },
});
const ibgeApi = createApi(IBGE_API_URL);

export { baseApi, ibgeApi };
