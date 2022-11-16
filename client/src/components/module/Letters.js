import styled from 'styled-components';
import Button from '../atoms/Button';
import ShadowBox from '../atoms/ShadowBox';
import LetterItem from './LetterItem';
import { MailModal } from './modal/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';

// layout요소 atom으로 뺄지 고민해볼것
export const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 8px;
`;
// 모든메일 가져오기 api
const url = 'http://localhost:3001';
const getAllMails = async () => {
  const res = await axios.get(url + '/mails');
  return res.data;
};

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
        <ButtonLayout>
          <Button size="circle" onClick={handleLetterCreate}>
            +
          </Button>
        </ButtonLayout>
      </MailModal>
    </>
  );
};

export default Letters;
