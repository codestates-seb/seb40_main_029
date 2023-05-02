import { useSelector } from 'react-redux';
import { selectModal } from '../../../redux/modalSlice';
import { modalList } from '../../../router/Modals';
import IsFullModal from './IsFullModal';

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) {
    return <IsFullModal isFull={false}>{null}</IsFullModal>;
  }

  const findModal = modalList.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return <IsFullModal isFull={findModal.isFull}>{renderModal()}</IsFullModal>;
}

export default GlobalModal;
