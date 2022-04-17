import React from 'react';
import { View } from 'react-native';
import { render, act } from 'test-utils';
import toast from '../toast';

jest.mock('react-native-toast-message', () =>
  jest.requireActual('react-native-toast-message'),
);

it('toast error should show message on screen', async () => {
  const errorMessage = 'error message test';
  const { findByText } = render(<View></View>);
  act(() => {
    toast.error(errorMessage);
  });
  const text = await findByText(errorMessage);
  expect(text).toBeTruthy();
});

it('toast success should show message on screen', async () => {
  const successMessage = 'success message test';
  const { findByText } = render(<View></View>);
  act(() => {
    toast.success(successMessage);
  });
  const text = await findByText(successMessage);
  expect(text).toBeTruthy();
});
