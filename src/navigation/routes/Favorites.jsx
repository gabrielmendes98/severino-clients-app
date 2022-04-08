import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from 'screens/Favorites';
import ProfessionalProfile from 'screens/ProfessionalProfile';
import ProfessionalReview from 'screens/ProfessionalReview';
import ProfessionalReviewsList from 'screens/ProfessionalReviewsList';
import ProfessionalProfileLayout from 'screens/ProfessionalProfile/Layout';
import Main from 'components/Main';
import configLayout from 'navigation/configLayout';

const Stack = createNativeStackNavigator();

const Favorites = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="List"
      component={configLayout(FavoritesScreen, Main, {
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

export default Favorites;
