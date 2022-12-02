import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { deleteFriend, getSpecificPalette } from '../../api/FriendDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import MiniCard from '../atoms/MiniCard';
import { useSelector } from 'react-redux';
import { paletteCodeSelector } from '../../redux/hooks';

const FriendCardWrap = styled.div`
  position: relative;
  &:hover > span {
    display: inline-block;
  }
`;
const EditBtn = styled.span`
  position: absolute;
  right: 16px;
  bottom: 24px;
  display: none;
  &:hover {
    opacity: 0.7;
  }
`;

const FriendCard = ({ friend, setfriendRefresh }) => {
  const [palette, setPalette] = useState([]);
  const getPaletteCode = useSelector(paletteCodeSelector);
  const paletteCode = getPaletteCode ? getPaletteCode : 'P001';

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecificPalette(paletteCode);
      setPalette(data);
    };
    fetchData();
  }, []);

  const friendsColor = palette?.find(mycolor => {
    if (friend.respondentMoodPaletteDetails) {
      return mycolor.mood === friend.respondentMoodPaletteDetails.mood;
    }
  });

  const handleDeleteFriend = () => {
    const friendId = friend.respondentId;
    const fetchData = async () => {
      await deleteFriend(friendId);
      setfriendRefresh(refresh => refresh * -1);
    };
    fetchData();
  };

  return (
    <FriendCardWrap>
      <MiniCard
        color={friendsColor?.colorCode}
        contents={friend.respondentDisplayName}
        mood={friend.respondentMoodPaletteDetails?.mood}
        onClick={handleDeleteFriend}
        icon={faDeleteLeft}
      ></MiniCard>
      <EditBtn onClick={handleDeleteFriend}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </EditBtn>
    </FriendCardWrap>
  );
};

export default FriendCard;
