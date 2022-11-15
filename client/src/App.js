// import logo from './logo.svg';
import Header from './components/module/Header';

import { TodoModal, MailModal, StoreModal } from './components/modals/Modal';
import MoodCard from './components/cards/MoodCard';

const App = () => {
  return (
    <>
      <TodoModal />
      <>--------</>
      <MailModal />
      <>--------</>
      <StoreModal />
      <>--------</>
      <MoodCard />
      --------
      <Header />
    </>
  );
};

export default App;
