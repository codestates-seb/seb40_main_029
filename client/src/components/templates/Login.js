import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../module/GoogleLogin';

export default function Login() {
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  return <GoogleLogin text="로그인" />;
}
