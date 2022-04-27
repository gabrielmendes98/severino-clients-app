import React, { useState } from 'react';
import { rawRender, fireEvent } from 'test-utils';
import Tabs from '../index';

it('should show options with correct labels', () => {
  const options = [
    { label: 'option one', value: 'OPTION_ONE' },
    { label: 'option two', value: 'OPTION_TWO' },
    { label: 'option three', value: 'OPTION_THREE' },
  ];
  const { getByText } = rawRender(
    <Tabs options={options} setValue={jest.fn()} />,
  );

  expect(getByText(options[0].label)).toBeTruthy();
  expect(getByText(options[1].label)).toBeTruthy();
  expect(getByText(options[2].label)).toBeTruthy();
});

it('should start with selected value', () => {
  const options = [
    { label: 'option one', value: 'OPTION_ONE' },
    { label: 'option two', value: 'OPTION_TWO' },
    { label: 'option three', value: 'OPTION_THREE' },
  ];

  const [optionOne, optionTwo, optionThree] = options;

  const { getByTestId } = rawRender(
    <Tabs options={options} setValue={jest.fn()} value={optionOne.value} />,
  );

  expect(getByTestId(`selected-${optionOne.value}`)).toBeTruthy();
  expect(getByTestId(`unselected-${optionTwo.value}`)).toBeTruthy();
  expect(getByTestId(`unselected-${optionThree.value}`)).toBeTruthy();
});

it('should select option on press', () => {
  const options = [
    { label: 'option one', value: 'OPTION_ONE' },
    { label: 'option two', value: 'OPTION_TWO' },
    { label: 'option three', value: 'OPTION_THREE' },
  ];

  const [optionOne, optionTwo, optionThree] = options;

  const Component = () => {
    const [value, setValue] = useState(optionOne.value);

    return <Tabs options={options} setValue={setValue} value={value} />;
  };

  const { getByText, getByTestId } = rawRender(<Component />);

  fireEvent(getByText(optionTwo.label), 'press');

  expect(getByTestId(`unselected-${optionOne.value}`)).toBeTruthy();
  expect(getByTestId(`selected-${optionTwo.value}`)).toBeTruthy();
  expect(getByTestId(`unselected-${optionThree.value}`)).toBeTruthy();
});
