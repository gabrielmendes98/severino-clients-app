import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import theme from 'common/styles/theme';
import * as util from '../util';
import Skeleton from '../index';

it('should not render component when it is not ready', () => {
  const childrenId = 'children-id';
  const { queryByTestId } = rawRender(
    <Skeleton ready={false} length={3}>
      <View testID={childrenId}></View>
    </Skeleton>,
  );

  expect(queryByTestId(childrenId)).toBeFalsy();
});

it('should render children when it is ready', () => {
  const childrenId = 'children-id';
  const { getByTestId } = rawRender(
    <Skeleton ready length={3}>
      <View testID={childrenId}></View>
    </Skeleton>,
  );

  expect(getByTestId(childrenId)).toBeTruthy();
});

it('should render bones with right margin when direction is row', () => {
  const spy = jest.spyOn(util, 'generateItemsStyleWithProps');
  const spacing = 4;
  rawRender(
    <Skeleton ready length={3} direction="row" spacing={spacing}>
      <View></View>
    </Skeleton>,
  );

  expect(spy).toReturnWith(
    expect.objectContaining({
      marginRight: theme.spacing(spacing),
    }),
  );
});

it('should render bones with bottom margin when direction is column', () => {
  const spy = jest.spyOn(util, 'generateItemsStyleWithProps');
  const spacing = 4;
  rawRender(
    <Skeleton ready length={3} direction="column" spacing={spacing}>
      <View></View>
    </Skeleton>,
  );

  expect(spy).toReturnWith(
    expect.objectContaining({
      marginBottom: theme.spacing(spacing),
    }),
  );
});
