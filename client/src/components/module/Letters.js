import styled from 'styled-components';
import Button from '../atoms/Button';
import ShadowBox from '../atoms/ShadowBox';
import LetterItem from './LetterItem';
import { MailModal } from './Modal';
import { useEffect, useState } from 'react';
import { getAllMails } from '../../api/MailDataApi';

// layout요소 atom으로 뺄지 고민해볼것
export const RightBottomLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 8px;
`;

const Letters = ({ setIsOpen, isOpen }) => {
  const [mails, setMails] = useState();
  const handleLetterCreate = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMails();
      setMails(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <MailModal>
        {mails ? (
          mails.map((mail, i) => {
            return <LetterItem key={i} data={mail} />;
          })
        ) : (
          <ShadowBox>받은 편지가 없습니다.</ShadowBox>
        )}
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
