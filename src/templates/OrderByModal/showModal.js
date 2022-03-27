import OrderByModal from './index';

const showOrderByModal = ({ showModal, options, setOrder, order }) =>
  showModal({
    body: OrderByModal,
    cancelButton: false,
    options,
    setOrder,
    initialSelected: order,
  });

export default showOrderByModal;
