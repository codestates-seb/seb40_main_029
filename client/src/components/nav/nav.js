import styled from "styled-components";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope
} from '@fortawesome/free-regular-svg-icons';
import {
  faStore, faHighlighter, faUserGroup, faCalendarDays, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import './nav.css';

const Bubble = styled.nav`
  background-color: #F6F6F6;
  padding: 16px 8px;
  margin: 8px;
  margin-top: 24px;
  border-radius: 20px;
  position: relative;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));

  &:before {
    content: '';
    position: absolute;
    top: -30px;
    translate: calc(50%);
    width: 2px;
    background-color: transparent;
    border-bottom: 30px solid #F6F6F6;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid transparent;
    border-radius: 5px;
  }
`;

const Bubble2 = styled.nav`
  background-color: #F6F6F6;
  padding: 16px 8px;
  margin: 8px;
  margin-top: 24px;
  border-radius: 20px;
  position: relative;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));

  &:before {
    content: '';
    position: absolute;
    top: -25px;
    translate: calc(50%);
    width: 2px;
    background-color: transparent;
    border-bottom: 30px solid #F6F6F6;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid transparent;
    border-radius: 5px;
  }

  svg {
    width: 30px;
    padding-right: 10px;
    path {
      /* color: #333435; */
      color: #656565;
    }
  }

  li {
    border-radius: 20px;
    padding: 8px;
    &:hover {
      background-color: #fff;
    }
  }
`;

const Bubble4 = styled.nav`
  background-color: #F6F6F6;
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
    translate: calc(50%);
    width: 2px;
    background-color: transparent;
    border-bottom: 30px solid #F6F6F6;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid transparent;
    border-radius: 5px;
  }

  svg {
    width: 30px;
    padding-right: 10px;
    path {
      /* color: #333435; */
      color: #656565;
    }
  }

  li {
    /* border-radius: 20px; */
    padding: 8px;
    padding-left: 16px;
    margin: 0;
    &:hover {
      background-color: #fff;
    }
  }
`;

const Nav = () => {
  return (
    <>
      {/* <Bubble>
        <ul>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faEnvelope} />
            </Button>
            편지함
          </li>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faHighlighter} />
            </Button>
            오늘할일</li>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faStore} />
            </Button>
            색상테마</li>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faUserGroup} />
            </Button>
            친구</li>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faCalendarDays} />
            </Button>
            기록</li>
          <li>
            <Button size="circle">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
            로그아웃</li>
        </ul>
      </Bubble> */}

      <Bubble2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faEnvelope} size='lg' />
            편지함
          </li>
          <li>
            <FontAwesomeIcon icon={faHighlighter} size='lg' />
            오늘할일
          </li>
          <li>
              <FontAwesomeIcon icon={faStore} size='lg' />
            색상테마
          </li>
          <li>
              <FontAwesomeIcon icon={faUserGroup} size='lg' />
            친구</li>
          <li>
            <FontAwesomeIcon icon={faCalendarDays} size='lg' />
            기록
          </li>
          <li>
            <FontAwesomeIcon icon={faRightFromBracket} size='lg' />
            로그아웃
          </li>
        </ul>
      </Bubble2>

      <Bubble4>
        <ul>
          <li>
            <FontAwesomeIcon icon={faEnvelope} size='lg' />
            편지함
          </li>
          <li>
            <FontAwesomeIcon icon={faHighlighter} size='lg' />
            오늘할일
          </li>
          <li>
              <FontAwesomeIcon icon={faStore} size='lg' />
            색상테마
          </li>
          <li>
              <FontAwesomeIcon icon={faUserGroup} size='lg' />
            친구</li>
          <li>
            <FontAwesomeIcon icon={faCalendarDays} size='lg' />
            기록
          </li>
          <li>
            <FontAwesomeIcon icon={faRightFromBracket} size='lg' />
            로그아웃
          </li>
        </ul>
      </Bubble4>
    </>
  )
}

export default Nav;
