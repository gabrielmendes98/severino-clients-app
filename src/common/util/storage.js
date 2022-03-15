import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = () => AsyncStorage.getItem('token');
export const setToken = token => AsyncStorage.setItem('token', token);
export const removeToken = () => AsyncStorage.removeItem('token');

export const getLocation = () =>
  AsyncStorage.getItem('location').then(JSON.parse);
export const setLocation = location =>
  AsyncStorage.setItem('location', JSON.stringify(location));
export const removeLocation = () => AsyncStorage.removeItem('location');
