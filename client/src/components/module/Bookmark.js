import styled from 'styled-components';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import BookmarkHandle from './BookmarkHandle';
import BookmarkItem from '../module/BookmarkItem';

const BookItem = styled.div`
  position: relative;

  &:hover > span {
    display: inline-block;
  }
`;
const Anchor = styled.a`
  line-height: 1;
`;
const Bookmark = () => {
  const [booksArr, setBookmarkArr] = useState(
    JSON.parse(localStorage.getItem('bookmark')) || []
  );

  const bookmarkDelete = e => {
    // alert('북마크를 삭제하시겠습니까?');
    // booksArr.filter(book => {
    //   return e.target.value !== book;
    // });
    console.log(book.name);
    // localStorage.removeItem();
  };
  return (
    <>
      {booksArr.length
        ? booksArr.map((book, i) => {
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
      <BookmarkHandle setBookmarkArr={setBookmarkArr} booksArr={booksArr} />
    </>
  );
};

export default Bookmark;
