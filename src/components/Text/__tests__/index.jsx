import React from 'react';
import { rawRender } from 'test-utils';
import Text from '../index';

it('should render with correct styles with props', () => {
  const { toJSON } = rawRender(
    <Text
      color="light"
      margin={{ top: 2 }}
      size={1.5}
      weight="bold"
      align="center"
    >
      TEST TEXT
    </Text>,
  );

  expect(toJSON()).toMatchSnapshot();
});

it('should render with correct styles with default props', () => {
  const { toJSON } = rawRender(<Text>TEST TEXT</Text>);

  expect(toJSON()).toMatchSnapshot();
});
