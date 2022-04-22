import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import HorizontalScroll from '../index';

it('should renders correctly', () => {
  const { toJSON } = rawRender(
    <HorizontalScroll>
      <View></View>
    </HorizontalScroll>,
  );

  expect(toJSON()).toMatchSnapshot();
});
