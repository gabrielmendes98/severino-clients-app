import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserProvider from 'common/contexts/User';
import Navigation from './navigation';

const App = () => (
  <SafeAreaProvider>
    <UserProvider>
      <Navigation />
    </UserProvider>
    <Toast />
  </SafeAreaProvider>
);

export default App;
