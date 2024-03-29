import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from 'screens/Favorites';
import Main from 'components/Main';
import configLayout from 'navigation/configLayout';
import Worker from './stacks/Worker';

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
    <Stack.Screen name="Worker" component={Worker} />
  </Stack.Navigator>
);

export default Favorites;
