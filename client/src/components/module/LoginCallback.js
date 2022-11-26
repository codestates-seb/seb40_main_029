import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../api/LoginLogout';
import { isLoggedInSelector, emailSelector } from '../../redux/hooks';
import { setIsLoggedIn, setEmail } from '../../redux/slice';

export default function LoginCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    console.log('코드');
    const authorizationCode = urlParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) {
      setResult(getAccessToken(authorizationCode));
      console.log(result);
    }
  }, []);

  useEffect(() => {
    // 기존 유저면 이메일 리턴, 신규 유저면 false 리턴 (닉네임 입력후 이메일 전달)
    {
      result
        ? (dispatch(setIsLoggedIn()), dispatch(setEmail(result)), navigate('/'))
        : navigate('/signup');
    }
  }, [result]);

  return <></>;
}
