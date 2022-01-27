import { AsyncStorage } from '@react-native-community/async-storage';

export const getToken = () => AsyncStorage.getItem('token');
export const setToken = token => AsyncStorage.setItem('token', token);
export const removeToken = () => AsyncStorage.removeItem('token');
