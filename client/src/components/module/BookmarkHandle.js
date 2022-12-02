import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHandPointRight,
  faHandPointLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BookmarkCreate from './BookmarkCreate';
import Overlay from '../atoms/Overlay';

const LightIcon = styled.span`
  svg {
    vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
  }
  path {
    color: #cbcccd;
  }
`;

const BookmarkHandle = ({
  booksArr,
  setBookmarkArr,
  minBooks,
  setMinbooks,
}) => {
  const [addBtnIsOpen, setAddBtnIsOpen] = useState(false);
  const onClickAddBtn = () => {
    setAddBtnIsOpen(!addBtnIsOpen);
  };
  const handleMinBook = () => {
    setMinbooks(!minBooks);
  };

  return (
    <>
      <Button size="circle" onClick={onClickAddBtn}>
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      <Button size="circle" onClick={handleMinBook}>
        <LightIcon>
          {minBooks ? (
            <FontAwesomeIcon icon={faHandPointRight} />
          ) : (
            <FontAwesomeIcon icon={faHandPointLeft} />
          )}
        </LightIcon>
      </Button>
      {addBtnIsOpen ? (
        <>
          <Overlay />
          <BookmarkCreate
            setAddBtnIsOpen={setAddBtnIsOpen}
            setBookmarkArr={setBookmarkArr}
            booksArr={booksArr}
          />
        </>
      ) : null}
    </>
  );
};

export default BookmarkHandle;
