import { useState } from 'react';
import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import User from '../atoms/User';
import { deleteMail, readMail } from '../../api/MailDataApi';
import { RightBottomLayout } from '../atoms/Layouts';

const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LetterBody = styled.div`
  margin: 16px 0;
`;
const DeleteBtn = styled.span`
  font-size: 13px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
const Alarm = styled.span`
  font-size: 13px;
  padding-left: 8px;
`;
const LetterItem = ({ data }) => {
  const { mailId, senderDisplayName, createdAt, body, verifyMail } = data;
  const [isOpen, setIsOpen] = useState(false);
  const memberId = 1;
  //날짜 형식
  let date = 0;
  const FormatDate = day => {
    const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
    const sendDay = new Date(day);
    const today = new Date();
    const base = Math.ceil((sendDay - today) / (1000 * 60 * 60 * 24));
    date = formatter.format(base, 'day');
  };
  FormatDate(createdAt);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
    //안읽음 -> 읽음으로 펼치는순간 바뀌도록 하려면?
    readMail(memberId, mailId);
  };
  const handleMailDelete = () => {
    const fetchData = async () => {
      await deleteMail(memberId, mailId);
    };
    fetchData();
  };
  return (
    <>
      <ShadowBox onClick={handleOpenLetter}>
        <LetterHeader>
          <div>
            <span>{senderDisplayName}</span>
            <Alarm>{verifyMail ? '읽음' : '안읽음'} </Alarm>
          </div>
          <span>{date}</span>
        </LetterHeader>
        {isOpen ? (
          <>
            <LetterBody>{body}</LetterBody>
            <RightBottomLayout>
              <DeleteBtn onClick={handleMailDelete}>삭제</DeleteBtn>
            </RightBottomLayout>
          </>
        ) : null}
      </ShadowBox>
    </>
  );
};

export default LetterItem;
