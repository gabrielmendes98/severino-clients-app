import React from 'react';
import userService, { usersEndpoints } from 'api/services/user';
import { apiMock } from 'api/util';
import { render, fireEvent, waitFor } from 'test-utils';
import { validationMessages } from 'common/util/yup';
import { passwordValidationMessage } from 'common/util/yup/passwordValidate';
import Login from '../index';

const login = jest.spyOn(userService, 'login');

const navigation = {
  goBack: jest.fn(),
};

beforeEach(() => {
  navigation.goBack.mockClear();
  login.mockClear();
});

describe('login', () => {
  const api = apiMock();
  api.onPost(usersEndpoints.login).reply(200, {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzA3ZGIyMzQtNWRlOS00ZjMwLWJiNmQtNjMzZjFiMGMwZDFjIiwiY3JlYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwiZW1haWwiOiJnYWJyaWVsbXNzYW50aWFnb0BnbWFpbC5jb20iLCJuYW1lIjoiR2FicmllbCBTYW50aWFnbyJ9LCJpYXQiOjE2NTE5NjIwMTUsImV4cCI6MTY1NDU1NDAxNX0.pC5KHWzkFY2NwC1JSyG3nTvlsAYkh_Ii4uhkt7ooqxo',
  });
  const data = {
    email: 'mockemail@gmail.com',
    password: 'mockpassword',
  };

  it('should go back when has redirect param', async () => {
    const route = {
      params: {
        redirect: true,
      },
    };

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={navigation} route={route} />,
    );

    fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', data.email);
    fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', data.password);
    fireEvent(getByText(/entrar/i), 'press');

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(data);
    });
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('should not go back when does not have redirect param', async () => {
    const route = {
      params: {
        redirect: false,
      },
    };

    const { getByPlaceholderText, getByText } = render(
      <Login navigation={navigation} route={route} />,
    );

    fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', data.email);
    fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', data.password);
    fireEvent(getByText(/entrar/i), 'press');

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(data);
    });
    expect(navigation.goBack).not.toHaveBeenCalled();
  });
});

describe('login validations', () => {
  const route = {
    params: {
      redirect: false,
    },
  };

  it('should validate email format', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Login navigation={navigation} route={route} />,
    );

    fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', 'dked');
    fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', '123123');
    fireEvent(getByText(/entrar/i), 'press');

    expect(await findByText(validationMessages.string.email)).toBeTruthy();
  });

  it('should require email field', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Login navigation={navigation} route={route} />,
    );

    fireEvent(getByPlaceholderText(/e-mail/i), 'onChangeText', '');
    fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', '123123');
    fireEvent(getByText(/entrar/i), 'press');

    expect(await findByText(validationMessages.mixed.required)).toBeTruthy();
  });

  it('should validate password', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <Login navigation={navigation} route={route} />,
    );

    fireEvent(
      getByPlaceholderText(/e-mail/i),
      'onChangeText',
      'teste@gmail.com',
    );
    fireEvent(getByPlaceholderText(/senha/i), 'onChangeText', '');
    fireEvent(getByText(/entrar/i), 'press');

    expect(await findByText(passwordValidationMessage)).toBeTruthy();
  });
});
