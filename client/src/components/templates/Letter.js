import styled from 'styled-components';
import Letters from '../module/Letters';
import MoodCard from '../module/MoodCard';
import { useState } from 'react';
import LetterCreate from '../module/LetterCreate';
import { ContentLayout } from '../atoms/Layouts';

// export const ContentLayout = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContentLayout>
      <MoodCard />
      {isOpen ? (
        <LetterCreate />
      ) : (
        <Letters setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
    </ContentLayout>
  );
};

export default Letter;
