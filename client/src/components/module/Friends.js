import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContentLayout } from '../atoms/Layouts';
import FriendCard from './FriendCard';
import { FriendModal } from './Modal';
import { getFriends } from '../../api/FriendDataApi';
import { RightBottomLayout } from '../atoms/Layouts';
import Button from '../atoms/Button';

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriends();
      setFriends(data);
    };
    fetchData();
  }, []);
  // console.log(friends);

  return (
    <>
      <ContentLayout>
        <FriendModal>
          <CardLayout>
            {friends
              ? friends.map(friend => {
                  return <FriendCard key={friend.id} friend={friend} />;
                })
              : null}
          </CardLayout>
          <RightBottomLayout>
            <Button size="circle">+</Button>
          </RightBottomLayout>
        </FriendModal>
      </ContentLayout>
    </>
  );
};

export default Friends;
