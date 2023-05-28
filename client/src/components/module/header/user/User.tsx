import { useSelector } from 'react-redux';
import { getCookie } from '../../../../utils/cookie';
import * as Style from '../HeaderStyle';
import { memberIdSelector } from '../../../../redux/hooks';
import GoogleLogin from '../login/GoogleLogin';
import Username from '../../../atoms/username/Username';
import PointDisplay from './PointDisplay';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../../api/UserInfoAPI';
import { getDayMood } from '../../../../api/MoodApi';

const User = ({ onClick }) => {
  const accessToken = getCookie('accessToken');
  // userInfo
  const memberId = useSelector(memberIdSelector);
  const { data, isLoading, isError } = useQuery(['userInfo', memberId], {
    queryFn: async () => {
      const data = await getUserInfo(memberId);
      return data;
    },
  });
  const userInfo = data;
  // todayMood
  const dayMood = useQuery({
    queryKey: ['dayMood'],
    queryFn: async () => {
      const data = await getDayMood(userInfo?.displayName);
      return data;
    },
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {accessToken ? (
        <>
          <Username
            onClick={onClick}
            color={dayMood?.data?.moodPaletteDetails?.colorCode}
          >
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
