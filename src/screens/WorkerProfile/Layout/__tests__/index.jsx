import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import WorkerProfileLayout from '../index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

it('should match snapshot', () => {
  const { toJSON } = rawRender(
    <WorkerProfileLayout>
      <View></View>
    </WorkerProfileLayout>,
  );

  expect(toJSON()).toMatchSnapshot();
});
