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
import { TooltipBtn } from '../atoms/TooltipBtn';

const Blueprint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  margin-left: 16px;
  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slideIn 0.5s;
  width: 100%;

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

const Todo = styled(Blueprint)`
  height: 500px;
`;

const Mail = styled(Blueprint)`
  height: 500px;
  position: relative;
`;

const Store = styled(Blueprint)`
  width: 100%;
  height: 500px;
`;

const Calendar = styled(Blueprint)`
  width: 100%;
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
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0 0 8px;
  > svg {
    margin-left: 16px;
    font-size: 20px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 8px 8px 0;
  cursor: pointer;
`;

const Info = styled(Button)`
  opacity: 0.5;
  font-size: 15px;
  padding: 4px 4px 0;
  cursor: pointer;
`;

const RealButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 4px;
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
          ?????? ??? ???
          <RealButton onClick={() => lookBack()}>
            <FontAwesomeIcon icon={faHighlighter} />
          </RealButton>
          <Info data-tip="?????? ?????? ????????? ????????? ??? ???, ?????? ???????????? ?????? ?????? ????????? ??? ?????????">
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
          ?????????
          <FontAwesomeIcon icon={faEnvelope} />
          <TooltipBtn
            info="????????? ?????? + ????????? ????????? ???????????? ????????? ?????? ??? ?????????."
            place="right"
          />
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
          ?????? ??????
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
          ??????
          <FontAwesomeIcon icon={faUserGroup} />
          <TooltipBtn
            info="+ ????????? ????????? ????????? ??????????????? ???????????????."
            place="right"
          />
        </Title>
        <Button onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Mail>
  );
};

const LookBackModal = ({ children, setHidenCard }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
    setHidenCard(false);
  };
  return (
    <Calendar>
      <Header>
        <Title>
          ??????
          <FontAwesomeIcon icon={faFilm} />
          <Info data-tip="?????? ???????????? ????????? ?????? ????????? ????????? ??? ?????????">
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
