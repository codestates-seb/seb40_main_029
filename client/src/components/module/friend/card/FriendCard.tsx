import { useEffect, useState } from 'react';
import {
  deleteFriend,
  getSpecificPalette,
} from '../../../../api/FriendDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import MiniCard from '../../../atoms/minicard/MiniCard';
import { useSelector } from 'react-redux';
import { paletteCodeSelector } from '../../../../redux/hooks';
import * as Style from './Style';

const FriendCard = ({ friend, setfriendRefresh, friendsColor }) => {
  const handleDeleteFriend = () => {
    const friendId = friend.respondentId;
    const fetchData = async () => {
      await deleteFriend(friendId);
      setfriendRefresh(refresh => refresh * -1);
    };
    fetchData();
  };

  return (
    <Style.FriendCardWrap>
      <MiniCard
        color={friendsColor?.colorCode}
        contents={friend.respondentDisplayName}
        mood={friend.respondentMoodPaletteDetails?.mood}
        onClick={handleDeleteFriend}
        icon={faDeleteLeft}
      ></MiniCard>
      <Style.EditBtn onClick={handleDeleteFriend}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </Style.EditBtn>
    </Style.FriendCardWrap>
  );
};

export default FriendCard;
