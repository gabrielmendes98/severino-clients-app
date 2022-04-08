import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfessionalProfile from 'screens/ProfessionalProfile';
import ProfessionalReview from 'screens/ProfessionalReview';
import ProfessionalReviewsList from 'screens/ProfessionalReviewsList';
import ProfessionalProfileLayout from 'screens/ProfessionalProfile/Layout';
import Main from 'components/Main';
import configLayout from '../../configLayout';

const Stack = createNativeStackNavigator();

const Professional = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Profile"
      component={configLayout(ProfessionalProfile, ProfessionalProfileLayout)}
    />
    <Stack.Screen
      name="Review"
      component={configLayout(ProfessionalReview, Main, { back: true })}
    />
    <Stack.Screen
      name="ReviewsList"
      component={configLayout(ProfessionalReviewsList, Main, {
        back: true,
        removeScrollView: true,
      })}
    />
  </Stack.Navigator>
);

export default Professional;
