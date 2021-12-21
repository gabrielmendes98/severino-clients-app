import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from 'common/styles/theme';
import routes from './routes';

const { Navigator, Screen } = createBottomTabNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Navigator
      initialRouteName="Página Inicial"
      screenOptions={{
        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {routes.map((route, index) => (
        <Screen {...route} key={index} />
      ))}
    </Navigator>
  </NavigationContainer>
);

export default Navigation;
