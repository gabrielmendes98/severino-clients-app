/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { rawRender, fireEvent, waitFor } from 'test-utils';
import withModal from '../withModal';

it('should wrap component with modal when use withModal HOC', () => {
  const screenTestId = 'screenTestId';
  const Component = () => <View testID={screenTestId}></View>;
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  expect(getByTestId(screenTestId)).toBeTruthy();
  expect(getByTestId('modal-container')).toBeTruthy();
});

it('should receive showModal prop and call it to show modal passing title and message', () => {
  const touchableId = 'touchableId';
  const config = {
    title: 'Title test',
    message: 'Message test',
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByTestId, getByText } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  expect(getByText(config.title)).toBeTruthy();
  expect(getByText(config.message)).toBeTruthy();
});

it('should call onClose callback when close modal', () => {
  const touchableId = 'touchableId';
  const config = {
    onClose: jest.fn(),
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  fireEvent(getByTestId('modal-cancel'), 'press');
  expect(config.onClose).toHaveBeenCalled();
});

it('should be able to change cancel label', () => {
  const touchableId = 'touchableId';
  const cancelLabel = 'cancel label test';
  const config = {
    cancelLabel,
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByText, getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  expect(getByText(cancelLabel)).toBeTruthy();
});

it('should be able to pass new action buttons', () => {
  const touchableId = 'touchableId';
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

  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByText, getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');

  const [btnOne, btnTwo] = config.actions;

  fireEvent(getByText(btnOne.label), 'press');
  fireEvent(getByText(btnTwo.label), 'press');

  expect(btnOne.onPress).toHaveBeenCalled();
  expect(btnTwo.onPress).toHaveBeenCalled();
});

it('should be able to hide cancel button', () => {
  const touchableId = 'touchableId';
  const config = {
    cancelButton: false,
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { queryByTestId, getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  expect(queryByTestId('modal-cancel')).toBeFalsy();
});

it('should be able to disable fullscreen and set modal height', () => {
  const touchableId = 'touchableId';
  const config = {
    fullScreen: false,
    height: 70,
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  expect(getByTestId('modal-content')).toHaveStyle({
    height: `${config.height}%`,
    flex: 0,
  });
});

it('should be able to pass a component as modal body', () => {
  const bodyTestID = 'bodyTestID';
  const Body = () => <View testID={bodyTestID}></View>;

  const touchableId = 'touchableId';
  const config = {
    body: Body,
  };
  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');
  expect(getByTestId(bodyTestID)).toBeTruthy();
});

it('should keep modal open when pass skip close to action', async () => {
  const touchableId = 'touchableId';
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

  const Component = ({ showModal }) => (
    <View>
      <TouchableWithoutFeedback
        testID={touchableId}
        onPress={() => showModal(config)}
      >
        <View></View>
      </TouchableWithoutFeedback>
    </View>
  );
  const ComponentWithModal = withModal(Component);
  const { getByTestId } = rawRender(<ComponentWithModal />);

  fireEvent(getByTestId(touchableId), 'press');

  const [btnOne] = config.actions;

  fireEvent(getByTestId(btnOne.testID), 'press');

  await waitFor(() => {
    expect(getByTestId('modal-container')).toHaveProp('visible', true);
  });
  expect(config.onClose).not.toHaveBeenCalled();
});
