import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Profile from 'screens/Profile';
import Main from 'components/Main';

const profileRoutes = [
  {
    name: 'Perfil',
    component: Profile,
    layout: Main,
    options: {
      tabBarIcon: ({ color, size }) => (
        <FontAwesomeIcons color={color} name="user-o" size={size} />
      ),
    },
  },
];

export default profileRoutes;
