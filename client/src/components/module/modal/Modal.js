import styled from 'styled-components';
import { CloseIcon, TodoIcon, MailIcon, StoreIcon } from './Icon';

const Blueprint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
`;

const Todo = styled(Blueprint)`
  width: 720px;
  height: 500px;
`;

const Mail = styled(Blueprint)`
  width: 720px;
  height: 500px;
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
  color: rgb(51, 52, 53);
  line-height: 40px;
  font-size: 40px;
  font-weight: 800;
  margin: 5px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: 1px solid transparent;
  margin: 5px;
`;

const Utility = styled.div`
  height: 100%;
`;

const TodoModal = ({ children }) => {
  return (
    <Todo>
      <Header>
        <Title>
          오늘 할 일 &nbsp;
          <TodoIcon />
        </Title>
        <Button onClick={() => {}}>
          <CloseIcon />
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
          <MailIcon />
        </Title>
        <Button onClick={() => {}}>
          <CloseIcon />
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
          <StoreIcon />
        </Title>
        <Button onClick={() => {}}>
          <CloseIcon />
        </Button>
      </Header>
      <Utility>{children}</Utility>
    </Store>
  );
};

export { TodoModal, MailModal, StoreModal };
