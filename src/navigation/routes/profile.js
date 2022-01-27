import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Profile from 'screens/Profile';
import SignUp from 'screens/SignUp';
import Main from 'components/Main';
import { createStack } from '../util';

const profileStackRoutes = [
  {
    name: 'ProfileChoose',
    component: Profile,
    layout: Main,
  },
  {
    name: 'SignUp',
    component: SignUp,
    layout: Main,
    back: true,
  },
];

const profileTab = {
  name: 'Profile',
  component: createStack(profileStackRoutes),
  options: {
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcons color={color} name="user-o" size={size} />
    ),
  },
};

export default profileTab;
