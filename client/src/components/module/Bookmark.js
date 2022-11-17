import styled from 'styled-components';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import BookmarkHandle from './BookmarkHandle';
import BookmarkDelete from '../module/BookmarkDelete';
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
  const dummyBookmark = [
    { name: 'naver', url: 'https://www.naver.com' },
    { name: 'google', url: 'https://www.google.com' },
  ];
  const [booksArr, setBookmarkArr] = useState(dummyBookmark);
  // ------------- 여기서 에러남 ----------------
  //   const [booksArr, setBookmarkArr] = useState(
  //   JSON.parse(localStorage.getItem('bookmark') || dummyBookmark)
  // );
  // --------------왜일까 ----------------------

  const renderBookmark = JSON.parse(localStorage.getItem('bookmark'));
  const bookmarkDelete = e => {
    // alert('북마크를 삭제하시겠습니까?');
    booksArr.filter(book => {
      return e.target.value !== book;
    });
    console.log(e.target.value);
    // localStorage.removeItem();
  };
  return (
    <>
      {booksArr.length
        ? booksArr.map((book, i) => {
            return (
              <BookItem key={i}>
                <Button size="long" fontsize="middle">
                  <Anchor href={book.url}>{book.name}</Anchor>
                </Button>
                <BookmarkDelete onClick={bookmarkDelete} />
              </BookItem>
            );
          })
        : null}
      <BookmarkHandle setBookmarkArr={setBookmarkArr} booksArr={booksArr} />
    </>
  );
};

export default Bookmark;
