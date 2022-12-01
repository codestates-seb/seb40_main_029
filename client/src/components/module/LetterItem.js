import { useState } from 'react';
import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import { deleteMail, readMail } from '../../api/MailDataApi';
import { RightBottomLayout } from '../atoms/Layouts';
import { memberIdSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const DetailDate = styled.span`
  font-size: 13px;
  opacity: 0.5;
`;
const LetterItem = ({ data, setMailRefresh }) => {
  const { mailId, senderDisplayName, createdAt, body, verifyMail } = data;
  const [isOpen, setIsOpen] = useState(false);
  const memberId = useSelector(memberIdSelector);
  //날짜 형식
  let date = 0;
  const FormatDate = day => {
    const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
    const sendDay = new Date(day);
    const today = new Date();
    const base = Math.ceil((sendDay - today) / (1000 * 60 * 60 * 24));
    date = formatter.format(base > -1 ? -1 : base, 'day');
  };
  FormatDate(createdAt);

  let detailDate = 0;
  const FormatDetailDate = day => {
    const formatter = new Intl.DateTimeFormat('ko');
    const sendDay = new Date(day);
    detailDate = formatter.format(sendDay);
  };
  FormatDetailDate(createdAt);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
    readMail(memberId, mailId);
    setMailRefresh(refresh => refresh * -1);
  };
  const handleMailDelete = () => {
    const fetchData = async () => {
      await deleteMail(memberId, mailId);
      setMailRefresh(refresh => refresh * -1);
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
          <DetailDate>{date}</DetailDate>
        </LetterHeader>
        {isOpen ? (
          <>
            <DetailDate>{detailDate}</DetailDate>
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
