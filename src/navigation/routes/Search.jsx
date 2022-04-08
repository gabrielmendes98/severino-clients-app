import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchServices from 'screens/SearchServices';
import SearchWorkers from 'screens/SearchWorkers';
import ProfessionalProfile from 'screens/ProfessionalProfile';
import ProfessionalReview from 'screens/ProfessionalReview';
import ProfessionalReviewsList from 'screens/ProfessionalReviewsList';
import ProfessionalProfileLayout from 'screens/ProfessionalProfile/Layout';
import Main from 'components/Main';
import configLayout from 'navigation/configLayout';

const Stack = createNativeStackNavigator();

const Search = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Services"
      component={configLayout(SearchServices, Main)}
    />
    <Stack.Screen
      name="Workers"
      component={configLayout(SearchWorkers, Main, {
        back: true,
        removeScrollView: true,
      })}
    />
    {/* PROFESSIONAL */}
    <Stack.Screen
      name="ProfessionalProfile"
      component={configLayout(ProfessionalProfile, ProfessionalProfileLayout)}
    />
    <Stack.Screen
      name="ProfessionalReview"
      component={configLayout(ProfessionalReview, Main, { back: true })}
    />
    <Stack.Screen
      name="ProfessionalReviewsList"
      component={configLayout(ProfessionalReviewsList, Main, {
        back: true,
        removeScrollView: true,
      })}
    />
  </Stack.Navigator>
);

export default Search;
