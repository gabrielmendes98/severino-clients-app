import { API_URL, IBGE_API_URL } from '@env';
import createApi from './config';

const baseApi = createApi(API_URL);
const ibgeApi = createApi(IBGE_API_URL);

export { baseApi, ibgeApi };
