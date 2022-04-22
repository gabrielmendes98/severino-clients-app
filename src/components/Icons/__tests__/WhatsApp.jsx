import React from 'react';
import { rawRender } from 'test-utils';
import WhatsApp from '../WhatsApp';

it('should renders correctly', () => {
  const { toJSON } = rawRender(<WhatsApp />);

  expect(toJSON()).toMatchSnapshot();
});
