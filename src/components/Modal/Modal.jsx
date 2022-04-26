import React from 'react';
import PropTypes from 'prop-types';
import RNModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from 'components/Text';

import createStyles from './style';
import renderButtons from './renderButtons';

const Modal = ({
  title,
  message,
  actions,
  body: Body,
  closeModal,
  isOpen,
  fullScreen,
  height,
  ...other
}) => {
  const getButtons = renderButtons(closeModal);
  const bodyContent = Body ? (
    <Body {...other} closeModal={closeModal} renderButtons={getButtons} />
  ) : null;
  const styles = createStyles({ fullScreen, height });

  return (
    <RNModal
      isVisible={isOpen}
      style={styles.container}
      useNativeDriver
      onBackdropPress={closeModal}
      testID="modal-container"
      {...other}
    >
      <SafeAreaView style={styles.content} testID="modal-content">
        {Boolean(title) && <Text testID="modal-title">{title}</Text>}

        {Boolean(message) && <Text testID="modal-message">{message}</Text>}

        {bodyContent}

        {actions && actions.length ? getButtons(actions) : null}
      </SafeAreaView>
    </RNModal>
  );
};

Modal.propTypes = {
  actions: PropTypes.array,
  body: PropTypes.any,
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  fullScreen: PropTypes.bool,
  height: PropTypes.number,
};

export default Modal;
