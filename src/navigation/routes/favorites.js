import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Favorites from 'screens/Favorites';

const favoritesRoutes = [
  {
    name: 'Favoritos',
    component: Favorites,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons name="heart-o" color={color} size={size} />
      ),
    },
  },
];

export default favoritesRoutes;
