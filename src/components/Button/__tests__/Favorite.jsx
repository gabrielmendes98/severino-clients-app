import React from 'react';
import { FavoriteProvider } from 'common/contexts/Favorite';
import { rawRender, fireEvent } from 'test-utils';
import { workersEndpoints } from 'api/services/workers';
import { apiMock } from 'api/util';
import FavoriteButton from '../Favorite';

it('should update favorite to true when click on it when it is false', async () => {
  const mock = apiMock();
  mock.onPost(workersEndpoints.favorites).reply(200, {
    favorited: true,
  });

  const testID = 'favorite-button';
  const { getByTestId, findByTestId } = rawRender(
    <FavoriteProvider>
      <FavoriteButton workerId="FAKE_ID" testID={testID} />
    </FavoriteProvider>,
  );

  expect(getByTestId(`${testID}-outline`)).toBeTruthy();
  fireEvent(getByTestId(testID), 'press');
  expect(await findByTestId(`${testID}-filled`)).toBeTruthy();
});

it('should update favorite to false when click on it when it is true', async () => {
  const mock = apiMock();
  mock.onPost(workersEndpoints.favorites).reply(200, {
    favorited: false,
  });

  const testID = 'favorite-button';
  const workerID = 'FAKE_ID';
  const { getByTestId, findByTestId } = rawRender(
    <FavoriteProvider initialFavorites={{ [workerID]: true }}>
      <FavoriteButton workerId={workerID} testID={testID} />
    </FavoriteProvider>,
  );

  expect(getByTestId(`${testID}-filled`)).toBeTruthy();
  fireEvent(getByTestId(testID), 'press');
  expect(await findByTestId(`${testID}-outline`)).toBeTruthy();
});
