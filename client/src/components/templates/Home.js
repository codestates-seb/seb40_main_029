import axios from 'axios';
import { setCookie, getCookie } from '../../utils/cookie';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodCard from '../module/MoodCard';
import GlobalModal from './GlobalModal';
const Home = () => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }

  return (
    <>
      <Header />
      <ContentLayout>
        <MoodCard />
        {/* 여기서 모달 조정 */}
        <GlobalModal />
      </ContentLayout>
    </>
  );
};

export default Home;
