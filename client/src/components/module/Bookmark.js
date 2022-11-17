import styled from 'styled-components';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import BookmarkHandle from './BookmarkHandle';

const Anchor = styled.a`
  line-height: 1;
`;

let dummyBookmark = [
  { name: 'naver', url: 'https://www.naver.com' },
  { name: 'google', url: 'https://www.google.com' },
];
const Bookmark = () => {
  const [booksArr, setBookmarkArr] = useState(dummyBookmark);
  const [isOpen, setIsOpen] = useState(false);
  //로컬스토리지에서 가져옴
  useEffect(() => {
    let test = JSON.parse(localStorage.getItem('bookmark'));
    console.log(test);
  }, []);
  return (
    <>
      {dummyBookmark.length !== 0
        ? dummyBookmark.map((book, i) => {
            return (
              <Button key={i} size="long" fontsize="middle">
                <Anchor href={book.url}>{book.name}</Anchor>
              </Button>
            );
          })
        : null}
      <BookmarkHandle setBookmarkArr={setBookmarkArr} booksArr={booksArr} />
    </>
  );
};

export default Bookmark;
