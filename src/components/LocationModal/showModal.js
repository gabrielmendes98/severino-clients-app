import LocationModal from './index';

const showLocationModal = showModal =>
  showModal({
    body: LocationModal,
    cancelButton: false,
  });

export default showLocationModal;
