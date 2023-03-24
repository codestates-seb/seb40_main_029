import { useState } from 'react';
import Letters from '../../../module/letter/Letters';
import LetterCreate from '../../../module/letter/create/LetterCreate';
import Overlay from '../../../atoms/overlay/Overlay';

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
