import React from 'react';
import PropTypes from 'prop-types';
import { Modal as RNModal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'common/styles/theme';
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
      <SafeAreaView style={styles.container}>
        {Boolean(title) && <Text testID="modal-title">{title}</Text>}

        {Boolean(message) && <Text testID="modal-message">{message}</Text>}

        {bodyContent}

        {actions && actions.length ? getButtons(actions) : null}
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.main,
    flex: 1,
  },
});

Modal.propTypes = {
  actions: PropTypes.array.isRequired,
  body: PropTypes.any,
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
};

export default Modal;
