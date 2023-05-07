import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavItem, DarkIcon, Label } from './style';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LogoutApi } from '../../../api/LoginLogoutApi';
import { setcookie } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setDisplayName } from '../../../redux/slice';

const LogoutItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // setcookie('accessToken', 0, { maxAge: 0, path: '/' }); // 테스트용
    // dispatch(setDisplayName('익명의 사용자')); // 테스트용
    // navigate('/'); // 테스트용
    const res = await LogoutApi();
    if (res?.status == 200) {
      setcookie('accessToken', 0, { maxAge: 0, path: '/' });
      dispatch(setDisplayName('익명의 사용자'));
      navigate('/');
    } else {
      toast('새로고침 후 다시 시도해주세요');
    }
  };

  return (
    <>
      <NavItem onClick={handleLogout}>
        <DarkIcon>
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </DarkIcon>
        <Label>로그아웃</Label>
      </NavItem>
    </>
  );
};

export default LogoutItem;
