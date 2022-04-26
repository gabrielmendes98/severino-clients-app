import React from 'react';
import { rawRender } from 'test-utils';
import ListFallback from '../index';

it('should display icon and message', () => {
  const testID = 'list-fallback';
  const message = 'test message';
  const icon = 'test-icon';
  const { getByTestId } = rawRender(
    <ListFallback testID={testID} icon={icon} message={message} />,
  );

  expect(getByTestId(`${testID}-icon`)).toHaveProp('name', icon);
  expect(getByTestId(`${testID}-message`)).toHaveTextContent(message);
});
