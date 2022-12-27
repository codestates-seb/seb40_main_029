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
import Pagination from '../atoms/Pagination';
import { memberIdSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookie';

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendRefresh, setfriendRefresh] = useState(0);
  const limit = 8;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const memberId = useSelector(memberIdSelector);
  const accessToken = getCookie('accessToken');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriends(memberId);
      setFriends(data);
    };
    fetchData();
  }, [friendRefresh]);
  const handleFindFriend = () => {
    console.log(accessToken);
    {
      accessToken ? setIsOpen(!isOpen) : setIsOpen(!isOpen);
      console.log('팝');
    }
  };

  return (
    <>
      <ContentLayout>
        <FriendModal>
          <CardLayout>
            {friends
              ? friends.slice(offset, offset + limit).map(friend => {
                  return (
                    <FriendCard
                      key={friend.respondentId}
                      friend={friend}
                      setfriendRefresh={setfriendRefresh}
                    />
                  );
                })
              : null}
          </CardLayout>
          <RightBottomLayout>
            <Button size="circle" onClick={handleFindFriend}>
              +
            </Button>
          </RightBottomLayout>
          <footer>
            <Pagination
              total={friends.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </footer>
        </FriendModal>
        {isOpen ? (
          <>
            <AddFriend
              setIsOpen={setIsOpen}
              friends={friends}
              setfriendRefresh={setfriendRefresh}
            />
            <Overlay />
          </>
        ) : null}
      </ContentLayout>
    </>
  );
};

export default Friends;
