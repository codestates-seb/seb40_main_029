import { useState } from 'react';
import styled from 'styled-components';
import ContentBox from '../atoms/contentBox/ContentBox';
import { deleteMail, readMail } from '../../api/MailDataApi';
import { RightBottomLayout } from '../atoms/layout/Layouts';
import { memberIdSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
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
  padding: 0 8px;
`;
const DetailDate = styled.span`
  font-size: 13px;
  opacity: 0.5;
`;
const LetterItem = ({ data, setMailRefresh, setCurrentMail, currentMail }) => {
  const { mailId, senderDisplayName, createdAt, body, verifyMail } = data;
  const [isOpen, setIsOpen] = useState(false);
  const memberId = useSelector(memberIdSelector);
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
    // setIsOpen(!isOpen);
    if (currentMail !== mailId) {
      setCurrentMail(mailId);
      readMail(memberId, mailId);
      setMailRefresh(refresh => refresh * -1);
    } else if (currentMail === mailId) {
      setCurrentMail(0);
    }
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
      <ContentBox onClick={handleOpenLetter}>
        <LetterHeader>
          <div>
            <span>{senderDisplayName}</span>
            <Alarm>{verifyMail ? '읽음' : '안읽음'} </Alarm>
          </div>
          <DetailDate>{date}</DetailDate>
        </LetterHeader>
        {currentMail === mailId ? (
          <>
            <DetailDate>{detailDate}</DetailDate>
            <LetterBody>{body}</LetterBody>
            <RightBottomLayout>
              <DeleteBtn onClick={handleMailDelete}>삭제</DeleteBtn>
            </RightBottomLayout>
          </>
        ) : null}
      </ContentBox>
    </>
  );
};

export default LetterItem;
