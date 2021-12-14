import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from './routes';
import theme from '../common/styles/theme';

const { Navigator, Screen } = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Página Inicial"
        screenOptions={{
          tabBarActiveTintColor: theme.palette.primary.main,
          tabBarShowLabel: false,
        }}
      >
        {routes.map((route, index) => (
          <Screen {...route} key={index} />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
