import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ContentLayout } from '../../../atoms/layout/Layouts';
import Header from '../../../module/header/Header';
import GlobalModal from '../../modals/GlobalModal';
import Mobile from '../mobileAlert/MobileAlert';
import { getCookie } from '../../../../utils/cookie';
import * as Style from './Style';

const Home = () => {
  const [mobile, setMobile] = useState();
  const accessToken = getCookie('accessToken');

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
      <Header />
      {mobile ? (
        <ContentLayout>
          <Mobile />
        </ContentLayout>
      ) : (
        <GlobalModal />
      )}
    </Style.Browser>
  );
};

export default Home;
