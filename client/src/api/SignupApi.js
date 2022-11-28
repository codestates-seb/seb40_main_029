import axios from 'axios';
import { useSelector } from 'react-redux';
import { emailSelector } from '../redux/hooks';

export const SignupApi = async (emailValue, displayNameValue) => {
  const data = { email: emailValue, displayName: displayNameValue };
  const getURL = 'https://521a-211-58-204-152.jp.ngrok.io'; // 서버 주소
  const path = '/members/addMember';
  console.log(data);
  console.log('닉네임 등록');
  return await axios
    .patch(getURL + path, data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('회원가입' + err);
    });
};
