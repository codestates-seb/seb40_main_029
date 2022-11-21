import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BookmarkCreate from './BookmarkCreate';
import { CenterLayout } from '../atoms/Layouts';

const LightIcon = styled.span`
  svg {
    vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
  }
  path {
    color: #cbcccd;
  }
`;

const BookmarkHandle = ({ booksArr, setBookmarkArr }) => {
  const [addBtnIsOpen, setAddBtnIsOpen] = useState(false);
  const onClickAddBtn = () => {
    setAddBtnIsOpen(!addBtnIsOpen);
  };
  return (
    <>
      <Button size="circle" onClick={onClickAddBtn}>
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      {addBtnIsOpen ? (
        <CenterLayout>
          <BookmarkCreate
            setAddBtnIsOpen={setAddBtnIsOpen}
            setBookmarkArr={setBookmarkArr}
            booksArr={booksArr}
          />
        </CenterLayout>
      ) : null}
    </>
  );
};

export default BookmarkHandle;
