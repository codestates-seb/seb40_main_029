import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const BookItem = styled.div`
  position: relative;
  &:hover > span {
    display: inline-block;
  }
`;
const Anchor = styled.a`
  line-height: 1;
  padding: 8px 0;
`;
const EditBtn = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 8px 2px 0;
  font-size: 12px;
  display: none;

  &:hover {
    opacity: 0.7;
  }
`;
const BookmarkItem = ({ book, booksArr, setBookmarkArr }) => {
  const { url, name } = book;
  const bookmarkDelete = () => {
    const filteredData = booksArr.filter(book => {
      return book.name !== name;
    });
    localStorage.setItem('bookmark', JSON.stringify(filteredData));
    setBookmarkArr(filteredData);
  };

  return (
    <>
      <BookItem>
        <Button size="long" fontsize="middle">
          <Anchor href={url}>{name}</Anchor>
        </Button>
        <EditBtn onClick={bookmarkDelete}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </EditBtn>
      </BookItem>
    </>
  );
};

export default BookmarkItem;
