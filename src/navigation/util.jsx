/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import wrapper from './Wrapper';

const { Navigator, Screen } = createNativeStackNavigator();

const createStack =
  (normalRoutes, signedRoutes) =>
  ({ signed }) =>
  () =>
    (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {(signed ? signedRoutes : normalRoutes).map(
          ({ component, layout, back, ...props }, index) => {
            const Component = wrapper({ component, layout, back });
            return <Screen component={Component} key={index} {...props} />;
          },
        )}
      </Navigator>
    );

export { createStack };
