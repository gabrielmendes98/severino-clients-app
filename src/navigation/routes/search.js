import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Search from 'screens/Search';
import Main from 'components/Main';

const searchRoutes = [
  {
    name: 'Buscar',
    component: Search,
    layout: Main,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons color={color} name="search" size={size} />
      ),
    },
  },
];

export default searchRoutes;
