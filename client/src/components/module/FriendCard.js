import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSpecificPalette } from '../../api/FriendDataApi';

const Card = styled.div`
  width: 100px;
  height: 120px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  margin: 16px;
`;
const MoodPic = styled.div`
  width: 100px;
  height: 90px;
  border: 4px solid white;
  background-color: #ee8242;
`;
const FriendName = styled.span`
  margin-left: 4px;
  font-size: 13px;
`;

const FriendCard = ({ friend }) => {
  const [palette, setPalette] = useState([]);
  const url = 'http://localhost:3001/palette';
  const paletteCode = 'P001';

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpecificPalette({ paletteCode });
      setPalette(data);
    };
    fetchData();
  }, []);

  const friendsColor = palette.find(mycolor => {
    mycolor.mood === friend.mood;
    console.log(mycolor.mood === friend.mood ? mycolor : 'nope');
  });
  //console.log(friendsColor); //undefined가 나오는 이유가??

  return (
    <Card>
      <MoodPic></MoodPic>
      <FriendName>{friend.username}</FriendName>
      <FriendName>{friend.mood}</FriendName>
    </Card>
  );
};

export default FriendCard;
