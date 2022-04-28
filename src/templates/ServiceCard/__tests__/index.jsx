import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { rawRender, fireEvent } from 'test-utils';
import ServiceCard from '../index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));

jest.mock('react-native-svg', () => ({
  ...jest.requireActual('react-native-svg'),
  SvgCssUri: jest.fn(),
}));
SvgCssUri.mockImplementation(props => <View {...props}></View>);

it('should navigate to workers screen when press on card', () => {
  const data = {
    id: 'id',
    avatarUrl: 'avatarUrl.com',
    name: 'name',
  };
  const { getByText } = rawRender(<ServiceCard {...data} />);

  fireEvent(getByText(data.name), 'press');

  expect(navigate).toHaveBeenCalledWith('Workers', {
    serviceId: data.id,
    serviceName: data.name,
  });
});
