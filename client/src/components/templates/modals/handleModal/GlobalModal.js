import { useSelector } from 'react-redux';
import { selectModal } from '../../../../redux/modalSlice';
import FriendModal from '../friend/Friend';
import LetterModal from '../letter/Letter';
import TodoModal from '../todo/TodoList';
import ThemeModal from '../theme/ThemeStore';
import MonthlyLookback from '../monthly/MonthlyLookback';
import YearlyLookBack from '../yearly/YearlyLookBack';

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
      component: <LetterModal pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.TodoModal,
      component: (
        <TodoModal
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
      ),
    },
    {
      type: MODAL_TYPES.FriendModal,
      component: <FriendModal />,
    },
    {
      type: MODAL_TYPES.ThemeModal,
      component: <ThemeModal pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.MonthlyModal,
      component: <MonthlyLookback setHidenCard={setHidenCard} />,
    },
    {
      type: MODAL_TYPES.LookbackModal,
      component: (
        <YearlyLookBack
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
