import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedInSelector, emailSelector } from '../../redux/hooks';
import { setIsLoggedIn } from '../../redux/slice';
import { postLoginToken } from '../../api/postLoginToken';

export default function GoogleLogin() {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const userEmail = useSelector(emailSelector);
  console.log('로그인' + isLoggedIn);
  console.log('이메일' + userEmail);

  const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&
  redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&
  response_type=code&
  scope=https://www.googleapis.com/auth/userinfo.email`;

  console.log(oAuthURL);

  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  };

  // async function handleCallbackResponse() {
  // oAuthHandler();
  // window.location.assign(oAuthURL);
  // console.log('이동');
  // const url = new URL(window.location);
  // console.log(url);
  // const url = window.location.href;
  // const result = await axios.get(url);
  // console.log(result);
  // console.log('Encoded JWT ID token: ' + response.credential);
  // const result = await postLoginToken(response.credential);
  // 신규유저면 email 전송
  // console.log(response.credential);
  // if (result.data.userInfo.email) {
  //   dispatch(setIsLoggedIn());
  //   navigate('/displayname');
  // }
  // 기존유저면 jwt토큰 전송
  // document.getElementById('signInDiv').hidden = true;
  // }

  // useEffect(() => {
  //   !isLoggedIn ? navigate('/displayname') : navigate('/home');
  // }, isLoggedIn);

  // useEffect(() => {
  //   if (window) {
  //     google.accounts.id.initialize({
  //       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       // 로그인 할 경우 호출되는 함수
  //       // callback: handleCallbackResponse,
  //       callback: window.location.assign(oAuthURL),
  //     });

  //     window.google.accounts.id.renderButton(
  //       document.getElementById('signInDiv'),
  //       {
  //         theme: 'outline',
  //         size: 'large',
  //         width: '250',
  //       }
  //     );
  //     window.google.accounts.id.prompt();
  //   }
  // }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(url);
  }, []);

  // return <div id="signInDiv"></div>;
  return (
    <button id="oAuthBtn" onClick={() => oAuthHandler()}>
      google
    </button>
  );
}

// testParseOAuthRequestServerSide() {
//   const endpoint = 'https://accounts.google.com/o/oauth2/auth';
//   const parameters = {
//     redirect_uri: ['https://developers.google.com/oauthplayground'],
//     response_type: ['token'],
//     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//     scope: ['https://www.googleapis.com/auth/userinfo.email'],
//     approval_prompt: ['force'],
//     access_type: ['offline'],
//   };

// let assetCnt = async () => {
//   //const { klaytn } = window;
//   //const accounts = await klaytn.enable();
//   const token = localStorage.getItem('Token');
//   await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/asset_count`, {
//    method: "POST",
//     data: ({
//       wallet_address: accounts[0].toLowerCase(),
//       blockchain: "klaytn",
//     }),
//     headers: {
//       "Authorization": `Bearer ${token}`
//     },
//   }).then((response) => {
//     setAsset(response);
//   }).catch(()=> {
//     console.log('Error')
//   })
// }
