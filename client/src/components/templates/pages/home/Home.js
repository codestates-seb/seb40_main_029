import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ContentLayout } from '../../../atoms/layout/Layouts';
import Header from '../../../module/header/Header';
import MoodSelector from '../../../module/mood/MoodSelector';
import GlobalModal from '../../modals/GlobalModal';
import Mobile from '../mobileAlert/MobileAlert';
import { GetPoint } from '../../../../api/GetPointApi';
import { memberIdSelector } from '../../../../redux/hooks';
import { selectModal } from '../../../../redux/modalSlice';
import { getCookie } from '../../../../utils/cookie';
import * as Style from './Style';

const Home = () => {
  const [mobile, setMobile] = useState();
  const [userPoint, setUserPoint] = useState(1);
  const memberId = useSelector(memberIdSelector);
  const { modalType } = useSelector(selectModal);
  const [hiddenCard, setHiddenCard] = useState(false);
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
      setHiddenCard(true);
    } else {
      setHiddenCard(false);
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
    <Style.Browser>
      <Header point={userPoint} />
      {mobile ? (
        <ContentLayout>
          <Mobile />
        </ContentLayout>
      ) : (
        <ContentLayout>
          {hiddenCard ? null : (
            <div>
              <MoodSelector
                lookbackRefresher={lookbackRefresher}
                pointRefresher={pointRefresher}
              />
            </div>
          )}
          <GlobalModal
            setHiddenCard={setHiddenCard}
            lookbackRefresh={lookbackRefresh}
            lookbackRefresher={lookbackRefresher}
            pointRefresher={pointRefresher}
          />
        </ContentLayout>
      )}
    </Style.Browser>
  );
};

export default Home;
