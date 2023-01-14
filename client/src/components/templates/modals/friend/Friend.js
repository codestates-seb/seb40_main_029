import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import { paletteCodeSelector } from '../../../../redux/hooks';
import { getFriends, getSpecificPalette } from '../../../../api/FriendDataApi';
import { getCookie } from '../../../../utils/cookie';
import { RightBottomLayout } from '../../../atoms/layout/Layouts';
import Button from '../../../atoms/button/commonButton/Button';
import Overlay from '../../../atoms/overlay/Overlay';
import Pagination from '../../../atoms/pagination/Pagination';
import { FriendModal } from '../../../module/modal/Modal';
import AddFriend from '../../../module/friend/create/AddFriend';
import FriendCard from '../../../module/friend/card/FriendCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendRefresh, setfriendRefresh] = useState(1);
  const [limit, setLimit] = useState(0);
  const handleLimit = () => {
    const width = window.innerWidth;
    if (width >= 860) {
      setLimit(8);
    }
    if (width < 860) {
      setLimit(6);
    }
    if (width < 665) {
      setLimit(4);
    }
  };
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
    {
      accessToken
        ? setIsOpen(!isOpen)
        : (setPopup(!popup),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };
  useEffect(() => {
    window.innerWidth ? handleLimit() : 0;
    window.addEventListener('resize', handleLimit);
    return () => {
      window.removeEventListener('resize', handleLimit);
    };
  }, []);

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

  return (
    <>
      {popup && <Overlay />}
      <FriendModal>
        <Style.CardLayout>
          {friends
            ? friends.slice(offset, offset + limit).map(friend => {
                return (
                  <FriendCard
                    key={friend.respondentId}
                    friend={friend}
                    setfriendRefresh={setfriendRefresh}
                    friendsColor={palette?.find(color => {
                      return (
                        color.mood === friend.respondentMoodPaletteDetails.mood
                      );
                    })}
                  />
                );
              })
            : null}
        </Style.CardLayout>
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
    </>
  );
};

export default Friends;
