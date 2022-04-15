import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Loader from 'components/Loader';
import UserProvider from '../User';
import LocationProvider from '../Location';

const MainProvider = ({ children }) => (
  <SafeAreaProvider>
    <Loader />
    <UserProvider>
      <LocationProvider>{children}</LocationProvider>
    </UserProvider>
    <Toast />
  </SafeAreaProvider>
);

MainProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainProvider;
