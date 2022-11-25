import { Routes, Route, Link } from 'react-router-dom';
import Friends from './components/templates/Friends';
import Header from './components/module/Header';
import Letter from './components/templates/Letter';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/letter" element={<Letter />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </div>
  );
};
export default App;
