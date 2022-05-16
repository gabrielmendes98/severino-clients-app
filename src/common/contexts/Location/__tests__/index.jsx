import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rawRender, cleanup, waitFor } from 'test-utils';
import store from 'common/util/store';
import LocationProvider from '../index';
import useLocation from '../useLocation';

const mockLocation = {
  id: '124712r98f0912njd',
};

afterEach(cleanup);

it('should get current location from app storage when start', async () => {
  await AsyncStorage.setItem('location', JSON.stringify(mockLocation));

  const Component = () => {
    const { location } = useLocation();

    return (
      <View>
        <Text>{JSON.stringify(location)}</Text>
      </View>
    );
  };
  const { findByText } = rawRender(
    <LocationProvider>
      <Component />
    </LocationProvider>,
  );

  expect(await findByText(JSON.stringify(mockLocation))).toBeTruthy();
  expect(store.location).toEqual(mockLocation.id);
});

it('should be able to save new location in context, storage and in memory', async () => {
  await AsyncStorage.setItem('location', '');

  const Component = () => {
    const { saveLocation, location } = useLocation();

    useEffect(() => {
      saveLocation(mockLocation);
    }, [saveLocation]);

    return (
      <View>
        <Text>{JSON.stringify(location)}</Text>
      </View>
    );
  };
  const { findByText } = rawRender(
    <LocationProvider>
      <Component />
    </LocationProvider>,
  );

  expect(await findByText(JSON.stringify(mockLocation))).toBeTruthy();
  expect(store.location).toEqual(mockLocation.id);
  const storageLocation = await AsyncStorage.getItem('location');
  expect(JSON.parse(storageLocation)).toEqual(mockLocation);
});

it('should expose loading to know when current location is loaded from store', async () => {
  await AsyncStorage.setItem('location', '');
  const text = 'loading...';

  const Component = () => {
    const { loading } = useLocation();

    return <View>{loading && <Text>{text}</Text>}</View>;
  };
  const { getByText } = rawRender(
    <LocationProvider>
      <Component />
    </LocationProvider>,
  );

  await waitFor(() => {
    expect(getByText(text)).toBeTruthy();
  });
});
