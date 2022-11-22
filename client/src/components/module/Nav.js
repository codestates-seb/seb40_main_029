import { Routes, Route, Link } from 'react-router-dom';
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
import Letter from '../templates/Letter';

const Bubble = styled.nav`
  z-index: 2;
  background-color: #f6f6f6;
  padding: 16px 0;
  margin-right: 8px;
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
`;
const NavItem = styled.li`
  list-style: none;
  padding: 4px 8px;
  margin: 2px 0;
  &:hover {
    background-color: #fff;
  }
`;
const FontSize14 = styled.span`
  font-size: 14px;
`;
const DarkIcon = styled.span`
  svg {
    width: 30px;
    padding-right: 10px;
    path {
      color: #656565;
    }
  }
`;

const Nav = () => {
  return (
    <>
      <Bubble>
        <ul>
          <NavItem>
            <Link to="/letter">
              <DarkIcon>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </DarkIcon>
              <FontSize14>편지함</FontSize14>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="#">
              <DarkIcon>
                <FontAwesomeIcon icon={faHighlighter} size="lg" />
              </DarkIcon>
              <FontSize14>오늘할일</FontSize14>
            </Link>
          </NavItem>
          <NavItem>
            <Link>
              <DarkIcon>
                <FontAwesomeIcon icon={faStore} size="lg" />
              </DarkIcon>
              <FontSize14>색상테마</FontSize14>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/friends">
              <DarkIcon>
                <FontAwesomeIcon icon={faUserGroup} size="lg" />
              </DarkIcon>
              <FontSize14>친구</FontSize14>
            </Link>
          </NavItem>
          <NavItem>
            <Link>
              <DarkIcon>
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              </DarkIcon>
              <FontSize14>기록</FontSize14>
            </Link>
          </NavItem>
          <NavItem>
            <Link>
              <DarkIcon>
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
              </DarkIcon>
              <FontSize14>로그아웃</FontSize14>
            </Link>
          </NavItem>
        </ul>
      </Bubble>
    </>
  );
};

export default Nav;
