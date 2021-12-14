import React from 'react';
import Home from '../../screens/Home';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const homeRoutes = [
  {
    name: 'Página Inicial',
    component: Home,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons name="home" color={color} size={size} />
      ),
    },
  },
];

export default homeRoutes;
