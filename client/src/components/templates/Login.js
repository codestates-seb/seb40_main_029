import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../module/GoogleLogin';

export default function Login() {
  console.log('자동배포성공');
  return <GoogleLogin text="로그인" />;
}
