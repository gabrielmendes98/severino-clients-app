import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Home from 'screens/Home';
import Main from 'components/Main';

const homeTab = {
  name: 'Home',
  component: Home,
  layout: Main,
  options: {
    tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcons color={color} name="home" size={size} />
    ),
  },
};

export default homeTab;
