import { Routes, Route, Link } from 'react-router-dom';
import Friends from './components/templates/Friends';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import Gradi from './components/templates/gradi';
import axios from 'axios';
import TodoList from './components/module/TodoList';
import LookBack from './components/module/LookBack';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <Header />
      {/* <Gradi /> */}
      <Routes>
        <Route path="/letter" element={<Letter />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/lookback" element={<LookBack />} />
      </Routes>
    </div>
  );
};
export default App;
