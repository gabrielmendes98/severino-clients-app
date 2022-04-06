import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Join from 'screens/Join';
import SignUp from 'screens/SignUp';
import Profile from 'screens/Profile';
import Login from 'screens/Login';
import ChangePassword from 'screens/ChangePassword';
import Main from 'components/Main';
import { createStack } from '../util';

const profileStackRoutes = [
  {
    name: 'Join',
    component: Join,
    layout: Main,
  },
  {
    name: 'SignUp',
    component: SignUp,
    layout: Main,
    layoutProps: { back: true },
  },
  {
    name: 'Login',
    component: Login,
    layout: Main,
    layoutProps: { back: true },
  },
];

const signedProfileStackRoutes = [
  {
    name: 'Profile',
    component: Profile,
    layout: Main,
  },
  {
    name: 'ChangePassword',
    component: ChangePassword,
    layout: Main,
    layoutProps: { back: true },
  },
];

const profileTab = {
  name: 'User',
  component: createStack(profileStackRoutes, signedProfileStackRoutes),
  options: {
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcons color={color} name="user-o" size={size} />
    ),
  },
};

export default profileTab;
