import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { displayNameSelector } from '../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faStore,
  faHighlighter,
  faUserGroup,
  faCalendarDays,
  faRightFromBracket,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';
import { LogoutApi } from '../../api/LoginLogoutApi';
import { getCookie, setcookie } from '../../utils/cookie';
import Overlay from '../atoms/Overlay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDisplayName } from '../../redux/slice';

const Bubble = styled.nav`
  max-width: 120px;
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
  cursor: pointer;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const displayName = useSelector(displayNameSelector);
  const [popup, setPopup] = useState(false);
  const accessToken = getCookie('accessToken');

  const handleLetterModal = () => {
    dispatch(
      openModal({
        modalType: 'LetterModal',
        isOpen: true,
      })
    );
  };
  const handleTodoModal = () => {
    dispatch(
      openModal({
        modalType: 'TodoModal',
        isOpen: true,
      })
    );
  };
  const handleFriendModal = () => {
    dispatch(
      openModal({
        modalType: 'FriendModal',
        isOpen: true,
      })
    );
  };
  const handleThemeModal = () => {
    dispatch(
      openModal({
        modalType: 'ThemeModal',
        isOpen: true,
      })
    );
  };
  const handleMonthlyModal = () => {
    {
      accessToken
        ? dispatch(
            openModal({
              modalType: 'MonthlyModal',
              isOpen: true,
            })
          )
        : setPopup(true);
      toast('먼저 로그인해주세요', {
        className: 'toast-login',
        onClose: () => setPopup(false),
      });
    }
  };
  const handleLookbackModal = () => {
    {
      accessToken
        ? dispatch(
            openModal({
              modalType: 'LookbackModal',
              isOpen: true,
            })
          )
        : setPopup(true);
      toast('먼저 로그인해주세요', {
        className: 'toast-login',
        onClose: () => setPopup(false),
      });
    }
  };

  const handleLogout = async () => {
    // setcookie('accessToken', 0, { maxAge: 0, path: '/' }); // 테스트용
    // dispatch(setDisplayName('익명의 사용자')); // 테스트용
    // navigate('/'); // 테스트용
    const res = await LogoutApi();
    if (res.status == 200) {
      setcookie('accessToken', 0, { maxAge: 0, path: '/' });
      dispatch(setDisplayName('익명의 사용자'));
      navigate('/');
    } else {
      toast('새로고침 후 다시 시도해주세요');
    }
  };

  return (
    <>
      {popup && <Overlay />}
      <Bubble>
        <ul>
          <NavItem onClick={handleFriendModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faUserGroup} size="lg" />
            </DarkIcon>
            <FontSize14>친구</FontSize14>
          </NavItem>
          <NavItem onClick={handleLetterModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </DarkIcon>
            <FontSize14>편지함</FontSize14>
          </NavItem>
          <NavItem onClick={handleTodoModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faHighlighter} size="lg" />
            </DarkIcon>
            <FontSize14>오늘할일</FontSize14>
          </NavItem>
          <NavItem onClick={handleThemeModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faStore} size="lg" />
            </DarkIcon>
            <FontSize14>색상테마</FontSize14>
          </NavItem>
          <NavItem onClick={handleMonthlyModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faCalendarDays} size="lg" />
            </DarkIcon>
            <FontSize14>한달기록</FontSize14>
          </NavItem>
          <NavItem onClick={handleLookbackModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faFilm} size="lg" />
            </DarkIcon>
            <FontSize14>일년기록</FontSize14>
          </NavItem>
          <NavItem onClick={handleLogout}>
            <DarkIcon>
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
            </DarkIcon>
            <FontSize14>로그아웃</FontSize14>
          </NavItem>
        </ul>
      </Bubble>
    </>
  );
};

export default Nav;
