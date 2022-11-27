import axios from 'axios';
import { useSelector } from 'react-redux';
import { emailSelector } from '../redux/hooks';

export const SignupApi = async displayName => {
  const emailValue = useSelector(emailSelector);
  const data = { email: emailValue, displayname: displayName };
  const getURL = 'https://521a-211-58-204-152.jp.ngrok.io'; // 서버 주소
  const path = '/members/addMember';

  return await axios
    .patch(getURL + path, data)
    .then(res => console.log(res))
    .catch(err => {
      console.log('회원가입' + err);
    });
};
