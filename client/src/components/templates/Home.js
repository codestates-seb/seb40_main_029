import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodSelector from '../module/MoodSelector';
import GlobalModal from './GlobalModal';
import { GetPoint } from '../../api/GetPointApi';
import { memberIdSelector } from '../../redux/hooks';
import { selectModal } from '../../redux/modalSlice';

const Browser = styled.div`
  position: relative;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;

  //mobile 767px 이하일때
  @media screen and (max-width: 767px) {
    max-width: 767px;
  }
  //tablet 768px 이상일때
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 1023px;
  }
`;

const Home = () => {
  const [userPoint, setUserPoint] = useState(0);
  const memberId = useSelector(memberIdSelector);

  const { modalType } = useSelector(selectModal);
  const [hidenCard, setHidenCard] = useState(false);

  const [lookbackRefresh, setLookbackRefresh] = useState(-1);
  const lookbackRefresher = () => {
    setLookbackRefresh(lookbackRefresh * -1);
  };

  const [pointRefresh, setPointRefresh] = useState(-1);
  const pointRefresher = () => {
    setPointRefresh(pointRefresh * -1);
  };

  useEffect(() => {
    if (modalType === 'LookbackModal' || modalType === 'MonthlyModal') {
      setHidenCard(true);
    } else {
      setHidenCard(false);
    }
  }, [modalType]);

  useEffect(() => {
    (async () => {
      setUserPoint(await GetPoint(memberId));
    })();
  }, [pointRefresh]);

  return (
    <Browser>
      <Header userPoint={userPoint} />
      <ContentLayout>
        {hidenCard ? null : (
          <div>
            {/* <div style={{ width: '50%', display: 'flex', justifyContent: 'end' }}> */}
            <MoodSelector
              lookbackRefresher={lookbackRefresher}
              pointRefresher={pointRefresher}
            />
          </div>
        )}
        <GlobalModal
          setHidenCard={setHidenCard}
          lookbackRefresh={lookbackRefresh}
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
      </ContentLayout>
    </Browser>
  );
};

export default Home;
