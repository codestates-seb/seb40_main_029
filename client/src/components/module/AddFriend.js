import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CenterLayout, RightBottomLayout } from '../atoms/Layouts';
import Input from '../atoms/Input';
import FriendItem from './FriendItem';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import { getAllMembers } from '../../api/FriendDataApi';

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
  margin: 8px auto;
  min-width: 320px;
  justify-content: space-around;
`;
const InputBox = styled.div`
  position: relative;
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

const AddFriend = ({ setIsOpen }) => {
  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMembers();
      setFriendsList(data);
    };
    fetchData();
  }, []);
  const handleCheckFriend = e => {
    console.log(e.target.value);
  };
  const CloseModal = () => {
    setIsOpen(false);
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
              <Input id="nickname" border="shadow" color="#f6f6f6" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputBox>
          </FilterBox>
          <FriendListBox label="followFriend">
            {friendsList
              ? friendsList.map((member, i) => {
                  return (
                    <FriendItem
                      key={i}
                      member={member}
                      onClick={handleCheckFriend}
                    />
                  );
                })
              : null}
            <FriendItem />
          </FriendListBox>
          <RightBottomLayout>
            <Button size="long">친구추가</Button>
          </RightBottomLayout>
        </ShadowBox>
      </CenterLayout>
    </PopUp>
  );
};

export default AddFriend;
