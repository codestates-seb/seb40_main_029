import styled from 'styled-components';
import { useEffect, useState } from 'react';
import BookmarkHandle from './BookmarkHandle';
import BookmarkItem from '../module/BookmarkItem';

const BookmarkBox = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

const Bookmark = () => {
  const [booksArr, setBookmarkArr] = useState(
    JSON.parse(localStorage.getItem('bookmark')) || []
  );
  const [minBooks, setMinbooks] = useState(true);
  let sliceNum = minBooks ? 3 : 10;
  const minBooksList = booksArr.slice(0, sliceNum);

  return (
    <BookmarkBox>
      {booksArr
        ? minBooksList.map((book, i) => {
            return (
              <BookmarkItem
                key={i}
                book={book}
                booksArr={booksArr}
                setBookmarkArr={setBookmarkArr}
              />
            );
          })
        : null}
      <BookmarkHandle
        setBookmarkArr={setBookmarkArr}
        booksArr={booksArr}
        setMinbooks={setMinbooks}
        minBooks={minBooks}
      />
    </BookmarkBox>
  );
};

export default Bookmark;
