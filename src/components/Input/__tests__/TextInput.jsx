import React from 'react';
import Form from 'common/contexts/Form';
import { rawRender, fireEvent } from 'test-utils';
import TextInput from '../TextInput';

it('should set values in form', () => {
  const testText = 'test text';
  const inputName = 'test';
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <TextInput name={inputName} />
    </Form>,
  );

  fireEvent(getByTestId(inputName), 'onChangeText', testText);
  expect(getByTestId(inputName)).toHaveProp('value', testText);
});
