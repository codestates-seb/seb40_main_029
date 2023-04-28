import Button from '../../../atoms/button/commonButton/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CenterLayout, RightBottomLayout } from '../../../atoms/layout/Layouts';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import { useState } from 'react';
import { getFriends } from '../../../../api/FriendDataApi';
import { sendMail } from '../../../../api/MailDataApi';
import { memberIdSelector, displayNameSelector } from '../../../../redux/hooks';
import { useSelector } from 'react-redux';
import TooltipButton from '../../../atoms/button/tooltipButton/TooltipButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';
import { ModalType } from '../../../../types/ModalTypes';
import { useQuery } from '@tanstack/react-query';
import { Friend } from '../../friend/FriendType';

type LetterCreateType = Pick<ModalType, 'setIsOpen'>;
const LetterCreate = ({ setIsOpen }: LetterCreateType) => {
  const [friend, setFriend] = useState('');
  const [letterBody, setLetterBody] = useState('');

  const memberId = useSelector(memberIdSelector);
  const friends = useQuery({
    queryKey: ['friend', memberId],
    queryFn: async () => {
      const data = getFriends(memberId);
      return data;
    },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFriend(e.target.value);
  };
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetterBody(e.target.value);
  };
  const senderName = useSelector(displayNameSelector);
  const handleSendLetter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (letterBody.length > 300) {
      toast('300자 이하로만 편지를 보낼 수 있어요!');
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
      toast(`${friend}에게 편지를 보냈습니다.(-60포인트)`);
      setIsOpen(false);
    } else if (friend === '') {
      toast('편지를 보낼 친구를 선택하세요');
    }
  };
  return (
    <>
      <Style.PopUp>
        <CenterLayout>
          <ContentBox>
            <Style.Title>
              <div>
                <h3>편지쓰기</h3>
                <TooltipButton
                  info="종이비행기를 누르면 편지가 다음날 친구의 편지함으로 도착해요!"
                  place="top"
                />
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </Style.Title>
            <Style.LetterBox>
              <div>
                <label htmlFor="friend">To </label>
                <Style.Selector name="friend" onChange={handleSelect}>
                  <Style.Option value="">친구목록</Style.Option>
                  {friends ? (
                    friends?.data?.map((friend: Friend) => {
                      return (
                        <Style.Option
                          key={friend.respondentId}
                          value={friend.respondentDisplayName}
                        >
                          {friend.respondentDisplayName}
                        </Style.Option>
                      );
                    })
                  ) : (
                    <Style.Option>친구가 없습니다.</Style.Option>
                  )}
                </Style.Selector>
              </div>
              <label htmlFor="body">내용</label>
              <Style.Textarea
                name="body"
                value={letterBody}
                onChange={handleTextarea}
                placeholder="친구에게 편지를 보내 보세요.(300자)"
              />
            </Style.LetterBox>
            <RightBottomLayout>
              <Button size="circle" onClick={handleSendLetter}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </RightBottomLayout>
          </ContentBox>
        </CenterLayout>
      </Style.PopUp>
    </>
  );
};

export default LetterCreate;
