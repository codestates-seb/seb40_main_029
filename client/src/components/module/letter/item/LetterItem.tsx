import { useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import { deleteMail, readMail } from '../../../../api/MailDataApi';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import { RightBottomLayout } from '../../../atoms/layout/Layouts';
import * as Style from './Style';
import { Mail } from '../Mail';

interface LetterPropsType {
  mail: Mail; //편지 객체
  setCurrentMail: React.Dispatch<React.SetStateAction<number>>;
  currentMail: number; //pk
}

const LetterItem = ({
  mail,
  setMailRefresh,
  setCurrentMail,
  currentMail,
}: LetterPropsType) => {
  const { mailId, senderDisplayName, createdAt, body, verifyMail } = mail;
  const [isOpen, setIsOpen] = useState(false);
  const memberId = useSelector(memberIdSelector);
  let date = 0;
  const FormatDate = (day: string) => {
    const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
    const sendDay = new Date(day);
    const today = new Date();
    const base = Math.ceil(
      (sendDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    date = Number(formatter.format(base > -1 ? -1 : base, 'day'));
  };
  FormatDate(createdAt);

  let detailDate = 0;
  const FormatDetailDate = (day: string) => {
    const formatter = new Intl.DateTimeFormat('ko');
    const sendDay = new Date(day);
    detailDate = Number(formatter.format(sendDay));
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
        <Style.LetterHeader>
          <div>
            <span>{senderDisplayName}</span>
            <Style.Alarm>{verifyMail ? '읽음' : '안읽음'} </Style.Alarm>
          </div>
          <Style.DetailDate>{date}</Style.DetailDate>
        </Style.LetterHeader>
        {currentMail === mailId ? (
          <>
            <Style.DetailDate>{detailDate}</Style.DetailDate>
            <Style.LetterBody>{body}</Style.LetterBody>
            <RightBottomLayout>
              <Style.DeleteBtn onClick={handleMailDelete}>삭제</Style.DeleteBtn>
            </RightBottomLayout>
          </>
        ) : null}
      </ContentBox>
    </>
  );
};

export default LetterItem;
