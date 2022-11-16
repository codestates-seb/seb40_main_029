import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../module/GoogleLogin';
import { postLoginToken } from '../../api/postLoginToken';

export default function Login() {
  return <GoogleLogin text="로그인" />;
}
