import React from 'react';
import { useRoute } from '@react-navigation/native';
import { apiMock } from 'api/util';
import {
  rawRender,
  NavigationContextProvider,
  waitFor,
  within,
  fireEvent,
  act,
} from 'test-utils';
import workersService, { workersEndpoints } from 'api/services/workers';
import { REVIEW_TYPES } from '../util';
import WorkerReviewsList from '../index';

const workerId = 'workerId';
const workerName = 'workerName';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));
useRoute.mockImplementation(() => ({
  params: {
    workerId,
    workerName,
  },
}));

const api = apiMock();
const mockData = [
  {
    id: '20f52725-e49c-42e4-a4c3-81f0b821e3d1',
    createdAt: '2022-04-05T19:53:20.072Z',
    updatedAt: '2022-04-05T19:53:20.072Z',
    customerId: 'dc991580-fc79-44db-9d7f-f9e2c6d4cc4b',
    workerId: '1e6c0e13-f261-4132-a037-d4e404b5e8c5',
    title: 'Excelente',
    comment: 'Muito bom',
    rating: 4,
    isGood: true,
  },
  {
    id: 'f309df7c-1605-4a34-831d-e841d3f93ed6',
    createdAt: '2022-04-05T19:53:30.375Z',
    updatedAt: '2022-04-05T19:53:30.375Z',
    customerId: 'dc991580-fc79-44db-9d7f-f9e2c6d4cc4b',
    workerId: '1e6c0e13-f261-4132-a037-d4e404b5e8c5',
    title: 'bla bla',
    comment: 'Muito ótimo',
    rating: 3,
    isGood: true,
  },
  {
    id: 'b3e7ed15-c276-4107-bb77-c54b50662e7c',
    createdAt: '2022-04-05T19:53:37.383Z',
    updatedAt: '2022-04-05T19:53:37.383Z',
    customerId: 'dc991580-fc79-44db-9d7f-f9e2c6d4cc4b',
    workerId: '1e6c0e13-f261-4132-a037-d4e404b5e8c5',
    title: 'test test',
    comment: 'Muito bom, rapido e resolveu meu problema',
    rating: 2,
    isGood: false,
  },
];
const [commentOne, commentTwo, commentThree] = mockData;
api
  .onGet(workersEndpoints.listReviews(workerId), {
    params: { type: REVIEW_TYPES.ALL },
  })
  .reply(200, mockData);
api
  .onGet(workersEndpoints.listReviews(workerId), {
    params: { type: REVIEW_TYPES.POSITIVES },
  })
  .reply(200, [commentOne, commentTwo]);
api
  .onGet(workersEndpoints.listReviews(workerId), {
    params: { type: REVIEW_TYPES.NEGATIVES },
  })
  .reply(200, [commentThree]);

it('should display worker name', async () => {
  const { getByText } = rawRender(
    <NavigationContextProvider>
      <WorkerReviewsList />
    </NavigationContextProvider>,
  );

  expect(getByText(new RegExp(workerName, 'i'))).toBeTruthy();

  await waitFor(() => {});
});

it('should display worker reviews with ALL filter', async () => {
  const { getByText, findByText, getByTestId, getAllByTestId } = rawRender(
    <NavigationContextProvider>
      <WorkerReviewsList />
    </NavigationContextProvider>,
  );

  expect(await findByText(commentOne.title)).toBeTruthy();
  expect(getByText(commentOne.comment)).toBeTruthy();
  expect(within(getByTestId('review-0')).getAllByTestId('star')).toHaveLength(
    commentOne.rating,
  );
  expect(getAllByTestId(/review-/i)).toHaveLength(mockData.length);
});

it('should display worker reviews with POSITIVES filter', async () => {
  jest
    .spyOn(workersService, 'listReviews')
    .mockReturnValueOnce(Promise.resolve([]));
  const { getByText, getByTestId, getAllByTestId, findByText, queryByText } =
    rawRender(
      <NavigationContextProvider>
        <WorkerReviewsList />
      </NavigationContextProvider>,
    );

  expect(
    await findByText(/não encontramos avaliações com o filtro selecionado/i),
  ).toBeTruthy();

  await act(async () => {
    await fireEvent(getByText(/positivas/i), 'press');
  });

  expect(getByText(commentOne.title)).toBeTruthy();
  expect(getByText(commentOne.comment)).toBeTruthy();
  expect(within(getByTestId('review-0')).getAllByTestId('star')).toHaveLength(
    commentOne.rating,
  );
  expect(queryByText(commentThree.title)).toBeFalsy();
  expect(getAllByTestId(/review-/i)).toHaveLength(2);
});

it('should display worker reviews with NEGATIVES filter', async () => {
  jest
    .spyOn(workersService, 'listReviews')
    .mockReturnValueOnce(Promise.resolve([]));
  const { getByText, getByTestId, getAllByTestId, findByText, queryByText } =
    rawRender(
      <NavigationContextProvider>
        <WorkerReviewsList />
      </NavigationContextProvider>,
    );

  expect(
    await findByText(/não encontramos avaliações com o filtro selecionado/i),
  ).toBeTruthy();

  await act(async () => {
    await fireEvent(getByText(/negativas/i), 'press');
  });

  expect(getByText(commentThree.title)).toBeTruthy();
  expect(getByText(commentThree.comment)).toBeTruthy();
  expect(within(getByTestId('review-0')).getAllByTestId('star')).toHaveLength(
    commentThree.rating,
  );
  expect(queryByText(commentOne.title)).toBeFalsy();
  expect(queryByText(commentTwo.title)).toBeFalsy();
  expect(getAllByTestId(/review-/i)).toHaveLength(1);
});

it('should dislpay list fallback when does not have reviews', async () => {
  jest
    .spyOn(workersService, 'listReviews')
    .mockReturnValueOnce(Promise.resolve([]));
  const { findByText } = rawRender(
    <NavigationContextProvider>
      <WorkerReviewsList />
    </NavigationContextProvider>,
  );

  expect(
    await findByText(/não encontramos avaliações com o filtro selecionado/i),
  ).toBeTruthy();
});
