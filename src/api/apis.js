import { BASE_API_URL } from '@env';
import createApi from './config';

const baseApi = createApi(BASE_API_URL);

export { baseApi };
