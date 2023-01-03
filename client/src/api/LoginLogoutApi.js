import axios from 'axios';
import { setcookie, getCookie } from '../utils/cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const onSilentRefresh = () => {
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000; // 만료 시간 (1시간 밀리 초로 표현)
  const refreshToken = getCookie('refreshToken');
  const getURL = process.env.REACT_APP_BASIC_URL;
  const path = '/members/reissue';
  axios
    .get(getURL + path, {
      headers: {
        Refresh: refreshToken,
      },
    })
    .then(res => {
      // 재발급되어 헤더에 담겨져온 액세스 토큰 다시 변수에 저장 > 여기도 쿠키에 저장
      const newAccess = res.headers.get('Authorization');
      // axios.defaults.headers.common['Authorization'] = newAccess;
      let exdate = new Date();
      exdate.setMinutes(exdate.getMinutes() + 60);
      setcookie('accessToken', newAccess, {
        expires: exdate,
        path: '/',
        secure: true,
        sameSite: 'none',
        httponly: true,
      });
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      // console.log('액세스 토큰 재발급');
    })
    .catch(err => {
      // console.log('액세스 토근 재발급' + err);
    });
};

export const getAccessToken = async authorizationCode => {
  const getURL = process.env.REACT_APP_BASIC_URL; // 서버 주소
  const path = '/oauth/google';
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000; // 만료 시간 (1시간 밀리 초로 표현)

  let config = {
    params: {
      code: encodeURI(authorizationCode),
    },
  };
  // console.log(getURL);
  return await axios.get(getURL + path, config).then(res => {
    if (res.data) {
      // console.log(res.data);
      // 액세스 토큰 받아서 api 요청시마다 전달
      // const { accessToken } = res.data;
      // console.log(accessToken);
      // console.log(res.data.refreshToken);
      // axios.defaults.headers.common['Authorization'] = accessToken;
      // 리프레시 토큰 쿠키에 저장
      let exdate = new Date();
      exdate.setDate(exdate.getDate() + 14);
      setcookie('refreshToken', res.data.refreshToken, {
        path: '/',
        expires: exdate,
        secure: true,
        sameSite: 'none',
        httponly: true,
      });
      // accessToken 만료하기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);

      // return res;
      return res.data;
    }
  });
};

export const LogoutApi = async () => {
  const getURL = process.env.REACT_APP_BASIC_URL;
  const path = '/members/logout';
  const accessToken = getCookie('accessToken');
  return await axios
    .get(getURL + path, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      toast('잠시 후 다시 시도해주세요');
    });
};
