import React from 'react';
import { View } from 'react-native';
import { rawRender, act } from 'test-utils';
import Loader from '../index';

it('should start as hidden. should display and hide loader when call its functions', () => {
  const testID = 'loader-id';
  const { getByTestId, queryByTestId } = rawRender(
    <View>
      <Loader testID={testID} />
    </View>,
  );

  expect(queryByTestId(testID)).toBeFalsy();
  act(() => {
    Loader.show();
  });
  expect(getByTestId(testID)).toBeTruthy();
  act(() => {
    Loader.hide();
  });
  expect(queryByTestId(testID)).toBeFalsy();
});

it('should hide loader just when loaders count is zero', () => {
  const testID = 'loader-id';
  const { getByTestId } = rawRender(
    <View>
      <Loader testID={testID} />
    </View>,
  );

  act(() => {
    Loader.show();
  });
  act(() => {
    Loader.show();
  });
  expect(getByTestId(testID)).toBeTruthy();
  act(() => {
    Loader.hide();
  });
  expect(getByTestId(testID)).toBeTruthy();
});
