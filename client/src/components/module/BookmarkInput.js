import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useState } from 'react';
import useInput from '../../utils/useInput';
import ShadowBox from '../atoms/ShadowBox';

const InputWraper = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const BookmarkInput = ({ setIsOpen, dummyBookmark }) => {
  const [bookName, bookNameBind] = useInput('');
  const [bookUrl, bookUrlBind] = useInput('');
  const [booksArr, setBookmarkArr] = useInput(dummyBookmark);

  const handleBookmarkClose = () => {
    setIsOpen(false);
  };
  const handleBookmarkSubmit = e => {
    e.preventDefault();
    localStorage.setItem('bookmark', `name: ${bookName}, url: ${bookUrl}`);
    let test = JSON.stringify(localStorage.getItem('bookmark'));
    console.log(test);
  };

  return (
    <ShadowBox>
      <InputWraper>
        <label htmlFor="name">이름</label>
        <Input name="name" value={bookNameBind} border="shadow" />
        <label htmlFor="url">URL</label>
        <Input name="url" value={bookUrlBind} border="shadow" />
        <div>
          <Button size="long" onClick={handleBookmarkSubmit}>
            저장
          </Button>
          <Button size="long" onClick={handleBookmarkClose}>
            취소
          </Button>
        </div>
      </InputWraper>
    </ShadowBox>
  );
};

export default BookmarkInput;
