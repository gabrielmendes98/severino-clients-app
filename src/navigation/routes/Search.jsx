import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchServices from 'screens/SearchServices';
import SearchWorkers from 'screens/SearchWorkers';
import Main from 'components/Main';
import configLayout from 'navigation/configLayout';
import Worker from './stacks/Worker';

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
    <Stack.Screen name="Worker" component={Worker} />
  </Stack.Navigator>
);

export default Search;
