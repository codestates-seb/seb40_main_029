import Letters from '../module/Letters';
import { useState } from 'react';
import LetterCreate from '../module/LetterCreate';
import Overlay from '../atoms/Overlay';

const Letter = ({ pointRefresher }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Letters setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen ? (
        <>
          <LetterCreate setIsOpen={setIsOpen} pointRefresher={pointRefresher} />
          <Overlay />
        </>
      ) : null}
    </>
  );
};

export default Letter;
