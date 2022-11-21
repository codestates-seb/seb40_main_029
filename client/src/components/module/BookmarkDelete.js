import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

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

const BookmarkDelete = ({ onClick }) => {
  return (
    <>
      <EditBtn onClick={onClick}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </EditBtn>
    </>
  );
};

export default BookmarkDelete;
