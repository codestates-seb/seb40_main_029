import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodCard from '../module/MoodCard';

const Home = () => {
  return (
    <>
      <Header />
      <ContentLayout>
        <MoodCard />
      </ContentLayout>
    </>
  );
};

export default Home;
