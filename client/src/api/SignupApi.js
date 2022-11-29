import axios from 'axios';
import { setMemberId, setDisplayName } from '../redux/slice';
import { useSelector, useDispatch } from 'react-redux';
import { emailSelector } from '../redux/hooks';

export const SignupApi = async (emailValue, displayNameValue) => {
  const data = { email: emailValue, displayName: displayNameValue };
  const getURL =
    'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080'; // 서버 주소
  const path = '/members/addMember';
  console.log(data);
  console.log('닉네임 등록');
  return await axios
    .patch(getURL + path, data)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log('회원가입' + err);
    });
};
