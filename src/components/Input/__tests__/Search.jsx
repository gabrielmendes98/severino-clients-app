import React from 'react';
import { rawRender, fireEvent } from 'test-utils';
import * as utils from 'common/util/general';
import SearchInput from '../Search';

it('should update text on type', () => {
  const setValue = jest.fn();
  const placeholder = 'search';
  const text = 'text mock';
  const { getByPlaceholderText } = rawRender(
    <SearchInput placeholder={placeholder} value="mock" setValue={setValue} />,
  );

  fireEvent(getByPlaceholderText(placeholder), 'onChangeText', text);
  expect(setValue).toHaveBeenCalledWith(text);
});

it('should receive focus on press', () => {
  const spy = jest.spyOn(utils, 'focus');
  const setValue = jest.fn();
  const placeholder = 'search';
  const testID = 'testID';
  const { getByTestId } = rawRender(
    <SearchInput
      placeholder={placeholder}
      value="mock"
      setValue={setValue}
      testID={testID}
    />,
  );

  fireEvent(getByTestId(`${testID}-container`), 'press');
  expect(spy).toHaveBeenCalledWith(
    expect.objectContaining({
      current: expect.objectContaining({
        props: expect.objectContaining({
          testID,
        }),
      }),
    }),
  );
});
