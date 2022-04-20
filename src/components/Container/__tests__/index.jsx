import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import Container from '../index';

it('should renders correctly when pass styling props as true', () => {
  const { toJSON } = rawRender(
    <Container horizontalSpacing removeBottomMargin>
      <View>TEST</View>
    </Container>,
  );
  expect(toJSON()).toMatchSnapshot();
});

it('should renders correctly when pass styling props as false', () => {
  const { toJSON } = rawRender(
    <Container horizontalSpacing={false} removeBottomMargin={false}>
      <View>TEST</View>
    </Container>,
  );
  expect(toJSON()).toMatchSnapshot();
});
