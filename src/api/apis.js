import { API_URL } from '@env';
import createApi from './config';

const baseApi = createApi(API_URL);

export { baseApi };
