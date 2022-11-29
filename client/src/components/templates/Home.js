import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodCard from '../module/MoodCard';
import GlobalModal from './GlobalModal';
const Home = () => {
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
