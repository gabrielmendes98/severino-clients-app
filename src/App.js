import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserProvider from 'common/contexts/User';
import Navigation from './navigation';

const App = () => (
  <SafeAreaProvider>
    <UserProvider>
      <Navigation />
    </UserProvider>
  </SafeAreaProvider>
);

export default App;
