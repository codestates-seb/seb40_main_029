import { useDispatch, useSelector } from 'react-redux';
import Friend from './Friends';
import Letter from './Letter';
import modalSlice, { selectModal } from '../../redux/modalSlice';

const MODAL_TYPES = {
  FriendModal: 'FriendModal',
  LetterModal: 'LetterModal',
  TodoModal: 'TodoModal',
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.FriendModal,
    component: <Friend />,
  },
  {
    type: MODAL_TYPES.LetterModal,
    component: <Letter />,
  },
];

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return <div>{renderModal()}</div>;
}

export default GlobalModal;
