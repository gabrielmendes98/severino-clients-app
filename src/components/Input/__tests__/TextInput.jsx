import React from 'react';
import { View } from 'react-native';
import Form from 'common/contexts/Form';
import { rawRender, fireEvent } from 'test-utils';
import * as utils from 'common/util/general';
import yup from 'common/util/yup';
import Button from 'components/Button';
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

it('should show error on submit', async () => {
  const inputName = 'test';
  const errorMessage = 'error message';
  const { getByText, findByText } = rawRender(
    <Form
      defaultValues={{
        [inputName]: '',
      }}
      validations={{
        [inputName]: yup.string().trim().required(errorMessage),
      }}
    >
      {({ handleSubmit }) => (
        <>
          <TextInput name={inputName} />

          <Button onPress={handleSubmit(jest.fn())}>Submit</Button>
        </>
      )}
    </Form>,
  );

  fireEvent(getByText(/submit/i), 'press');
  expect(await findByText(errorMessage)).toBeTruthy();
});

it('should focus input on press', () => {
  const spy = jest.spyOn(utils, 'focus');
  const inputName = 'test-input';
  const onFocus = jest.fn();
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <TextInput name={inputName} onFocus={onFocus} />
    </Form>,
  );

  fireEvent(getByTestId(`${inputName}-container`), 'press');
  expect(spy).toHaveBeenCalledWith(
    expect.objectContaining({
      current: expect.objectContaining({
        props: expect.objectContaining({
          testID: inputName,
        }),
      }),
    }),
  );
});

it('should show start icon when pass icon prop', () => {
  const inputName = 'test';
  const iconTestId = 'iconTestId';
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <TextInput name={inputName} icon={<View testID={iconTestId} />} />
    </Form>,
  );

  expect(getByTestId(iconTestId)).toBeTruthy();
});

it('should show end icon when pass endIcon prop', () => {
  const inputName = 'test';
  const iconTestId = 'iconTestId';
  const { getByTestId } = rawRender(
    <Form defaultValues={{ [inputName]: '' }}>
      <TextInput name={inputName} endIcon={<View testID={iconTestId} />} />
    </Form>,
  );

  expect(getByTestId(iconTestId)).toBeTruthy();
});
