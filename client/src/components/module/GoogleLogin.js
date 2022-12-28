import React, { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailSelector, displayNameSelector } from '../../redux/hooks';
import { ReactComponent as Logo } from '../../assets/logo.svg';

axios.defaults.withCredentials = true; // 쿠키 사용하기 위해 필수

const Contain = styled.div`
  display: flex;

  #signInDiv {
    margin-right: 15px;
  }
`;

export default function GoogleLogin() {
  const userEmail = useSelector(emailSelector);
  const display = useSelector(displayNameSelector);
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_LOCAL_URL}/login/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  function oAuthHandler() {
    window.location.replace(GOOGLE_LOGIN_URL);
  }

  // 신규 구글 로그인 라이브러리 사용
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // 로그인 할 경우 호출되는 함수
        callback: oAuthHandler,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'medium',
          width: '100',
          text: 'signin',
        }
      );
    }
  }, []);

  return (
    <Contain>
      {/* <Logo width="170" height="170" /> */}
      <div id="signInDiv"></div>
    </Contain>
  );
}
