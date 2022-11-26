import axios from 'axios';
import { setCookie, getCookie } from '../utils/cookie';

export const onSilentRefresh = () => {
  const refreshToken = getCookie('refreshToken');
  axios
    .get('/members/reissue', {
      headers: {
        Refresh: refreshToken,
      },
    })
    .then
    // getAccessToken(authorizationCode)
    ()
    .catch(err => {
      console.log('액세스 토근 재발급' + err);
    });
};

export const onLoginSuccess = response => {
  const { accessToken } = response.data.accessToken;
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000; // 만료 시간 (1시간 밀리 초로 표현)

  // accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
};

export const getAccessToken = async authorizationCode => {
  const getURL = 'https://521a-211-58-204-152.jp.ngrok.io/oauth/google'; // 서버 주소
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000; // 만료 시간 (1시간 밀리 초로 표현)

  let config = {
    params: {
      code: authorizationCode,
    },
  };
  console.log(getURL);
  return await axios.get(getURL, config).then(res => {
    if (res.data) {
      console.log(res.data);
      // 액세스 토큰 받아서 api 요청시마다 전달
      const { accessToken } = res.data;
      console.log(accessToken);
      console.log(res.data.refreshToken);
      axios.defaults.headers.common['Authorization'] = accessToken;
      // 리프레시 토큰 쿠키에 저장
      setCookie('refreshToken', res.data.refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      // 라우팅
      if (res.data.newUser) {
        false;
      } else {
        console.log(res.data.email);
        res.data.email;
      }
    }
  });
};

export const Logout = async () => {
  await axios
    .get('/members/logout') // 헤더 가는지 안가는지 확인
    .then(res => {
      console.log(res);
      // 리덕스 변경
    })
    .catch(err => {
      console.log('로그아웃 에러' + err);
    });
};
