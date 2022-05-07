import React from 'react';
import { NavigationContext } from '@react-navigation/native';
import { servicesEndpoints } from 'api/services/services';
import { workersEndpoints } from 'api/services/workers';
import { apiMock } from 'api/util';
import { render, fireEvent, waitFor } from 'test-utils';
import Home from '../index';

const servicesMock = [
  {
    id: '7c3c1ad2-8f2d-4b37-86c0-1888b9f3e08d',
    createdAt: '2022-03-21T18:39:39.552Z',
    updateAt: '2022-03-21T18:39:39.552Z',
    serviceCategoryId: 'ab0fe49e-bbbb-489a-8429-37ca2e408472',
    name: 'Limpeza de Casa',
    serviceCategory: {
      avatarUrl: 'avatarUrl',
    },
  },
  {
    id: 'a98f4152-5c53-496f-9d54-cc89d6f4e9cc',
    createdAt: '2022-03-21T14:31:21.601Z',
    updateAt: '2022-03-21T14:31:21.601Z',
    serviceCategoryId: '12cebab7-1986-4245-b840-78b2ea4f8757',
    name: 'Pedreiro (a)',
    serviceCategory: {
      avatarUrl: 'avatarUrl',
    },
  },
  {
    id: 'b601d905-1bf8-4e81-a502-c744cda4192d',
    createdAt: '2022-03-21T18:39:43.535Z',
    updateAt: '2022-03-21T18:39:43.535Z',
    serviceCategoryId: 'ab0fe49e-bbbb-489a-8429-37ca2e408472',
    name: 'Limpeza Industrial',
    serviceCategory: {
      avatarUrl: 'avatarUrl',
    },
  },
  {
    id: 'c8c6f81a-1d3a-4d27-8d53-7cd50b854b93',
    createdAt: '2022-03-21T18:32:10.908Z',
    updateAt: '2022-03-21T18:32:10.908Z',
    serviceCategoryId: 'ab0fe49e-bbbb-489a-8429-37ca2e408472',
    name: 'Limpeza de Pedras',
    serviceCategory: {
      avatarUrl: 'avatarUrl',
    },
  },
];

const workersMock = [
  {
    id: '529234b7-fff3-4b1e-8c51-2a9609f91f65',
    createdAt: '2022-03-22T18:02:13.203Z',
    updatedAt: '2022-03-22T18:02:13.203Z',
    email: 'gabrielmssantiago@gmail.com',
    name: 'Gabriel Santiago',
    description:
      'Olá, me chamo Pedro Faria e sou eletricista há 10 anos. Contudo, também faco diversos serviços como: faxina e carpintaria.',
    avatarUrl: 'avatarUrl',
    phone: '34996863662',
    hasWhatsapp: true,
    cityId: 'c4d031ec-003b-4ecb-af64-326511f62233',
    profile: {
      services: [
        {
          service: {
            name: 'Limpeza de Casa',
          },
        },
        {
          service: {
            name: 'Pedreiro (a)',
          },
        },
        {
          service: {
            name: 'Limpeza Industrial',
          },
        },
      ],
    },
    customerWorkerFavorites: [
      {
        createdAt: '2022-04-15T19:25:41.657Z',
        updatedAt: '2022-04-15T19:25:41.657Z',
        customerId: '707db234-5de9-4f30-bb6d-633f1b0c0d1c',
        workerId: '529234b7-fff3-4b1e-8c51-2a9609f91f65',
      },
    ],
    rating: 3.142857142857143,
  },
  {
    id: '667ce842-7dfb-4e10-a28a-32ec3f72c149',
    createdAt: '2022-03-22T18:02:37.148Z',
    updatedAt: '2022-03-22T18:02:37.148Z',
    email: 'gabriel@gmail.com',
    name: 'Gabriel Mendes',
    description: 'Sou um trabalhador muito esforçado!',
    avatarUrl: 'avatarUrl',
    phone: '34996863662',
    hasWhatsapp: true,
    cityId: 'c4d031ec-003b-4ecb-af64-326511f62233',
    profile: {
      services: [
        {
          service: {
            name: 'Limpeza de Casa',
          },
        },
      ],
    },
    customerWorkerFavorites: [],
    rating: 5,
  },
  {
    id: 'aa6b0ee7-0dfe-4ddd-bbce-e29b8ed12ab1',
    createdAt: '2022-04-08T13:28:04.320Z',
    updatedAt: '2022-04-08T13:28:04.320Z',
    email: 'jubscleison@gmail.com',
    name: 'Jubscleison da Silva',
    description: null,
    avatarUrl: null,
    phone: '(34) 23441-2312',
    hasWhatsapp: false,
    cityId: 'c4d031ec-003b-4ecb-af64-326511f62233',
    profile: {
      services: [
        {
          service: {
            name: 'Limpeza de Casa',
          },
        },
      ],
    },
    customerWorkerFavorites: [
      {
        createdAt: '2022-04-13T20:02:54.394Z',
        updatedAt: '2022-04-13T20:02:54.394Z',
        customerId: '707db234-5de9-4f30-bb6d-633f1b0c0d1c',
        workerId: 'aa6b0ee7-0dfe-4ddd-bbce-e29b8ed12ab1',
      },
    ],
    rating: null,
  },
  {
    id: 'c29d07da-585b-4ee8-8b4b-5994dda5b549',
    createdAt: '2022-04-08T13:31:31.609Z',
    updatedAt: '2022-04-08T13:31:31.609Z',
    email: 'gabrielx@gmail.com',
    name: 'Gabriel Souza',
    description: 'Sou um trabalhador muito esforçado!',
    avatarUrl: 'avatarUrl',
    phone: '34996863662',
    hasWhatsapp: true,
    cityId: 'c4d031ec-003b-4ecb-af64-326511f62233',
    profile: {
      services: [
        {
          service: {
            name: 'Limpeza de Casa',
          },
        },
      ],
    },
    customerWorkerFavorites: [
      {
        createdAt: '2022-04-13T18:57:31.103Z',
        updatedAt: '2022-04-13T18:57:31.103Z',
        customerId: '707db234-5de9-4f30-bb6d-633f1b0c0d1c',
        workerId: 'c29d07da-585b-4ee8-8b4b-5994dda5b549',
      },
    ],
    rating: null,
  },
];

