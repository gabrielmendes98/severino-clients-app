import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'common/contexts/User';
import { rawRender, fireEvent } from 'test-utils';
import Profile from '../index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));

it('should be able to logout', () => {
  const logout = jest.fn();
  const { getByText } = rawRender(
    <Provider value={{ logout, user: {} }}>
      <Profile />
    </Provider>,
  );

  fireEvent(getByText(/sair/i), 'press');
  expect(logout).toHaveBeenCalled();
});

it('should be able to navigate to change password screen', () => {
  const { getByText } = rawRender(
    <Provider value={{ logout: jest.fn(), user: {} }}>
      <Profile />
    </Provider>,
  );

  fireEvent(getByText(/mudar senha/i), 'press');
  expect(navigate).toHaveBeenCalledWith('User', {
    screen: 'ChangePassword',
  });
});

it('should display user name on screen', () => {
  const userName = 'user test name';
  const { getByText } = rawRender(
    <Provider value={{ logout: jest.fn(), user: { name: userName } }}>
      <Profile />
    </Provider>,
  );

  expect(getByText(new RegExp(userName, 'i'))).toBeTruthy();
});
