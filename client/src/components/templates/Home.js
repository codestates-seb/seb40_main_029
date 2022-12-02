import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodSelector from '../module/MoodSelector';
import GlobalModal from './GlobalModal';
import { GetPoint } from '../../api/GetPointApi';
import { memberIdSelector } from '../../redux/hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { onSilentRefresh } from '../../api/LoginLogoutApi';

const Browser = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
`;
const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [openMoodCard, setOpenMoodCard] = useState(true);
  const navigate = useNavigate();
  const [userPoint, setUserPoint] = useState(0);
  const memberId = useSelector(memberIdSelector);
  console.log(memberId);
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
    console.log(accessToken);
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = accessToken;
      navigate('/');
      console.log('토큰 있음');
    } else if (accessToken == undefined) {
      navigate('/login');
      console.log('토큰 없음');
    }
    // onSilentRefresh();
  }, []);

  useEffect(() => {
    (async () => {
      setUserPoint(await GetPoint(memberId));
    })();
  }, [pointRefresh]);

  return (
    <Browser>
      <Header userPoint={userPoint} />
      <ContentLayout>
        {openMoodCard ? (
          <MoodSelector
            lookbackRefresher={lookbackRefresher}
            pointRefresher={pointRefresher}
          />
        ) : null}
        <GlobalModal
          lookbackRefresh={lookbackRefresh}
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
          setOpenMoodCard={setOpenMoodCard}
        />
      </ContentLayout>
    </Browser>
  );
};

export default Home;
