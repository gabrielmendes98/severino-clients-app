import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import SearchServices from 'screens/SearchServices';
import SearchWorkers from 'screens/SearchWorkers';
import ProfessionalProfile from 'screens/ProfessionalProfile';
import ProfessionalProfileLayout from 'screens/ProfessionalProfile/Layout';
import ProfessionalReview from 'screens/ProfessionalReview';
import ProfessionalReviewsList from 'screens/ProfessionalReviewsList';
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
    layoutProps: { back: true, removeScrollView: true },
  },
  {
    name: 'ProfessionalProfile',
    component: ProfessionalProfile,
    layout: ProfessionalProfileLayout,
  },
  {
    name: 'ProfessionalReview',
    component: ProfessionalReview,
    layout: Main,
    layoutProps: { back: true },
  },
  {
    name: 'ProfessionalReviewsList',
    component: ProfessionalReviewsList,
    layout: Main,
    layoutProps: { back: true, removeScrollView: true },
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
