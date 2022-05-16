import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button } from 'react-native';
import * as storage from 'common/util/storage';
import toast from 'common/util/toast';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import usersService, { usersEndpoints } from 'api/services/user';
import store from 'common/util/store';
import { apiMock } from 'api/util';
import useUser from '../useUser';
import UserProvider from '../index';

describe('with initial user', () => {
  beforeAll(async () => {
    await AsyncStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzA3ZGIyMzQtNWRlOS00ZjMwLWJiNmQtNjMzZjFiMGMwZDFjIiwiY3JlYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwiZW1haWwiOiJnYWJyaWVsbXNzYW50aWFnb0BnbWFpbC5jb20iLCJuYW1lIjoiR2FicmllbCBTYW50aWFnbyJ9LCJpYXQiOjE2NTE5NjIwMTUsImV4cCI6MTY1NDU1NDAxNX0.pC5KHWzkFY2NwC1JSyG3nTvlsAYkh_Ii4uhkt7ooqxo',
    );
    // decoded token:
    // {
    //   "user": {
    //     "id": "707db234-5de9-4f30-bb6d-633f1b0c0d1c",
    //     "createdAt": "2021-12-30T20:21:33.570Z",
    //     "updatedAt": "2021-12-30T20:21:33.570Z",
    //     "email": "gabrielmssantiago@gmail.com",
    //     "name": "Gabriel Santiago"
    //   },
    //   "iat": 1651962015,
    //   "exp": 1654554015
    // }
  });

  it('should get saved user from storage', async () => {
    const Component = () => {
      const { user } = useUser();

      return (
        <View>
          <Text>{user?.name}</Text>
        </View>
      );
    };
    const { findByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    expect(await findByText('Gabriel Santiago')).toBeTruthy();
  });

  it('should be able to see if user is signed', async () => {
    const Component = () => {
      const { signed } = useUser();

      return (
        <View>
          <Text>{String(signed)}</Text>
        </View>
      );
    };
    const { findByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    expect(await findByText('true')).toBeTruthy();
  });

  it('should be able to logout, clear user in context and clear token in storage and store', async () => {
    const buttonTitle = 'logout';
    const spy = jest
      .spyOn(storage, 'removeToken')
      .mockImplementation(() => Promise.resolve());

    const Component = () => {
      const { user, logout } = useUser();

      return (
        <View>
          <Text>{String(user?.name)}</Text>
          <Button title={buttonTitle} onPress={logout} />
        </View>
      );
    };

    const { findByText, getByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    expect(await findByText('Gabriel Santiago')).toBeTruthy();

    fireEvent(getByText(buttonTitle), 'press');

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    expect(store.jwt).toBeFalsy();
    expect(getByText('undefined')).toBeTruthy();
  });

  it('should expose signedPress function, that verify if a user is logged in and call a callback', async () => {
    const buttonTitle = 'logout';
    const spy = jest.fn();

    const Component = () => {
      const { user, signedPress } = useUser();

      return (
        <View>
          <Text>{user?.name}</Text>
          <Button title={buttonTitle} onPress={signedPress(spy)} />
        </View>
      );
    };

    const { findByText, getByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    expect(await findByText('Gabriel Santiago')).toBeTruthy();

    fireEvent(getByText(buttonTitle), 'press');

    expect(spy).toHaveBeenCalled();
  });

  it('should be able to change user password', async () => {
    const spy = jest
      .spyOn(usersService, 'update')
      .mockImplementation(() => Promise.resolve());
    const buttonTitle = 'logout';
    const data = {
      currentPassword: 'currentPassword',
      newPassword: 'newPassword',
      newPasswordConfirm: 'newPasswordConfirm',
    };

    const Component = () => {
      const { user, changePassword } = useUser();

      return (
        <View>
          <Text>{user?.name}</Text>
          <Button title={buttonTitle} onPress={() => changePassword(data)} />
        </View>
      );
    };

    const { findByText, getByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    expect(await findByText('Gabriel Santiago')).toBeTruthy();

    fireEvent(getByText(buttonTitle), 'press');

    expect(spy).toHaveBeenCalledWith(data);
  });
});

describe('without initial user', () => {
  beforeEach(async () => {
    await AsyncStorage.setItem('token', '');
  });

  it('should be able to signup, save user in context and save token in storage and store', async () => {
    const setToken = jest
      .spyOn(storage, 'setToken')
      .mockImplementation(() => Promise.resolve());

    const api = apiMock();
    const response = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDVjYjQ2NzAtODk2ZS00MjYzLWFiMGEtZDg0ZmU0ZTI0NGY0IiwiZW1haWwiOiJzaWdudXB0ZXN0QGdtYWlsLmNvbSIsIm5hbWUiOiJTaWdudXAgVGVzdCJ9LCJpYXQiOjE2NTI2NzE0MzksImV4cCI6MTY1NTI2MzQzOX0.J5C7-6rxB99x1me1MiERcsvxSN_rZv4pJjt_XCNQzTs',
    };
    api.onPost(usersEndpoints.customers).reply(200, response);

    // decoded token:
    // {
    //   "user": {
    //     "id": "05cb4670-896e-4263-ab0a-d84fe4e244f4",
    //     "email": "signuptest@gmail.com",
    //     "name": "Signup Test"
    //   },
    //   "iat": 1652671439,
    //   "exp": 1655263439
    // }

    const buttonTitle = 'logout';
    const data = {
      fakeData: 'fakeData',
    };

    const Component = () => {
      const { user, signUp } = useUser();

      return (
        <View>
          <Text>{user?.name}</Text>
          <Button title={buttonTitle} onPress={() => signUp(data)} />
        </View>
      );
    };

    const { findByText, getByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    fireEvent(getByText(buttonTitle), 'press');
    expect(await findByText('Signup Test')).toBeTruthy();
    expect(setToken).toHaveBeenCalledWith(response.token);
    expect(store.jwt).toEqual(`Bearer ${response.token}`);
  });

  it('should be able to login, save user in context and save token in storage and store', async () => {
    const setToken = jest
      .spyOn(storage, 'setToken')
      .mockImplementation(() => Promise.resolve());

    const api = apiMock();
    const response = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDVjYjQ2NzAtODk2ZS00MjYzLWFiMGEtZDg0ZmU0ZTI0NGY0IiwiZW1haWwiOiJzaWdudXB0ZXN0QGdtYWlsLmNvbSIsIm5hbWUiOiJTaWdudXAgVGVzdCJ9LCJpYXQiOjE2NTI2NzE0MzksImV4cCI6MTY1NTI2MzQzOX0.J5C7-6rxB99x1me1MiERcsvxSN_rZv4pJjt_XCNQzTs',
    };
    api.onPost(usersEndpoints.login).reply(200, response);

    // decoded token:
    // {
    //   "user": {
    //     "id": "05cb4670-896e-4263-ab0a-d84fe4e244f4",
    //     "email": "signuptest@gmail.com",
    //     "name": "Signup Test"
    //   },
    //   "iat": 1652671439,
    //   "exp": 1655263439
    // }

    const buttonTitle = 'logout';
    const data = {
      fakeData: 'fakeData',
    };

    const Component = () => {
      const { user, login } = useUser();

      return (
        <View>
          <Text>{user?.name}</Text>
          <Button title={buttonTitle} onPress={() => login(data)} />
        </View>
      );
    };

    const { findByText, getByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    fireEvent(getByText(buttonTitle), 'press');
    expect(await findByText('Signup Test')).toBeTruthy();
    expect(setToken).toHaveBeenCalledWith(response.token);
    expect(store.jwt).toEqual(`Bearer ${response.token}`);
  });

  it('should expose signedPress function, that verify if a user is logged in and show error message', async () => {
    const buttonTitle = 'logout';
    const spy = jest.fn();
    const toastError = jest.spyOn(toast, 'error');

    const Component = () => {
      const { loading, signedPress } = useUser();

      return (
        <View>
          {!loading && (
            <Button title={buttonTitle} onPress={signedPress(spy)} />
          )}
        </View>
      );
    };

    const { findByText } = rawRender(
      <UserProvider>
        <Component />
      </UserProvider>,
    );

    fireEvent(await findByText(buttonTitle), 'press');

    expect(toastError).toHaveBeenCalledWith(
      'Você precisa estar logado para realizar essa ação',
    );
    expect(spy).not.toHaveBeenCalled();
  });
});
