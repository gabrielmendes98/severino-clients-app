import React from 'react';
import servicesService, { servicesEndpoints } from 'api/services/services';
import { apiMock } from 'api/util';
import {
  NavigationContextProvider,
  render,
  fireEvent,
  waitFor,
} from 'test-utils';
import SearchWorkers from '../index';

const serviceId = 'id-test';
const mockData = [
  {
    id: '529234b7-fff3-4b1e-8c51-2a9609f91f65',
    email: 'gabrielmssantiago@gmail.com',
    name: 'Gabriel Santiago',
    description: 'Sou um trabalhador muito esforçado!',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGm7ft_-D0lYtbCOKZkhpPL0Osdu8fWoEugYRMTX2on1UO6Irv6OPaxflsbotaWd9ozqRYVhVzAxLfg&usqp=CAU',
    phone: '34996863662',
    hasWhatsapp: true,
    city: {
      id: 'c4d031ec-003b-4ecb-af64-326511f62233',
      name: 'Uberlândia',
      stateId: '639d65b2-3ed5-43ab-a532-fc23acf6b649',
    },
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
    rating: null,
  },
  {
    id: '667ce842-7dfb-4e10-a28a-32ec3f72c149',
    email: 'gabriel@gmail.com',
    name: 'Gabriel Mendes',
    description: 'Sou um trabalhador muito esforçado!',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGm7ft_-D0lYtbCOKZkhpPL0Osdu8fWoEugYRMTX2on1UO6Irv6OPaxflsbotaWd9ozqRYVhVzAxLfg&usqp=CAU',
    phone: '34996863662',
    hasWhatsapp: true,
    city: {
      id: 'c4d031ec-003b-4ecb-af64-326511f62233',
      name: 'Uberlândia',
      stateId: '639d65b2-3ed5-43ab-a532-fc23acf6b649',
    },
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
        createdAt: '2022-04-15T19:25:41.657Z',
        updatedAt: '2022-04-15T19:25:41.657Z',
        customerId: '707db234-5de9-4f30-bb6d-633f1b0c0d1c',
        workerId: '667ce842-7dfb-4e10-a28a-32ec3f72c149',
      },
    ],
    rating: null,
  },
];
const api = apiMock();
const [firstWorker, secondWorker] = mockData;

beforeEach(() => {
  jest.restoreAllMocks();
  api.onGet(servicesEndpoints.searchWorkers(serviceId)).reply(200, mockData);
});

it('should be able to order by best rating', async () => {
  const apiSpy = jest.spyOn(servicesService, 'searchWorkers');
  const { getByText } = render(
    <NavigationContextProvider>
      <SearchWorkers
        route={{
          params: {
            serviceId: serviceId,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  fireEvent(getByText(/ordenar por/i), 'press');
  fireEvent(getByText(/melhor avaliação/i), 'press');
  fireEvent(getByText(/continuar/i), 'press');

  await waitFor(() => {
    expect(apiSpy).toHaveBeenCalledWith(serviceId, { order: 'bestRating' });
  });
});

it('should search for workers by serviceId', async () => {
  const { findAllByTestId, getByText } = render(
    <NavigationContextProvider>
      <SearchWorkers
        route={{
          params: {
            serviceId: serviceId,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(await findAllByTestId('worker-card')).toHaveLength(2);
  expect(getByText(new RegExp(firstWorker.name, 'i'))).toBeTruthy();
  expect(getByText(new RegExp(secondWorker.name, 'i'))).toBeTruthy();
});

it('should display service name on title', async () => {
  jest
    .spyOn(servicesService, 'searchWorkers')
    .mockImplementation(() => Promise.resolve([]));
  const serviceName = 'test service name';
  const { getByText } = render(
    <NavigationContextProvider>
      <SearchWorkers
        route={{
          params: {
            serviceId: serviceId,
            serviceName,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(getByText(new RegExp(serviceName, 'i'))).toBeTruthy();
  await waitFor(() => {});
});

it('should display fallback if not find workers', async () => {
  api.onGet(servicesEndpoints.searchWorkers(serviceId)).reply(200, []);

  const { findByText } = render(
    <NavigationContextProvider>
      <SearchWorkers
        route={{
          params: {
            serviceId: serviceId,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(
    await findByText(
      /não encontramos profissionais que prestam esse serviço em sua localização/i,
    ),
  ).toBeTruthy();
});

it('should display favorite workers', async () => {
  const { findAllByTestId } = render(
    <NavigationContextProvider>
      <SearchWorkers
        route={{
          params: {
            serviceId: serviceId,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(await findAllByTestId(/favorite-button-filled/i)).toHaveLength(1);
});
