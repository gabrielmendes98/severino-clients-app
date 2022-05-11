import React, { useState } from 'react';
import { rawRender, fireEvent } from 'test-utils';
import Checkbox from '../index';

it('should display label with inital checked prop value', () => {
  const mockLabel = 'checkbox test label';
  const testID = 'checkbox-test-id';
  const { getByText, getByTestId } = rawRender(
    <Checkbox
      checked
      label={mockLabel}
      onValueChange={() => jest.fn()}
      testID={testID}
    />,
  );

  expect(getByText(mockLabel)).toBeTruthy();
  expect(getByTestId(`${testID}-checked`)).toBeTruthy();
});

it('should check checkbox when it is unchecked', () => {
  const testID = 'checkbox-test-id';

  const Component = () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        label="Test label"
        onValueChange={setChecked}
        testID={testID}
      />
    );
  };

  const { getByTestId } = rawRender(<Component />);

  expect(getByTestId(`${testID}-unchecked`)).toBeTruthy();
  fireEvent(getByTestId(testID), 'press');
  expect(getByTestId(`${testID}-checked`)).toBeTruthy();
});

it('should uncheck when it is checked', () => {
  const testID = 'checkbox-test-id';

  const Component = () => {
    const [checked, setChecked] = useState(true);

    return (
      <Checkbox
        checked={checked}
        label="Test label"
        onValueChange={setChecked}
        testID={testID}
      />
    );
  };

  const { getByTestId } = rawRender(<Component />);

  expect(getByTestId(`${testID}-checked`)).toBeTruthy();
  fireEvent(getByTestId(testID), 'press');
  expect(getByTestId(`${testID}-unchecked`)).toBeTruthy();
});
