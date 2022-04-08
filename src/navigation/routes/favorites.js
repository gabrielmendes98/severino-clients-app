import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Favorites from 'screens/Favorites';
import Main from 'components/Main';

const favoritesTabs = {
  name: 'Favorites',
  component: Favorites,
  layout: Main,
  options: {
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcons color={color} name="heart-o" size={size} />
    ),
  },
  layoutProps: {
    removeScrollView: true,
  },
};

export default favoritesTabs;
