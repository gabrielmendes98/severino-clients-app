import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import SearchServices from 'screens/SearchServices';
import Main from 'components/Main';
import { createStack } from 'navigation/util';

const searchStackRoutes = [
  {
    name: 'Services',
    component: SearchServices,
    layout: Main,
  },
  // {
  //   name: 'Professionals',
  //   component: SignUp,
  //   layout: Main,
  //   back: true,
  // },
];

const searchTab = {
  name: 'Search',
  component: createStack(searchStackRoutes),
  options: {
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcons color={color} name="search" size={size} />
    ),
  },
};

export default searchTab;
