import { useSelector } from 'react-redux';
import { getCookie } from '../../../../utils/cookie';
import * as Style from '../HeaderStyle';
import { displayNameSelector } from '../../../../redux/hooks';
import GoogleLogin from '../login/GoogleLogin';
import Username from '../../../atoms/username/Username';
import { getSpecificPalette } from '../../../../api/FriendDataApi';
import { moodSelector, paletteCodeSelector } from '../../../../redux/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PointDisplay from './PointDisplay';

const User = ({ onClick }) => {
  const accessToken = getCookie('accessToken');
  const displayName = useSelector(displayNameSelector);
  const userMood = useSelector(moodSelector);
  const userPalette = useSelector(paletteCodeSelector);

  const queryClient = useQueryClient();
  const paletteCache = queryClient.getQueryData(['palette', userPalette]);
  const palette = paletteCache
    ? { data: paletteCache }
    : useQuery({
        queryKey: ['palette', userPalette],
        queryFn: async () => {
          const data = await getSpecificPalette(userPalette);
          return data;
        },
        onSuccess: data => {
          queryClient.setQueryData(['palette', userPalette], data);
        },
      });
  const userMoodColor = palette?.data?.find(color => {
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
            {displayName}
          </Username>
          {/* <PointDisplay /> */}
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
