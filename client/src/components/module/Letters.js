import Button from '../atoms/Button';
import ShadowBox from '../atoms/ShadowBox';
import LetterItem from './LetterItem';
import { MailModal } from './Modal';
import { useEffect, useState } from 'react';
import { getAllMails } from '../../api/MailDataApi';
import { RightBottomLayout } from '../atoms/Layouts';
import styled from 'styled-components';
import Pagination from '../atoms/Pagination';
import { memberIdSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const ContentWrap = styled.div`
  overflow-y: scroll;
  height: 396px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Letters = ({ setIsOpen, isOpen }) => {
  const [mails, setMails] = useState([]);
  const [mailRefresh, setMailRefresh] = useState(0);
  const limit = 4;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const handleLetterCreate = () => {
    setIsOpen(!isOpen);
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
      <MailModal>
        <ContentWrap>
          {mails ? (
            mails.slice(offset, offset + limit).map((mail, i) => {
              return (
                <LetterItem
                  key={i}
                  data={mail}
                  setMailRefresh={setMailRefresh}
                />
              );
            })
          ) : (
            <ShadowBox>받은 편지가 없습니다.</ShadowBox>
          )}
          <RightBottomLayout>
            <Button size="circle" onClick={handleLetterCreate}>
              +
            </Button>
          </RightBottomLayout>
        </ContentWrap>
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
