import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Home';
import SearchWorkers from 'screens/SearchWorkers';
import Main from 'components/Main';
import configLayout from '../configLayout';
import Worker from './stacks/Worker';

const Stack = createNativeStackNavigator();

const Home = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Presentation"
      component={configLayout(HomeScreen, Main)}
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

export default Home;
