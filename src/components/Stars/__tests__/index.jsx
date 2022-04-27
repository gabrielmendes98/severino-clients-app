import React from 'react';
import { rawRender, fireEvent } from 'test-utils';
import Stars from '../index';

it('should render full empty stars when length is zero', () => {
  const { getAllByTestId } = rawRender(<Stars length={0} />);

  expect(getAllByTestId('star-border')).toHaveLength(5);
});

it('should render full filled stars when length is 5', () => {
  const { getAllByTestId } = rawRender(<Stars length={5} />);

  expect(getAllByTestId('star')).toHaveLength(5);
});

it('should render one half star when has decimal point and fill/not fill the others', () => {
  const { getAllByTestId } = rawRender(<Stars length={3.2} />);

  expect(getAllByTestId('star')).toHaveLength(3);
  expect(getAllByTestId('star-half')).toHaveLength(1);
  expect(getAllByTestId('star-border')).toHaveLength(1);
});

it('should call onpress passing star icon', () => {
  const onPress = jest.fn();
  const { getAllByTestId } = rawRender(<Stars length={5} onPress={onPress} />);

  const index = 3;
  fireEvent(getAllByTestId('star')[index], 'press');
  expect(onPress).toHaveBeenCalledWith(index);
});