const navContext = {
  isFocused: () => true,
  addListener: jest.fn(() => jest.fn()),
};

const navigation = {
  navigate: jest.fn(),
};

beforeEach(() => {
  navigation.navigate.mockClear();
});

const renderHome = () =>
  render(
    <NavigationContext.Provider value={navContext}>
      <Home navigation={navigation} />,
    </NavigationContext.Provider>,
  );

describe('search input tests', () => {
  const api = apiMock();
  api.onGet(servicesEndpoints.listMostSearched).reply(200, []);
  api.onGet(workersEndpoints.listRecent).reply(200, []);

  it('should redirect to search services screen on search passing search value prop', async () => {
    const searchValue = 'service test';
    const { getByPlaceholderText, getByText } = renderHome();

    fireEvent(
      getByPlaceholderText(/busque por serviços/i),
      'onChangeText',
      searchValue,
    );
    fireEvent(getByText(/buscar/i), 'press');

    expect(navigation.navigate).toHaveBeenCalledWith('Search', {
      screen: 'Services',
      params: {
        search: searchValue,
      },
    });

    await waitFor(() => jest.fn());
  });

  it('should show error message when search without fill search input', async () => {
    const { getByText, getByPlaceholderText } = renderHome();

    fireEvent(getByPlaceholderText(/busque por serviços/i), 'onChangeText', '');
    fireEvent(getByText(/buscar/i), 'press');

    expect(getByText(/digite o serviço que deseja buscar/i)).toBeTruthy();

    await waitFor(() => jest.fn());
  });
});

it('should show service cards', async () => {
  const api = apiMock();
  api.onGet(servicesEndpoints.listMostSearched).reply(200, servicesMock);
  api.onGet(workersEndpoints.listRecent).reply(200, []);

  const { findAllByTestId } = renderHome();

  expect(await findAllByTestId('service-card-container')).toHaveLength(4);
});

it('should show worker cards', async () => {
  const api = apiMock();
  api.onGet(servicesEndpoints.listMostSearched).reply(200, []);
  api.onGet(workersEndpoints.listRecent).reply(200, workersMock);

  const { findAllByTestId } = renderHome();

  expect(await findAllByTestId('worker-card-container')).toHaveLength(4);
});

it('should show favorite workers', async () => {
  const api = apiMock();
  api.onGet(servicesEndpoints.listMostSearched).reply(200, []);
  api.onGet(workersEndpoints.listRecent).reply(200, workersMock);

  const { findAllByTestId } = renderHome();

  expect(await findAllByTestId('favorite-button-filled')).toHaveLength(3);
});
