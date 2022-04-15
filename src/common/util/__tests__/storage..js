import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getLocation,
  getToken,
  removeLocation,
  removeToken,
  setLocation,
  setToken,
} from '../storage';

const token = 'tokenMock';
const location = {
  mockLocation: 'mockLocation',
};

it('should get token from storage when call getToken', async () => {
  await AsyncStorage.setItem('token', token);
  expect(await getToken()).toBe(token);
});

it('should set token in storage when call setToken', async () => {
  await setToken(token);
  expect(await AsyncStorage.getItem('token')).toBe(token);
});

it('should remove token from storage when call removeToken', async () => {
  await AsyncStorage.setItem('token', token);
  expect(await AsyncStorage.getItem('token')).toBe(token);
  await removeToken();
  expect(await AsyncStorage.getItem('token')).not.toBe(token);
});

it('should get location from storage and return it as an object', async () => {
  await AsyncStorage.setItem('location', JSON.stringify(location));
  expect(await getLocation()).toEqual(location);
});

it('should receive location object set it in storage as a string', async () => {
  await setLocation(location);
  expect(await AsyncStorage.getItem('location')).toBe(JSON.stringify(location));
});

it('should delete location from storage', async () => {
  await AsyncStorage.setItem('location', JSON.stringify(location));
  expect(await AsyncStorage.getItem('location')).toBe(JSON.stringify(location));
  await removeLocation();
  expect(await AsyncStorage.getItem('location')).not.toBe(
    JSON.stringify(location),
  );
});
