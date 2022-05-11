/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import useLocation from 'common/contexts/Location/useLocation';
import { rawRender, render, waitFor, fireEvent } from 'test-utils';
import Header from '../index';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('mock contexts', () => {
  const actual = jest.requireActual('common/contexts/Location/useLocation');
  jest.spyOn(actual, 'default').mockImplementation(() => ({
    location: null,
  }));

  it('should display logo when back prop is false', () => {
    const { getByTestId } = rawRender(<Header />);
    expect(getByTestId('header-logo')).toBeTruthy();
  });

  it('should display back button when back prop is true', () => {
    const { getByTestId } = rawRender(<Header back />);
    expect(getByTestId('header-back-button')).toBeTruthy();
  });
});

describe('without mock contexts', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  const Component = ({ location }) => {
    const { loading, saveLocation } = useLocation();

    useEffect(() => {
      saveLocation(location);
    }, [saveLocation, loading, location]);

    return !loading && <Header />;
  };

  it('should display "Não informado" when location is falsy', async () => {
    const { getByText } = render(<Component location={null} />);
    await waitFor(() => expect(getByText(/não informado/i)).toBeTruthy());
  });

  it('should display formatted selected location. location object should contain name and state.acronym', async () => {
    const location = {
      name: 'name mock',
      state: {
        acronym: 'acronym mock',
      },
    };

    const { getByText } = render(<Component location={location} />);
    await waitFor(() =>
      expect(
        getByText(`${location.name}, ${location.state.acronym}`),
      ).toBeTruthy(),
    );
  });

  it('should show location modal when click on location', async () => {
    const { getByText } = render(<Component location={null} />);
    await waitFor(() => expect(getByText(/não informado/i)).toBeTruthy());
    fireEvent(getByText(/não informado/i), 'press');
    expect(getByText(/localização atual/i)).toBeTruthy();
  });
});
