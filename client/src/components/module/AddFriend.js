import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CenterLayout, RightBottomLayout } from '../atoms/Layouts';
import Input from '../atoms/Input';
import FriendItem from './FriendItem';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import { addFriend, getAllMembers } from '../../api/FriendDataApi';
import useInput from '../../utils/useInput';

const PopUp = styled.div`
  z-index: 2;
  button {
    margin-right: -10px;
  }
`;
const Title = styled.h3`
  border-bottom: 1px solid #d4d4d4;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 16px auto 24px;
  min-width: 360px;
  justify-content: space-around;
`;
const InputBox = styled.div`
  position: relative;
  input {
    padding: 8px;
    border-radius: 20px;
    width: 240px;
  }
  svg {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    right: 0;
    line-height: 1;
  }
`;
const FriendListBox = styled.div`
  list-style: none;
  border: 1px solid #ededed;
  border-radius: 10px;
  height: 150px;
  overflow-y: scroll;
  margin-bottom: 18px;
`;

const AddFriend = ({ setIsOpen, friends, setReFresh }) => {
  const [userList, setUserList] = useState([]);
  const [keyword, bindKeyword] = useInput('');
  const [respondentDisplayName, setRespondentDisplayName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMembers();
      setUserList(data);
    };
    fetchData();
  }, []);
  const CloseModal = () => {
    setIsOpen(false);
  };

  const filteredMember = userList?.filter(member => {
    return member.displayName.includes(keyword);
  });
  const checkAlreadyAdd = el => {
    if (el.respondentDisplayName === respondentDisplayName) {
      return true;
    }
  };

  // 유저 ID 1로 가정
  const requesterDisplayName = '회원1';
  const handleAddFriend = () => {
    if (friends.some(checkAlreadyAdd)) {
      alert('이미 추가한 친구예요!');
      return;
    }
    addFriend({ requesterDisplayName, respondentDisplayName });
    setReFresh(refresh => refresh + 1);
    alert('친구를 추가했어요!');
  };

  return (
    <PopUp>
      <CenterLayout>
        <ShadowBox>
          <Title>
            친구찾기
            <FontAwesomeIcon icon={faXmark} onClick={CloseModal} />
          </Title>
          <FilterBox>
            <label htmlFor="nickname">닉네임</label>
            <InputBox>
              <Input
                id="nickname"
                border="shadow"
                color="#f6f6f6"
                placeHolder="친구를 팔로잉해보세요!"
                value={bindKeyword}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputBox>
          </FilterBox>
          <FriendListBox label="followFriend">
            {filteredMember
              ? filteredMember.map((member, i) => {
                  return (
                    <FriendItem
                      key={i}
                      member={member}
                      setRespondentDisplayName={setRespondentDisplayName}
                    />
                  );
                })
              : null}
          </FriendListBox>
          <RightBottomLayout>
            <Button size="long" onClick={handleAddFriend}>
              친구추가
            </Button>
          </RightBottomLayout>
        </ShadowBox>
      </CenterLayout>
    </PopUp>
  );
};

export default AddFriend;
