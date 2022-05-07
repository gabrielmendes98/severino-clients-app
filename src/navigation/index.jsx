/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import theme from 'common/styles/theme';
import useUser from 'common/contexts/User/useUser';
import { navigationRef } from './RootNavigation';
import Search from './routes/Search';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
import User from './routes/User';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { signed } = useUser();

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background.light,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons color={color} name="home" size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons color={color} name="search" size={size} />
            ),
            headerShown: false,
          }}
        />
        {signed && (
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcons color={color} name="heart-o" size={size} />
              ),
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons color={color} name="user-o" size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
