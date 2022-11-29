import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faHighlighter,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Blueprint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
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

const Utility = styled.div`
  height: 100%;
  width: 100%;
`;

const TodoModal = ({ children }) => {
  return (
    <Todo>
      <Header>
        <Title>
          오늘 할 일 &nbsp;
          <FontAwesomeIcon icon={faHighlighter} />
        </Title>
        <Button onClick={() => {}}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Todo>
  );
};

const MailModal = ({ children }) => {
  return (
    <Mail>
      <Header>
        <Title>
          편지함 &nbsp;
          <FontAwesomeIcon icon={faEnvelope} />
        </Title>
        <Button onClick={() => {}}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Mail>
  );
};

const StoreModal = ({ children }) => {
  return (
    <Store>
      <Header>
        <Title>
          색상 테마 &nbsp;
          <FontAwesomeIcon icon={faStore} />
        </Title>
        <Button onClick={() => {}}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Store>
  );
};

export { TodoModal, MailModal, StoreModal };
