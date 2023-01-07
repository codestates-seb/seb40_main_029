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
import Mobile from './Mobile';

const Browser = styled.div`
  position: relative;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Home = () => {
  const [mobile, setMobile] = useState();
  const [userPoint, setUserPoint] = useState(0);
  const memberId = useSelector(memberIdSelector);
  const { modalType } = useSelector(selectModal);
  const [hidenCard, setHidenCard] = useState(false);
  const accessToken = getCookie('accessToken');

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

  const handleResize = () => {
    let width = window.innerWidth;
    if (550 >= width) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = accessToken;
    }
    if (550 >= window.innerWidth) {
      setMobile(true);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Browser>
      <Header userPoint={userPoint} />
      {mobile ? (
        <ContentLayout>
          <Mobile />
        </ContentLayout>
      ) : (
        <ContentLayout>
          {hidenCard ? null : (
            <div>
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
      )}
    </Browser>
  );
};

export default Home;
