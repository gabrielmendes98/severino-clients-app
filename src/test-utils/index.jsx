/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react-native';
import MainProvider from 'common/contexts/Main';

const Wrapper = ({ children }) => <MainProvider>{children}</MainProvider>;

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
