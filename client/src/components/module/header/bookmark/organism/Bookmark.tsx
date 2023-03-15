import { useState } from 'react';
import BookmarkHandle from '../edit/BookmarkEdit';
import BookmarkItem from '../item/BookmarkItem';
import * as Style from './BookmarkStyle';
import { BookItemType } from '../BookmarkType';

const Bookmark = () => {
  const [booksArr, setBookmarkArr] = useState<BookItemType[]>(
    JSON.parse(localStorage.getItem('bookmark')) || []
  );
  const [minBooks, setMinbooks] = useState(true);
  let sliceNum = minBooks ? 3 : 10;
  const minBooksList = booksArr.slice(0, sliceNum);

  return (
    <Style.BookmarkBox>
      {booksArr
        ? minBooksList.map((book, i: number) => {
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
    </Style.BookmarkBox>
  );
};

export default Bookmark;
