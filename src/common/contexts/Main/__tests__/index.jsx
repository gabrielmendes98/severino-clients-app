import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { rawRender } from 'test-utils';
import useLocation from 'common/contexts/Location/useLocation';
import useUser from 'common/contexts/User/useUser';
import MainProvider from '../index';

it('should provide all contexts', async () => {
  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzA3ZGIyMzQtNWRlOS00ZjMwLWJiNmQtNjMzZjFiMGMwZDFjIiwiY3JlYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0zMFQyMDoyMTozMy41NzBaIiwiZW1haWwiOiJnYWJyaWVsbXNzYW50aWFnb0BnbWFpbC5jb20iLCJuYW1lIjoiR2FicmllbCBTYW50aWFnbyJ9LCJpYXQiOjE2NTE5NjIwMTUsImV4cCI6MTY1NDU1NDAxNX0.pC5KHWzkFY2NwC1JSyG3nTvlsAYkh_Ii4uhkt7ooqxo';
  const mockLocation = {
    id: 'dewnofdie9w',
  };
  await Promise.all([
    AsyncStorage.setItem('token', mockToken),
    AsyncStorage.setItem('location', JSON.stringify(mockLocation)),
  ]);

  const Component = () => {
    const { location } = useLocation();
    const { user } = useUser();

    return (
      <View>
        <Text>{location?.id}</Text>
        <Text>{user?.name}</Text>
      </View>
    );
  };

  const { findByText } = rawRender(
    <MainProvider>
      <Component />
    </MainProvider>,
  );

  expect(await findByText(mockLocation.id)).toBeTruthy();
  expect(await findByText('Gabriel Santiago')).toBeTruthy();
});
