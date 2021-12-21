import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Profile from 'screens/Profile';

const profileRoutes = [
  {
    name: 'Perfil',
    component: Profile,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons color={color} name="user-o" size={size} />
      ),
    },
  },
];

export default profileRoutes;
