import Letters from '../module/Letters';
import { useState } from 'react';
import LetterCreate from '../module/LetterCreate';
import { ContentLayout } from '../atoms/Layouts';

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContentLayout>
      <Letters setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen ? <LetterCreate setIsOpen={setIsOpen} /> : null}
    </ContentLayout>
  );
};

export default Letter;
