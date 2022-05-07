import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
