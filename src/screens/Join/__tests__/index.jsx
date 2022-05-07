import React from 'react';
import { rawRender, fireEvent } from 'test-utils';
import Join from '../index';

const navigation = {
  navigate: jest.fn(),
};

beforeEach(() => {
  navigation.navigate.mockClear();
});

it('should be able to navigate to login screen', () => {
  const { getByText } = rawRender(<Join navigation={navigation} />);

  fireEvent(getByText(/entrar/i), 'press');
  expect(navigation.navigate).toHaveBeenCalledWith('Login');
});

it('should be able to navigate to signup screen', () => {
  const { getByText } = rawRender(<Join navigation={navigation} />);

  fireEvent(getByText(/criar conta/i), 'press');
  expect(navigation.navigate).toHaveBeenCalledWith('SignUp');
});
