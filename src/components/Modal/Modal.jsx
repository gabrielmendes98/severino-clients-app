import React from 'react';
import PropTypes from 'prop-types';
import { Modal as RNModal } from 'react-native';
import Text from 'components/Text';
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

  return (
    <RNModal animationType="slide">
      {title && <Text testID="modal-title">{title}</Text>}

      {Boolean(message) && <Text testID="modal-message">{message}</Text>}

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
