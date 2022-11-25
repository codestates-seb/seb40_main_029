import Button from '../atoms/Button';
import ShadowBox from '../atoms/ShadowBox';
import LetterItem from './LetterItem';
import { MailModal } from './Modal';
import { useEffect, useState } from 'react';
import { getAllMails } from '../../api/MailDataApi';
import { RightBottomLayout } from '../atoms/Layouts';
import styled from 'styled-components';

const ContentWrap = styled.div`
  //임시방편. 페이지네이션 구현 예정
  overflow-y: scroll;
  height: 396px;
`;
const Letters = ({ setIsOpen, isOpen }) => {
  const [mails, setMails] = useState();
  const handleLetterCreate = () => {
    setIsOpen(!isOpen);
  };
  const memberId = 2;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMails(memberId);
      setMails(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <MailModal>
        <ContentWrap>
          {mails ? (
            mails.map((mail, i) => {
              return <LetterItem key={i} data={mail} />;
            })
          ) : (
            <ShadowBox>받은 편지가 없습니다.</ShadowBox>
          )}
        </ContentWrap>
        <RightBottomLayout>
          <Button size="circle" onClick={handleLetterCreate}>
            +
          </Button>
        </RightBottomLayout>
      </MailModal>
    </>
  );
};

export default Letters;
