/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-empty-function */
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { View } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-vector-icons/FontAwesome', () => jest.fn());
FontAwesomeIcons.mockImplementation(props => <View {...props}></View>);

jest.mock('react-native-vector-icons/IonIcons', () => jest.fn());
IonIcons.mockImplementation(props => <View {...props}></View>);

jest.mock('react-native-vector-icons/MaterialIcons', () => jest.fn());
MaterialIcons.mockImplementation(props => <View {...props}></View>);

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
