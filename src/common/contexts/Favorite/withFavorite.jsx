/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
import React from 'react';
import FavoriteProvider from './Provider';

const withFavorite = Component => props =>
  (
    <FavoriteProvider>
      <Component {...props} />
    </FavoriteProvider>
  );

export default withFavorite;
