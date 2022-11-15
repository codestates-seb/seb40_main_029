import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject); // 리덕스에 담을 듯
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        // 누군가 로그인 할 경우 호출되는 함수
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

  return (
    <>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={e => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </>
  );
}
