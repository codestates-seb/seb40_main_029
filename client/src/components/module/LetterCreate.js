import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CenterLayout, RightBottomLayout } from '../atoms/Layouts';
import ShadowBox from '../atoms/ShadowBox';
import { useEffect, useState } from 'react';
import { getFriends } from '../../api/FriendDataApi';
import { sendMail } from '../../api/MailDataApi';
import { memberIdSelector, displayNameSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { TooltipBtn } from '../atoms/TooltipBtn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopUp = styled.div`
  z-index: 2;
  button {
    margin-right: -10px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
  div {
    display: flex;
  }
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
  padding-left: 16px; //์๋จน์!
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

const LetterCreate = ({ setIsOpen, pointRefresher }) => {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState('');
  const [letterBody, setLetterBody] = useState('');
  const memberId = useSelector(memberIdSelector);
  useEffect(() => {
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
  const senderName = useSelector(displayNameSelector);
  const handleSendLetter = e => {
    e.preventDefault();
    if (letterBody.length > 300) {
      toast('300์ ์ดํ๋ก๋ง ํธ์ง๋ฅผ ๋ณด๋ผ ์ ์์ด์!');
      setLetterBody('');
      return;
    }
    if (friend !== '') {
      sendMail({
        body: letterBody,
        senderName: senderName,
        receiverName: friend,
      });
      setLetterBody('');
      toast(`${friend}์๊ฒ ํธ์ง๋ฅผ ๋ณด๋์ต๋๋ค.(-60ํฌ์ธํธ)`);
      pointRefresher();
      setIsOpen(false);
    } else if (friend === '') {
      toast('ํธ์ง๋ฅผ ๋ณด๋ผ ์น๊ตฌ๋ฅผ ์?ํํ์ธ์');
    }
  };
  return (
    <>
      <PopUp>
        <CenterLayout>
          <ShadowBox>
            <Title>
              <div>
                <h3>ํธ์ง์ฐ๊ธฐ</h3>
                <TooltipBtn info="์ข์ด๋นํ๊ธฐ๋ฅผ ๋๋ฅด๋ฉด ํธ์ง๊ฐ ๋ค์๋? ์น๊ตฌ์ ํธ์งํจ์ผ๋ก ๋์ฐฉํด์!" />
              </div>
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
                  <Option value="">์น๊ตฌ๋ชฉ๋ก</Option>
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
                    <Option>์น๊ตฌ๊ฐ ์์ต๋๋ค.</Option>
                  )}
                </Selector>
              </div>
              <label htmlFor="body">๋ด์ฉ</label>
              <Textarea
                border="transparent"
                size="long"
                name="body"
                value={letterBody}
                onChange={handleTextarea}
                placeholder="์น๊ตฌ์๊ฒ ํธ์ง๋ฅผ ๋ณด๋ด ๋ณด์ธ์.(300์)"
              />
            </LetterBox>
            <RightBottomLayout>
              <Button size="circle" onClick={handleSendLetter}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </RightBottomLayout>
          </ShadowBox>
        </CenterLayout>
      </PopUp>
    </>
  );
};

export default LetterCreate;
