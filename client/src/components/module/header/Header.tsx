import { useEffect, useRef, useState } from 'react';
import Username from '../../atoms/username/Username';
import TooltipButton from '../../atoms/button/tooltipButton/TooltipButton';
import Bookmark from './bookmark/Bookmark';
import Nav from './gnb/Nav';
import GoogleLogin from './login/GoogleLogin';
import { getCookie } from '../../../utils/cookie';
import { getSpecificPalette } from '../../../api/FriendDataApi';
import { useSelector } from 'react-redux';
import {
  moodSelector,
  paletteCodeSelector,
  displayNameSelector,
} from '../../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import * as Style from './HeaderStyle';
import { UserType } from '../../../types/UserType';

type UserPoint = Pick<UserType, 'point'>;

function Header({ point }: UserPoint) {
  const [palette, setPalette] = useState([]);
  const userMood = useSelector(moodSelector);
  const userPalette = useSelector(paletteCodeSelector);
  const displayName = useSelector(displayNameSelector);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecificPalette(userPalette);
      setPalette(data);
    };
    fetchData();
  }, []);

  const userMoodColor = palette.find(color => {
    if (userMood) {
      return userMood.mood === color.mood;
    } else {
      return 'inherit';
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const ref = useRef<HTMLDivElement>();
  const clickOut = (e: MouseEvent) => {
    if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [isOpen]);
  return (
    <>
      <Style.HeaderWrapper>
        <div>
          <Style.HeaderTitle>
            오늘은
            <br />
            어떤가요?
          </Style.HeaderTitle>
          <Style.BookmarkWrapper>
            <Bookmark />
            <TooltipButton
              info="별을 클릭해 북마크를 만들고, 손을 클릭해 북마크 리스트를 열고 닫을 수 있어요!"
              place="right"
            />
          </Style.BookmarkWrapper>
        </div>
        <Style.GnbLayout ref={ref}>
          {accessToken ? (
            <>
              <Username onClick={onClick} color={userMoodColor?.colorCode}>
                {displayName}
              </Username>
              <Style.Point>
                <FontAwesomeIcon icon={faSackDollar} />
                {point}
              </Style.Point>
            </>
          ) : (
            <>
              <Style.Contain>
                <Username onClick={onClick} />
                <Style.LoginBtnContain>
                  <GoogleLogin />
                </Style.LoginBtnContain>
              </Style.Contain>
            </>
          )}
          {isOpen ? <Nav /> : null}
        </Style.GnbLayout>
      </Style.HeaderWrapper>
    </>
  );
}

export default Header;
