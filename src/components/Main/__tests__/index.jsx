import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import Main from '../index';

jest.mock('common/contexts/Location/useLocation', () => () => ({
  default: () => ({
    location: null,
  }),
}));

it('should show scrollview by default and render children', () => {
  const testID = 'children-id';
  const { getByTestId } = rawRender(
    <Main>
      <View testID={testID}></View>
    </Main>,
  );

  expect(getByTestId(testID)).toBeTruthy();
  expect(getByTestId('main-scroll-view')).toBeTruthy();
});

it('should not show scrollview when pass prop removeScrollView', () => {
  const testID = 'children-id';
  const { getByTestId, queryByTestId } = rawRender(
    <Main removeScrollView>
      <View testID={testID}></View>
    </Main>,
  );

  expect(getByTestId(testID)).toBeTruthy();
  expect(queryByTestId('main-scroll-view')).toBeFalsy();
});

it('should render header', () => {
  const { getByTestId } = rawRender(
    <Main removeScrollView>
      <View></View>
    </Main>,
  );

  expect(getByTestId('header-container')).toBeTruthy();
});
