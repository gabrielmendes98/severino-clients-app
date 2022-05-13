import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { rawRender } from 'test-utils';
import { FavoriteProvider, useFavorite } from '../index';

it('should start with initial favorites', () => {
  const Component = () => {
    const { favorites } = useFavorite();

    return (
      <View>
        {Object.keys(favorites).map(favorite => (
          <Text key={favorite}>{favorite}</Text>
        ))}
      </View>
    );
  };

  const { getByText } = rawRender(
    <FavoriteProvider initialFavorites={{ FAKE_ID_1: true, FAKE_ID_2: false }}>
      <Component />
    </FavoriteProvider>,
  );

  expect(getByText('FAKE_ID_1')).toBeTruthy();
  expect(getByText('FAKE_ID_2')).toBeTruthy();
});

it('should be able to update favorite', () => {
  const Component = () => {
    const { favorites, updateFavorite } = useFavorite();

    useEffect(() => {
      updateFavorite('FAKE_ID_2', true);
    }, [updateFavorite]);

    return (
      <View>
        {Object.keys(favorites).map(favorite => (
          <Text key={favorite}>{`${favorite}: ${favorites[favorite]}`}</Text>
        ))}
      </View>
    );
  };

  const { getByText } = rawRender(
    <FavoriteProvider initialFavorites={{ FAKE_ID_1: true, FAKE_ID_2: false }}>
      <Component />
    </FavoriteProvider>,
  );

  expect(getByText('FAKE_ID_1: true')).toBeTruthy();
  expect(getByText('FAKE_ID_2: true')).toBeTruthy();
});

it('should be able to add new favorite', () => {
  const Component = () => {
    const { favorites, updateFavorite } = useFavorite();

    useEffect(() => {
      updateFavorite('FAKE_ID_3', true);
    }, [updateFavorite]);

    return (
      <View>
        {Object.keys(favorites).map(favorite => (
          <Text key={favorite}>{`${favorite}: ${favorites[favorite]}`}</Text>
        ))}
      </View>
    );
  };

  const { getByText } = rawRender(
    <FavoriteProvider initialFavorites={{ FAKE_ID_1: true, FAKE_ID_2: false }}>
      <Component />
    </FavoriteProvider>,
  );

  expect(getByText('FAKE_ID_1: true')).toBeTruthy();
  expect(getByText('FAKE_ID_2: false')).toBeTruthy();
  expect(getByText('FAKE_ID_3: true')).toBeTruthy();
});

it('should expose setFavorites', () => {
  const Component = () => {
    const { favorites, setFavorites } = useFavorite();

    useEffect(() => {
      setFavorites({ FAKE_ID_1: true, FAKE_ID_2: false });
    }, [setFavorites]);

    return (
      <View>
        {Object.keys(favorites).map(favorite => (
          <Text key={favorite}>{`${favorite}: ${favorites[favorite]}`}</Text>
        ))}
      </View>
    );
  };

  const { getByText } = rawRender(
    <FavoriteProvider>
      <Component />
    </FavoriteProvider>,
  );

  expect(getByText('FAKE_ID_1: true')).toBeTruthy();
  expect(getByText('FAKE_ID_2: false')).toBeTruthy();
});
