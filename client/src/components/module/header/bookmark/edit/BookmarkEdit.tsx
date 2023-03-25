import Button from '../../../../atoms/button/commonButton/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHandPointRight,
  faHandPointLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BookmarkCreate from '../create/BookmarkCreate';
import Overlay from '../../../../atoms/overlay/Overlay';
import * as Style from './BookmarkEditStyle';
import { EditBookProps } from '../BookmarkType';

const BookmarkEdit = ({
  booksArr,
  setBookmarkArr,
  minBooks,
  setMinbooks,
}: EditBookProps) => {
  const [addBtnIsOpen, setAddBtnIsOpen] = useState<boolean>(false);
  const onClickAddBtn = () => {
    setAddBtnIsOpen(!addBtnIsOpen);
  };
  const handleMinBook = () => {
    setMinbooks(!minBooks);
  };

  return (
    <>
      <Button size="circle" onClick={onClickAddBtn}>
        <Style.LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </Style.LightIcon>
      </Button>
      <Button size="circle" onClick={handleMinBook}>
        <Style.LightIcon>
          {minBooks ? (
            <FontAwesomeIcon icon={faHandPointRight} />
          ) : (
            <FontAwesomeIcon icon={faHandPointLeft} />
          )}
        </Style.LightIcon>
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

export default BookmarkEdit;
