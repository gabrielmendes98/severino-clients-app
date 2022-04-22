import React from 'react';
import Form from 'common/contexts/Form';
import { rawRender, fireEvent } from 'test-utils';
import PasswordInput from '../Password';

it('should toggle value on icon click', () => {
  const inputName = 'password';
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <PasswordInput name={inputName} />
    </Form>,
  );

  expect(getByTestId(inputName)).toHaveProp('secureTextEntry', true);
  expect(getByTestId(`${inputName}-show-icon`)).toBeTruthy();
  fireEvent(getByTestId(`${inputName}-show-icon`), 'press');

  expect(getByTestId(inputName)).toHaveProp('secureTextEntry', false);
  expect(getByTestId(`${inputName}-hide-icon`)).toBeTruthy();
  fireEvent(getByTestId(`${inputName}-hide-icon`), 'press');

  expect(getByTestId(inputName)).toHaveProp('secureTextEntry', true);
  expect(getByTestId(`${inputName}-show-icon`)).toBeTruthy();
});

it('should change value on type', () => {
  const testText = 'test password';
  const inputName = 'password';
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <PasswordInput name={inputName} />
    </Form>,
  );

  fireEvent(getByTestId(inputName), 'onChangeText', testText);
  expect(getByTestId(inputName)).toHaveProp('value', testText);
});
