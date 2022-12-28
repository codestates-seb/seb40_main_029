import { useSelector } from 'react-redux';
import Friend from './Friends';
import Letter from './Letter';
import { selectModal } from '../../redux/modalSlice';
import TodoList from '../module/TodoList';
import ThemeStore from '../module/ThemeStore';
import MonthlyLookback from '../module/MonthlyLookback';
import LookBack from '../module/LookBack';

const MODAL_TYPES = {
  LetterModal: 'LetterModal',
  TodoModal: 'TodoModal',
  FriendModal: 'FriendModal',
  ThemeModal: 'ThemeModal',
  MonthlyModal: 'MonthlyModal',
  LookbackModal: 'LookbackModal',
};

function GlobalModal({
  setHidenCard,
  lookbackRefresh,
  lookbackRefresher,
  pointRefresher,
}) {
  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.LetterModal,
      component: <Letter pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.TodoModal,
      component: (
        <TodoList
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
      ),
    },
    {
      type: MODAL_TYPES.FriendModal,
      component: <Friend />,
    },
    {
      type: MODAL_TYPES.ThemeModal,
      component: <ThemeStore pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.MonthlyModal,
      component: <MonthlyLookback setHidenCard={setHidenCard} />,
    },
    {
      type: MODAL_TYPES.LookbackModal,
      component: (
        <LookBack
          setHidenCard={setHidenCard}
          lookbackRefresh={lookbackRefresh}
        />
      ),
    },
  ];
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return <div style={{ display: 'flex', width: '100%' }}>{renderModal()}</div>;
}

export default GlobalModal;
