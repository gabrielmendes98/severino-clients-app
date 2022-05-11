/* eslint-disable react/prop-types */
import React from 'react';
import { NavigationContext } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import MainProvider from 'common/contexts/Main';

const navContext = {
  isFocused: () => true,
  addListener: jest.fn(() => jest.fn()),
};

const Wrapper = ({ children }) => <MainProvider>{children}</MainProvider>;

const NavigationContextProvider = ({ children }) => (
  <NavigationContext.Provider value={navContext}>
    {children}
  </NavigationContext.Provider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react-native';
export { customRender as render, render as rawRender };
export { NavigationContextProvider };
