import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useUser from 'common/contexts/User/useUser';
import theme from 'common/styles/theme';
import routes from './routes';
import wrapper from './Wrapper';
import { navigationRef } from './RootNavigation';

const { Navigator, Screen } = createBottomTabNavigator();

const Navigation = () => {
  const { signed } = useUser();

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background.light,
          },
        }}
      >
        {routes.map((route, index) => {
          const { layout, component, ...routeProps } = route;

          const Component = layout
            ? wrapper({ component, layout, ...routeProps })
            : component({ signed });

          return <Screen {...routeProps} component={Component} key={index} />;
        })}
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
