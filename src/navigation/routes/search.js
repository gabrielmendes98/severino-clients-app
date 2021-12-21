import React from 'react';
import Search from 'screens/Search';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const searchRoutes = [
  {
    name: 'Buscar',
    component: Search,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons name="search" color={color} size={size} />
      ),
    },
  },
];

export default searchRoutes;
