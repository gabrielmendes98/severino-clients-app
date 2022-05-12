import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { render, fireEvent } from 'test-utils';
import { validationMessages } from 'common/util/yup';
import { apiMock } from 'api/util';
import workersService, { workersEndpoints } from 'api/services/workers';
import * as util from '../util';
import WorkerReview from '../index';

const workerId = 'workerId';
const workerName = 'workerName';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));
useRoute.mockImplementation(() => ({
  params: {
    workerId,
    workerName,
  },
}));

it('should show error when do not fill evaluation stars', async () => {
  jest.spyOn(util, 'throwError').mockImplementation(jest.fn());
  const { getByText, findByText, getByPlaceholderText } = render(
    <WorkerReview />,
  );

  fireEvent(getByPlaceholderText(/título/i), 'onChangeText', 'title');
  fireEvent(getByPlaceholderText(/mensagem/i), 'onChangeText', 'message');
  fireEvent(getByText(/enviar avaliação/i), 'press');

  expect(
    await findByText(
      /selecione uma quantidade de estrelas para sua avaliação/i,
    ),
  ).toBeTruthy();
});

it('should be able to create review then show success message and navigate to home', async () => {
  const createReview = jest.spyOn(workersService, 'createReview');

  const api = apiMock();

  const data = {
    workerId,
    title: 'title',
    comment: 'comment',
    rating: 3,
  };

  api.onPost(workersEndpoints.reviews).reply(200, data);

  const { getByText, getAllByTestId, getByPlaceholderText, findByText } =
    render(<WorkerReview />);

  fireEvent(getByPlaceholderText(/título/i), 'onChangeText', data.title);
  fireEvent(getByPlaceholderText(/mensagem/i), 'onChangeText', data.comment);
  fireEvent(getAllByTestId('star-border')[data.rating - 1], 'press');
  fireEvent(getByText(/enviar avaliação/i), 'press');

  expect(await findByText(/agradecemos sua avaliação/i)).toBeTruthy();
  expect(navigate).toHaveBeenCalledWith('Home');
  expect(createReview).toHaveBeenCalledWith(data);
});

it('should require title and comment fields', async () => {
  const { getByText, findByTestId, getByTestId } = render(<WorkerReview />);

  fireEvent(getByText(/enviar avaliação/i), 'press');

  expect(await findByTestId('title-input-error')).toHaveTextContent(
    validationMessages.mixed.required,
  );
  expect(getByTestId('comment-input-error')).toHaveTextContent(
    validationMessages.mixed.required,
  );
});
