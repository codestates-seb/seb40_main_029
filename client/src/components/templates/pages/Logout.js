import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogoutApi } from '../../../api/LoginLogoutApi';
import GoogleLogin from '../module/GoogleLogin';

export default function Logout() {
  return <Logout text="로그아웃" />;
}
