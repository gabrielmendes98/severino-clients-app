import React, { useCallback, useState } from 'react';
import theme from 'common/styles/theme';
import Modal from './Modal';

const cancelButtonConfig = label => ({
  color: theme.colors.primary,
  testID: 'modal-cancel',
  label,
});

const withModal = WrappedComponent => {
  const ModalComponent = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const handleClose = useCallback(() => {
      setIsOpen(false);
      return modalData?.onClose && modalData.onClose();
    }, [modalData]);

    const showModal = useCallback(
      ({
        actions = [],
        cancelButton = true,
        cancelLabel = 'Cancelar',
        fullScreen = true,
        height = 50,
        title,
        message,
        onClose,
        body,
        ...aditionalProps
      }) => {
        const currentModalData = {
          actions: cancelButton
            ? [cancelButtonConfig(cancelLabel), ...actions]
            : actions,
          title,
          message,
          onClose,
          fullScreen,
          height,
          body,
          ...aditionalProps,
        };

        setModalData(currentModalData);
        setIsOpen(true);
      },
      [],
    );

    return (
      <>
        <WrappedComponent
          {...props}
          closeModal={handleClose}
          modalOpened={isOpen}
          showModal={showModal}
        />

        <Modal closeModal={handleClose} isOpen={isOpen} {...modalData} />
      </>
    );
  };

  ModalComponent.displayName = 'ModalComponent';
  return ModalComponent;
};

export default withModal;
