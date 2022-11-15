import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BookmarkInput from './BookmarkInput';

const LightIcon = styled.span`
  svg {
    vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
  }
  path {
    color: #cbcccd;
  }
`;
const Anchor = styled.a`
  line-height: 1;
`;

const Bookmark = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dummyBookmark = [
    { name: 'naver', url: 'https://www.naver.com' },
    { name: 'google', url: 'https://www.google.com' },
  ];
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const handleBookmarkDelete = () => {
    console.log('delete');
  };
  return (
    <>
      {dummyBookmark.length !== 0
        ? dummyBookmark.map((book, i) => {
            return (
              <Button key={i} size="long">
                <Anchor href={book.url}>{book.name}</Anchor>
              </Button>
            );
          })
        : null}
      <Button size="circle" onClick={onClick}>
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      <Button size="circle" onClick={handleBookmarkDelete}>
        <LightIcon>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </LightIcon>
      </Button>
      {isOpen ? (
        <div>
          <BookmarkInput setIsOpen={setIsOpen} dummyBookmark={dummyBookmark} />
        </div>
      ) : null}
    </>
  );
};

export default Bookmark;
