import styled from 'styled-components';
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
import { closeModal } from '../../redux/modalSlice';

const Blueprint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  margin-left: 20px;
`;

const Todo = styled(Blueprint)`
  width: 650px;
  height: 500px;
`;

const Mail = styled(Blueprint)`
  width: 650px;
  height: 500px;
  margin-left: 20px;
`;

const Store = styled(Blueprint)`
  width: 720px;
  height: 500px;
`;

const Calendar = styled(Blueprint)`
  width: 1000px;
  height: 600px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 50px;
  border-bottom: 1px solid rgb(51, 52, 53);
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(51, 52, 53);
  line-height: 40px;
  font-size: 28px;
  font-weight: 600;
  margin: 5px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 0 8px;
`;

const Info = styled(Button)`
  font-size: 12px;
`;

const RealButton = styled.button`
  background-color: transparent;
  border: none;
`;

const Utility = styled.div`
  height: 100%;
  width: 100%;
`;

const TodoModal = ({ children, lookBack }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Todo>
      <Header>
        <Title>
          오늘 할 일 &nbsp;
          <RealButton onClick={() => lookBack()}>
            <FontAwesomeIcon icon={faHighlighter} />
          </RealButton>
          <Info data-tip="왼쪽 펜을 누르면 하루에 한 번, 어제 완료하지 못한 일을 불러올 수 있어요">
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Info>
          <ReactTooltip event="click" eventOff="mouseout" />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Todo>
  );
};

const MailModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Mail>
      <Header>
        <Title>
          편지함 &nbsp;
          <FontAwesomeIcon icon={faEnvelope} />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Mail>
  );
};

const StoreModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Store>
      <Header>
        <Title>
          색상 테마 &nbsp;
          <FontAwesomeIcon icon={faStore} />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Store>
  );
};

const FriendModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Mail>
      <Header>
        <Title>
          친구 &nbsp;
          <FontAwesomeIcon icon={faUserGroup} />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Mail>
  );
};

const LookBackModal = ({ children }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Calendar>
      <Header>
        <Title>
          기록 &nbsp;
          <FontAwesomeIcon icon={faFilm} />
          <Info data-tip="작은 사각형을 선택해 과거 기록을 살펴볼 수 있어요">
            <FontAwesomeIcon icon={faCircleQuestion} />
          </Info>
          <ReactTooltip event="click" eventOff="mouseout" />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Calendar>
  );
};

export { TodoModal, MailModal, StoreModal, FriendModal, LookBackModal };
