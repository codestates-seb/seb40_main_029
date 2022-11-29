import axios from 'axios';
import { Navigate } from 'react-router';
import { setCookie, getCookie } from '../utils/cookie';

export const onSilentRefresh = () => {
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000; // 만료 시간 (1시간 밀리 초로 표현)
  const refreshToken = getCookie('refreshToken');
  axios
    .get(
      'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/members/reissue',
      {
        headers: {
          Refresh: refreshToken,
        },
      }
    )
    .then(res => {
      // 재발급되어 헤더에 담겨져온 액세스 토큰 다시 변수에 저장 > 여기도 쿠키에 저장
      const newAccess = res.headers.get('Authorization');
      // axios.defaults.headers.common['Authorization'] = newAccess;
      setCookie('accessToken', newAccess, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      console.log('액세스 토큰 재발급');
    })
    .catch(err => {
      console.log('액세스 토근 재발급' + err);
    });
};

export const getAccessToken = async authorizationCode => {
  const getURL =
    'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/oauth/google'; // 서버 주소
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
      // const { accessToken } = res.data;
      // console.log(accessToken);
      // console.log(res.data.refreshToken);
      // axios.defaults.headers.common['Authorization'] = accessToken;
      // 리프레시 토큰 쿠키에 저장
      setCookie('refreshToken', res.data.refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
      // accessToken 만료하기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);

      return res.data;
    }
  });
};

export const LogoutApi = async () => {
  return await axios
    .get(
      'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/members/logout'
    ) // 헤더 가는지 안가는지 확인
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log('로그아웃 에러' + err);
    });
};
