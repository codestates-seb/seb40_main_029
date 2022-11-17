// import logo from './logo.svg';
import { useState } from 'react';
import Header from './components/module/Header';
import {
  TodoModal,
  MailModal,
  StoreModal,
} from './components/module/modals/Modal';
import MoodCard from './components/module/MoodCard';
import MoodSelector from './components/module/MoodSelector';
import styled from 'styled-components';

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: '#f6f6f6'; */
`;

const App = () => {
  const [fade, setFade] = useState(false);

  return (
    <Holder>
      <Header />
      <>--------</>
      <TodoModal />
      <>--------</>
      --------
      <MoodSelector fade={fade}></MoodSelector>
      --------
      {/* <MoodCard /> */}
      --------
      <button onClick={() => setFade(!fade)}> close selector </button>
      --------
      <br />
      --------
      <br />
      --------
      <br />
      --------
      <br />
    </Holder>
  );
};

export default App;
