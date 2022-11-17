import { useState } from 'react';
import styled from 'styled-components';
import ShadowBox from '../atoms/ShadowBox';
import User from '../atoms/User';
import { deleteMail } from '../../api/MailDataApi';
import { RightBottomLayout } from './Letters';

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

const LetterItem = ({ data }) => {
  const { mailId, username, createdAt, body } = data;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
  };
  const handleMailDelete = () => {
    const fetchData = async () => {
      await deleteMail({ mailId });
    };
    fetchData();
  };
  return (
    <>
      <ShadowBox onClick={handleOpenLetter}>
        <LetterHeader>
          <User>{username}</User>
          <span>{createdAt}</span>
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
