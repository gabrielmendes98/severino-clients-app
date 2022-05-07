import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import { Provider } from 'common/contexts/Favorite';
import { apiMock } from 'api/util';
import { workersEndpoints } from 'api/services/workers';
import WorkerCard from '../Worker';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));

it('should navigate to worker profile screen when press on card', () => {
  const worker = {
    id: 'id',
    avatarUrl: 'url',
    name: 'testerson da silva',
    rating: '4',
    services: 'foo, baz',
    hasWhatsapp: true,
    phone: '123123',
  };
  const { getByText } = rawRender(
    <Provider value={{ favorites: {} }}>
      <WorkerCard worker={worker} />
    </Provider>,
  );

  fireEvent(getByText(new RegExp(worker.name, 'i')), 'press');

  expect(navigate).toHaveBeenCalledWith('Worker', {
    screen: 'Profile',
    params: {
      workerId: worker.id,
    },
  });
});

it('should render avatar image and whatsapp button when has avatarUrl and hasWhatsapp props', () => {
  const worker = {
    id: 'id',
    avatarUrl: 'url',
    name: 'testerson da silva',
    rating: '4',
    services: 'foo, baz',
    hasWhatsapp: true,
    phone: '123123',
  };
  const { getByTestId } = rawRender(
    <Provider value={{ favorites: {} }}>
      <WorkerCard worker={worker} />
    </Provider>,
  );

  expect(getByTestId(`${worker.id}-image-avatar`)).toBeTruthy();
  expect(getByTestId(`whatsapp-button-${worker.phone}`)).toBeTruthy();
});

it('should render text avatar when has avatarUrl prop and do not render whatsapp button when hasWhatsapp prop is falsy', () => {
  const worker = {
    id: 'id',
    name: 'testerson da silva',
    rating: '4',
    services: 'foo, baz',
    hasWhatsapp: false,
    phone: '123123',
  };
  const { getByTestId, queryByTestId } = rawRender(
    <Provider value={{ favorites: {} }}>
      <WorkerCard worker={worker} />
    </Provider>,
  );

  expect(getByTestId(`${worker.id}-text-avatar`)).toHaveTextContent(/td/i);
  expect(queryByTestId(`whatsapp-button-${worker.phone}`)).toBeFalsy();
});

it('should call updateFavorite when press on favorite button', async () => {
  const mock = apiMock();
  mock.onPost(workersEndpoints.favorites).reply(200, {
    favorited: true,
  });

  const worker = {
    id: 'id',
    avatarUrl: 'url',
    name: 'testerson da silva',
    rating: '4',
    services: 'foo, baz',
    hasWhatsapp: true,
    phone: '123123',
  };
  const updateFavorite = jest.fn();
  const { getByTestId } = rawRender(
    <Provider value={{ favorites: {}, updateFavorite }}>
      <WorkerCard worker={worker} />
    </Provider>,
  );

  fireEvent(getByTestId(`${worker.id}-favorite-button`), 'press');

  await waitFor(() => {
    expect(updateFavorite).toHaveBeenCalledWith(worker.id, true);
  });
});

it('should display "Novo usuário" when rating is falsy', () => {
  const worker = {
    id: 'id',
    avatarUrl: 'url',
    name: 'testerson da silva',
    rating: null,
    services: 'foo, baz',
    hasWhatsapp: true,
    phone: '123123',
  };
  const { getByText } = rawRender(
    <Provider value={{ favorites: {} }}>
      <WorkerCard worker={worker} />
    </Provider>,
  );

  expect(getByText(/novo usuário/i)).toBeTruthy();
});
