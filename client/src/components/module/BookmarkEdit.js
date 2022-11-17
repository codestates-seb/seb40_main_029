import styled from 'styled-components';

const EditList = styled.div`
  position: absolute;
  right: 8px;
  font-size: 13px;
  border: none;
`;

const BookmarkEdit = () => {
  const bookmarkDelete = () => {
    localStorage.removeItem();
  };
  return (
    <>
      <EditList>✄</EditList>
    </>
  );
};

export default BookmarkEdit;
