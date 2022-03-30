import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FavoriteContext = createContext();
FavoriteContext.displayName = 'FavoriteContext';
const { Provider } = FavoriteContext;

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

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

FavoriteProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { FavoriteContext };
export default FavoriteProvider;
