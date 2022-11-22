import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteFriend, getSpecificPalette } from '../../api/FriendDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
  width: 100px;
  height: 120px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  margin: 16px;
  position: relative;
  &:hover > span {
    display: inline-block;
  }
`;
const MoodPic = styled.div`
  width: 100px;
  height: 90px;
  border: 4px solid white;
  background-color: ${props => (props.color ? `#${props.color}` : '#faf8ff')};
`;
const FriendName = styled.span`
  margin-left: 4px;
  font-size: 13px;
`;
const EditBtn = styled.span`
  position: absolute;
  right: 0;
  display: none;

  &:hover {
    opacity: 0.7;
  }
`;

const FriendCard = ({ friend }) => {
  const [palette, setPalette] = useState([]);
  const paletteCode = 'P001';

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecificPalette({ paletteCode });
      setPalette(data);
    };
    fetchData();
  }, []);

  const friendsColor = palette.find(mycolor => {
    return mycolor.mood === friend.mood;
  });

  const handleDeleteFriend = () => {
    const friendId = friend.id;
    const fetchData = async () => {
      await deleteFriend({ friendId });
      window.location.reload();
    };
    fetchData();
  };

  return (
    <Card>
      <MoodPic color={friendsColor?.colorCode}></MoodPic>
      <FriendName>{friend.username}</FriendName>
      <FriendName>{friend.mood}</FriendName>
      <EditBtn onClick={handleDeleteFriend}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </EditBtn>
    </Card>
  );
};

export default FriendCard;
