import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  isLoggedInSelector,
  emailSelector,
  displayNameSelector,
  colorSelector,
  reasonSelector,
} from '../../redux/hooks';
import {
  setIsLoggedIn,
  setEmail,
  setDisplayName,
  setColor,
  setReason,
} from '../../redux/slice';
import { postLoginToken } from '../../api/postLoginToken';

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);
  console.log('로그인' + isLoggedIn);
  console.log('이메일' + userEmail);

  async function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    const result = await postLoginToken(response.credential);
    // 신규유저면 email 전송
    console.log(result);
    if (result.data.userInfo.email) {
      dispatch(setIsLoggedIn());
      navigate('/displayname');
    }
    // 기존유저면 jwt토큰 전송
    // document.getElementById('signInDiv').hidden = true;
  }

  // useEffect(() => {
  //   !isLoggedIn ? navigate('/displayname') : navigate('/home');
  // }, isLoggedIn);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // 로그인 할 경우 호출되는 함수
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'large',
          width: '250',
        }
      );
      window.google.accounts.id.prompt();
    }
  }, []);

  return <div id="signInDiv"></div>;
}
