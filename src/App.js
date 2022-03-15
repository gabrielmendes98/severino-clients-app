import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserProvider from 'common/contexts/User';
import LocationProvider from 'common/contexts/Location';
import Loader from 'components/Loader';
import Navigation from './navigation';

const App = () => (
  <SafeAreaProvider>
    <Loader />
    <UserProvider>
      <LocationProvider>
        <Navigation />
      </LocationProvider>
    </UserProvider>
    <Toast />
  </SafeAreaProvider>
);

export default App;
