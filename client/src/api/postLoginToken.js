import axios from 'axios';

export const postLoginToken = async idToken => {
  // const API_URL = process.env.REACT_APP_SERVER_API_URL;
  const path = '/auth/oauth/google';

  try {
    return await axios.post(`/api${path}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: { code: idToken }, // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치
    });
    // if (!response.ok) throw new Error('bad server condition');
  } catch (e) {
    console.error('postLoginToken Error: ', e.message);
    return false;
  }
};

// withCredentials: true, // include, *same-origin, omit
// Accept: 'application/json',
// 'Content-Type': 'application/json',
