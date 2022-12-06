import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcookie, getCookie } from '../../utils/cookie';
import { getAccessToken } from '../../api/LoginLogoutApi';
import { emailSelector } from '../../redux/hooks';
import {
  setMemberId,
  setEmail,
  setDisplayName,
  setPaletteCode,
  setMyPaletteDevice,
} from '../../redux/slice';

export default function LoginCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  // const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);

  // console.log(userEmail);

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    const authorizationCode = urlParams.get('code');
    // console.log(authorizationCode);
    if (authorizationCode) {
      (async () => {
        setResult(await getAccessToken(authorizationCode)); // 이메일과 newUser를 담은 객체
      })();
    }
  }, []);

  console.log('로그인 결과');
  console.log(result);
  console.log(result.accessToken);

  useEffect(() => {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + 60);
    console.log('로그인 결과');
    console.log(result);
    console.log(result.accessToken);
    setcookie('accessToken', result.accessToken, {
      expires: exdate,
      path: '/',
      secure: true,
      sameSite: 'none',
    });
    dispatch(setEmail(result.email));
    // 기존 유저면 홈화면, 신규 유저면 회원가입화면
    if (result.newUser == true) {
      navigate('/signup');
    } else if (result.newUser == false) {
      dispatch(setMemberId(result.memberId));
      dispatch(setDisplayName(result.displayName));
      // dispatch(setPaletteCode(result.palette));
      // let arrList = result.paletteList.map(x => x.moodPalette.paletteCode);
      // console.log(arrList);
      // dispatch(setMyPaletteDevice(arrList));
      navigate('/');
    }
  }, [result]);

  return <></>;
}
