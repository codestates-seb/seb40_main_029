import styled from 'styled-components';
import Button from '../atoms/Button';
import ShadowBox from '../atoms/ShadowBox';
import LetterItem from './LetterItem';
import { MailModal } from './modal/Modal';

// layout요소 atom으로 뺄지 고민해볼것
export const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 8px;
`;

const Letters = ({ setIsOpen, isOpen }) => {
  const handleLetterCreate = () => {
    setIsOpen(!isOpen);
  };
  const dummyLetter = [
    {
      username: '은서',
      createdAt: 'Tue Nov 15 2022 17:52:09 GMT+0900',
      body: '뭐하세요?',
    },
    {
      username: '예륜',
      createdAt: 'Tue Nov 15 2022 17:52:09 GMT+0900',
      body: '낙낙INVU우우우우우우우우INVU열이올라낙낙INVU우우우우우우우우INVU열이올라요노동요낙낙INVU우우우우우우우우INVU열이올라요노동요낙낙INVU우우우우우우우우INVU열이올라요노동요낙낙INVU우우우우우우우우INVU열이올라요노동요요노동요낙낙INVU우우우우우우우우INVU열이올라요노동요낙낙INVU우우우우우우우우INVU열이올라요노동요',
    },
  ];
  return (
    <>
      <MailModal>
        {dummyLetter ? (
          dummyLetter.map((letter, i) => {
            return <LetterItem key={i} data={letter} />;
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
