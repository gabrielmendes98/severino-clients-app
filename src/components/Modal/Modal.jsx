import React from 'react';
import PropTypes from 'prop-types';
import { Modal as RNModal, View, Text } from 'react-native';
import renderButtons from './renderButtons';

const Modal = ({
  title,
  message,
  actions,
  body: Body,
  closeModal,
  ...other
}) => {
  const getButtons = renderButtons(closeModal);
  const bodyContent = Body ? (
    <Body {...other} closeModal={closeModal} renderButtons={getButtons} />
  ) : null;

  console.log(message);
  return (
    <RNModal animationType="slide">
      {title && (
        <View>
          <Text testID="modal-title">{title}</Text>
        </View>
      )}

      {Boolean(message) && (
        <View>
          <Text testID="modal-message">{message}</Text>
        </View>
      )}

      {bodyContent}

      {actions && actions.length ? getButtons(actions) : null}
    </RNModal>
  );
};

Modal.propTypes = {
  actions: PropTypes.array.isRequired,
  body: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
