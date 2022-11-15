import { useState } from 'react';
import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import User from '../atoms/User';

const LetterBody = styled.div`
  min-height: 100px;
  margin: 8px 16px;
`;
const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LetterItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
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
