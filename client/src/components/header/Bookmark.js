import styled from 'styled-components';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';

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
  const dummyBookmark = [
    { name: 'naver', url: 'https://www.naver.com' },
    { name: 'google', url: 'https://www.google.com' },
  ];
  const handleBookmarkAdd = e => {
    console.log(e.target.value);
  };
  const handleBookmarkDelete = e => {
    console.log(e.target.value);
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
      <Button size="circle" onClick={handleBookmarkAdd}>
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      <Button size="circle" onClick={handleBookmarkDelete}>
        <LightIcon>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </LightIcon>
      </Button>
    </>
  );
};

export default Bookmark;
