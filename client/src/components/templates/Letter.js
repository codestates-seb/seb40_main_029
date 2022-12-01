import Letters from '../module/Letters';
import { useState } from 'react';
import LetterCreate from '../module/LetterCreate';
import { ContentLayout } from '../atoms/Layouts';
import Overlay from '../atoms/Overlay';

const Letter = ({ pointRefresher }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContentLayout>
      <Letters setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen ? (
        <>
          <LetterCreate setIsOpen={setIsOpen} pointRefresher={pointRefresher} />
          <Overlay />
        </>
      ) : null}
    </ContentLayout>
  );
};

export default Letter;
