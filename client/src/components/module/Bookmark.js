import styled from 'styled-components';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import BookmarkHandle from './BookmarkHandle';

const Anchor = styled.a`
  line-height: 1;
`;

const Bookmark = () => {
  const [booksArr, setBookmarkArr] = useState(
    JSON.parse(localStorage.getItem('bookmark') || 0)
  );
  const [isOpen, setIsOpen] = useState(false);
  let renderBookmark = [];

  useEffect(() => {
    renderBookmark = JSON.parse(localStorage.getItem('bookmark'));
  }, []);
  return (
    <>
      {booksArr.length
        ? booksArr.map((book, i) => {
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
