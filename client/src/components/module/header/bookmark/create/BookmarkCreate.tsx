import { MouseEventHandler, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../atoms/button/commonButton/Button';
import ContentBox from '../../../../atoms/contentBox/ContentBox';
import Input from '../../../../atoms/input/Input';
import useInput from '../../../../../utils/useInput';
import {
  CenterLayout,
  RightBottomLayout,
} from '../../../../atoms/layout/Layouts';
import TooltipButton from '../../../../atoms/button/tooltipButton/TooltipButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './BookmarkCreateStyle';
import { BookmarkProps } from '../BookmarkType';

export interface BookmarkSetType extends BookmarkProps {
  setAddBtnIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookmarkCreate = ({
  setAddBtnIsOpen,
  booksArr,
  setBookmarkArr,
}: BookmarkSetType) => {
  const [bookName, bookNameBind, nameReset] = useInput('');
  const [bookUrl, bookUrlBind, urlReset] = useInput('');
  const [validation, setValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);

  const handleBookmarkClose = () => {
    setAddBtnIsOpen(false);
  };
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  useEffect(() => {
    const urlValidation = () => {
      if (urlRegex.test(bookUrl)) {
        setValidation(true);
      } else {
        setValidation(false);
      }
    };
    urlValidation();
    const bookNames = booksArr.map(book => {
      return book.name;
    });
    const bookNameValidation = () => {
      bookNames.includes(bookName)
        ? setNameValidation(false)
        : setNameValidation(true);
    };
    bookNameValidation();
  }, [bookUrl, bookName]);

  const handleBookmarkSubmit: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (booksArr.length < 10 && validation && nameValidation) {
      setBookmarkArr([
        ...booksArr,
        {
          name: bookName,
          url: bookUrl.includes('http') ? bookUrl : `https://${bookUrl}`,
        },
      ]);
      nameReset();
      urlReset();
      toast('북마크를 추가했어요!');
    } else if (!validation || !nameValidation) {
      !validation ? toast('유효한 url이 아닙니다.') : null;
      !nameValidation ? toast('중복된 북마크 이름이 있습니다.') : null;
    } else {
      toast('북마크는 열개까지만 등록할 수 있어요!');
    }
  };
  useEffect(() => {
    localStorage.setItem('bookmark', JSON.stringify(booksArr));
  }, [booksArr]);
  return (
    <Style.PopUp>
      <CenterLayout>
        <ContentBox>
          <Style.Title>
            <div>
              북마크 추가
              <TooltipButton
                info="즐겨찾는 사이트의 이름과 url을 저장해보세요!"
                place={top}
              />
            </div>
            <FontAwesomeIcon icon={faXmark} onClick={handleBookmarkClose} />
          </Style.Title>
          <Style.InputWraper>
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
            {validation || !bookUrlBind.value.length ? null : (
              <Style.Validation>유효한 URL이 아니예요!</Style.Validation>
            )}
            <RightBottomLayout>
              <Button
                size="long"
                onClick={handleBookmarkSubmit}
                disabled={!(bookName && bookUrl)}
              >
                저장
              </Button>
            </RightBottomLayout>
          </Style.InputWraper>
        </ContentBox>
      </CenterLayout>
    </Style.PopUp>
  );
};

export default BookmarkCreate;
