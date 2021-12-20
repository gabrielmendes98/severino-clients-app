import React from 'react';
import { View, Text } from 'react-native';

const Home = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home!</Text>
    {foo && foo.bar}
  </View>
);

export default Home;
