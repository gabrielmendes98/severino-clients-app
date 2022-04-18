/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { rawRender, fireEvent } from 'test-utils';
import BackButton from '../Back';

const backButtonTestID = 'back-button';
const homeButtonTestID = 'home-button';

const { Screen, Navigator } = createNativeStackNavigator();

const Home = ({ navigation }) => (
  <TouchableWithoutFeedback
    onPress={() => navigation.navigate('Details')}
    testID={homeButtonTestID}
  >
    <View></View>
  </TouchableWithoutFeedback>
);

const Details = () => <BackButton testID={backButtonTestID} />;

const Navigation = () => (
  <Navigator>
    <Screen name="Home" component={Home} />
    <Screen name="Details" component={Details} />
  </Navigator>
);

it('should navigate back when press button', () => {
  const { getByTestId } = rawRender(
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>,
  );

  fireEvent(getByTestId(homeButtonTestID), 'press');
  fireEvent(getByTestId(backButtonTestID), 'press');
  const button = getByTestId(homeButtonTestID);
  expect(button).toBeTruthy();
});
