import React from 'react';
import { Button } from 'react-native';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import TextInput from 'components/Input/TextInput';
import Form from '../index';

it('should be able to pass a children as function, exposing form methods', async () => {
  const buttonText = 'submit';
  const data = {
    testField: 'dale dale',
  };
  const submit = jest.fn();
  const { getByText } = rawRender(
    <Form defaultValues={{ testField: data.testField }}>
      {({ handleSubmit }) => (
        <>
          <TextInput name="testField" />
          <Button
            onPress={handleSubmit(values => submit(values))}
            title={buttonText}
          />
        </>
      )}
    </Form>,
  );

  fireEvent(getByText(buttonText), 'press');
  await waitFor(() => {
    expect(submit).toHaveBeenCalledWith(data);
  });
});

it('should be able to pass a children as component', () => {
  const buttonText = 'submit';
  const submit = jest.fn();
  const { getByText } = rawRender(
    <Form defaultValues={{ testField: '' }}>
      <TextInput name="testField" />
      <Button onPress={submit} title={buttonText} />
    </Form>,
  );
  expect(getByText(buttonText)).toBeTruthy();
});
