import React, { useCallback, useState } from 'react';
import theme from 'common/styles/theme';
import Modal from './Modal';

const buttonCancel = label => ({
  color: theme.colors.primary,
  id: 'modal-cancel',
  label: label || 'Cancelar',
});

const withModal = WrappedComponent => {
  const ModalComponent = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
      title: '',
      message: '',
      actions: [],
    });

    const handleClose = useCallback(() => {
      setIsOpen(false);
      return modalData.customHandleClose && modalData.customHandleClose();
    }, [modalData]);

    const handleShow = useCallback(
      ({
        title = '',
        message = '',
        actions = [],
        cancelButton = true,
        body = null,
        handleClose: customHandleClose,
        cancelLabel = '',
        ...othersProps
      }) => {
        const currentModalData = {
          title,
          message,
          actions: cancelButton
            ? [buttonCancel(cancelLabel), ...actions]
            : actions,
          body,
          ...othersProps,
        };

        if (customHandleClose) {
          currentModalData.customHandleClose = customHandleClose;
        }

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
          showModal={handleShow}
        />

        {isOpen && <Modal closeModal={handleClose} {...modalData} />}
      </>
    );
  };

  ModalComponent.displayName = 'ModalComponent';
  return ModalComponent;
};

export default withModal;
