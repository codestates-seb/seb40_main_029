import styled from 'styled-components';
import close from './svg/close.svg';
import mail from './svg/mail.svg';
import store from './svg/store.svg';
import todo from './svg/todo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Svg = styled.img`
  width: 30px;
`;

const CloseIcon = () => {
  return <Svg src={close} alt="close" />;
};

const TodoIcon = () => {
  return <Svg src={todo} alt="todo" />;
};

const MailIcon = () => {
  return <Svg src={mail} alt="mail" />;
};

const StoreIcon = () => {
  return <Svg src={store} alt="store" />;
};

export { CloseIcon, TodoIcon, MailIcon, StoreIcon };
