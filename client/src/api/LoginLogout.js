import axios from 'axios';

onLoginSuccess = response => {
  const { accessToken } = response.data.accessToken;

  // accessToken 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // accessToken 만료하기 1분 전에 로그인 연장
  setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
};
