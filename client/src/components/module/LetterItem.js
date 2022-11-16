import { useState } from 'react';
import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import User from '../atoms/User';
import { deleteMail } from '../../api/MailDataApi';

const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LetterBody = styled.div`
  margin: 16px 0;
`;

const LetterItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
  };
  const handleMailDelete = () => {
    // deleteMail({ mailId });
  };
  return (
    <>
      <ShadowBox onClick={handleOpenLetter}>
        <LetterHeader>
          <User>{data.username}</User>
          <span>{data.createdAt}</span>
        </LetterHeader>
        {isOpen ? <LetterBody>{data.body}</LetterBody> : null}
      </ShadowBox>
    </>
  );
};

export default LetterItem;
