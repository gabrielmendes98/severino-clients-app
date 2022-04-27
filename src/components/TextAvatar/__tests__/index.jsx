import React from 'react';
import { rawRender } from 'test-utils';
import TextAvatar from '../index';

it('should render avatar with first letters of first name and last name when has last name', () => {
  const { getByText } = rawRender(<TextAvatar text="Mock Name" />);

  expect(getByText('MN')).toBeTruthy();
});

it('should render avatar with first letter of first name when does not have last name ', () => {
  const { getByText } = rawRender(<TextAvatar text="Mock" />);

  expect(getByText('M')).toBeTruthy();
});
