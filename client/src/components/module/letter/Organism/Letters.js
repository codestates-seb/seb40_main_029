import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import { getCookie } from '../../../../utils/cookie';
import { getAllMails } from '../../../../api/MailDataApi';
import Button from '../../../atoms/button/commonButton/Button';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import { RightBottomLayout } from '../../../atoms/layout/Layouts';
import Pagination from '../../../atoms/pagination/Pagination';
import Overlay from '../../../atoms/overlay/Overlay';
import LetterItem from '../item/LetterItem';
import { MailModal } from '../../modal/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';

const Letters = ({ setIsOpen, isOpen }) => {
  const [mails, setMails] = useState([]);
  const [mailRefresh, setMailRefresh] = useState(1);
  const limit = 4;
  const [page, setPage] = useState(1);
  const [currentMail, setCurrentMail] = useState(0);
  const offset = (page - 1) * limit;
  const [popup, setPopup] = useState(false);
  const accessToken = getCookie('accessToken');
  const handleLetterCreate = () => {
    {
      accessToken
        ? setIsOpen(!isOpen)
        : (setPopup(!popup),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };
  const memberId = useSelector(memberIdSelector);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMails(memberId);
      setMails(data.slice().reverse());
    };
    fetchData();
  }, [mailRefresh]);

  return (
    <>
      {popup && <Overlay />}
      <MailModal>
        <Style.ContentWrap>
          {mails ? (
            mails.slice(offset, offset + limit).map((mail, i) => {
              return (
                <LetterItem
                  key={i}
                  data={mail}
                  setMailRefresh={setMailRefresh}
                  setCurrentMail={setCurrentMail}
                  currentMail={currentMail}
                />
              );
            })
          ) : (
            <ContentBox>받은 편지가 없습니다.</ContentBox>
          )}
          <RightBottomLayout>
            <Button size="circle" onClick={handleLetterCreate}>
              +
            </Button>
          </RightBottomLayout>
        </Style.ContentWrap>
        <footer>
          <Pagination
            total={mails.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </MailModal>
    </>
  );
};

export default Letters;
