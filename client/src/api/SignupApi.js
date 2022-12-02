import axios from 'axios';
import { setMemberId, setDisplayName } from '../redux/slice';
import { useSelector, useDispatch } from 'react-redux';
import { emailSelector } from '../redux/hooks';

export const SignupApi = async (emailValue, displayNameValue) => {
  const data = { email: emailValue, displayName: displayNameValue };
  const getURL = process.env.REACT_APP_BASIC_URL; // 서버 주소
  const path = '/members/addMember';
  console.log(data);
  console.log('닉네임 등록');
  return await axios
    .patch(getURL + path, data)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log('회원가입' + err);
      return err;
    });
};
