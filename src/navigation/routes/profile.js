import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Profile from 'screens/Profile';

const profileRoutes = [
  {
    name: 'Perfil',
    component: Profile,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons name="user-o" color={color} size={size} />
      ),
    },
  },
];

export default profileRoutes;
