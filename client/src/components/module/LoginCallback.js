import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../api/LoginLogoutApi';
import { emailSelector } from '../../redux/hooks';
import { setEmail } from '../../redux/slice';

export default function LoginCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  // const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);

  console.log(userEmail);

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    const authorizationCode = urlParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) {
      (async () => {
        setResult(await getAccessToken(authorizationCode)); // 이메일과 newUser를 담은 객체
      })();
    }
  }, []);
  console.log('응답 후');
  console.log(result.email);
  console.log(result.newUser);

  useEffect(() => {
    // 기존 유저면 홈화면, 신규 유저면 회원가입화면
    if (result.newUser == true) {
      dispatch(setEmail(result.email));
      navigate('/signup');
    } else if (result.newUser == false) {
      // 기존 유저 헤더 토큰 추가
      const { accessToken } = result;
      console.log(accessToken);
      axios.defaults.headers.common['Authorization'] = accessToken;
      dispatch(setEmail(result.email));
      navigate('/');
    }
  }, [result]);

  return <></>;
}
