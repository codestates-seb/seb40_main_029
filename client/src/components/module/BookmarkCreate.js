import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import useInput from '../../utils/useInput';
import ShadowBox from '../atoms/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { RightBottomLayout } from '../atoms/Layouts';

const Title = styled.h3`
  border-bottom: 1px solid #d4d4d4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const InputWraper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  label {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 8px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
  input {
    padding: 8px;
    width: 200px;
    border-radius: 20px;
  }
  button {
    width: 100px;
  }
`;

const BookmarkCreate = ({ setAddBtnIsOpen, booksArr, setBookmarkArr }) => {
  const [bookName, bookNameBind] = useInput('');
  const [bookUrl, bookUrlBind] = useInput('');

  const handleBookmarkClose = () => {
    setAddBtnIsOpen(false);
  };
  const handleBookmarkSubmit = e => {
    e.preventDefault();
    setBookmarkArr([
      ...booksArr,
      { name: `${bookName}`, url: `https://${bookUrl}` },
    ]);
    console.log(booksArr);
  };
  useEffect(() => {
    localStorage.setItem('bookmark', JSON.stringify(booksArr));
  }, [booksArr]);

  return (
    <ShadowBox>
      <Title>
        북마크 추가
        <FontAwesomeIcon icon={faXmark} onClick={handleBookmarkClose} />
      </Title>
      <InputWraper>
        <label htmlFor="name">
          <span>이름</span>
          <Input
            name="name"
            value={bookNameBind}
            border="shadow"
            color="#f6f6f6"
          />
        </label>
        <label htmlFor="url">
          <span>URL</span>
          <Input
            name="url"
            value={bookUrlBind}
            border="shadow"
            color="#f6f6f6"
          />
        </label>
        <RightBottomLayout>
          <Button size="long" onClick={handleBookmarkSubmit}>
            저장
          </Button>
        </RightBottomLayout>
      </InputWraper>
    </ShadowBox>
  );
};

export default BookmarkCreate;
