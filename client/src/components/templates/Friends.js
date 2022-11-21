import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContentLayout } from '../atoms/Layouts';
import FriendCard from '../module/FriendCard';
import { FriendModal } from '../module/Modal';
import { getFriends } from '../../api/FriendDataApi';
import { RightBottomLayout } from '../atoms/Layouts';
import Button from '../atoms/Button';
import Overlay from '../atoms/Overlay';
import AddFriend from '../module/AddFriend';

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriends();
      setFriends(data);
    };
    fetchData();
  }, []);
  // console.log(friends);
  const handleFindFriend = () => {
    setIsOpen(!isOpen);
  };

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
            <Button size="circle" onClick={handleFindFriend}>
              +
            </Button>
          </RightBottomLayout>
        </FriendModal>
        {isOpen ? (
          <>
            <AddFriend setIsOpen={setIsOpen} />
            <Overlay />
          </>
        ) : null}
      </ContentLayout>
    </>
  );
};

export default Friends;
