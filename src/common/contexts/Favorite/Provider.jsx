import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FavoriteContext = createContext();
FavoriteContext.displayName = 'FavoriteContext';
const { Provider } = FavoriteContext;

const FavoriteProvider = ({ children, initialFavorites }) => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const updateFavorite = useCallback(
    (id, value) =>
      setFavorites(init => ({
        ...init,
        [id]: value,
      })),
    [],
  );

  return (
    <Provider value={{ favorites, updateFavorite, setFavorites }}>
      {children}
    </Provider>
  );
};

FavoriteProvider.defaultProps = {
  initialFavorites: {},
};

FavoriteProvider.propTypes = {
  children: PropTypes.any.isRequired,
  initialFavorites: PropTypes.object,
};

export { FavoriteContext };
export default FavoriteProvider;
