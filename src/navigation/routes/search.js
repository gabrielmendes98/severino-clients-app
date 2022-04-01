import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import SearchServices from 'screens/SearchServices';
import SearchWorkers from 'screens/SearchWorkers';
import ProfessionalProfile from 'screens/ProfessionalProfile';
import ProfessionalProfileLayout from 'screens/ProfessionalProfile/Layout';
import Main from 'components/Main';
import { createStack } from 'navigation/util';

const searchStackRoutes = [
  {
    name: 'Services',
    component: SearchServices,
    layout: Main,
  },
  {
    name: 'Workers',
    component: SearchWorkers,
    layout: Main,
    layoutProps: { back: true },
  },
  {
    name: 'ProfessionalProfile',
    component: ProfessionalProfile,
    layout: ProfessionalProfileLayout,
  },
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
