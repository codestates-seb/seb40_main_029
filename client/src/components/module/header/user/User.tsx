import { useSelector } from 'react-redux';
import { getCookie } from '../../../../utils/cookie';
import * as Style from '../HeaderStyle';
import { memberIdSelector } from '../../../../redux/hooks';
import GoogleLogin from '../login/GoogleLogin';
import Username from '../../../atoms/username/Username';
import { moodSelector, paletteCodeSelector } from '../../../../redux/hooks';
import PointDisplay from './PointDisplay';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../../api/UserInfoAPI';

const User = ({ onClick }) => {
  const accessToken = getCookie('accessToken');
  const userMood = useSelector(moodSelector);
  const userPalette = useSelector(paletteCodeSelector);
  // userInfo
  const memberId = useSelector(memberIdSelector);
  const { data, isLoading, isError } = useQuery(['userInfo', memberId], {
    queryFn: getUserInfo,
  });

  if (isLoading) {
    return null;
  }
  if (isError) {
    return <div>유저의 정보를 받아오던 중 에러 발생</div>;
  }
  const userInfo = data[0];

  const userMoodColor = userPalette?.data?.find(color => {
    if (userMood) {
      return userMood.mood === color.mood;
    } else {
      return 'inherit';
    }
  });

  return (
    <>
      {accessToken ? (
        <>
          <Username onClick={onClick} color={userMoodColor?.colorCode}>
            {userInfo?.displayName}
          </Username>
          <PointDisplay point={userInfo?.point} />
        </>
      ) : (
        <>
          <Style.Contain>
            <Username onClick={onClick}>익명의 사용자</Username>
            <Style.LoginBtnContain>
              <GoogleLogin />
            </Style.LoginBtnContain>
          </Style.Contain>
        </>
      )}
    </>
  );
};

export default User;
