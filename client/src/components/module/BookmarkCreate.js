import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';
import useInput from '../../utils/useInput';
import ShadowBox from '../atoms/ShadowBox';

const InputWraper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  width: 300px;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  > button:last-of-type {
    margin: 0;
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
      <InputWraper>
        <label htmlFor="name">이름</label>
        <Input name="name" value={bookNameBind} border="shadow" />
        <label htmlFor="url">URL</label>
        <Input name="url" value={bookUrlBind} border="shadow" />
        <ButtonLayout>
          <Button size="long" onClick={handleBookmarkSubmit}>
            저장
          </Button>
          <Button size="long" onClick={handleBookmarkClose}>
            취소
          </Button>
        </ButtonLayout>
      </InputWraper>
    </ShadowBox>
  );
};

export default BookmarkCreate;
