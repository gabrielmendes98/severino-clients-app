import React, { useEffect } from 'react';
import { Provider } from 'common/contexts/Location';
import UserProvider from 'common/contexts/User';
import { render, fireEvent, waitFor, rawRender } from 'test-utils';
import { locationsEndpoints } from 'api/services/locations';
import * as generalUtils from 'common/util/general';
import { apiMock } from 'api/util';
import store from 'common/util/store';
import withModal from 'components/Modal/withModal';
import LocationModal from '../index';
import showLocationModal from '../showModal';

jest.mock('common/contexts/User', () => jest.fn());
UserProvider.mockImplementation(({ children }) => children);

it('should show current location city and state acronym formatted when has location', () => {
  const mockLocation = {
    name: 'mock name',
    state: {
      acronym: 'mock acronym',
    },
  };
  const { getByText } = rawRender(
    <Provider value={{ location: mockLocation }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  expect(
    getByText(
      new RegExp(`${mockLocation.name}, ${mockLocation.state.acronym}`),
    ),
  ).toBeTruthy();
});

it('should show  "Não selecionado" when does not have location', () => {
  const { getByText } = rawRender(
    <Provider value={{ location: null }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  expect(getByText(/não selecionado/i)).toBeTruthy();
});

it('should populate city options when change search input', async () => {
  const api = apiMock();
  const mockResponse = [
    {
      id: 'uberaba',
      name: 'Uberaba',
      state: {
        acronym: 'MG',
      },
    },
    {
      id: 'uberlandia',
      name: 'Uberlândia',
      state: {
        acronym: 'MG',
      },
    },
  ];
  const mockSearchCity = 'uber';
  api.onGet(locationsEndpoints.search(mockSearchCity)).reply(200, mockResponse);

  const [uberaba, uberlandia] = mockResponse;

  const { getByPlaceholderText, findByText, getByText } = rawRender(
    <Provider value={{ location: null }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  fireEvent(
    getByPlaceholderText(/digite o nome da sua cidade/i),
    'onChangeText',
    mockSearchCity,
  );

  expect(
    await findByText(
      new RegExp(`${uberaba.name}, ${uberaba.state.acronym}`, 'i'),
    ),
  ).toBeTruthy();
  expect(
    getByText(
      new RegExp(`${uberlandia.name}, ${uberlandia.state.acronym}`, 'i'),
    ),
  ).toBeTruthy();
});

it('should clear city options when search input is empty', () => {
  const { getByPlaceholderText, queryByTestId } = rawRender(
    <Provider value={{ location: null }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  fireEvent(
    getByPlaceholderText(/digite o nome da sua cidade/i),
    'onChangeText',
    '',
  );

  expect(queryByTestId(/city-item/i)).toBeFalsy();
});

it('should clear city options when does not find city ', async () => {
  const api = apiMock();
  const mockResponse = [];
  const mockSearchCity = 'xxx';
  api.onGet(locationsEndpoints.search(mockSearchCity)).reply(200, mockResponse);

  const { getByPlaceholderText, queryByTestId } = rawRender(
    <Provider value={{ location: null }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  fireEvent(
    getByPlaceholderText(/digite o nome da sua cidade/i),
    'onChangeText',
    mockSearchCity,
  );

  await waitFor(() => {
    expect(queryByTestId(/city-item/i)).toBeFalsy();
  });
});

it('should select and save location, show success message and close modal on save ', async () => {
  const closeModal = jest.fn();
  const api = apiMock();
  const mockResponse = [
    {
      id: 'uberaba',
      name: 'Uberaba',
      state: {
        acronym: 'MG',
      },
    },
    {
      id: 'uberlandia',
      name: 'Uberlândia',
      state: {
        acronym: 'MG',
      },
    },
  ];
  const mockSearchCity = 'uber';
  api.onGet(locationsEndpoints.search(mockSearchCity)).reply(200, mockResponse);

  const [uberaba] = mockResponse;

  const { getByPlaceholderText, findByText, getByText } = render(
    <LocationModal closeModal={closeModal} />,
  );

  fireEvent(
    getByPlaceholderText(/digite o nome da sua cidade/i),
    'onChangeText',
    mockSearchCity,
  );

  fireEvent(
    await findByText(
      new RegExp(`${uberaba.name}, ${uberaba.state.acronym}`, 'i'),
    ),
    'press',
  );
  fireEvent(getByText(/salvar/i), 'press');

  expect(store.location).toBe(uberaba.id);
  expect(getByText(/com sucesso/i)).toBeTruthy();
  expect(closeModal).toHaveBeenCalled();
});

it('should close modal when press on "Fechar"', async () => {
  const Component = ({ showModal }) => {
    useEffect(() => {
      showLocationModal(showModal);
    }, [showModal]);
    return null;
  };
  const ComponentWithModal = withModal(Component);

  const { getByText, getByTestId } = rawRender(
    <Provider value={{ location: null }}>
      <ComponentWithModal />
    </Provider>,
  );

  expect(getByTestId('modal-container')).toHaveProp('visible', true);
  fireEvent(getByText(/fechar/i), 'press');
  await waitFor(() => {
    expect(getByTestId('modal-container')).toHaveProp('visible', false);
  });
});

it('should focus input when press on input container', () => {
  const spy = jest.spyOn(generalUtils, 'focus');
  const { getByTestId } = rawRender(
    <Provider value={{ location: null }}>
      <LocationModal closeModal={jest.fn()} />
    </Provider>,
  );

  fireEvent(getByTestId('location-input-container'), 'press');
  expect(spy).toHaveBeenCalled();
});
