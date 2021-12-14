import favoritesRoutes from './favorites';
import homeRoutes from './home';
import profileRoutes from './profile';
import searchRoutes from './search';

const routes = [
  ...homeRoutes,
  ...searchRoutes,
  ...favoritesRoutes,
  ...profileRoutes,
];

export default routes;
