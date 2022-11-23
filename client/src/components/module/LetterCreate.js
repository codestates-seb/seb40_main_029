import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RightBottomLayout } from '../atoms/Layouts';
import ShadowBox from '../atoms/ShadowBox';
import { useEffect, useState } from 'react';
import { getFriends } from '../../api/FriendDataApi';
import { sendMail } from '../../api/MailDataApi';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
`;
const LetterBox = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  min-width: 300px;
  div {
    font-weight: 700;
    margin: 0 16px;
    display: flex;
    align-items: center;
  }
  label {
    padding: 0 8px;
  }
  > label {
    display: none;
  }
`;
const Selector = styled.select`
  padding: 8px;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 50%;
  background-color: #fafafa;
`;
const Option = styled.option`
  padding-left: 16px; //안먹음!
`;
const Textarea = styled.textarea`
  border: none;
  height: 200px;
  padding: 8px;
  margin: 16px;
  background-color: #fafafa;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;

const LetterCreate = ({ setIsOpen }) => {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState('');
  const [letterBody, setLetterBody] = useState('');
  useEffect(() => {
    const memberId = 1;
    const fetchData = async () => {
      const data = await getFriends(memberId);
      setFriends(data);
    };
    fetchData();
  }, []);
  const handleSelect = e => {
    setFriend(e.target.value);
  };
  const handleTextarea = e => {
    setLetterBody(e.target.value);
  };
  const senderName = '회원1';
  const handleSendLetter = e => {
    e.preventDefault();
    if (receiverName !== '친구목록') {
      sendMail({
        body: `${letterBody}`,
        senderName: `${senderName}`,
        receiverName: `${friend}`,
      });
    }
  };
  return (
    <>
      <ShadowBox>
        <Title>
          <h3>편지쓰기</h3>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </Title>
        <LetterBox>
          <div>
            <label htmlFor="friend">To </label>
            <Selector name="friend" onChange={handleSelect}>
              <Option>친구목록</Option>
              {friends ? (
                friends.map(friend => {
                  return (
                    <Option
                      key={friend.respondentId}
                      value={friend.respondentDisplayName}
                    >
                      {friend.respondentDisplayName}
                    </Option>
                  );
                })
              ) : (
                <Option>친구가 없습니다.</Option>
              )}
            </Selector>
          </div>
          <label htmlFor="body">내용</label>
          <Textarea
            border="transparent"
            size="long"
            name="body"
            onChange={handleTextarea}
            placeholder="친구에게 편지를 보내 보세요.(300자)"
          />
        </LetterBox>
        <RightBottomLayout>
          <Button size="circle" onClick={handleSendLetter}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </RightBottomLayout>
      </ShadowBox>
    </>
  );
};

export default LetterCreate;
