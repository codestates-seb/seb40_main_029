import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faHighlighter,
  faStore,
  faUserGroup,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faCircleQuestion,
} from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/modalSlice';
import TooltipButton from '../../atoms/button/tooltipButton/TooltipButton';
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

const MailModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Mail>
      <Style.Header>
        <Style.Title>
          편지함
          <FontAwesomeIcon icon={faEnvelope} />
          <TooltipButton
            info="오른쪽 아래 + 버튼을 눌러서 친구에게 편지를 보낼 수 있어요."
            place="right"
          />
        </Style.Title>
        <Style.Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
      <Style.Utility>{children}</Style.Utility>
    </Style.Mail>
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

const FriendModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Mail>
      <Style.Header>
        <Style.Title>
          친구
          <FontAwesomeIcon icon={faUserGroup} />
          <TooltipButton
            info="+ 버튼을 눌러서 친구의 무드카드를 얻어보세요."
            place="right"
          />
        </Style.Title>
        <Style.Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
      <Style.Utility>{children}</Style.Utility>
    </Style.Mail>
  );
};

const LookBackModal = ({ children, setHiddenCard }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
    setHiddenCard(false);
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

export { TodoModal, MailModal, StoreModal, FriendModal, LookBackModal };
