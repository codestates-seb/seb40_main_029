import styled from 'styled-components';
import { TodoModal, MailModal, StoreModal } from './components/modal/Modal';
import Card from './components/card/Card';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(246, 246, 246);
`;

const App = () => {
  return (
    <div className="App">
      <Container>
        <TodoModal>
          <div>
            안녕하세요 <br />
            모달입니다 <br />
          </div>
        </TodoModal>
        <div>---</div>
        <MailModal />
        <div>---</div>
        <StoreModal />
        <div>---</div>
        <Card />
      </Container>
    </div>
  );
};
// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React 폰트테스트
//         </a>
//       </header>
//     </div>
//   );
// };

export default App;
