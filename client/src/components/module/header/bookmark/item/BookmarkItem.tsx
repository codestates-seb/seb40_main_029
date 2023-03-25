import Button from '../../../../atoms/button/commonButton/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import * as Style from './BookmarkItemStyle';
import { BookmarkProps } from '../BookmarkType';

const BookmarkItem = ({ book, booksArr, setBookmarkArr }: BookmarkProps) => {
  const { url, name } = book;

  const bookmarkDelete = () => {
    const filteredData = booksArr.filter(book => {
      return book.name !== name;
    });
    localStorage.setItem('bookmark', JSON.stringify(filteredData));
    setBookmarkArr(filteredData);
  };
  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Style.BookItem>
        <Button
          size="long"
          fontsize="middle"
          onClick={() => handleOpenLink(url)}
        >
          {name}
        </Button>
        <Style.EditBtn onClick={bookmarkDelete}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </Style.EditBtn>
      </Style.BookItem>
    </>
  );
};

export default BookmarkItem;
