import { useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../redux/hooks';
import { getCookie } from '../../../utils/cookie';
import { getAllMails } from '../../../api/MailDataApi';
import Button from '../../atoms/button/commonButton/Button';
import ContentBox from '../../atoms/contentBox/ContentBox';
import { RightBottomLayout } from '../../atoms/layout/Layouts';
import Pagination from '../../atoms/pagination/Pagination';
import Overlay from '../../atoms/overlay/Overlay';
import LetterItem from './item/LetterItem';
import BasicModal from '../../atoms/modal/ModalItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';
import { ModalType } from '../../../types/ModalTypes';
import { useQuery } from '@tanstack/react-query';
import { Mail } from './Mail';

const Letters = ({ setIsOpen, isOpen }: ModalType) => {
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
  const letters = useQuery({
    queryKey: ['letter', memberId],
    queryFn: async () => {
      const data = await getAllMails(memberId);
      return data.reverse();
    },
  });

  return (
    <>
      {popup && <Overlay />}
      <BasicModal modalType="LetterModal">
        <Style.ContentWrap>
          {letters ? (
            letters?.data
              ?.slice(offset, offset + limit)
              .map((letter: Mail, i: number) => {
                return (
                  <LetterItem
                    key={i}
                    letter={letter}
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
            total={letters?.data?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </BasicModal>
    </>
  );
};

export default Letters;
