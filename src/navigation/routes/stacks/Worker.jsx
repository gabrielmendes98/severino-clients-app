import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkerProfile from 'screens/WorkerProfile';
import WorkerReview from 'screens/WorkerReview';
import WorkerReviewsList from 'screens/WorkerReviewsList';
import WorkerProfileLayout from 'screens/WorkerProfile/Layout';
import Main from 'components/Main';
import configLayout from '../../configLayout';

const Stack = createNativeStackNavigator();

const Worker = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Profile"
      component={configLayout(WorkerProfile, WorkerProfileLayout)}
    />
    <Stack.Screen
      name="Review"
      component={configLayout(WorkerReview, Main, { back: true })}
    />
    <Stack.Screen
      name="ReviewsList"
      component={configLayout(WorkerReviewsList, Main, {
        back: true,
        removeScrollView: true,
      })}
    />
  </Stack.Navigator>
);

export default Worker;
