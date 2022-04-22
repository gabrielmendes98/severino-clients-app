import React from 'react';
import { rawRender } from 'test-utils';
import Logo from '../Logo';

it('should renders correctly', () => {
  const { toJSON } = rawRender(<Logo />);

  expect(toJSON()).toMatchSnapshot();
});
