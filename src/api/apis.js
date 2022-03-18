import { API_URL } from '@env';
import createApi from './config';
import requests from './requests';

const base = createApi(API_URL, {
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  },
});

const baseApi = requests(base);

export { baseApi };
