import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faStore,
  faHighlighter,
  faUserGroup,
  faCalendarDays,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Bubble = styled.nav`
  background-color: #f6f6f6;
  padding: 16px 0;
  margin: 8px;
  margin-top: 24px;
  border-radius: 20px;
  position: relative;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));

  &:before {
    content: '';
    position: absolute;
    top: -25px;
    left: 10%;
    width: 2px;
    background-color: transparent;
    border-bottom: 30px solid #f6f6f6;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid transparent;
  }

  svg {
    width: 30px;
    padding-right: 10px;
    path {
      color: #656565;
    }
  }

  li {
    list-style: none;
    padding: 4px 8px;
    padding-left: 16px;
    margin: 2px 0;
    span {
      font-size: 14px;
    }
    &:hover {
      background-color: #fff;
    }
  }
`;

const Nav = () => {
  return (
    <>
      <Bubble>
        <ul>
          <li>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            <span>편지함</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faHighlighter} size="lg" />
            <span>오늘할일</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faStore} size="lg" />
            <span>색상테마</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUserGroup} size="lg" />
            <span>친구</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendarDays} size="lg" />
            <span>기록</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
            <span>로그아웃</span>
          </li>
        </ul>
      </Bubble>
    </>
  );
};

export default Nav;
