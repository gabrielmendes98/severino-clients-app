import React from 'react';
import { Linking } from 'react-native';
import { WHATSAPP_URL } from 'common/constants';
import { rawRender, fireEvent } from 'test-utils';
import WhatsappButton from '../Whatsapp';

it('should open whatsapp number when click on button', () => {
  const spy = jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());
  const mockPhone = '123123';
  const { getByTestId } = rawRender(<WhatsappButton phone={mockPhone} />);
  fireEvent(getByTestId(`whatsapp-button-${mockPhone}`), 'press');
  expect(spy).toHaveBeenCalledWith(WHATSAPP_URL + mockPhone);
});
