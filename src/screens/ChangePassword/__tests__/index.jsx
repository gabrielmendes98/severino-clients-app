import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { act } from 'react-test-renderer';
import { render, fireEvent } from 'test-utils';
import { apiMock } from 'api/util';
import usersService, { usersEndpoints } from 'api/services/user';
import ChangePassword from '../index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));

it('should be able to fill form and submit. then receive success message and redirect to home', async () => {
  const usersServiceSpy = jest.spyOn(usersService, 'update');
  const data = {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
    newPasswordConfirm: 'newPassword',
  };
  const api = apiMock();
  api.onPut(usersEndpoints.favorites).reply(200, {});

  const { getByPlaceholderText, getByText, findByPlaceholderText } = render(
    <ChangePassword />,
  );

  fireEvent(
    await findByPlaceholderText(/^senha atual$/i),
    'onChangeText',
    data.currentPassword,
  );
  fireEvent(
    getByPlaceholderText(/^nova senha$/i),
    'onChangeText',
    data.newPassword,
  );
  fireEvent(
    getByPlaceholderText(/^confirme a nova senha$/i),
    'onChangeText',
    data.newPasswordConfirm,
  );

  await act(async () => {
    await fireEvent(getByText(/salvar/i), 'press');
  });

  expect(usersServiceSpy).toHaveBeenCalledWith(data);
  expect(getByText(/senha alterada com sucesso/i)).toBeTruthy();
  expect(navigate).toHaveBeenCalledWith('Home');
});

it('should show validation error when new password confirmation does not match', async () => {
  const data = {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
    newPasswordConfirm: 'newPasswordWrong',
  };

  const { getByPlaceholderText, getByText, findByPlaceholderText } = render(
    <ChangePassword />,
  );

  fireEvent(
    await findByPlaceholderText(/^senha atual$/i),
    'onChangeText',
    data.currentPassword,
  );
  fireEvent(
    getByPlaceholderText(/^nova senha$/i),
    'onChangeText',
    data.newPassword,
  );
  fireEvent(
    getByPlaceholderText(/^confirme a nova senha$/i),
    'onChangeText',
    data.newPasswordConfirm,
  );

  await act(async () => {
    await fireEvent(getByText(/salvar/i), 'press');
  });

  expect(getByText(/as senhas devem corresponder/i)).toBeTruthy();
});
