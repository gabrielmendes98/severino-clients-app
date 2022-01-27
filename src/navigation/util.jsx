/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import wrapper from './Wrapper';

const { Navigator, Screen } = createNativeStackNavigator();

const createStack = routes => () =>
  (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {routes.map(({ component, layout, back, ...props }, index) => {
        const Component = wrapper({ component, layout, back });
        return <Screen component={Component} key={index} {...props} />;
      })}
    </Navigator>
  );

export { createStack };
