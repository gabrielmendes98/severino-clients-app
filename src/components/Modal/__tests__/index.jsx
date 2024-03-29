/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import withModal from '../withModal';

const showModalButtonId = 'showModalButtonId';
const renderModalBase = config => {
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={showModalButtonId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  return rawRender(<ComponentWithModal />);
};

it('should wrap component with modal when use withModal HOC', () => {
  const screenTestId = 'screenTestId';
  const Component = () => <View testID={screenTestId}></View>;
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  expect(getByTestId(screenTestId)).toBeTruthy();
  expect(getByTestId('modal-container')).toBeTruthy();
});

it('should receive showModal prop and call it to show modal passing title and message', () => {
  const config = {
    title: 'Title test',
    message: 'Message test',
  };

  const { getByTestId, getByText } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  expect(getByText(config.title)).toBeTruthy();
  expect(getByText(config.message)).toBeTruthy();
});

it('should call onClose callback when close modal', () => {
  const config = {
    onClose: jest.fn(),
  };

  const { getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  fireEvent(getByTestId('modal-cancel'), 'press');
  expect(config.onClose).toHaveBeenCalled();
});

it('should be able to change cancel label', () => {
  const cancelLabel = 'cancel label test';
  const config = {
    cancelLabel,
  };

  const { getByText, getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  expect(getByText(cancelLabel)).toBeTruthy();
});

it('should be able to pass new action buttons', () => {
  const config = {
    actions: [
      {
        testID: 'modal-button-one',
        label: 'modal-label-one',
        onPress: jest.fn(),
      },
      {
        testID: 'modal-button-two',
        label: 'modal-label-two',
        onPress: jest.fn(),
        fullWidth: false,
      },
    ],
  };

  const { getByText, getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');

  const [btnOne, btnTwo] = config.actions;

  fireEvent(getByText(btnOne.label), 'press');
  fireEvent(getByText(btnTwo.label), 'press');

  expect(btnOne.onPress).toHaveBeenCalled();
  expect(btnTwo.onPress).toHaveBeenCalled();
});

it('should be able to hide cancel button', () => {
  const config = {
    cancelButton: false,
  };

  const { queryByTestId, getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  expect(queryByTestId('modal-cancel')).toBeFalsy();
});

it('should be able to disable fullscreen and set modal height', () => {
  const config = {
    fullScreen: false,
    height: 70,
  };

  const { getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  expect(getByTestId('modal-content')).toHaveStyle({
    height: `${config.height}%`,
    flex: 0,
  });
});

it('should be able to pass a component as modal body', () => {
  const bodyTestID = 'bodyTestID';
  const Body = () => <View testID={bodyTestID}></View>;

  const config = {
    body: Body,
  };

  const { getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');
  expect(getByTestId(bodyTestID)).toBeTruthy();
});

it('should keep modal open when pass skip close to action', async () => {
  const config = {
    actions: [
      {
        testID: 'modal-button-one',
        label: 'modal-label-one',
        onPress: jest.fn(),
        skipClose: true,
      },
    ],
    onClose: jest.fn(),
  };

  const { getByTestId } = renderModalBase(config);

  fireEvent(getByTestId(showModalButtonId), 'press');

  const [btnOne] = config.actions;

  fireEvent(getByTestId(btnOne.testID), 'press');

  await waitFor(() => {
    expect(getByTestId('modal-container')).toHaveProp('visible', true);
  });
  expect(config.onClose).not.toHaveBeenCalled();
});
