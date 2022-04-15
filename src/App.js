import './wdyr';
import React from 'react';
import MainProvider from 'common/contexts/Main';
import Navigation from './navigation';

const App = () => (
  <MainProvider>
    <Navigation />
  </MainProvider>
);

export default App;
