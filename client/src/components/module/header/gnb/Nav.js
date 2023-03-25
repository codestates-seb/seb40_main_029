import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { displayNameSelector } from '../../../../redux/hooks';
import { openModal } from '../../../../redux/modalSlice';
import { setDisplayName } from '../../../../redux/slice';
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
import { LogoutApi } from '../../../../api/LoginLogoutApi';
import { getCookie, setcookie } from '../../../../utils/cookie';
import Overlay from '../../../atoms/overlay/Overlay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './NavStyle';

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
        : (setPopup(true),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
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
        : (setPopup(true),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
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
      <Style.Bubble>
        <ul>
          <Style.NavItem onClick={handleFriendModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faUserGroup} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>친구</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleLetterModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>편지함</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleTodoModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faHighlighter} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>오늘할일</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleThemeModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faStore} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>색상테마</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleMonthlyModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faCalendarDays} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>한달기록</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleLookbackModal}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faFilm} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>일년기록</Style.FontSize14>
          </Style.NavItem>
          <Style.NavItem onClick={handleLogout}>
            <Style.DarkIcon>
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
            </Style.DarkIcon>
            <Style.FontSize14>로그아웃</Style.FontSize14>
          </Style.NavItem>
        </ul>
      </Style.Bubble>
    </>
  );
};

export default Nav;
