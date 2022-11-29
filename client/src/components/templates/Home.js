import Header from '../module/Header';
import { emailSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const Home = () => {
  const email = useSelector(emailSelector);
  console.log(email);

  return (
    <>
      <Header />
    </>
  );
};

export default Home;
