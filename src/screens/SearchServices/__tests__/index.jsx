import React from 'react';
import { servicesEndpoints } from 'api/services/services';
import { apiMock } from 'api/util';
import { render, NavigationContextProvider, fireEvent } from 'test-utils';
import SearchServices from '../index';

const searchText = 'service test';
const api = apiMock();
const mockResponse = [
  {
    serviceName: 'Limpeza de Pedras',
    serviceCategoryName: 'Limpeza',
    avatarUrl:
      'https://image-upload-severino.s3.amazonaws.com/f29dea26fc7538543f6ed884dcf4ed64-cleaner-clean-svgrepo-com.svg',
    serviceCategoryId: 'ab0fe49e-bbbb-489a-8429-37ca2e40',
    serviceId: 'c8c6f81a-1d3a-4d27-8d53-7cd50b854b93',
  },
  {
    serviceName: 'Limpeza de Casa',
    serviceCategoryName: 'Limpeza',
    avatarUrl:
      'https://image-upload-severino.s3.amazonaws.com/f29dea26fc7538543f6ed884dcf4ed64-cleaner-clean-svgrepo-com.svg',
    serviceCategoryId: 'ab0fe49e-bbbb-489a-8429-37ca2e408472',
    serviceId: 'c8c6f81a-1d3a-4d27-8d53-7cd50b8',
  },
];
const [firstService, secondService] = mockResponse;

beforeEach(() => {
  api.onGet(servicesEndpoints.search(searchText)).reply(200, mockResponse);
});

it('should show error message if press on search without fill input', async () => {
  const { getByText, findByText } = render(
    <NavigationContextProvider>
      <SearchServices route={{}} />
    </NavigationContextProvider>,
  );

  fireEvent(getByText(/buscar/i), 'press');

  expect(await findByText(/digite o serviço que deseja buscar/i)).toBeTruthy();
});

it('should display searched services', async () => {
  const { getByText, findByText, getByPlaceholderText } = render(
    <NavigationContextProvider>
      <SearchServices route={{}} />
    </NavigationContextProvider>,
  );

  fireEvent(
    getByPlaceholderText(/digite o nome de um serviço/i),
    'onChangeText',
    searchText,
  );
  fireEvent(getByText(/buscar/i), 'press');

  expect(await findByText(firstService.serviceName)).toBeTruthy();
  expect(getByText(secondService.serviceName)).toBeTruthy();
});

it('should search for value if coming from redirect', async () => {
  const { getByText, findByText } = render(
    <NavigationContextProvider>
      <SearchServices
        route={{
          params: {
            search: searchText,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(await findByText(firstService.serviceName)).toBeTruthy();
  expect(getByText(secondService.serviceName)).toBeTruthy();
});

it('should set route params to last search on unmount', async () => {
  const route = {
    params: {
      search: searchText,
    },
  };
  const changedText = 'changed text test';

  const { getByPlaceholderText, unmount, findByText, getByText } = render(
    <NavigationContextProvider>
      <SearchServices route={route} />
    </NavigationContextProvider>,
  );

  expect(await findByText(firstService.serviceName)).toBeTruthy();
  expect(getByText(secondService.serviceName)).toBeTruthy();

  fireEvent(
    getByPlaceholderText(/digite o nome de um serviço/i),
    'onChangeText',
    changedText,
  );

  unmount();

  expect(route.params.search).toBe(changedText);
});

it('should display fallback if not find services', async () => {
  api.onGet(servicesEndpoints.search(searchText)).reply(200, []);

  const { findByText } = render(
    <NavigationContextProvider>
      <SearchServices
        route={{
          params: {
            search: searchText,
          },
        }}
      />
    </NavigationContextProvider>,
  );

  expect(
    await findByText(/não encontramos serviços com esse nome/i),
  ).toBeTruthy();
});
