/* eslint-disable no-undefined */
import React from 'react';
import { apiMock } from 'api/util';
import { render } from 'test-utils';
import { workersEndpoints } from 'api/services/workers';
import { prepareWorkers } from '../util';
import Favorites from '../index';

const mockData = [
  {
    createdAt: '2022-03-30T14:23:34.136Z',
    updatedAt: '2022-03-30T14:23:34.136Z',
    customerId: 'dc991580-fc79-44db-9d7f-f9e2c6d4cc4b',
    workerId: '1e6c0e13-f261-4132-a037-d4e404b5e8c5',
    worker: {
      id: '1e6c0e13-f261-4132-a037-d4e404b5e8c5',
      createdAt: '2022-03-22T13:40:51.046Z',
      updatedAt: '2022-03-22T13:40:51.046Z',
      email: 'gabrielmssantiago@gmail.com',
      name: 'Gabriel Santiago',
      description: 'Sou um trabalhador muito esforçado!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGm7ft_-D0lYtbCOKZkhpPL0Osdu8fWoEugYRMTX2on1UO6Irv6OPaxflsbotaWd9ozqRYVhVzAxLfg&usqp=CAU',
      phone: '34996863662',
      hasWhatsapp: true,
      cityId: '72ec885e-0f6a-4196-8fc4-e3d8b39c1f2e',
      profile: {
        services: [
          {
            service: {
              name: 'Servente',
            },
          },
        ],
      },
      rating: null,
    },
  },
  {
    createdAt: '2022-03-30T14:23:51.735Z',
    updatedAt: '2022-03-30T14:23:51.735Z',
    customerId: 'dc991580-fc79-44db-9d7f-f9e2c6d4cc4b',
    workerId: '7e3dfd68-8811-40bb-ac9b-9b027b16db85',
    worker: {
      id: '7e3dfd68-8811-40bb-ac9b-9b027b16db85',
      createdAt: '2022-03-22T13:16:45.584Z',
      updatedAt: '2022-03-22T13:16:45.584Z',
      email: 'gabriel@gmail.com',
      name: 'Gabriel Santiago',
      description: 'Sou um trabalhador muito esforçado!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGm7ft_-D0lYtbCOKZkhpPL0Osdu8fWoEugYRMTX2on1UO6Irv6OPaxflsbotaWd9ozqRYVhVzAxLfg&usqp=CAU',
      phone: '34996863662',
      hasWhatsapp: true,
      cityId: '72ec885e-0f6a-4196-8fc4-e3d8b39c1f2e',
      profile: {
        services: [
          {
            service: {
              name: 'Pedreiro',
            },
          },
          {
            service: {
              name: 'Servente',
            },
          },
        ],
      },
      rating: 3.3333,
    },
  },
];

it('should list favorites using worker cards component', async () => {
  const api = apiMock();

  api.onGet(workersEndpoints.favorites).reply(200, mockData);

  const { findAllByTestId } = render(<Favorites />);

  expect(await findAllByTestId('worker-card')).toHaveLength(2);
});

it('should display fallback message if does not have favorites', async () => {
  const api = apiMock();

  api.onGet(workersEndpoints.favorites).reply(200, []);

  const { findByText } = render(<Favorites />);

  expect(
    await findByText(/você ainda não tem favoritos adicionados/i),
  ).toBeTruthy();
});

it('should prepare fetched workers for component', () => {
  const [firstWorker, secondWorker] = mockData;

  expect(prepareWorkers(mockData)).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([
        expect.objectContaining({
          id: firstWorker.worker.id,
          services: 'Servente',
          isFavorite: true,
          rating: undefined,
        }),
        expect.objectContaining({
          id: secondWorker.worker.id,
          services: 'Pedreiro, Servente',
          isFavorite: true,
          rating: '3.3',
        }),
      ]),
      {
        [firstWorker.worker.id]: true,
        [secondWorker.worker.id]: true,
      },
    ]),
  );
});
