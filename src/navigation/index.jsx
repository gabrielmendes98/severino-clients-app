import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from 'common/styles/theme';
import routes from './routes';
import wrapper from './Wrapper';

const { Navigator, Screen } = createBottomTabNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Navigator
      initialRouteName="Página Inicial"
      screenOptions={{
        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.palette.background.light,
        },
      }}
    >
      {routes.map((route, index) => {
        const { layout, component, ...routeProps } = route;

        const Component = wrapper({ component, layout });

        return <Screen {...routeProps} component={Component} key={index} />;
      })}
    </Navigator>
  </NavigationContainer>
);

export default Navigation;
