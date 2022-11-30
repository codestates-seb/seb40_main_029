import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useEffect } from 'react';
import useInput from '../../utils/useInput';
import ShadowBox from '../atoms/ShadowBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CenterLayout, RightBottomLayout } from '../atoms/Layouts';

const PopUp = styled.div`
  z-index: 2;
  button {
    margin-right: -10px;
  }
`;
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
  const [bookName, bookNameBind, nameReset] = useInput('');
  const [bookUrl, bookUrlBind, urlReset] = useInput('');

  const handleBookmarkClose = () => {
    setAddBtnIsOpen(false);
  };
  const handleBookmarkSubmit = e => {
    e.preventDefault();
    if (booksArr.length < 10) {
      setBookmarkArr([
        ...booksArr,
        {
          name: `${bookName}`,
          url: bookUrl.includes('http') ? `${bookUrl}` : `https://${bookUrl}`,
        },
      ]);
      //여기서 북마크팝업을 닫아버리면 북마크가 로컬에 저장이 안됨! 왜일까;ㅠ0ㅠ
      nameReset();
      urlReset();
      alert('북마크를 추가했어요!');
    } else {
      alert('북마크는 열개까지만 등록할 수 있어요!');
    }
  };
  useEffect(() => {
    localStorage.setItem('bookmark', JSON.stringify(booksArr));
  }, [booksArr]);

  return (
    <PopUp>
      <CenterLayout>
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
      </CenterLayout>
    </PopUp>
  );
};

export default BookmarkCreate;
