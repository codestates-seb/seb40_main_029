import axios from 'axios';

export const handleSignup = () => {
  const data = { email: '', displayName: '' };
  const getURL = 'https://521a-211-58-204-152.jp.ngrok.io/oauth/google'; // 서버 주소
  const path = '/members/addMember';

  axios
    .patch(getURL + path, data)
    .then(res => console.log(res))
    .catch(err => {
      console.log('회원가입' + err);
    });
};
