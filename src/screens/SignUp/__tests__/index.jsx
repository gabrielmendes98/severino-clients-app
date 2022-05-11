import React from 'react';
import { Provider } from 'common/contexts/User';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import { validationMessages } from 'common/util/yup';
import { passwordValidationMessage } from 'common/util/yup/passwordValidate';
import SignUp from '../index';

it('should be able to sign up', async () => {
  const signUp = jest.fn();
  const data = {
    name: 'name',
    email: 'email@gmail.com',
    password: 'password',
  };
  const { getByPlaceholderText, getByText } = rawRender(
    <Provider value={{ signUp }}>
      <SignUp />
    </Provider>,
  );

  fireEvent(getByPlaceholderText(/nome/i), 'onChangeText', data.name);
  fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', data.email);
  fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', data.password);
  fireEvent(getByText(/criar conta/i), 'press');

  await waitFor(() => {
    expect(signUp).toHaveBeenCalledWith(data);
  });
});

it('should validate required form fields', async () => {
  const signUp = jest.fn();
  const { getByText, getByTestId, findByTestId } = rawRender(
    <Provider value={{ signUp }}>
      <SignUp />
    </Provider>,
  );
  fireEvent(getByText(/criar conta/i), 'press');

  expect(await findByTestId('name-input-error')).toHaveTextContent(
    validationMessages.mixed.required,
  );
  expect(getByTestId('email-input-error')).toHaveTextContent(
    validationMessages.mixed.required,
  );
  expect(getByTestId('password-input-error')).toHaveTextContent(
    passwordValidationMessage,
  );
});

it('should validate email format', async () => {
  const signUp = jest.fn();
  const { getByText, findByTestId, getByPlaceholderText } = rawRender(
    <Provider value={{ signUp }}>
      <SignUp />
    </Provider>,
  );
  fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', 'ddd');
  fireEvent(getByText(/criar conta/i), 'press');

  expect(await findByTestId('email-input-error')).toHaveTextContent(
    validationMessages.string.email,
  );
});
