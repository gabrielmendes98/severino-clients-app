import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Favorites from 'screens/Favorites';
import Main from 'components/Main';

const favoritesRoutes = [
  {
    name: 'Favoritos',
    component: Favorites,
    layout: Main,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons color={color} name="heart-o" size={size} />
      ),
    },
  },
];

export default favoritesRoutes;
