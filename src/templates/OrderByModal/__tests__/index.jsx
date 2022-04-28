import React, { useEffect } from 'react';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import withModal from 'components/Modal/withModal';
import showOrderByModal from '../showModal';

it('should set order when select option and click on "Continuar"', () => {
  const options = [
    { label: 'option one', name: 'OPTION_ONE' },
    { label: 'option two', name: 'OPTION_TWO' },
  ];
  const [optionOne] = options;
  const setOrder = jest.fn();
  const Component = ({ showModal }) => {
    useEffect(() => {
      showOrderByModal({ showModal, options, setOrder });
    }, [showModal]);
    return null;
  };
  const ComponentWithModal = withModal(Component);

  const { getByText } = rawRender(<ComponentWithModal />);

  fireEvent(getByText(optionOne.label), 'press');
  fireEvent(getByText(/continuar/i), 'press');
  expect(setOrder).toHaveBeenCalledWith(optionOne.name);
});

it('should close modal when press on "Cancelar"', async () => {
  const options = [];
  const setOrder = jest.fn();
  const Component = ({ showModal }) => {
    useEffect(() => {
      showOrderByModal({ showModal, options, setOrder });
    }, [showModal]);
    return null;
  };
  const ComponentWithModal = withModal(Component);

  const { getByText, getByTestId } = rawRender(<ComponentWithModal />);

  expect(getByTestId('modal-container')).toHaveProp('visible', true);
  fireEvent(getByText(/cancelar/i), 'press');
  await waitFor(() => {
    expect(getByTestId('modal-container')).toHaveProp('visible', false);
  });
});

it('should start with option selected and set order to null when uncheck option', () => {
  const options = [
    { label: 'option one', name: 'OPTION_ONE' },
    { label: 'option two', name: 'OPTION_TWO' },
  ];
  const [optionOne] = options;
  const setOrder = jest.fn();
  const Component = ({ showModal }) => {
    useEffect(() => {
      showOrderByModal({ showModal, options, setOrder, order: optionOne.name });
    }, [showModal]);
    return null;
  };
  const ComponentWithModal = withModal(Component);

  const { getByText, getByTestId } = rawRender(<ComponentWithModal />);

  expect(getByTestId(`${optionOne.name}-checked`)).toBeTruthy();
  fireEvent(getByText(optionOne.label), 'press');
  fireEvent(getByText(/continuar/i), 'press');
  expect(setOrder).toHaveBeenCalledWith(null);
});
