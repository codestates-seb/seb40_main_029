import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ContentLayout } from '../../../atoms/layout/Layouts';
import Header from '../../../module/header/Header';
import GlobalModal from '../../modals/GlobalModal';
import Mobile from '../mobileAlert/MobileAlert';
import { getPoint } from '../../../../api/GetPointApi';
import { memberIdSelector } from '../../../../redux/hooks';
import { getCookie } from '../../../../utils/cookie';
import * as Style from './Style';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const [mobile, setMobile] = useState();
  const memberId = useSelector(memberIdSelector);
  const accessToken = getCookie('accessToken');

  const queryClient = useQueryClient();
  const point = useQuery({
    queryKey: ['point', memberId],
    queryFn: async () => {
      const data = await getPoint(memberId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['point']);
    },
  });

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
      <Header point={point?.data} />
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
