import styled from 'styled-components';
import Nav from './Nav';
import { useEffect, useRef, useState } from 'react';
import Bookmark from './Bookmark';
import User from '../atoms/User';
import { getSpecificPalette } from '../../api/FriendDataApi';
import { useSelector } from 'react-redux';
import { moodSelector, paletteCodeSelector } from '../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  /* position: relative; */
`;
const HeaderTitle = styled.h1`
  line-height: 1.2;
  letter-spacing: 2px;
  font-size: 40px;
  margin: 0;
  margin-left: 16px;
`;
const BookmarkWrapper = styled.div`
  margin-top: 4px;
  margin-left: 16px;
  display: flex;
  /* display: none; */
`;
const GnbLayout = styled.div`
  position: absolute;
  right: 0;
  min-width: 120px;
`;
const Point = styled.span`
  margin-right: 16px;
  font-size: 14px;
  > svg {
    margin-right: 8px;
  }
  path {
    color: #fcc403;
  }
  &:after {
    content: 'P';
    margin-left: 2px;
  }
`;

function Header({ userPoint }) {
  const [palette, setPalette] = useState([]);
  const userMood = useSelector(moodSelector);
  const userPalette = useSelector(paletteCodeSelector);

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
  const ref = useRef();
  const clickOut = e => {
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
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
      <HeaderWrapper>
        <div>
          <HeaderTitle>
            오늘은
            <br />
            어떤가요?
          </HeaderTitle>
          <BookmarkWrapper>
            <Bookmark />
          </BookmarkWrapper>
        </div>
        <GnbLayout ref={ref}>
          <User onClick={onClick} color={userMoodColor?.colorCode}>
            USERNAME
          </User>
          <Point>
            <FontAwesomeIcon icon={faSackDollar} />
            {userPoint}
          </Point>
          {isOpen ? <Nav /> : null}
        </GnbLayout>
      </HeaderWrapper>
    </>
  );
}

export default Header;
