import { useDispatch, useSelector } from 'react-redux';
import Friend from './Friends';
import Letter from './Letter';
import modalSlice, { selectModal } from '../../redux/modalSlice';
import TodoList from '../module/TodoList';
import ThemeStore from '../module/ThemeStore';
import GradientWave from '../module/GradientWave';

const MODAL_TYPES = {
  LetterModal: 'LetterModal',
  TodoModal: 'TodoModal',
  FriendModal: 'FriendModal',
  ThemeModal: 'ThemeModal',
  GradientModal: 'GradientModal',
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.LetterModal,
    component: <Letter />,
  },
  {
    type: MODAL_TYPES.TodoModal,
    component: <TodoList />,
  },
  {
    type: MODAL_TYPES.FriendModal,
    component: <Friend />,
  },
  {
    type: MODAL_TYPES.ThemeModal,
    component: <ThemeStore />,
  },
  {
    type: MODAL_TYPES.GradientModal,
    component: <GradientWave />,
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
