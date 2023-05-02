import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faHighlighter,
  faStore,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modalSlice';
import * as Style from './Style';

const TodoModal = ({ children, lookBack }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Todo>
      <Style.Header>
        <Style.Title>
          오늘 할 일
          <Style.RealButton onClick={() => lookBack()}>
            <FontAwesomeIcon icon={faHighlighter} />
          </Style.RealButton>
          <Style.Info data-tip="왼쪽 펜을 누르면 하루에 한 번, 어제 완료하지 못한 일을 불러올 수 있어요">
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Style.Info>
          <ReactTooltip event="click" eventOff="mouseout" />
        </Style.Title>
        <Style.Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
      <Style.Utility>{children}</Style.Utility>
    </Style.Todo>
  );
};

const StoreModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Store>
      <Style.Header>
        <Style.Title>
          색상 테마
          <FontAwesomeIcon icon={faStore} />
        </Style.Title>
        <Style.Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
      <Style.Utility>{children}</Style.Utility>
    </Style.Store>
  );
};

const LookBackModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Calendar>
      <Style.Header>
        <Style.Title>
          기록
          <FontAwesomeIcon icon={faFilm} />
          <Style.Info data-tip="작은 사각형을 선택해 과거 기록을 살펴볼 수 있어요">
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Style.Info>
          <ReactTooltip event="click" eventOff="mouseout" />
        </Style.Title>
        <Style.Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
      <Style.Utility>{children}</Style.Utility>
    </Style.Calendar>
  );
};

export { TodoModal, StoreModal, LookBackModal };
