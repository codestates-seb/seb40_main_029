import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailSelector, displayNameSelector } from '../../redux/hooks';

axios.defaults.withCredentials = true; // 쿠키 사용하기 위해 필수

const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default function GoogleLogin() {
  // const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);
  const display = useSelector(displayNameSelector);
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=840805606859-diamap7b8svl8fhe3kqt1bmjsi6aieg9.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  console.log(GOOGLE_LOGIN_URL);

  // const getAccessToken = async authorizationCode => {
  //   // const getURL = `${process.env.REACT_APP_BASIC_URL}?code=${authorizationCode}`;

  //   // const getURL = 'https://521a-211-58-204-152.jp.ngrok.io/oauth/google'; 이거
  //   // const params = { code: authorizationCode };
  //   let config = {
  //     params: {
  //       code: authorizationCode,
  //     },
  //   };
  //   console.log(getURL);
  //   await axios.get(getURL, config).then(res => {
  //     if (res.data) {
  //       console.log(res.data);
  //       // 액세스 토큰 받아서 api 요청시마다 전달
  //       const { accessToken } = res.data;
  //       console.log(accessToken);
  //       console.log(res.data.refreshToken);
  //       axios.defaults.headers.common['Authorization'] = accessToken;
  //       // 리프레시 토큰 쿠키에 저장
  //       setCookie('refreshToken', res.data.refreshToken, {
  //         path: '/',
  //         // HttpOnly: true,
  //         secure: true,
  //         sameSite: 'none',
  //       });
  //       // 라우팅
  //       if (res.data.newUser) {
  //         navigate('/signup');
  //       } else {
  //         navigate('/');
  //       }
  //     }
  //   });

  //   console.log(getCookie('refreshToken'));
  // };

  function oAuthHandler() {
    window.location.replace(GOOGLE_LOGIN_URL);
  }

  // 신규 구글 로그인 라이브러리 사용
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          '840805606859-diamap7b8svl8fhe3kqt1bmjsi6aieg9.apps.googleusercontent.com',
        // 로그인 할 경우 호출되는 함수
        callback: oAuthHandler,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'large',
          width: '250',
        }
      );
      // window.google.accounts.id.prompt();
      console.log(userEmail);
    }
  }, []);

  return (
    <Contain>
      <div id="signInDiv"></div>
    </Contain>
  );
}
